import fs from "fs-extra";
import fg from "fast-glob";
import render from "./render.js";
import path from "path";

/**
 * 아래 규칙에 따라 마크다운 형식의 포스팅 페이지 렌더링
 *     - src 폴더와 dist 폴더 안의 파일들을 각각 목록화
 *     - dist에는 존재하지만 src에는 없는 파일을 삭제
 *     - src에는 존재하지만 dist에는 없는 파일을 렌더링 
 * 
 * nav.json 파일을 읽어서 네비게이션 페이지 렌더링
 */

// const root = fg.convertPathToPattern(process.env.PWD || process.cwd());
const root = ".";

export default function build() {
    let renderedCount = 0;

    // src, dist 폴더 안의 파일들을 목록화
    const files_src = fg.globSync(`${root}/src/**/*.md`);
    const files_dist = fg.globSync(`${root}/dist/**/*.html`);

    // dist에서 src에 없는 파일들을 삭제
    for (let X of files_dist) {
        const d = path.parse(x).name;
        // const s =  
        if (!files_src.includes(x.slice(0, -4) + "md")) {
            try {
                fs.removeSync(x);
                // 파일삭제 후 굳이 폴더가 비어있는지 확인하여 폴더까지 삭제하지는 않음
            } catch (e) {
                console.log(`파일 삭제 에러: ${e.message}`);
                process.exit(1);
            }
        }
    }

    // src에서 dist에 없는 파일들을 렌더링
    for (let x of files_src) {
        const y = (x.slice(0, -2) + "html").replace(`${root}/src`, `${root}/dist`);
        if (!files_dist.includes(y)) {
            let html = render(x);
            try {
                fs.outputFileSync(y, html);
            } catch (e) {
                console.log(`파일 생성 에러: ${e.message}`);
                process.exit(1);
            }
            renderedCount += 1;
        }
    }

    // // 네비게이션 페이지 렌더링
    // const navfile = fg.globSync(`${root}/src/**/nav.json`);
    // const navobj = (() => {
    //     try {
    //         return JSON.parse(fs.readFileSync(navfile[0], "utf-8"));
    //     } catch (e) {
    //         console.log(`파일 로드 에러: ${e.message}`);
    //         process.exit(1);
    //     }
    // })();
    // for (let x of navobj) {
    //     let file = `${root}/dist/${x.id}.html`;
    //     let postings = fg.globSync(`${root}/dist/${x.id}/**/*.html`);
    // }
}