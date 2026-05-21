<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/f0b01cd4-ce95-4136-b65b-0439e8d82c48

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Contact Form Email Setup

To send filled contact forms to your inbox with Resend, add these values to [.env.local](.env.local):

```env
RESEND_API_KEY="re_xxxxxxxxx"
CONTACT_RECIPIENT_EMAIL="your-inbox@example.com"
CONTACT_FROM_EMAIL="Vajra Energies <onboarding@resend.dev>"
```

If you have verified your own domain in Resend, replace the sender with an address from that domain.

The contact form posts to `/api/contact` and the local server sends the email through Resend.

On Vercel, this same route is handled by the serverless function in [`/api/contact.ts`](C:/Users/Sakshi/Downloads/vajra-energies/api/contact.ts), so you do not need to run a custom Express server in production.
