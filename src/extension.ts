import * as vscode from 'vscode';
import { convert,transform } from 'oc2dart';

export function activate(context: vscode.ExtensionContext) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.convert-oc-header2dart', () => {
        let window = vscode.window;

        let activeEditor = window.activeTextEditor;
        if (!activeEditor) {
            return;
        }
        let document = activeEditor.document;

        if (!document) {
            return;
        }

        let range = new vscode.Range(activeEditor.selection.start, activeEditor.selection.end);

        if (range.isSingleLine) {
            var start = new vscode.Position(0, 0);
            var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
            range = new vscode.Range(start, end);
        }

        const content = document.getText(range);

        if (content) {
            const converted = convert(content);
            console.log(converted);
            activeEditor.edit(function (editor) {
                editor.replace(range, converted);
                let start = new vscode.Position(0, 0);

                let end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
                let range2 = new vscode.Range(start, end);
                activeEditor?.revealRange(range2);

            });
        }

    });

    context.subscriptions.push(disposable);
    // transform code
    let disposable2 = vscode.commands.registerCommand('extension.convert-oc2dart', () => {
        let window = vscode.window;

        let activeEditor = window.activeTextEditor;
        if (!activeEditor) {
            return;
        }
        let document = activeEditor.document;

        if (!document) {
            return;
        }

        let range = new vscode.Range(activeEditor.selection.start, activeEditor.selection.end);

        const content = document.getText(range);
        if (content) {
            const converted = transform(content);
            activeEditor.edit(function (editor) {
                editor.replace(range, converted);

            });
        }

    });

    context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() { }
