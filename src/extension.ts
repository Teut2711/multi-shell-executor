// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { createAndShowTerminal, TerminalConfig } from "./terminal";

export function activate(context: vscode.ExtensionContext) {
  console.log('Your extension "multi-shell-executor" is now active!');

  const disposable = vscode.commands.registerCommand(
    "multi-shell-executor.launchTerminals",
    () => {
      const terminalConfig: TerminalConfig[] = vscode.workspace
        .getConfiguration()
        .get("multi-shell-executer.config", []);
      

      if (terminalConfig.length === 0) {
        vscode.window.showInformationMessage(
          "[Multi Shell Executor] No shells to spawn"
        );
        return;
      }

      terminalConfig.forEach((config, index) => {
        createAndShowTerminal(config, index);
      });

      vscode.window.showInformationMessage(
        `[Multi Shell Executor] Spawned ${terminalConfig.length} shells`
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
