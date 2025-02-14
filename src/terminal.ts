import * as vscode from "vscode";
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

export interface TerminalConfig {
  name: string;
  color?: string;
  cwd?: string;
  shellName?: string;
  command?: string;
  delay?: number;
}

const ANSI_COLORS = ["Red", "Green", "Blue", "Yellow", "Cyan", "Magenta"];

function getWindowsTerminalPath(shellName: string | undefined): string {
  let shellPath: string = {
    win32: `${shellName || "bash"}.exe`,
    darwin: `/bin/${shellName || "zsh"}`,
    linux: `/usr/bin/${shellName || "bash"}`,
  }[process.platform as "win32" | "darwin" | "linux"];

  if (shellName === "bash") {
    try {
      const gitPath = execSync("where git").toString().split("\n")[0].trim();
      if (gitPath) {
        return gitPath.replace(/(Git)[\\/].*$/, "$1\\bin\\bash.exe");
      }
    } catch (error: unknown) {
      throw new Error("Git Bash not found. Please install Git.");
    }
  }

  return shellPath;
}

export function createAndShowTerminal(config: TerminalConfig, index: number): number {
  const terminalColor =
    config.color || `terminal.ansi${ANSI_COLORS[index % ANSI_COLORS.length]}`;
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || "."; // Ensure a valid workspace path
  const cwd = `${workspaceFolder}/${config.cwd || "."}`;

  let shellPath: string;
  try {
    shellPath = getWindowsTerminalPath(config.shellName);
  } catch (e: unknown) {
    vscode.window.showErrorMessage(e instanceof Error ? e.message : String(e));
    return 0;
  }

  const terminal = vscode.window.createTerminal({
    name: config.name,
    color: new vscode.ThemeColor(terminalColor),
    cwd,
    shellPath,
  });

  terminal.show();

  if (config.command) {
    setTimeout(() => {
      terminal.sendText(config.command!);
    }, config.delay || 0);
  }
  return 1;
}

export function readConfig(configPathRelativeToWorkSpace:string): TerminalConfig[] {
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
   configPathRelativeToWorkSpace
  );


  if (!fs.existsSync(configPath)) {
    vscode.window.showInformationMessage(
      `[Multi Shell Executor] Configuration file not found at ${configPathRelativeToWorkSpace}. Please create a terminalConfig.json file in the .vscode directory of your workspace.`
    );
    return [];
  }

  const configContent: string = fs.readFileSync(configPath, "utf-8");
  let terminalConfig: TerminalConfig[];

  try {
    terminalConfig = JSON.parse(configContent);
  } catch (error) {
    vscode.window.showErrorMessage(
      "[Multi Shell Executor] Failed to parse terminalConfig.json. Please ensure it is valid JSON."
    );
    terminalConfig = [];
  }

  return terminalConfig;
}
