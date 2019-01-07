const vscode = require('vscode');

const userConfig = vscode.workspace.getConfiguration();

const getSettings = () => {
  let extensionConfig = vscode.workspace.getConfiguration('themeSwitcher');

  return {
    night: extensionConfig.night,
    day: extensionConfig.day
  };
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.workspace.onDidChangeConfiguration(getSettings, this);
  let themeKey = 'workbench.colorTheme';
  let settings = getSettings();

  vscode.commands.registerCommand('extension.night', () => {
    userConfig.update(themeKey, settings.night, true);
  });
  vscode.commands.registerCommand('extension.day', () => {
    userConfig.update(themeKey, settings.day, true);
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
