import { getPosts as apiGetPosts } from "./getPosts";
import { Post } from "./interfaces";

export default class Kronikarz {
  postPath: string;

  constructor(postPath: string) {
    this.postPath = postPath;
  }

  getPosts(): Array<Post> {
    return apiGetPosts(this.postPath);
  }
}
