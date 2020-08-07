import * as fs from "fs"
import RSS from "rss";

import { FeedOptions } from "./interfaces";
import Post from "./Post";

export function generateRss(posts: Array<Post>, feed_path: string, feedOptions: FeedOptions) {
  const feed = new RSS(feedOptions);
  const parsedPosts = posts.forEach((post) => {
    const { title, content, path, date, author } = post.toApi();
    feed.item({
      title,
      description: content,
      url: feedOptions.site_url + path,
      guid: path,
      author,
      date,
    })
  })
  const xml = feed.xml();
  fs.writeFile(feed_path, xml, (err) => {
    if (err) {
      console.log(err);
    }
  })
}
