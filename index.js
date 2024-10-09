import build from "./_libs/build.js";

switch (process.argv[2]) {
    case "build":
        build();
        break;
    case "test":
        test();
        break;
}


import path from "path";
import fg from "fast-glob";
function test() {
    const a = fg.globSync(`./**/*.js`);
    const b = path.parse(a[0]);
    console.log(b);
}