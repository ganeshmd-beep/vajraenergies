import type { IncomingMessage, ServerResponse } from 'node:http';
import { sendContactEmail, type ContactPayload } from '../src/contactEmail';

function readBody(req: IncomingMessage & { body?: unknown }) {
  if (typeof req.body === 'string') {
    return JSON.parse(req.body);
  }

  return req.body ?? {};
}

export default async function handler(
  req: IncomingMessage & { method?: string; body?: unknown },
  res: ServerResponse & {
    status: (code: number) => any;
    json: (body: unknown) => void;
    setHeader: (name: string, value: string) => void;
    end: (chunk?: any) => void;
  },
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = readBody(req) as Partial<ContactPayload>;
    const payload: ContactPayload = {
      name: body.name?.trim() || '',
      phone: body.phone?.trim() || '',
      email: body.email?.trim() || '',
      solutionType: body.solutionType?.trim() || '',
      projectBrief: body.projectBrief?.trim() || '',
    };

    if (!payload.name || !payload.phone || !payload.email || !payload.solutionType || !payload.projectBrief) {
      res.status(400).json({ error: 'Please complete every field before submitting.' });
      return;
    }

    await sendContactEmail(payload);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    const message = error instanceof Error ? error.message : 'We could not send your enquiry right now.';
    res.status(500).json({ error: message });
  }
}
