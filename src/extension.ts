import vscode from 'vscode';
import { contributes as metadata } from '../package.json';
import generate, { ICommand } from './lib/generator';

export function activate(context: vscode.ExtensionContext) {
  metadata.commands.forEach((c: ICommand) => {
    const disposable = vscode.commands.registerCommand(
      c.command,
      async (uri) => {
        await generate(c, uri);
      }
    );
    context.subscriptions.push(disposable);
  });
}

export function deactivate() {}
