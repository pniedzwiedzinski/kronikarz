import Kronikarz from "../dist";

test("basic", () => {
  const k = new Kronikarz(__dirname + "/samples");
  expect(k.getPosts().length).toBe(1);
});
