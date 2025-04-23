import { ThemeConfig } from "./types/index";
import { adjustColor, blendColors, hexToHexAlpha } from "./utils";

export function getTokenColorCustomizations(themeConfig: ThemeConfig) {
	let textMateRules = [];
	if (themeConfig.syntaxCommentsOverwrite) {
		const fontStyle = "italic";

		function getOpacityFromMinMax(min: number, max: number) {
			return min + (max - min) * (themeConfig.commentOpacity / 10);
		}

		// generate colors
		const generalCommentColor = adjustColor(themeConfig.background, 0, 0, getOpacityFromMinMax(10, 50));
		const jsdocVariableColor = adjustColor(themeConfig.background, 0, 0, getOpacityFromMinMax(20, 80));
		const jsdocAtColor = adjustColor(themeConfig.background, 0, 0, getOpacityFromMinMax(15, 60));

		// general comments
		textMateRules.push({
			scope: ["comment", "comment.block", "comment.line", "comment.block.documentation", "punctuation.definition.comment"],
			settings: { foreground: generalCommentColor, fontStyle },
		});
		// jsdoc
		textMateRules.push({
			scope: ["storage.type.class.jsdoc"],
			settings: {
				foreground: blendColors(themeConfig.primary, jsdocVariableColor, 0.75),
				fontStyle,
			},
		});
		textMateRules.push({
			scope: ["variable.other.jsdoc"],
			settings: {
				foreground: jsdocVariableColor,
				fontStyle,
			},
		});

		// JSDoc @ symbol
		textMateRules.push({
			scope: ["punctuation.definition.block.tag.jsdoc"],
			settings: {
				foreground: jsdocAtColor,
				fontStyle,
			},
		});

		// JSDoc comment text
		textMateRules.push({
			scope: [
				"comment.block.documentation.js",
				"comment.block.documentation.ts",
				"comment.block.documentation.jsx",
				"comment.block.documentation.tsx",
			],
			settings: {
				foreground: generalCommentColor,
				fontStyle,
			},
		});

		// python
		// textMateRules.push({
		// 	scope: [
		// 		"string.quoted.docstring",
		// 		"punctuation.definition.string.begin.python",
		// 		"punctuation.definition.string.end.python",
		// 		"string.quoted.docstring.multi.python",
		// 	],
		// 	settings: {
		// 		foreground: generalCommentColor,
		// 		fontStyle,
		// 	},
		// });
	}

	const tokenColorCustomizations = {
		textMateRules,
	};
	return tokenColorCustomizations;
}
