import * as fs from "fs";
import { JSDOM } from "jsdom";
import { Post, PostContent } from "./interfaces";

const frontmatter = require("front-matter");
const md = require("markdown-it")();

function getDescription(html: string): string {
  const { document } = new JSDOM(`<div>${html}</div>`).window;
  const elements = document.getElementsByTagName("p");

  const description = elements[1].textContent;

  return description || "";
}

function getPostContent(fileContent: string): PostContent {
  const post = frontmatter(fileContent);

  const markdown = post.body;
  const html = `<div>${md.render(markdown)}</div>`;
  const description = getDescription(html);

  return {
    html,
    markdown,
    description,
    meta: post.attributes
  };
}

export function parsePost(filePath: string): Post {
  const [year, month, day, title] = filePath.split("/").splice(-4, 4);
  const date = { year, month, day };
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const content = getPostContent(fileContent);

  return {
    date,
    title: title.substr(0, title.lastIndexOf(".")),
    content,
    filePath,
    route: `/kronika/${year}/${month}/${day}/${title}`
  };
}
