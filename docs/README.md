# Kronikarz

Kronikarz is a file based system for managing blog posts. It's original purpose was to have an universal way for creating chronicles of scouting troops. But it's not only for scouts 😉.

## Getting started

Kronikarz has it's own rule for managing posts and at this point it is hard-coded. Required folder structure looks like this:

```
your_folder
└── {year}
    └── {month}
        └── {day}
            └── {title}.md
```

Firstly install kronikarz with npm

```bash
npm install kronikarz
```

To use kronikarz you need to initialize it first with path to folder where all your posts are. If look at the example above it would be path to `your_folder`. You need to remember that when you run a script with npm current working directory is always root directory.

```js
import Kronikarz from "kronikarz";

const k = new Kronikarz("path/to/posts");
```

### Generating the api

For generating the json api run:

```js
k.generateApi(`./path`)
```

This will create all posts list in `./path/api/posts.json` and create json file
with content for every markdown file in
`./path/api/posts/{year}/{month}/{day}/{title}.json`.

Also you can specify categories (tags) like this in your post:

```md
---
title: Test
author: Tester
category:
    - testing
---
```

And it will generate list of all posts in this category in
`./path/api/category/testing.json`

### Old functions

Now these function will return wrapper of `Post` object. If you want to get a
simple object like from json api run `post.toApi()`

```js
k.getPosts(); // returns array of all posts
let post = k.getPost("2019", "11", "20", "title"); // returns post from path `2019/11/20/title.md`
post.toApi();
```
