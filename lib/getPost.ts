import { parsePost } from "./parsePost";
import { Post } from "./interfaces";

interface getPostArgument {
  year: string;
  month: string;
  day: string;
  title: string;
}

export function getPost(
  { year, month, day, title }: getPostArgument,
  path: string
): Post {
  const filePath = `${path}/${year}/${month}/${day}/${title}.md`;

  const post = parsePost(filePath);
  return post;
}
