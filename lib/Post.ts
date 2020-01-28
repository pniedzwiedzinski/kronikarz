import * as fs from 'fs';
import { JSDOM } from 'jsdom';

const frontmatter = require('front-matter');
const md = require('markdown-it')();

import { dateToPath, dateToString } from './utils';
import { Date, FrontMatterObject, PostApiEntry, Meta } from './interfaces';

export default class Post {
  date: Date;
  fileTitle: string;
  fileContent: string;
  post: FrontMatterObject;

  constructor(filePath: string) {
    let [year, month, day, title] = filePath.split('/').splice(-4, 4);
    this.fileTitle = title.substr(0, title.lastIndexOf('.'));
    this.date = { year, month, day };
    this.fileContent = fs.readFileSync(filePath, 'utf-8');
    this.post = frontmatter(this.fileContent);
  }

  toApi(): PostApiEntry {
    const { author, title, additionalMeta } = this.getMeta();
    const { description, html } = this.getPostContent();
    return {
      date: dateToString(this.date),
      author,
      title,
      path: `/kronika/${dateToPath(this.date)}/${this.fileTitle}`,
      description,
      meta: additionalMeta,
      content: html,
    };
  }

  getMeta(): Meta {
    const { attributes } = this.post;
    const author: string = attributes.author;
    delete attributes.author;
    const title: string = attributes.title;
    delete attributes.title;
    return {
      author,
      title,
      additionalMeta: attributes,
    };
  }

  getPostContent() {
    const { body } = this.post;
    const html = `<div>${md.render(body)}</div>`;
    const description = this.getDescription(html);

    return {
      html,
      description,
    };
  }

  getDescription(html: string): string {
    const { document } = new JSDOM(`<div>${html}</div>`).window;
    const elements = document.getElementsByTagName('p');

    const description = elements[1].textContent;

    return description || '';
  }
}
