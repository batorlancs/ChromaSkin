// import * as vscode from "vscode";
import { ThemeConfig } from "./types/index";
import { adjustColor, blendColors, hexToHexAlpha } from "./utils";

const SYNTAX_COMMENTS_OVERWRITE_TEXT_MATE_RULE = {
	scope: ["comment", "comment.block", "comment.line", "comment.block.documentation", "punctuation.definition.comment"],
	settings: { foreground: "#FFFFFF40", fontStyle: "italic" },
};

export function getTokenColorCustomizations(themeConfig: ThemeConfig) {
	let textMateRules = [];
	if (themeConfig.syntaxCommentsOverwrite) {
		const generalCommentColor = adjustColor(themeConfig.background, 0, 0, 25);
		const fontStyle = "italic"

		// general comments
		textMateRules.push({
			scope: ["comment", "comment.block", "comment.line", "comment.block.documentation", "punctuation.definition.comment"],
			settings: { foreground: generalCommentColor, fontStyle },
		});
		// jsdoc
		textMateRules.push({
			scope: ["storage.type.class.jsdoc"],
			settings: {
				foreground: blendColors(themeConfig.primary, adjustColor(themeConfig.background, 0, 0, 45), 0.5),
				fontStyle,
			},
		});
		textMateRules.push({
			scope: ["variable.other.jsdoc"],
			settings: {
				foreground: adjustColor(themeConfig.background, 0, 0, 45),
				fontStyle,
			},
		});

		// JSDoc @ symbol
		textMateRules.push({
			scope: ["punctuation.definition.block.tag.jsdoc"],
			settings: {
				foreground: adjustColor(themeConfig.background, 0, 0, 35),
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
	}

	const tokenColorCustomizations = {
		textMateRules,
	};
	return tokenColorCustomizations;
}
