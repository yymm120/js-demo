import { $, ShellPromise } from 'bun'

// const argv = process.argv.slice(2);

// if (argv.find((v) => v === "--all")) {

// } else {
//     if (argv.find((v) => v === "--web01")) {

//         const buildSpawn = Bun.spawn(["rollup", "-c", "--watch", "--bundleConfigAsCjs"], {
//             cwd: ".",
//         });
//         console.log("aaa");

//         const devSpawn = Bun.spawn(["bun", "run", "--watch", "index.js"], {
//             cwd: "web01-nav/dist",
//         });

//     }
//     if (argv.find((v) => v === "--web02")) {

//     }
// }





const a = $`rollup -c --bundleConfigAsCjs`
const b = $`bun run --watch web01-nav/dist/index.js`

a.then(o => {
    console.log(o)
})
b.then(o => {
    console.log(o.text())
})
// await $`cp web01-nav/nav.html web01/dist/nav.html`

// const text = await new Response(buildScript.stdout).text()
// console.log(text);
// const text1 = await new Response(devSpawn.stdout).text()
// console.log(text1);