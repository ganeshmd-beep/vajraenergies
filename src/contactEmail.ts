import { Resend } from 'resend';

export type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  solutionType: string;
  projectBrief: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

export async function sendContactEmail(payload: ContactPayload) {
  const resend = getResend();
  if (!resend) {
    throw new Error('Mail delivery is not configured yet. Set RESEND_API_KEY in your environment.');
  }

  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'sales@vajraenergies.info';
  const senderEmail = process.env.CONTACT_FROM_EMAIL || 'Vajra Energies <onboarding@resend.dev>';

  const subject = `New Vajra Energies enquiry - ${payload.solutionType}`;
  const text = [
    'New contact form submission',
    '',
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Solution Type: ${payload.solutionType}`,
    '',
    'Project Brief:',
    payload.projectBrief,
  ].join('\n');

  const { error } = await resend.emails.send({
    from: senderEmail,
    to: recipientEmail,
    subject,
    text,
    html: `
      <h2>New Vajra Energies enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Solution Type:</strong> ${escapeHtml(payload.solutionType)}</p>
      <p><strong>Project Brief:</strong></p>
      <p>${escapeHtml(payload.projectBrief).replace(/\n/g, '<br />')}</p>
    `,
    replyTo: payload.email,
  });

  if (error) {
    throw error;
  }
}
