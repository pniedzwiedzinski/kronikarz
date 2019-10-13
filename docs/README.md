# Kronikarz

Required folder structure:

```
year
└── month
    └── title
        └── title.md
```

To parse all posts run:

```js
import Kronikarz from "kronikarz";

const k = new Kronikarz("path/to/posts");
k.getPosts();
```
