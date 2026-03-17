import path from 'path';

function resolvePath(userInput: string): string {
    let resolvedPath = path.resolve(process.cwd(), userInput);
    if (!resolvedPath.endsWith('/')) {
        resolvedPath += '/';
    }
    return resolvedPath;
}

export { resolvePath };