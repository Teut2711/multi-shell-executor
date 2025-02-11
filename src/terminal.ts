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
  cwd?: string; // Added cwd parameter
}

export function createAndShowTerminal(
  config: TerminalConfig,
  index: number
): void {
  const terminalColor =
    config.color || `terminal.ansi${ANSI_COLORS[index % ANSI_COLORS.length]}`;

  const terminal = vscode.window.createTerminal({
    name: config.name,
    color: new vscode.ThemeColor(terminalColor),
    cwd: config.cwd, // Use cwd parameter
  });

  terminal.show();

  if (config.command) {
    terminal.sendText(config.command);
  }
}
