import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import { createServer as createViteServer } from 'vite';

dotenv.config();

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  solutionType?: string;
  projectBrief?: string;
};

const app = express();
const port = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';
const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'sales@vajraenergies.info';
const senderEmail = process.env.CONTACT_FROM_EMAIL || 'Vajra Energies <onboarding@resend.dev>';
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

app.use(express.json({ limit: '1mb' }));

app.post('/api/contact', async (req, res) => {
  const { name, phone, email, solutionType, projectBrief } = req.body as ContactPayload;

  if (!name?.trim() || !phone?.trim() || !email?.trim() || !solutionType?.trim() || !projectBrief?.trim()) {
    return res.status(400).json({ error: 'Please complete every field before submitting.' });
  }

  if (!resend) {
    return res.status(500).json({
      error:
        'Mail delivery is not configured yet. Set RESEND_API_KEY in your environment.',
    });
  }

  const subject = `New Vajra Energies enquiry - ${solutionType}`;
  const text = [
    'New contact form submission',
    '',
    `Name: ${name.trim()}`,
    `Phone: ${phone.trim()}`,
    `Email: ${email.trim()}`,
    `Solution Type: ${solutionType.trim()}`,
    '',
    'Project Brief:',
    projectBrief.trim(),
  ].join('\n');

  try {
    const { error } = await resend.emails.send({
      from: senderEmail,
      to: recipientEmail,
      subject,
      text,
      html: `
        <h2>New Vajra Energies enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        <p><strong>Solution Type:</strong> ${escapeHtml(solutionType.trim())}</p>
        <p><strong>Project Brief:</strong></p>
        <p>${escapeHtml(projectBrief.trim()).replace(/\n/g, '<br />')}</p>
      `,
      headers: {
        'Reply-To': email.trim(),
      },
    });

    if (error) {
      throw error;
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return res.status(500).json({ error: 'We could not send your enquiry right now.' });
  }
});

if (!isProduction) {
  const vite = await createViteServer({
    appType: 'custom',
    server: { middlewareMode: true },
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const template = await fs.readFile(path.resolve('index.html'), 'utf-8');
      const html = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      next(error);
    }
  });
} else {
  const distPath = path.resolve('dist');
  app.use(express.static(distPath));

  app.get('*', async (_req, res) => {
    const html = await fs.readFile(path.join(distPath, 'index.html'), 'utf-8');
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  });
}

app.listen(port, () => {
  console.log(`Vajra Energies app listening on http://localhost:${port}`);
});
