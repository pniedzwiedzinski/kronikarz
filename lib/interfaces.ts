export interface Date {
  year: string;
  month: string;
  day: string;
}

/*export interface Meta {
  [key: string]: object;
}*/

export interface Meta {
  title: string;
  author: string;
    additionalMeta: object;
}

export interface FrontMatterObject {
  body: string;
  attributes: Meta;
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
