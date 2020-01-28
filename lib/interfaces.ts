export interface Date {
  year: string;
  month: string;
  day: string;
}

export interface Object {
  [key: string]: any;
}

export interface Meta {
  title: string;
  author: string;
  additionalMeta: object;
}

export interface FrontMatterObject {
  body: string;
  attributes: Object;
}

export interface PostApiListEntry {
  date: string;
  author: string;
  title: string;
  path: string;
  description: string;
  meta: object;
}

export interface PostApiEntry extends PostApiListEntry {
  content: string;
}
