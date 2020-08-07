import { FeedOptions } from "./interfaces";
import { getPost as apiGetPost } from "./getPost";
import { getPosts as apiGetPosts } from "./getPosts";
import { generateApi as apiGenerateApi } from "./generateApi";
import { generateRss as apiGenerateRss } from "./generateRss";
import Post from "./Post";

export default class Kronikarz {
  postPath: string;

  constructor(postPath: string) {
    this.postPath = postPath;
  }

  getPosts(): Array<Post> {
    return apiGetPosts(this.postPath);
  }

  getPost(year: string, month: string, day: string, title: string): Post {
    return apiGetPost({ year, month, day, title }, this.postPath);
  }

  generateApi(path: string) {
    const posts = this.getPosts();
    apiGenerateApi(posts, path)
  }

  generateRss(path: string, feedOptions: FeedOptions) {
    const posts = this.getPosts();
    apiGenerateRss(posts, path, feedOptions);
  }
}
