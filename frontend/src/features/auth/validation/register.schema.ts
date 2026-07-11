// src/features/auth/validation/register.schema.ts

import { z } from 'zod';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
];

const imageFileSchema = z
	.instanceof(File)
	.refine(
		(file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
		'Only JPG, PNG and WebP images are allowed.',
	)
	.refine(
		(file) => file.size <= MAX_IMAGE_SIZE,
		'Image size must be less than 5MB.',
	);

export const registerSchema = z.object({
	fullName: z
		.string()
		.trim()
		.min(3, 'Full name must contain at least 3 characters.')
		.max(100),

	username: z
		.string()
		.trim()
		.toLowerCase()
		.min(3, 'Username must contain at least 3 characters.')
		.max(30)
		.regex(
			/^[a-z0-9_]+$/,
			'Username may only contain lowercase letters, numbers and underscores.',
		),

	email: z.string().trim().email('Please enter a valid email address.'),

	password: z
		.string()
		.min(8, 'Password must be at least 8 characters.')
		.max(64),

	avatar: imageFileSchema,

	coverImage: imageFileSchema.optional(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
