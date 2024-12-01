import { $ } from "bun";

// build js & copy html
await $`cp ${__dirname}/index.html ${__dirname}/dist/index.html`;

console.log("-0-----------")
// start server
Bun.serve({
    port: "5179",
    static: {
        "/": new Response(await Bun.file(`${__dirname}/dist/index.html`).bytes(), {
            headers: {
                "Content-Type": "text/html",
            },
        }),
        "/index.js": new Response(await Bun.file(`${__dirname}/dist/index.js`).bytes(), {
            headers: {
                "Content-Type": "text/javascript",
            },
        }),
    },
    fetch(req) {
        return new Response("404!");
    },
});