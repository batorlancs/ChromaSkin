/**
 * Ensures that the hex color has a # prefix
 * @param hex - The hex color to ensure has a # prefix
 * @returns The hex color with a # prefix
 */
export function ensureHexPrefix(hex: string): string {
	if (!hex) return "#000000";
	return hex.startsWith("#") ? hex : `#${hex}`;
}

/**
 * Converts a hex color to an RGB color
 * @param hex - The hex color to convert
 * @returns The RGB color
 */
export function hexToRgb(hex: string): number[] {
	const sanitizedHex = ensureHexPrefix(hex).replace("#", "");
	return [
		parseInt(sanitizedHex.substring(0, 2), 16),
		parseInt(sanitizedHex.substring(2, 4), 16),
		parseInt(sanitizedHex.substring(4, 6), 16),
	];
}

/**
 * Converts a hex color to a hex color with alpha
 * @param hex - The hex color to convert
 * @param alpha - The alpha value to add
 * @returns The hex color with alpha
 */
export function hexToHexAlpha(hex: string, alpha: number): string {
	const rgb = hexToRgb(ensureHexPrefix(hex));
	const alphaHex = Math.round(alpha * 255)
		.toString(16)
		.padStart(2, "0");
	return `#${rgb.map((c) => c.toString(16).padStart(2, "0")).join("")}${alphaHex}`;
}

/**
 * Adjusts a hex color (HSL adjustment)
 * @param hex - The hex color to adjust
 * @param hChange - The change in hue
 * @param sChange - The change in saturation
 * @param lChange - The change in lightness
 * @returns The adjusted hex color
 */
export function adjustColor(hex: string, hChange: number, sChange: number, lChange: number): string {
	const hsl = hexToHsl(ensureHexPrefix(hex));
	hsl[0] = Math.max(0, Math.min(360, hsl[0] + hChange));
	hsl[1] = Math.max(0, Math.min(100, hsl[1] + sChange));
	hsl[2] = Math.max(0, Math.min(100, hsl[2] + lChange));
	return hslToHex(hsl);
}

/**
 * Checks if a hex color is dark
 * @param hex - The hex color to check
 * @returns True if the hex color is dark, false otherwise
 */
export function isDarkMode(hex: string): boolean {
	const hsl = hexToHsl(ensureHexPrefix(hex));
	return hsl[2] < 50;
}


/**
 * Returns a black or white text color based on the lightness of the hex color
 * @param hex - The hex color to check
 * @param alpha - The alpha value to add
 * @returns The text color
 */
export function whiteOrBlackText(hex: string, alpha: number = 1): string {
	const hsl = hexToHsl(ensureHexPrefix(hex));
	return hsl[2] > 50 ? hexToHexAlpha("#000000", alpha) : hexToHexAlpha("#ffffff", alpha);
}

/**
 * Converts a hex color to an HSL color
 * @param hex - The hex color to convert
 * @returns The HSL color
 */
export function hexToHsl(hex: string): number[] {
	let r = 0,
		g = 0,
		b = 0;
	const rgb = hexToRgb(hex);
	r = rgb[0] / 255;
	g = rgb[1] / 255;
	b = rgb[2] / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0,
		s = 0,
		l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}

		h *= 60;
	}

	return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

/**
 * Converts an HSL color to a hex color
 * @param hsl - The HSL color to convert
 * @returns The hex color
 */
export function hslToHex(hsl: number[]): string {
	const h = hsl[0] / 360;
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;

	let r, g, b;

	if (s === 0) {
		r = g = b = l;
	} else {
		const hue2rgb = (p: number, q: number, t: number) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};

		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;

		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	const toHex = (x: number) => {
		// Ensure the value is between 0-255 before converting to hex
		const val = Math.max(0, Math.min(255, Math.round(x * 255)));
		const hex = val.toString(16);
		return hex.length === 1 ? "0" + hex : hex;
	};

	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}


/**
 * Blends two colors
 * @param color1 - The first color
 * @param color2 - The second color
 * @param ratio - The ratio of the blend
 * @returns The blended color
 */
export function blendColors(color1: string, color2: string, ratio: number): string {
	// Ensure ratio is between 0 and 1
	ratio = Math.max(0, Math.min(1, ratio));
	
	// Convert hex to RGB
	const parseHex = (hex: string) => {
	  const r = parseInt(hex.substring(1, 3), 16);
	  const g = parseInt(hex.substring(3, 5), 16);
	  const b = parseInt(hex.substring(5, 7), 16);
	  return [r, g, b];
	};
	
	// If either color has alpha, we need to handle that separately
	// For simplicity, we'll just assume no alpha in this example
	
	const rgb1 = parseHex(color1);
	const rgb2 = parseHex(color2);
	
	// Blend RGB values
	const blended = rgb1.map((channel, i) => {
	  return Math.round(channel * (1 - ratio) + rgb2[i] * ratio);
	});
	
	// Convert back to hex
	const toHex = (val: number) => {
	  const hex = val.toString(16);
	  return hex.length === 1 ? "0" + hex : hex;
	};
	
	return "#" + blended.map(toHex).join("");
}


/**
 * Finds the lightest color from a list of hex colors
 * @param colors - Array of hex color strings
 * @returns The lightest color from the array
 */
export function getLightestColor(colors: string[]): string {
	if (colors.length === 0) {
		throw new Error("Cannot find lightest color from an empty array");
	}
	
	// Function to calculate the perceived brightness of a color
	// Using the formula: (0.299*R + 0.587*G + 0.114*B)
	const getColorBrightness = (hexColor: string): number => {
		// Convert hex to RGB
		const r = parseInt(hexColor.substring(1, 3), 16);
		const g = parseInt(hexColor.substring(3, 5), 16);
		const b = parseInt(hexColor.substring(5, 7), 16);
		
		// Calculate perceived brightness
		return 0.299 * r + 0.587 * g + 0.114 * b;
	};
	
	// Find the color with the highest brightness value
	let lightestColor = colors[0];
	let highestBrightness = getColorBrightness(lightestColor);
	
	for (let i = 1; i < colors.length; i++) {
		const currentBrightness = getColorBrightness(colors[i]);
		if (currentBrightness > highestBrightness) {
			highestBrightness = currentBrightness;
			lightestColor = colors[i];
		}
	}
	
	return lightestColor;
}
