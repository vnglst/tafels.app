import React from 'react';
import { renderToString } from 'react-dom/server';
import seedrandom from 'seedrandom';
import type { RequestHandler } from './$types';
import { BigHead } from '@bigheads/core';
import { generateAvatarOptions } from '$lib/avatar/utils';

/**
 * GET endpoint for generating avatar SVGs
 * Accepts a 'seed' query parameter to generate deterministic avatars
 */
export const GET: RequestHandler = async ({ url }) => {
	try {
		const seed = url.searchParams.get('seed');
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
