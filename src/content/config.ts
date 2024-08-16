import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		author: z.string().optional(),
		tags: z.string().optional(),
		thumbnail: z.string().optional(),
		background: z.string().optional(),
	}),
});

const workdocs = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		rangeDate: z
			.string()
			.transform((str) => {
				const [start, end] = str.split(' - ').map((date) => new Date(date));
				return { start, end };
			})
			.refine((range) => range.start <= range.end, {
				message: 'Start date must be before or equal to end date',
			})
			.optional(),
		heroImage: z.string().optional(),
		author: z.string().optional(),
		tags: z.string().optional(),
	}),
});

export const collections = { blog, workdocs };
