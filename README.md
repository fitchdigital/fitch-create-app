# fitch-create-app

fitch-create-app is an ES6 boilerplate template system for projects done at FITCH.
It allows you to quickly start a new project simply by typing `fitch-create-app` from your terminal window.

![screencast](./how-to-use.gif)

## Installation

Install it globally, so you can create a new project from within any folder in your system.

```shell
npm install -g fitch-create-app
```

## Development

Make sure you uninstall any version of fitch-create-app, by running `npm uninstall -g fitch-create-app`. Then install the module locally so you can test your changes before publishing to npm.

### add module locally

pull this repo from bitbucket, go to the root folder and install it locally by running:

`sudo npm install . -g` (this should install the module on your system).

Next go to any other folder on your file system like ~/Desktop and type `fitch-create-app`. You will be prompted to install the templates.

If you want to test any changes on the `fitch-create-app` repo, you need to update it by running `sudo npm link`, otherwise `fitch-create-app` will not include your changes latest changes.

To remove the local copy simply run `npm r fitch-create-app -g`.

### publish to npm

```shell
npm login
npm publish
```
