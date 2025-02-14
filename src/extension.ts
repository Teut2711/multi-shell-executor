// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { createAndShowTerminal, readConfig, TerminalConfig } from "./terminal";
import path from "path";

export function activate(context: vscode.ExtensionContext): void {
  console.log('Your extension "multi-shell-executor" is now active!');

  const disposable = vscode.commands.registerCommand(
    "multi-shell-executor.launchTerminals",
    (): void => {

        const basePath: string = path.join(
          ".vscode",
          "terminalConfig.json"
        );
      
      let terminalConfig: TerminalConfig[] = readConfig(basePath);

      if (terminalConfig.length === 0) {
        vscode.window.showInformationMessage(
          "[Multi Shell Executor] No shells to spawn"
        );
        return;
      }
      let spawnedTerminalsCount = 0; 
      terminalConfig.forEach((config: TerminalConfig, index: number): void => {
        spawnedTerminalsCount +=createAndShowTerminal(config, index);
      });

      vscode.window.showInformationMessage(
        `[Multi Shell Executor] Spawned ${spawnedTerminalsCount} shells`
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate(): void {}
