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

/**
 * Configuration options for generating a BigHead avatar
 */
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
 * @param object - The object to select a random key from
 * @param rng - Random number generator function that returns a value between 0 and 1
 * @returns A randomly selected key from the object
 * @throws {Error} If the object is empty or has no keys
 */
export function selectRandomKey(object: Record<string, unknown>, rng: () => number): string {
	const keys = Object.keys(object);

	if (keys.length === 0) {
		throw new Error('Cannot select random key from empty object');
	}

	return keys[Math.floor(rng() * keys.length)];
}

/**
 * Generates random feature options for the avatar
 * @param rng - Random number generator function
 * @returns Object containing random selections for facial and body features
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
 * @param rng - Random number generator function
 * @returns Object containing random color selections for various avatar elements
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
 * @param rng - Random number generator function
 * @returns Object containing random boolean flags for avatar features
 */
function getRandomBooleanOptions(rng: () => number) {
	return {
		mask: true,
		lashes: rng() > 0.5
	};
}

/**
 * Generates a complete set of random avatar options using the provided RNG
 * @param rng - Random number generator function (e.g., Math.random or seedrandom)
 * @returns Complete AvatarOptions object with all features, colors, and flags
 */
export function generateAvatarOptions(rng: () => number): AvatarOptions {
	return {
		...getRandomFeatures(rng),
		...getRandomColors(rng),
		...getRandomBooleanOptions(rng)
	};
}

const MAX_SEED_LENGTH = 200;

/**
 * Generates an avatar URL with the given seed
 * @param seed - The seed string used to generate a deterministic avatar
 * @returns URL string for fetching the avatar SVG
 * @throws {Error} If the seed is empty or exceeds maximum length
 */
export function getAvatarUrl(seed: string): string {
	if (!seed || seed.trim().length === 0) {
		throw new Error('Avatar seed cannot be empty');
	}

	if (seed.length > MAX_SEED_LENGTH) {
		throw new Error(`Avatar seed exceeds maximum length of ${MAX_SEED_LENGTH} characters`);
	}

	return `/bigheads?seed=${encodeURIComponent(seed)}`;
}
