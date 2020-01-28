import Post from "./Post";

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

  const post = new Post(filePath);
    return post;
}
