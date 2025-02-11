import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

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

export function readConfig(): TerminalConfig[] {
  const workspaceFolder: string | undefined =
    vscode.workspace.workspaceFolders?.[0].uri.fsPath;
  if (!workspaceFolder) {
    vscode.window.showInformationMessage(
      "[Multi Shell Executor] No workspace folder found."
    );
    return [];
  }

  const configPath: string = path.join(
    workspaceFolder,
    ".vscode",
    "terminalsConfig.json"
  );

  if (!fs.existsSync(configPath)) {
    vscode.window.showInformationMessage(
      `[Multi Shell Executor] Configuration file not found at ${configPath}. Please create a terminalsConfig.json file in the .vscode directory of your workspace.`
    );
    return [];
  }

  const configContent: string = fs.readFileSync(configPath, "utf-8");
  let terminalConfig: TerminalConfig[];

  try {
    terminalConfig = JSON.parse(configContent);
  } catch (error) {
    vscode.window.showErrorMessage(
      "[Multi Shell Executor] Failed to parse terminalsConfig.json. Please ensure it is valid JSON."
    );
    terminalConfig = [];
  }

  return terminalConfig;
}
