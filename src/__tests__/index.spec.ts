import Kronikarz from "..";

test("basic", () => {
  const k = new Kronikarz(__dirname + "/samples");
  console.log(k.getPosts());
  expect(k.getPosts().length).toBe(1);
});
