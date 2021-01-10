import fs from 'fs';
import path from 'path';
import Post from './Post';
import { dateToPath } from './utils';
import { Object as PlainObject } from './interfaces';

function mkDirByPathSync(targetDir: string) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code === 'EEXIST') {
        // curDir already exists!
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === 'ENOENT') {
        // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!caughtErr || (caughtErr && targetDir === curDir)) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
}

export function saveApiEntry(post: Post, path: string) {
  const dir = `${path}/api/posts/${dateToPath(post.date)}`;

  mkDirByPathSync(dir);

  const apiEntry = post.toApi();

  fs.writeFile(
    `${dir}/${post.fileTitle}.json`,
    JSON.stringify(apiEntry),
    (err) => (err ? console.log(err) : null)
  );
}

//#Source https://bit.ly/2neWfJ2
function chunk (arr: Array<Post>, size: number): Array<Array<Post>> {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
             arr.slice(i * size, i * size + size)
            );
}

function parsePosts(post: Post) {
  const apiEntry = post.toApi();
  delete apiEntry.content;
  return apiEntry;
}

/*
 * This function generates api index on path `/api/posts`
 */
function generateApiIndex(posts: Array<Post>, path: string) {
  const parsedPosts = posts.map(parsePosts);
  const filePath = `${path}/api/posts.json`;
  fs.writeFile(filePath, JSON.stringify(parsedPosts), (err) =>
    err ? console.log(err) : null
  );
}

/*
 * This function generates pages on path `/api/page/<number>`
 */
function generatePages(posts: Array<Post>, path: string, len: number = 8) {
  const pages = chunk(posts, len);
  mkDirByPathSync(`${path}/api/page`);
  pages.forEach((posts: Array<Post>, index: number) => {
    const parsedPosts = posts.map(parsePosts);
    const pageNumber = index + 1;
    const page = { posts: parsedPosts, next : pageNumber + 1 };
    if (pageNumber == pages.length) {
      delete page.next;
    }
    fs.writeFile(`${path}/api/page/${pageNumber}.json`, JSON.stringify(page), (err) =>
                 err ? console.log(err) : null
                );
  })
}




function generateCategories(posts: Array<Post>, path: string) {
  const categories: PlainObject = {};
  posts.forEach((post) => {
    const apiEntry = post.toApi();
    delete apiEntry.content;
    if (apiEntry.meta['category']) {
      apiEntry.meta['category'].forEach((category: string) =>
        categories[category]
          ? categories[category].push(apiEntry)
          : (categories[category] = [apiEntry])
      );
    }
  });

  const dir = `${path}/api/category`;
  mkDirByPathSync(dir);
  Object.keys(categories).forEach((category) => {
    const filePath = `${dir}/${category}.json`;
    fs.writeFile(filePath, JSON.stringify(categories[category]), (err) =>
      err ? console.log(err) : null
    );
  });
}

export function generateApi(posts: Array<Post>, path: string) {
  try {
    generateApiIndex(posts, path);
    generateCategories(posts, path);
    generatePages(posts, path);
    posts.forEach((post) => saveApiEntry(post, path));
  } catch (err) {
    console.log(err);
  }
}
