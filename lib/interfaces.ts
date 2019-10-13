interface Date {
  year: string;
  month: string;
  day: string;
}

export interface PostContent {
  html: string;
  markdown: string;
  description: string;
  meta: Object;
}

export interface Post {
  date: Date;
  title: string;
  content: PostContent;
  filePath: string;
  route: string;
}
