import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Doc Cat</title>
                <link rel="stylesheet" href="/assets/styles.css" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}