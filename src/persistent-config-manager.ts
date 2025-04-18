import * as vscode from "vscode";

class PersistentConfigManager {
	private context: vscode.ExtensionContext;
	private paths = {
		workbench: "chromaskin-persist-config-workbench",
		editor: "chromaskin-persist-config-editor",
	};

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
	}

	public saveCurrentConfig() {
		const workbenchConfig = vscode.workspace.getConfiguration("workbench").get("colorCustomizations");
		const editorConfig = vscode.workspace.getConfiguration("editor").get("tokenColorCustomizations");

		this.context.globalState.update(this.paths.workbench, workbenchConfig);
		this.context.globalState.update(this.paths.editor, editorConfig);
	}

	public restoreConfig() {
		const workbench = this.context.globalState.get(this.paths.workbench) as object || {};
		const editor = this.context.globalState.get(this.paths.editor) as object || {};
		return { workbench, editor };
	}
}

export default PersistentConfigManager;
