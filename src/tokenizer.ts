import * as vscode from "vscode";

const DEFAULT_TOKEN_COLOR_CUSTOMIZATIONS = {
	textMateRules: [
		{
			scope: ["comment", "comment.block", "comment.line", "comment.block.documentation", "punctuation.definition.comment"],
			settings: { foreground: "#FFFFFF30" },
		},
	],
};

export function getTokenColorCustomizations() {
	const editorConfig = vscode.workspace.getConfiguration("editor");
	const tokenColorCustomizationsData = (editorConfig.get("tokenColorCustomizations") as any) || {};
	const textMateRules = Array.isArray(tokenColorCustomizationsData.textMateRules) ? tokenColorCustomizationsData.textMateRules : [];
	const tokenColorCustomizations = {
		...tokenColorCustomizationsData,
		textMateRules: [...textMateRules, ...DEFAULT_TOKEN_COLOR_CUSTOMIZATIONS.textMateRules],
	};
	return tokenColorCustomizations;
}
