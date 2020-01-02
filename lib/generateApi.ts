import fs from "fs";
import path from "path";
import { Post } from "./interfaces";

function mkDirByPathSync(targetDir: string) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : "";
  const baseDir = ".";

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code === "EEXIST") {
        // curDir already exists!
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === "ENOENT") {
        // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ["EACCES", "EPERM", "EISDIR"].indexOf(err.code) > -1;
      if (!caughtErr || (caughtErr && targetDir === curDir)) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
}

export function saveApiEntry(post: Post, path: string) {
  const { year, month, day } = post.date;
  const dir = `${path}/api/posts/${year}/${month}/${day}`;

  mkDirByPathSync(dir);

  const apiEntry = {
    title: post.title,
    date: `${year}-${month}-${day}`,
    content: post.content.html,
    meta: post.content.meta
  };

  fs.writeFile(`${dir}/${post.title}.json`, JSON.stringify(apiEntry), err =>
    err ? console.log(err) : null
  );
}

export function generateApi(posts: Array<Post>, path: string) {
  try {
    posts.forEach(post => saveApiEntry(post, path));
  } catch (err) {
    console.log(err);
  }
}
