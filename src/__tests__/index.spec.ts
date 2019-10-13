import Kronikarz from "..";

test("basic", () => {
  const k = new Kronikarz("./src/__tests__/samples");
  console.log(k.getPosts());
});
