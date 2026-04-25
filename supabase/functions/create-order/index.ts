import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const UNIT_PRICE_CENTS = 29999; // €299.99
const OWNER_EMAIL = 'OuraEyes@gmail.com';
const OWNER_NAME = 'Kyle Kongolo';
const IBAN = 'BE30 7340 6587 2911';
const BANK = 'KBC';

interface OrderInput {
  full_name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  postal_code: string;
  country: string;
  quantity: number;
  notes?: string;
}

function validate(body: any): { ok: true; data: OrderInput } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid body' };
  const required = ['full_name', 'email', 'phone', 'address_line1', 'city', 'postal_code', 'country'];
  for (const f of required) {
    if (typeof body[f] !== 'string' || body[f].trim().length === 0) {
      return { ok: false, error: `Missing field: ${f}` };
    }
    if (body[f].length > 255) return { ok: false, error: `Field too long: ${f}` };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return { ok: false, error: 'Invalid email' };
  const qty = Number(body.quantity);
  if (!Number.isInteger(qty) || qty < 1 || qty > 10) return { ok: false, error: 'Invalid quantity' };
  if (body.notes && (typeof body.notes !== 'string' || body.notes.length > 1000)) {
    return { ok: false, error: 'Notes too long' };
  }
  return {
    ok: true,
    data: {
      full_name: body.full_name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      address_line1: body.address_line1.trim(),
      address_line2: body.address_line2?.trim() || undefined,
      city: body.city.trim(),
      postal_code: body.postal_code.trim(),
      country: body.country.trim(),
      quantity: qty,
      notes: body.notes?.trim() || undefined,
    },
  };
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

function eur(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}

async function sendResendEmail(to: string, subject: string, html: string) {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  if (!LOVABLE_API_KEY || !RESEND_API_KEY) throw new Error('Email API keys not configured');

  const res = await fetch('https://connector-gateway.lovable.dev/resend/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': RESEND_API_KEY,
    },
    body: JSON.stringify({
      from: 'OuraEyes <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Resend failed [${res.status}]: ${txt}`);
  }
  return res.json();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const v = validate(body);
    if (!v.ok) {
      return new Response(JSON.stringify({ error: v.error }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const o = v.data;
    const total_cents = UNIT_PRICE_CENTS * o.quantity;

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        full_name: o.full_name,
        email: o.email,
        phone: o.phone,
        address_line1: o.address_line1,
        address_line2: o.address_line2 ?? null,
        city: o.city,
        postal_code: o.postal_code,
        country: o.country,
        quantity: o.quantity,
        unit_price_cents: UNIT_PRICE_CENTS,
        total_cents,
        currency: 'EUR',
        notes: o.notes ?? null,
      })
      .select('order_ref, total_cents, quantity')
      .single();

    if (error || !order) {
      console.error('Insert error:', error);
      return new Response(JSON.stringify({ error: 'Could not create order' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 1) Internal order email -> owner (full buyer details)
    const ownerHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#1a1a1a;">
        <h2 style="color:#6b8e5a;">New SiaaSoo Order — ${escapeHtml(order.order_ref)}</h2>
        <p><strong>Total:</strong> ${eur(order.total_cents)} EUR (${order.quantity} × ${eur(UNIT_PRICE_CENTS)})</p>
        <h3>Buyer</h3>
        <table style="border-collapse:collapse;width:100%;">
          <tr><td style="padding:6px 0;"><strong>Name:</strong></td><td>${escapeHtml(o.full_name)}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Email:</strong></td><td>${escapeHtml(o.email)}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Phone:</strong></td><td>${escapeHtml(o.phone)}</td></tr>
        </table>
        <h3>Shipping address</h3>
        <p style="line-height:1.6;">
          ${escapeHtml(o.address_line1)}<br/>
          ${o.address_line2 ? escapeHtml(o.address_line2) + '<br/>' : ''}
          ${escapeHtml(o.postal_code)} ${escapeHtml(o.city)}<br/>
          ${escapeHtml(o.country)}
        </p>
        ${o.notes ? `<h3>Notes</h3><p>${escapeHtml(o.notes)}</p>` : ''}
        <p style="color:#777;font-size:12px;margin-top:24px;">
          Status: awaiting bank transfer (€${(order.total_cents / 100).toFixed(2)} EUR)
        </p>
      </div>`;

    // 2) Buyer confirmation email with payment instructions
    // Buyer sees a generic "OuraEyes" name + IBAN; owner's personal email is never shown.
    const buyerHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#1a1a1a;">
        <h2 style="color:#6b8e5a;">Thank you for your order, ${escapeHtml(o.full_name.split(' ')[0])}!</h2>
        <p>Your <strong>OuraEyes SiaaSoo</strong> order has been received. To complete your purchase, please transfer the amount below to our bank account.</p>

        <div style="background:#f4f7f0;border:1px solid #d8e2cd;border-radius:12px;padding:20px;margin:24px 0;">
          <h3 style="margin-top:0;color:#3d4f33;">Payment details</h3>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:6px 0;"><strong>Amount:</strong></td><td>${eur(order.total_cents)} EUR</td></tr>
            <tr><td style="padding:6px 0;"><strong>Beneficiary:</strong></td><td>OuraEyes</td></tr>
            <tr><td style="padding:6px 0;"><strong>Bank:</strong></td><td>${BANK}</td></tr>
            <tr><td style="padding:6px 0;"><strong>IBAN:</strong></td><td style="font-family:monospace;font-size:15px;">${IBAN}</td></tr>
            <tr><td style="padding:6px 0;"><strong>Reference:</strong></td><td style="font-family:monospace;color:#6b8e5a;"><strong>${escapeHtml(order.order_ref)}</strong></td></tr>
          </table>
        </div>

        <p><strong>Important:</strong> Please include the reference <strong>${escapeHtml(order.order_ref)}</strong> in your transfer so we can match your payment.</p>
        <p>Once payment is received (usually 1–2 business days), we'll ship your SiaaSoo within 24h.</p>

        <h3>Order summary</h3>
        <p>${order.quantity} × OuraEyes SiaaSoo Smart Eye Massager — ${eur(order.total_cents)}</p>

        <p style="color:#777;font-size:12px;margin-top:32px;">Questions? Just reply to this email.<br/>— The OuraEyes team</p>
      </div>`;

    // Send both emails — don't block order success on email failure
    try {
      await sendResendEmail(OWNER_EMAIL, `🛒 New order ${order.order_ref} — €${(order.total_cents / 100).toFixed(2)}`, ownerHtml);
    } catch (e) {
      console.error('Owner email failed:', e);
    }
    try {
      await sendResendEmail(o.email, `Your OuraEyes order ${order.order_ref} — payment details`, buyerHtml);
    } catch (e) {
      console.error('Buyer email failed:', e);
    }

    return new Response(
      JSON.stringify({
        order_ref: order.order_ref,
        total_eur: (order.total_cents / 100).toFixed(2),
        iban: IBAN,
        bank: BANK,
        beneficiary: 'OuraEyes',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('create-order error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
