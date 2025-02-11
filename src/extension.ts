// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { createAndShowTerminal, readConfig, TerminalConfig } from "./terminal";

export function activate(context: vscode.ExtensionContext): void {
  console.log('Your extension "multi-shell-executor" is now active!');

  const disposable = vscode.commands.registerCommand(
    "multi-shell-executor.launchTerminals",
    (): void => {
      let terminalConfig: TerminalConfig[] = readConfig();

      if (terminalConfig.length === 0) {
        vscode.window.showInformationMessage(
          "[Multi Shell Executor] No shells to spawn"
        );
        return;
      }

      terminalConfig.forEach((config: TerminalConfig, index: number): void => {
        createAndShowTerminal(config, index);
      });

      vscode.window.showInformationMessage(
        `[Multi Shell Executor] Spawned ${terminalConfig.length} shells`
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate(): void {}
