// place files you want to import through the `$lib` alias in this folder.
import { createHighlighter } from 'shiki';

export const highlighter = await createHighlighter({
	themes: ['min-dark'],
	langs: ['html', 'javascript']
});
