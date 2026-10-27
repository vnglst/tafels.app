import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import seedrandom from 'seedrandom';
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
	function selectRandomKey<T extends Record<string, unknown>>(object: T): keyof T {
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

// The same seeded options as the former server endpoint; no backend is needed.
export function avatarDataUrl(name: string): string {
  const props = getRandomOptions(seedrandom(name));
  const svg = renderToStaticMarkup(React.createElement(BigHead, props));
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
