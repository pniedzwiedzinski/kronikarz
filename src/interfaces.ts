interface Date {
  year: string;
  month: string;
  day: string;
}

interface Post {
  date: Date;
  title: string;
  data: Object;
  file: string;
  fsRoute: string;
  route: string;
}

export { Post };
