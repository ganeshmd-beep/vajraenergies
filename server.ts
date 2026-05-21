import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { sendContactEmail, type ContactPayload } from './src/contactEmail';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';
app.use(express.json({ limit: '1mb' }));

app.post('/api/contact', async (req, res) => {
  const { name, phone, email, solutionType, projectBrief } = req.body as Partial<ContactPayload>;

  if (!name?.trim() || !phone?.trim() || !email?.trim() || !solutionType?.trim() || !projectBrief?.trim()) {
    return res.status(400).json({ error: 'Please complete every field before submitting.' });
  }

  try {
    await sendContactEmail({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      solutionType: solutionType.trim(),
      projectBrief: projectBrief.trim(),
    });

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
