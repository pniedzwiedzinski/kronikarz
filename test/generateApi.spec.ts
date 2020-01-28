import * as fs from "fs";
import Kronikarz from "../dist";

const k = new Kronikarz(__dirname + "/samples");
const dir = "./tmp";

test("generate single file", () => {
  k.generateApi(dir);
  fs.readFile("./tmp/api/posts/2019/12/12/test.json", "utf-8", (err, data) => {
    const parsedPost = JSON.parse(data);
    expect(parsedPost.title).toBe("Test");
  });
});

test("categories", () => {
    k.generateApi(dir)
    fs.readFile(`${dir}/api/category/test-category.json`, "utf-8", (err, data) => {
        const posts = JSON.parse(data)
        expect(posts.length).toBe(1)
        expect(posts[0].content).toBe(undefined)
    })
})
