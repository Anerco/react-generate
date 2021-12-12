import vscode from 'vscode';
import { promises as fs } from 'fs';
import path from 'path';
import { pascalCase } from 'change-case';
import { name } from '../../package.json';
import { handler } from './handler';
import * as templates from '../templates';
import { locate } from 'func-loc';

export interface ICommand extends vscode.Command {
  category?: string;
  icon?: {
    light?: string;
    dark?: string;
  };
}

const COMPONENT_NAME_PROMPT = 'Enter component name';

async function generate({ command }: ICommand, uri: vscode.Uri): Promise<void> {
  try {
    const componentName = await getComponentName();
    const componentDirectory = await createComponentDirectory(
      componentName,
      uri
    );
    await generateFiles(
      componentName,
      componentDirectory,
      command.replace(`${name}.`, '')
    );
    handler('success', componentName);
  } catch (e: any) {
    handler('error', e.message);
  }
}

async function getComponentName(): Promise<string> {
  let componentName = await vscode.window.showInputBox({
    prompt: COMPONENT_NAME_PROMPT,
  });
  componentName = componentName?.trim();

  if (!componentName || componentName.length === 0) {
    throw new Error('Component name is empty!');
  }

  return pascalCase(componentName);
}

async function createComponentDirectory(
  componentName: string,
  uri: vscode.Uri
): Promise<string> {
  const baseDir = !!path.extname(uri.fsPath)
    ? path.parse(uri.fsPath).dir
    : uri.fsPath;
  const componentDirectory = path.join(baseDir, componentName);
  await fs.mkdir(componentDirectory);

  return componentDirectory;
}

async function generateFiles(
  pascalCaseComponentName: string,
  componentDirectory: string,
  command: string
): Promise<void> {
  const filesToCreate = [command, ...command.split('.').slice(1)];

  for (const template of Object.values(templates)) {
    const { path: filePath } = await locate(template as any);
    const fileName = path.parse(filePath).name;

    if (filesToCreate.includes(fileName)) {
      const t = new template(pascalCaseComponentName, componentDirectory);
      await t.create();
    }
  }
}

export default generate;
