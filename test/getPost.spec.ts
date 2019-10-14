import Kronikarz from "../dist";

const k = new Kronikarz(__dirname + "/samples");

test("simple get", () => {
  const post = k.getPost("2019", "12", "12", "test");
  expect(post.content.meta["title"]).toBe("Test");
});
