import * as vscode from "vscode";

const ANSI_COLORS = [
  "Blue",
  "Green",
  "Red",
  "Yellow",
  "Magenta",
  "Cyan",
  "BrightBlue",
  "BrightGreen",
  "BrightRed",
  "BrightYellow",
  "BrightMagenta",
  "BrightCyan",
];

export interface TerminalConfig {
  name: string;
  color?: string;
  command?: string;
  cwd?: string;
}

export function createAndShowTerminal(
  config: TerminalConfig,
  index: number
): void {
  const terminalColor =
    config.color || `terminal.ansi${ANSI_COLORS[index % ANSI_COLORS.length]}`;

  const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
  const cwd = config.cwd ? `${workspaceFolder}/${config.cwd}` : workspaceFolder;

  const terminal = vscode.window.createTerminal({
    name: config.name,
    color: new vscode.ThemeColor(terminalColor),
    cwd: cwd,
  });

  terminal.show();

  if (config.command) {
    terminal.sendText(config.command);
  }
}
