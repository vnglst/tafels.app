import React from 'react';
import { renderToString } from 'react-dom/server';
import seedrandom from 'seedrandom';
import type { RequestHandler } from './$types';
import {
	BigHead,
	theme,
	eyesMap,
	eyebrowsMap,
	mouthsMap,
	hairMap,
	facialHairMap,
	clothingMap,
	accessoryMap,
	graphicsMap,
	hatMap,
	bodyMap
} from '@bigheads/core';

function getRandomOptions(rng: () => number) {
	function selectRandomKey(object: Record<string, unknown>): string {
		return Object.keys(object)[Math.floor(rng() * Object.keys(object).length)];
	}

	const skinTone = selectRandomKey(theme.colors.skin);
	const eyes = selectRandomKey(eyesMap);
	const eyebrows = selectRandomKey(eyebrowsMap);
	const mouth = selectRandomKey(mouthsMap);
	const hair = selectRandomKey(hairMap);
	const facialHair = selectRandomKey(facialHairMap);
	const clothing = selectRandomKey(clothingMap);
	const accessory = selectRandomKey(accessoryMap);
	const graphic = selectRandomKey(graphicsMap);
	const hat = selectRandomKey(hatMap);
	const body = selectRandomKey(bodyMap);

	const hairColor = selectRandomKey(theme.colors.hair);
	const clothingColor = selectRandomKey(theme.colors.clothing);
	const circleColor = selectRandomKey(theme.colors.bgColors);
	const lipColor = selectRandomKey(theme.colors.lipColors);
	const hatColor = selectRandomKey(theme.colors.clothing);

	const mask = true;
	const lashes = rng() > 0.5;

	return {
		skinTone,
		eyes,
		eyebrows,
		mouth,
		hair,
		facialHair,
		clothing,
		accessory,
		graphic,
		hat,
		body,
		hairColor,
		clothingColor,
		circleColor,
		lipColor,
		hatColor,
		mask,
		lashes
	};
}

export const GET: RequestHandler = async ({ url }) => {
	try {
		const seed = url.searchParams.get('seed');
		const rng = seed ? seedrandom(seed) : Math.random;

		const mergedProps = {
			...getRandomOptions(rng)
		};

		const avatarString = renderToString(React.createElement(BigHead, mergedProps));

		return new Response(avatarString, {
			headers: {
				'Content-Type': 'image/svg+xml',
				'Cache-Control': seed ? 'max-age=0, must-revalidate, public' : 'no-cache'
			}
		});
	} catch (err) {
		return new Response(String(err), {
			status: 500,
			headers: {
				'Content-Type': 'text/plain'
			}
		});
	}
};
