import * as fs from "fs";

export function readDir(path: string): Array<string> {
  if (fs.existsSync(path)) {
    return fs.readdirSync(path);
  } else {
    throw `Path "${path}" doesn't exist`;
  }
}
