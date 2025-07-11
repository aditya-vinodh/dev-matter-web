import { highlighter } from '$lib/server/highlighter';

const exampleHTMLFormCode = `// components/ContactForm.js
'use client'

export default function ContactForm() {
  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)

    await fetch('https://api.devmatter.app/forms/abc123/submit', {
      method: 'POST',
      body: formData,
    })

    alert('Form submitted!')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Your Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <textarea name="message" placeholder="Your Message" required />
      <button type="submit">Send</button>
    </form>
  )
}
`;
const exampleHTMLFormHtml = highlighter.codeToHtml(exampleHTMLFormCode, {
	lang: 'jsx',
	theme: 'min-dark'
});

const exampleNextjsAPIRoute = `// pages/api/secure-submit.js
export default async function handler(req, res) {
  const session = await getSession({ req }) // example using next-auth
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  // Forward data to DevMatter
  const response = await fetch('https://api.devmatter.app/forms/abc123/submit', {
    method: 'POST',
    body: req.body,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  res.status(response.status).end()
}`;

const exampleNextjsAPIRouteHtml = highlighter.codeToHtml(exampleNextjsAPIRoute, {
	lang: 'jsx',
	theme: 'min-dark'
});

export const load = async () => {
	return {
		exampleHTMLFormHtml,
		exampleNextjsAPIRouteHtml
	};
};
