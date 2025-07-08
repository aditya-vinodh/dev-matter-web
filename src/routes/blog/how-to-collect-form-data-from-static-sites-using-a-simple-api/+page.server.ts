import { highlighter } from '$lib/server/highlighter';

const exampleHTMLFormCode = `<form method="POST" action="https://api.devmatter.com/forms/your-form-id">
  <input name="email" type="email" required />
  <textarea name="message"></textarea>
  <button type="submit">Send</button>
</form>
`;
const exampleHTMLFormHtml = highlighter.codeToHtml(exampleHTMLFormCode, {
	lang: 'html',
	theme: 'min-dark'
});

export const load = async () => {
	return {
		exampleHTMLFormHtml
	};
};
