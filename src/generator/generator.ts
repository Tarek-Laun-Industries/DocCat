import { resolvePath } from "../utils.js";
import fs from "fs";
import { blogPostTemplate, javaScriptPageTemplate, typescriptPageTemplate } from "./templates.js";

export enum Language {
    TypeScript = 'TypeScript',
    JavaScript = 'JavaScript',
}

export class Generator {
    static #instance: Generator;

    private constructor() { }

    static getInstance(): Generator {
        if (!Generator.#instance) {
            Generator.#instance = new Generator();
        }
        return Generator.#instance;
    }

    generatePage(projectPath: string, route: string, lang: Language) {
        projectPath = resolvePath(projectPath);

        fs.mkdirSync(projectPath + "src/" + route, { recursive: true });

        fs.writeFileSync(projectPath + "src/" + route + "/site." + (lang === Language.TypeScript ? "tsx" : "jsx"),
            (lang === Language.TypeScript ? typescriptPageTemplate : javaScriptPageTemplate));
    }

    generateBlogPost(projectPath: string, title: string, author: string, date: string) {
        projectPath = resolvePath(projectPath);

        const fileName = title.toLowerCase().replace(/\s+/g, '-');
        fs.mkdirSync(projectPath + "blog/", { recursive: true });
        let content = blogPostTemplate;
        content = content.replace(/<BlogPostTitle>/g, title);
        content = content.replace(/<BlogPostAuthor>/g, author);
        content = content.replace(/<BlogPostDate>/g, date);
        fs.writeFileSync(projectPath + "blog/" + fileName + ".dmd", content);
    }
}