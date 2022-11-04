# scaffold-component

I use this deno script to do a very simple scaffold of a new web component.

It just creates a directory with three files, see example in `sample-component/`.


## Installation

Clone the repository, then:

```
$ deno install --allow-write scaffold-component.js
```

I myself use the `--force` flag to overwrite earlier versions of the tool. You can do that with :

```
$ deno task reinstall
```

Not sure if that’s a good name… 🤔

To build a sample, empty component, run:


```
$ deno task build-sample
```

YMMV.

## LICENSE

This repository is released to the public domain.