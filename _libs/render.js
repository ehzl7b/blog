import matter from "gray-matter";
import hljs from "highlight.js";
import markdownIt from "markdown-it";

// hljs 초기화
hljs.registerLanguage("pseudo", (hljs) => {
    return {
        aliases: ["ps"],
        contains: [
            {className: "comment", begin: /#/, end: /$/},
            {className: "strong", begin: /\b[A-Z][A-Z0-9]*\b/},
            {className: "number", begin: /\b[0-9]+\b/},
            {className: "leadline", begin: /[|/\\=+<>∧∨]+/},
        ],
    }
});

// markdown-It 초기화
const parse_md = markdownIt({
    html: true,
    xhtmlOut: true,
    highlight(code, land) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";

        let tar_line = new Map();
        let code_modified = code.trim().split("\n").map((x, i) => {
            if (x.endsWith("\-") || x.endsWith("\+") || x.endsWith("\=")) {
                tar_line.set(i, x[1]);
                x = x.slice(0, -2);
            }
            return x;
        }).join("\n");

        let lines = hljs.highlight(code_modified, {language}).value.trim().split("\n");
        return lines.map((x, i) => 
            `<span class="codeline ${tar_line.get(i) || ""}">${x || ""}</span>`
        ).join("\n");
    },
});

// render 함수
export default function render(file, args={}) {
    let {content, data} = matter.read(file);
    content = parse_md.render(content);

    return `<h1>${data.title ?? ""}</h1><div class="meta">${data.description ?? ""}</div><div class="meta">Last Updated: ${data.updated ?? ""}</div>` + content;
}