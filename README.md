# Multi-Shell Executor

Multi-Shell Executor is a Visual Studio Code extension that allows you to configure and launch multiple terminals with predefined commands and working directories.

## Features

- Launch multiple terminals with predefined commands and working directories.
- Customize terminal names, colors, and commands.
- Supports both Unix-like systems and Windows.
- Easy configuration via `settings.json`.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Teut2711/multi-shell-executor.git
   ```
2. Open the project in Visual Studio Code.
3. Install dependencies:
   ```sh
   npm install
   ```
4. Build the extension:
   ```sh
   npm run build
   ```
5. Run the extension in a VS Code development instance:
   ```sh
   npm run start
   ```

## Configuration

To configure Multi-Shell Executor, add your terminal settings to `settings.json` located at `/D:/multi-shell-executor/settings.json`.

### Example Configuration

```json
{
  "multi-shell-executer.config": [
    {
      "name": "List",
      "color": "terminal.ansiBlue",
      "command": "ls",
      "cwd": "path/to/directory"
    },
    {
      "name": "List with details",
      "color": "terminal.ansiGreen",
      "command": "ls -l",
      "cwd": "path/to/directory"
    },
    {
      "name": "List all",
      "color": "terminal.ansiRed",
      "command": "ls -a",
      "cwd": "path/to/directory"
    }
  ]
}
```

### Steps to Apply Configuration

1. Open `settings.json` in your editor.
2. Add or modify the `multi-shell-executer.config` section.
3. Save the file.
4. Restart VS Code to apply the changes.

## Usage

1. Open the **Command Palette** (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Search for and run the command: **Multi-Shell Executor: Launch Terminals**.
3. The extension will open multiple terminals as per your configuration.


## Release Notes

### 0.0.4
- Initial release with terminal configuration and execution support.

## License

This project is licensed under the Mozilla Public License Version 2.0. See the [LICENSE](LICENSE) file for details.

## Repository

[GitHub Repository](https://github.com/Teut2711/multi-shell-executor)

