import { renderToReadableStream, renderToString } from "react-dom/server";
import React from "react";
import fs from "fs";
const defaultLayout = (await import("../default/layout.js")).default;

async function buildPage(Source: any, layout: any = defaultLayout): Promise<string> {
    return await renderToString(React.createElement(layout, null, React.createElement(Source)));
}

async function buildPages(inputPath: string, outputPath: string, localPath: string) {
    console.log(`Building pages from ${inputPath} to ${outputPath} with local path ${localPath}`);
    if (localPath.length > 0 && !localPath.endsWith('/')) {
        localPath += '/';
        fs.mkdirSync(outputPath + localPath, { recursive: true });
    }
    // Read all files in the src directory
    const files = await fs.promises.readdir(inputPath);
    for (const file of files) {
        console.log(`Processing file: ${file}`);
        if (file.endsWith(".tsx") || file.endsWith(".jsx")) {
            const source = (await import(inputPath + file)).default;
            const html = await buildPage(source);
            const outputFileName = file.replace(/\.tsx?$/, '.html').replace(/\.jsx?$/, '.html');
            await fs.promises.writeFile(outputPath + localPath + outputFileName, html);
        } else if (fs.lstatSync(inputPath + file).isDirectory()) {
            buildPages(inputPath + file, outputPath, localPath + file);
        }
    }

}

export { buildPage, buildPages };