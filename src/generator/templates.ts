const typescriptPageTemplate = 
`import React from "react";
export default function Site() {
    return (
        <>
            <h1>Hello World</h1>
        </>
    );
}`;

const javaScriptPageTemplate =
`import React from "react";
export default function Site() {
    return (
        <>
            <h1>Hello World</h1>
        </>
    );
}`;

const blogPostTemplate = 
`!#TITLE=<BlogPostTitle>
!#DATE=<BlogPostDate>
!#AUTHOR=<BlogPostAuthor>

# <BlogPostTitle>

*By <BlogPostAuthor> on <BlogPostDate>*

Write your blog post content here.
`;

export { typescriptPageTemplate, javaScriptPageTemplate, blogPostTemplate };