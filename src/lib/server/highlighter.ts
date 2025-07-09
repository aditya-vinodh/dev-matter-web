import { createHighlighter } from 'shiki';

export const highlighter = await createHighlighter({
	themes: ['min-dark'],
	langs: ['html', 'javascript', 'bash']
});
