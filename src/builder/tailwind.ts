import { execSync } from "child_process";
import { resolvePath } from "../utils.js";
import fs from "fs";

async function buildTailwind(inputPath: string, outputPath: string) {
    let cssFile = resolvePath(inputPath + "src") + "styles.css";
    outputPath = resolvePath(outputPath) + "styles.css";
    console.log(`Checking for Tailwind CSS at ${cssFile}...`);

    if (!fs.existsSync(cssFile)) {
        return;
    }
    
    const styleContent = fs.readFileSync(cssFile, "utf-8");
    if (!styleContent.includes("tailwindcss")) {
        return;
    }

    console.log("Building Tailwind CSS...");

    // Build Tailwind CSS
    try {
        await execSync(`npx tailwindcss -i ${cssFile} -o ${outputPath} --minify`, {
            cwd: inputPath,
            stdio: "inherit",
        });
    }catch (error) {
        console.error("Error building Tailwind CSS:", error);
    }

    console.log("Tailwind CSS built successfully.");
}

export { buildTailwind };