// import * as vscode from "vscode";
import { ThemeConfig } from "./types/index";

const SYNTAX_COMMENTS_OVERWRITE_TEXT_MATE_RULE = {
	scope: ["comment", "comment.block", "comment.line", "comment.block.documentation", "punctuation.definition.comment"],
	settings: { foreground: "#FFFFFF30" },
};

export function getTokenColorCustomizations(themeConfig: ThemeConfig) {
    let textMateRules = []
	if (themeConfig.syntaxCommentsOverwrite) {
		textMateRules.push(SYNTAX_COMMENTS_OVERWRITE_TEXT_MATE_RULE);
	}

	const tokenColorCustomizations = {
		textMateRules,
	};
	return tokenColorCustomizations;
}
