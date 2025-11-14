import type { ReactElement } from 'react';
import {
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

export interface AvatarOptions {
	skinTone: string;
	eyes: string;
	eyebrows: string;
	mouth: string;
	hair: string;
	facialHair: string;
	clothing: string;
	accessory: string;
	graphic: string;
	hat: string;
	body: string;
	hairColor: string;
	clothingColor: string;
	circleColor: string;
	lipColor: string;
	hatColor: string;
	mask: boolean;
	lashes: boolean;
}

/**
 * Selects a random key from an object using the provided random number generator
 */
export function selectRandomKey(object: Record<string, unknown>, rng: () => number): string {
	const keys = Object.keys(object);
	return keys[Math.floor(rng() * keys.length)];
}

/**
 * Generates random feature options for the avatar
 */
function getRandomFeatures(rng: () => number) {
	return {
		skinTone: selectRandomKey(theme.colors.skin, rng),
		eyes: selectRandomKey(eyesMap, rng),
		eyebrows: selectRandomKey(eyebrowsMap, rng),
		mouth: selectRandomKey(mouthsMap, rng),
		hair: selectRandomKey(hairMap, rng),
		facialHair: selectRandomKey(facialHairMap, rng),
		clothing: selectRandomKey(clothingMap, rng),
		accessory: selectRandomKey(accessoryMap, rng),
		graphic: selectRandomKey(graphicsMap, rng),
		hat: selectRandomKey(hatMap, rng),
		body: selectRandomKey(bodyMap, rng)
	};
}

/**
 * Generates random color options for the avatar
 */
function getRandomColors(rng: () => number) {
	return {
		hairColor: selectRandomKey(theme.colors.hair, rng),
		clothingColor: selectRandomKey(theme.colors.clothing, rng),
		circleColor: selectRandomKey(theme.colors.bgColors, rng),
		lipColor: selectRandomKey(theme.colors.lipColors, rng),
		hatColor: selectRandomKey(theme.colors.clothing, rng)
	};
}

/**
 * Generates random boolean options for the avatar
 */
function getRandomBooleanOptions(rng: () => number) {
	return {
		mask: true,
		lashes: rng() > 0.5
	};
}

/**
 * Generates a complete set of random avatar options using the provided RNG
 */
export function generateAvatarOptions(rng: () => number): AvatarOptions {
	return {
		...getRandomFeatures(rng),
		...getRandomColors(rng),
		...getRandomBooleanOptions(rng)
	};
}

/**
 * Generates an avatar URL with the given seed
 */
export function getAvatarUrl(seed: string): string {
	return `/bigheads?seed=${encodeURIComponent(seed)}`;
}
