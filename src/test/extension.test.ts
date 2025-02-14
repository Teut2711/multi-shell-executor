import assert from "assert";
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as sinon from "sinon";
import {
  createAndShowTerminal,
  readConfig,
  TerminalConfig,
} from "../../src/terminal";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  let sandbox: sinon.SinonSandbox;

  setup(() => {
    sandbox = sinon.createSandbox();
  });

  teardown(() => {
    sandbox.restore();
  });

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

    sandbox.stub(require("../../src/terminal"), "readConfig").returns(terminalConfig);

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
  });

  test("No Terminals to Launch", async () => {
    const extension = vscode.extensions.getExtension(
      "VisheshMangla.multi-shell-executor"
    );
    await extension?.activate();

    // Stub readConfig to return an empty array
    sandbox.stub(require("../../src/terminal"), "readConfig").returns([]);

    const showInformationMessageStub = sandbox.stub(
      vscode.window,
      "showInformationMessage"
    );

    await vscode.commands.executeCommand(
      "multi-shell-executor.launchTerminals"
    );

    assert.strictEqual(vscode.window.terminals.length, 0);
    assert(
      showInformationMessageStub.calledWith(
        "[Multi Shell Executor] No shells to spawn"
      )
    );
  });

  test("Spawned Shells Information Message", async () => {
    const extension = vscode.extensions.getExtension(
      "VisheshMangla.multi-shell-executor"
    );
    await extension?.activate();

    // Load the fixture
    const fixturePath: string = path.join(
      __dirname,
      "terminalConfig.test.json"
    );
    console.log(fixturePath)
    const fixtureContent: TerminalConfig[] = readConfig(fixturePath);
      
    
    const showInformationMessageStub = sandbox.stub(
      vscode.window,
      "showInformationMessage"
    );

    await vscode.commands.executeCommand(
      "multi-shell-executor.launchTerminals"
    );

    assert(
      showInformationMessageStub.calledWith(
        `[Multi Shell Executor] Spawned ${fixtureContent.length} shells`
      )
    );
  });
});
