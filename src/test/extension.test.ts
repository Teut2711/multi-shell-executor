import * as assert from "assert";
import * as vscode from "vscode";
import * as myExtension from "../../src/extension";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Sample test", () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });

  test("Launch Terminals Command", async () => {
    // Activate the extension
    const extension = vscode.extensions.getExtension(
      "your-publisher-name.multi-shell-executor"
    );
    await extension?.activate();

    // Execute the command
    await vscode.commands.executeCommand(
      "multi-shell-executor.launchTerminals"
    );

    // Check if terminals are created
    const terminals = vscode.window.terminals;
    assert.strictEqual(
      terminals.length,
      3,
      "Expected 3 terminals to be created"
    );

    // Check terminal names and commands
    assert.strictEqual(terminals[0].name, "List");
    assert.strictEqual(terminals[1].name, "List with details");
    assert.strictEqual(terminals[2].name, "List all");
  });
});
