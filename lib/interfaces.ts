interface Date {
  year: string;
  month: string;
  day: string;
}

interface Meta {
  [key: string]: string;
}

export interface PostContent {
  html: string;
  markdown: string;
  description: string;
  meta: Meta;
}

export interface Post {
  date: Date;
  title: string;
  content: PostContent;
  filePath: string;
  route: string;
}
