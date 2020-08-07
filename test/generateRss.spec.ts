import * as fs from "fs";
import Kronikarz from "../dist";

const k = new Kronikarz(__dirname + "/samples");
const dir = "./tmp/rss.xml";

test("generate RSS feed", () => {
  k.generateRss(dir, { title: "Test", feed_url: "https://site.com/rss.xml", site_url: "https://site.com" });
  fs.readFile("./tmp/rss.xml", "utf-8", (err, data) => {
    expect(data).toBe(`<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[Test]]></title><description><![CDATA[Test]]></description><link>https://site.com</link><generator>RSS for Node</generator><lastBuildDate>Fri, 07 Aug 2020 19:53:08 GMT</lastBuildDate><atom:link href="https://site.com/rss.xml" rel="self" type="application/rss+xml"/><item><title><![CDATA[Test]]></title><description><![CDATA[<div><h1>Test</h1>
<p>12-12-2019 | Tester</p>
<p>test test test</p>
</div>]]></description><link>https://site.com/kronika/2019/12/12/test</link><guid isPermaLink="false">/kronika/2019/12/12/test</guid><dc:creator><![CDATA[Tester]]></dc:creator><pubDate>Thu, 12 Dec 2019 00:00:00 GMT</pubDate></item><item><title><![CDATA[Category]]></title><description><![CDATA[<div><h1>Category</h1>
<p>01-01-2020 | Tester</p>
<p>This file is for testing categories</p>
</div>]]></description><link>https://site.com/kronika/2019/12/12/category</link><guid isPermaLink="false">/kronika/2019/12/12/category</guid><dc:creator><![CDATA[Tester]]></dc:creator><pubDate>Thu, 12 Dec 2019 00:00:00 GMT</pubDate></item></channel></rss>`);
  });
});
