# scaffold-component

I use this deno script to do a very simple scaffold of a new web component.

Check the `sample-component` directory to see what the generated stuff looks like. 

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

### Install from GitHub

You should be able install directly from GitHub without cloning the repo:

```
$ deno install --allow-write https://raw.githubusercontent.com/amundo/scaffold-component/main/scaffold-component.js
```

## Usage

To build a sample, empty component, run:


```
$ deno task build-sample
```

## Building documentation (requires pandoc)

In the component directory:

```
$ deno task build
```

This will generate `<your-component>-docs.html`. This way you can work on documentation  directly in `<your-component>-docs.md` without writing `HTML` by hand.

## LICENSE

This repository is released to the public domain.
