import { renderToReadableStream, renderToString } from "react-dom/server";
import React from "react";
import fs from "fs";
import { resolvePath } from "../utils.js";
const defaultLayout = (await import("../default/layout.js")).default;

async function buildStaticPage(Source: any, layout: any = defaultLayout): Promise<string> {
    return await renderToString(React.createElement(layout, null, React.createElement(Source)));
}

async function buildPage(inputPath: string, outputPath: string) {
    // TODO: Build page with React on the Cliend Side.
}

async function buildPages(inputPath: string, outputPath: string, localPath: string) {
    inputPath = resolvePath(inputPath);
    outputPath = resolvePath(outputPath);
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
            const html = await buildStaticPage(source);

            let outputFileName = file.replace(/\.tsx?$/, '.html').replace(/\.jsx?$/, '.html');
            if (file == "site.tsx" || file == "site.jsx") {
                outputFileName = "index.html";
            }

            await fs.promises.writeFile(outputPath + localPath + outputFileName, html);
        } else if (fs.lstatSync(inputPath + file).isDirectory()) {
            buildPages(inputPath + file, outputPath, localPath + file);
        }
    }

}

export { buildPage, buildPages };