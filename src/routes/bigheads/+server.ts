import React from 'react';
import { renderToString } from 'react-dom/server';
import seedrandom from 'seedrandom';
import type { RequestHandler } from './$types';
import { BigHead } from '@bigheads/core';
import { generateAvatarOptions } from '$lib/avatar/utils';

const MAX_SEED_LENGTH = 200;

/**
 * Validates the seed parameter
 * @param seed - The seed value to validate
 * @returns Object with isValid flag and optional error message
 */
function validateSeed(seed: string | null): { isValid: boolean; error?: string } {
	if (!seed) {
		return { isValid: true }; // null/empty seed is valid (will use Math.random)
	}

	if (seed.length > MAX_SEED_LENGTH) {
		return {
			isValid: false,
			error: `Seed parameter exceeds maximum length of ${MAX_SEED_LENGTH} characters`
		};
	}

	return { isValid: true };
}

/**
 * GET endpoint for generating avatar SVGs
 * Accepts an optional 'seed' query parameter to generate deterministic avatars
 * @param url - Request URL containing optional seed parameter
 * @returns Response with SVG content or error message
 */
export const GET: RequestHandler = ({ url }) => {
	try {
		const seed = url.searchParams.get('seed');

		// Validate seed parameter
		const validation = validateSeed(seed);
		if (!validation.isValid) {
			return new Response(validation.error, {
				status: 400,
				headers: {
					'Content-Type': 'text/plain'
				}
			});
		}

		const rng = seed ? seedrandom(seed) : Math.random;

		const avatarOptions = generateAvatarOptions(rng);
		const avatarElement = React.createElement(BigHead, avatarOptions);
		const avatarString = renderToString(avatarElement);

		const cacheControl = seed ? 'max-age=0, must-revalidate, public' : 'no-cache';

		return new Response(avatarString, {
			headers: {
				'Content-Type': 'image/svg+xml',
				'Cache-Control': cacheControl
			}
		});
	} catch (error) {
		console.error('Error generating avatar:', error);
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';

		return new Response(`Error generating avatar: ${errorMessage}`, {
			status: 500,
			headers: {
				'Content-Type': 'text/plain'
			}
		});
	}
};
