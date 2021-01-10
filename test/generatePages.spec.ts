import * as fs from "fs";
import Kronikarz from "../dist";

const k = new Kronikarz(__dirname + "/samples");
const dir = "./tmp";

test("generate pages", () => {
  k.generateApi(dir);
  fs.readFile("./tmp/api/page/1.json", "utf-8", (err, data) => {
    const page = JSON.parse(data);
    expect(page.posts.length).toBe(2);
  });
})
