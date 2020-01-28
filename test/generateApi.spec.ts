import * as fs from "fs";
import Kronikarz from "../dist";

const k = new Kronikarz(__dirname + "/samples");

test("generate single file", () => {
  const dir = "./tmp";
  k.generateApi(dir);
  fs.readFile("./tmp/api/posts/2019/12/12/test.json", "utf-8", (err, data) => {
    const parsedPost = JSON.parse(data);
    expect(parsedPost.title).toBe("Test");
  });
});
