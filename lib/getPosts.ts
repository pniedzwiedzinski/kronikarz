import Post from "./Post";
import { readDir } from "./utils";

function getPosts(path: string): Array<Post> {
  let routesArray: Post[] = [];
  const years = readDir(`${path}`).reverse();
  years.forEach((year: string) => {
    const months = readDir(`${path}/${year}`).reverse();
    months.forEach((month: string) => {
      const days = readDir(`${path}/${year}/${month}`).reverse();
      days.forEach((day: string) => {
        let files = readDir(`${path}/${year}/${month}/${day}`).reverse();
        files = files.filter((file: string) => file.substr(file.length - 3) === ".md");
        files.forEach((file: string) => {
          const fsRoute = `${path}/${year}/${month}/${day}/${file}`;
          try {
            const post = new Post(fsRoute);
            routesArray.push(post);
          } catch (err) {
            console.log(err);
          }
        });
      });
    });
  });
  return routesArray;
}

function createRoutesArray() {
  // let posts = getPosts();
  // return posts.map(post => post.route);
}

export { getPosts, createRoutesArray };
