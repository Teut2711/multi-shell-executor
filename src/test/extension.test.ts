import * as assert from "assert";
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as sinon from "sinon";
import { TerminalConfig } from "../../src/terminal";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Launch Terminals Command", async () => {
    const extension = vscode.extensions.getExtension(
      "VisheshMangla.multi-shell-executor"
    );
    await extension?.activate();

    // Load the fixture
    const fixturePath: string = path.join(
      __dirname,
      "terminalConfig.test.json"
    );
    const fixtureContent: string = fs.readFileSync(fixturePath, "utf-8");
    const terminalConfig: TerminalConfig[] = JSON.parse(fixtureContent);

    // Mock the configuration
    const configStub = sinon
      .stub(vscode.workspace, "getConfiguration")
      .returns({
        get: (): TerminalConfig[] => terminalConfig,
      });

    await vscode.commands.executeCommand(
      "multi-shell-executor.launchTerminals"
    );

    const terminals: readonly vscode.Terminal[] = vscode.window.terminals;
    assert.strictEqual(
      terminals.length,
      terminalConfig.length,
      `Expected ${terminalConfig.length} terminals to be created`
    );

    terminalConfig.forEach((config: TerminalConfig, index: number) => {
      assert.strictEqual(terminals[index].name, config.name);
    });

    // Restore the configuration stub
    configStub.restore();
  });
});
