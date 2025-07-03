import { highlighter } from '$lib/server/highlighter';

const exampleHTMLFormCode = `<form id="contactForm" class="mx-auto mt-10 max-w-md space-y-4 rounded-xl bg-zinc-50 p-6 text-sm shadow">
  <input type="text" name="name" placeholder="Your Name" class="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2" required />
  <input type="email" name="email" placeholder="Your Email" class="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2" required />
  <textarea name="message" placeholder="Your Message" class="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2" rows="4" required></textarea>
  <button type="submit" class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">Send</button>
</form>
`;
const exampleHTMLFormHtml = highlighter.codeToHtml(exampleHTMLFormCode, {
	lang: 'html',
	theme: 'min-dark'
});

const exampleFetchCode = `<script>
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const json = Object.fromEntries(formData.entries());

    const res = await fetch('https://api.devmatter.app/form/abc123', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(json),
    });

    if (res.ok) {
      alert('Thanks! We got your message.');
      form.reset();
    } else {
      alert('Oops! Something went wrong.');
    }
  });
</script>`;

const exampleFetchCodeHtml = highlighter.codeToHtml(exampleFetchCode, {
	lang: 'html',
	theme: 'min-dark'
});

export const load = async () => {
	return {
		exampleHTMLFormHtml,
		exampleFetchCodeHtml
	};
};
