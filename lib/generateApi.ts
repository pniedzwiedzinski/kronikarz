import fs from 'fs';
import path from 'path';
import Post from './Post';
import { dateToPath } from './utils';

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

/*
 * This function generates paged api index on path `/api/paged-posts`
 */
function generateApiIndex(posts: Array<Post>, path: string) {
  const parsedPosts = posts.map((post) => {
    const apiEntry = post.toApi();
    delete apiEntry.content;
    return apiEntry;
  });
  const filePath = `${path}/api/posts.json`;
  fs.writeFile(filePath, JSON.stringify(parsedPosts), (err) =>
    err ? console.log(err) : null
  );
}

export function generateApi(posts: Array<Post>, path: string) {
  try {
    generateApiIndex(posts, path);
    posts.forEach((post) => saveApiEntry(post, path));
  } catch (err) {
    console.log(err);
  }
}
