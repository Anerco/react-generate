import vscode from 'vscode';

export type HandlerType = 'success' | 'error';

const GENERATE_SUCCESS = 'Generate Succes';
const GENERATE_ERROR = 'Generate Error';

export function handler(type: string, message = '') {
  switch (type) {
    case 'success': {
      vscode.window.showInformationMessage(
        message ? `${GENERATE_SUCCESS}: ${message}` : GENERATE_SUCCESS
      );
      break;
    }
    case 'error': {
      const errorMessage = message
        ? `${GENERATE_ERROR}: ${message}`
        : GENERATE_ERROR;
      vscode.window.showErrorMessage(errorMessage);
      break;
    }
  }
}
