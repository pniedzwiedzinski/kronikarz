import * as fs from "fs";
import { JSDOM } from "jsdom";

const frontmatter = require("front-matter");
const md = require("markdown-it")();

const POSTS_PATH = "./content/wpisy";

interface Date {
  year: string;
  month: string;
  day: string;
}

interface Post {
  date: Date;
  title: string;
  data: Object;
  file: string;
  fsRoute: string;
  route: string;
}

function getPostAttributes(fileContent: string) {
  const post = frontmatter(fileContent);

  const { document } = new JSDOM(`<body>${md.render(post.body)}</body>`).window;
  const element = document.getElementsByTagName("p");

  post.body = `<div>${md.render(post.body)}</div>`;
  post.description = element[1].textContent;

  return post;
}

function getPosts() {
  let routesArray: Post[] = [];
  try {
    const years = fs.readdirSync(`${POSTS_PATH}`);
    years.forEach((year: string) => {
      const months = fs.readdirSync(`${POSTS_PATH}/${year}`);
      months.forEach((month: string) => {
        const days = fs.readdirSync(`${POSTS_PATH}/${year}/${month}`);
        days.forEach((day: string) => {
          const files = fs.readdirSync(`${POSTS_PATH}/${year}/${month}/${day}`);
          files.forEach((file: string) => {
            const title = file.substr(0, file.lastIndexOf("."));
            const route = `/kronika/${year}/${month}/${day}/${title}/`;
            const fsRoute = `${POSTS_PATH}/${year}/${month}/${day}/${file}`;

            const data = getPostAttributes(fs.readFileSync(fsRoute, "utf-8"));

            const post = {
              date: { year, month, day },
              title,
              data,
              file,
              fsRoute,
              route
            };

            routesArray.push(post);
          });
        });
      });
    });
  } finally {
    return routesArray;
  }
}

function createRoutesArray() {
  let posts = getPosts();
  return posts.map(post => post.route);
}

export { getPosts, createRoutesArray, getPostAttributes };
