type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  solutionType?: string;
  projectBrief?: string;
};

function json(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...(init?.headers || {}),
    },
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'POST' } });
    }

    try {
      const apiKey = process.env.RESEND_API_KEY;
      const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'sales@vajraenergies.info';
      const senderEmail = process.env.CONTACT_FROM_EMAIL || 'VAJRA ENERGIES LLP <sales@vajraenergies.info>';

      if (!apiKey) {
        return json({ error: 'RESEND_API_KEY is missing in this deployment.' }, { status: 500 });
      }

      const body = (await request.json()) as ContactPayload;
      const name = body.name?.trim() || '';
      const phone = body.phone?.trim() || '';
      const email = body.email?.trim() || '';
      const solutionType = body.solutionType?.trim() || '';
      const projectBrief = body.projectBrief?.trim() || '';

      if (!name || !phone || !email || !solutionType || !projectBrief) {
        return json({ error: 'Please complete every field before submitting.' }, { status: 400 });
      }

      const subject = `New Vajra Energies enquiry - ${solutionType}`;
      const text = [
        'New contact form submission',
        '',
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Solution Type: ${solutionType}`,
        '',
        'Project Brief:',
        projectBrief,
      ].join('\n');

      const html = `
        <h2>New Vajra Energies enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Solution Type:</strong> ${escapeHtml(solutionType)}</p>
        <p><strong>Project Brief:</strong></p>
        <p>${escapeHtml(projectBrief).replace(/\n/g, '<br />')}</p>
      `;

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [recipientEmail],
          subject,
          text,
          html,
          reply_to: email,
        }),
      });

      const responseText = await response.text();
      let parsed: { error?: { message?: string } } | { id?: string } | null = null;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = null;
      }

      if (!response.ok) {
        const apiMessage =
          parsed && 'error' in parsed && parsed.error?.message
            ? parsed.error.message
            : responseText || 'Resend rejected the email request.';
        return json({ error: apiMessage }, { status: response.status });
      }

      return json({ ok: true, id: parsed && 'id' in parsed ? parsed.id : undefined });
    } catch (error) {
      console.error('Failed to send contact email:', error);
      const message = error instanceof Error ? error.message : 'We could not send your enquiry right now.';
      return json({ error: message }, { status: 500 });
    }
  },
};
