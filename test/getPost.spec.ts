import Kronikarz from "../dist";

const k = new Kronikarz(__dirname + "/samples");

test("simple get", () => {
  const p = k.getPost("2019", "12", "12", "test");
    const post = p.toApi();
  expect(post.title).toBe("Test");
});
