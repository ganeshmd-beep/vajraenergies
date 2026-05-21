import { sendContactEmail, type ContactPayload } from '../src/contactEmail';

function json(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...(init?.headers || {}),
    },
  });
}

export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'POST' } });
    }

    try {
      const body = (await request.json()) as Partial<ContactPayload>;
      const payload: ContactPayload = {
        name: body.name?.trim() || '',
        phone: body.phone?.trim() || '',
        email: body.email?.trim() || '',
        solutionType: body.solutionType?.trim() || '',
        projectBrief: body.projectBrief?.trim() || '',
      };

      if (!payload.name || !payload.phone || !payload.email || !payload.solutionType || !payload.projectBrief) {
        return json({ error: 'Please complete every field before submitting.' }, { status: 400 });
      }

      await sendContactEmail(payload);
      return json({ ok: true });
    } catch (error) {
      console.error('Failed to send contact email:', error);
      const message = error instanceof Error ? error.message : 'We could not send your enquiry right now.';
      return json({ error: message }, { status: 500 });
    }
  },
};
