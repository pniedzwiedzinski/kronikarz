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

At this point only two methods are available.

```js
k.getPosts(); // returns array of all posts
k.getPost("2019", "11", "20", "title"); // returns post from path `2019/11/20/title.md`
```
