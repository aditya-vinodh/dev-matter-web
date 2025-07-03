import { highlighter } from '$lib/server/highlighter';

const exampleHTMLFormCode = `<form action="https://api.devmatter.app/forms/<your-form-id>" method="POST">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <button type="submit">Submit</button>
</form>`;
const exampleHTMLFormHtml = highlighter.codeToHtml(exampleHTMLFormCode, {
	lang: 'html',
	theme: 'min-dark'
});

const exampleJavascriptFormCode = `fetch("https://api.devmatter.app/forms/<your-form-id>", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Jane", email: "jane@example.com" }),
});`;
const exampleJavascriptFormHtml = highlighter.codeToHtml(exampleJavascriptFormCode, {
	lang: 'javascript',
	theme: 'min-dark'
});
export const load = async () => {
	return {
		exampleHTMLFormHtml,
		exampleJavascriptFormHtml
	};
};
