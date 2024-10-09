import fg from "fast-glob";
import path from "path";
import fs from "fs-extra";

const root = process.env.PWD || process.cwd();
console.log(root);

// const a = path.join(root, "**", "*.js");
// console.log(a);

const a = `${root}/**/*.js`;
console.log(a);

const b = fg.convertPathToPattern(a);
console.log(b);

const c = fg.globSync(b);
console.log(c);

// const d = fs.readFileSync(c[1], "utf-8");
// console.log(d);