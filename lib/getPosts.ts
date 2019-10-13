import { Post } from "./interfaces";
import parsePost from "./parsePost";
import { readDir } from "./utils";

function getPosts(path: string): Array<Post> {
  let routesArray: Post[] = [];
  try {
    const years = readDir(`${path}`);
    years.forEach((year: string) => {
      const months = readDir(`${path}/${year}`);
      months.forEach((month: string) => {
        const days = readDir(`${path}/${year}/${month}`);
        days.forEach((day: string) => {
          const files = readDir(`${path}/${year}/${month}/${day}`);
          files.forEach((file: string) => {
            const fsRoute = `${path}/${year}/${month}/${day}/${file}`;

            const post = parsePost(fsRoute);

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
  // let posts = getPosts();
  // return posts.map(post => post.route);
}

export { getPosts, createRoutesArray };
