import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
	markdown: {
		render: [
		  '@astrojs/markdown-remark',
		  {
			syntaxHighlight: 'shiki',
			shikiConfig: {
			  theme: 'monokai',
			  langs: ['js', 'html', 'css', 'astro',],
			  wrap: false,
			},
		  },
		],
	  },
});

