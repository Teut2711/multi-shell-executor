# Multi-Shell Executor

## Setup Instructions

### Setting Up Terminal Info in Settings

1. Open the settings file located at `/D:/multi-shell-executor/settings.json`.

2. Add the terminal information under the `multi-shell-executer.config` section. Below is an example configuration:

   ```json
   {
     "multi-shell-executer.config": [
       {
         "name": "List",
         "color": "terminal.ansiBlue",
         "command": "ls",
         "cwd": "/path/to/directory"
       },
       {
         "name": "List with details",
         "color": "terminal.ansiGreen",
         "command": "ls -l",
         "cwd": "/path/to/directory"
       },
       {
         "name": "List all",
         "color": "terminal.ansiRed",
         "command": "ls -a",
         "cwd": "/path/to/directory"
       }
     ]
   }
   ```

3. Save the `settings.json` file.

4. Restart the application to apply the new settings.

### Example `settings.json` File

```json
{
  "multi-shell-executer.config": [
    {
      "name": "List",
      "color": "terminal.ansiBlue",
      "command": "ls",
      "cwd": "/path/to/directory"
    },
    {
      "name": "List with details",
      "color": "terminal.ansiGreen",
      "command": "ls -l",
      "cwd": "/path/to/directory"
    },
    {
      "name": "List all",
      "color": "terminal.ansiRed",
      "command": "ls -a",
      "cwd": "/path/to/directory"
    }
  ]
}
```

### Additional Information

- Ensure that the commands, colors, and `cwd` are correctly specified.
- The `color` field should be a valid terminal color.

For more detailed information, refer to the official documentation or contact support.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

- `myExtension.enable`: Enable/disable this extension.
- `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
- Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**

## Usage

To run a command with a specific working directory:

```javascript
const { runCommand } = require("./commandRunner");

runCommand("ls", { cwd: "/path/to/directory" })
  .then((output) => console.log(output))
  .catch((error) => console.error(error));
```

```

```
