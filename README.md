# scaffold-component

I use this deno script to do a very simple scaffold of a new web component. It’s very simple and mostly serves to save me typing — I doubt it will be of interest to others, but have a look if you are interested.

Check the `sample-component` directory to see what a generated web component framework looks like. 


* Does not use shadow dom, as I am not a fan.
* Requires `pandoc` to be installed to generate `HTML` documentation (`my-component-docs.html`) from markdown file `my-component-docs.md`. The idea is that you only edit the markdown file.

## Installation

Clone the repository, then:

```
$ deno install --allow-write scaffold-component.js
```

I myself use the `--force` flag to overwrite earlier versions of the tool. 


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


## Tasks 


There is a `deno.json` file in the scaffold-component directory itself, which does this:

```
Available tasks:
- build-sample
    scaffold-component sample-component
- clean
    rm -rf sample-component
- reinstall
    deno install --force --allow-read --allow-write scaffold-component.js
```


There is also a _generated_  `deno.json` file which has just one task, building documentation:

```
Available tasks:
- build
    pandoc -f markdown -t html --css sample-component-docs.css --section-divs --template=template.html -o sample-component-docs.html sample-component-docs.md
```



### Build documentation (requires pandoc)

In the component directory:

```
$ deno task build
```

This will generate `<your-component>-docs.html`. This way you can work on documentation  directly in `<your-component>-docs.md` without writing `HTML` by hand.

## LICENSE

This repository is released to the public domain.
