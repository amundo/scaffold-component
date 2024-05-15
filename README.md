# scaffold-component

I use this deno script to do a very simple scaffold of a new web component. It’s very simple and mostly serves to save me typing — I doubt it will be of interest to others, but have a look if you are interested.

Check the `sample-component` directory to see what a generated web component looks like. 

* Does not use shadow dom, as I am not a fan.
* Requires `pandoc` to be installed to generate `HTML` documentation (`my-component-docs.html`) from markdown file `my-component-docs.md`. The idea is that you only edit the markdown file.

## Installation

Clone the repository, then:

```bash
deno install --allow-write scaffold-component.js
```

I myself use the `--force` flag to overwrite earlier versions of the tool. 


### Install from pathall.net

To install use the following command:

```bash
deno install --allow-write --allow-read https://pathall.net/scaffold-component/scaffold-component.js
```

Deno will automatically follow the dependencies and imports and so forth and install them too. I think.

### Install from github

It’s also possible to clone from github, of course:

https://github.com/amundo/scaffold-component

## Usage

These examples assume the tool has been installed and that `~/.deno/bin` is on your `$PATH`.

To create a skeleton component called `my-component`, do:

```
scaffold-component my-component
```

The sample component (included in the repo) is called `sample-component`. To rebuild it if you wish you, you can run this task:


```
deno task build-sample
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
deno task build
```

This will generate `<your-component>-docs.html`. This way you can work on documentation  directly in `<your-component>-docs.md` without writing `HTML` by hand.

## LICENSE

This repository is released to the public domain.
