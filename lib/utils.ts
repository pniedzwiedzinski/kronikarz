import * as fs from "fs";
import { Date } from './interfaces';
import Post from './Post'

export function readDir(path: string): Array<string> {
  if (fs.existsSync(path)) {
    return fs.readdirSync(path);
  } else {
    throw `Path "${path}" doesn't exist`;
  }
}

export function sortPosts(posts: Array<Post>): Array<Post> {
    return posts;
}

export function dateToString({ year, month, day }: Date): string {
    return `${year}-${month}-${day}`
}

export function dateToPath({ year, month, day }: Date): string {
    return `${year}/${month}/${day}`
}
