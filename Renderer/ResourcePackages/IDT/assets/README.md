Styles and Scripts for the IDT Website
=======
This directory contains both the sources and the compiled version of the site's global styles and scripts.

# Installation/set-up
1. Ensure you have [Node JS and npm](https://nodejs.org/en/download/) installed on the machine

2. Navigate the command line/command prompt to this directory `..\ResourcePackages\IDT\assets`. Replace the `..\` with the relevant path for your set-up

3. Run the command: `npm install` to restore all npm packages

# Compiling website CSS
1. Navigate the command line/command prompt to this directory `..\ResourcePackages\IDT\assets`. Replace the `..\` with the relevant path for your set-up

2. Run these commands depending on your use-case:
	- Development: `npm run sass-dev`
		- This compiles the .scss files in the **assets\src\scss** directory into unminified CSS in the **css** directory. The command prompt will also set-up a 'watcher' that will watch the .scss files for changes and automatically compile them when they're updated.
		
	- Committing to Production/Production: `npm run sass-prod`
		- This compiles the .scss files in the **assets\src\scss** directory into minified CSS in the **css** directory.
		- It is good practice to run this command on your scss and review output prior to committing your changes to ensure the minification process does not impact your styles
		
# Compiling website JS
1. Navigate the command line/command prompt to this directory `..\ResourcePackages\IDT\assets`. Replace the `..\` with the relevant path for your set-up

2. Run the command: `npm run uglify-js-prod`
	- This will compress/minify all javascript files in the **assets\src\js** directory into the **assets\js** directory. The filename extensions will also be updated from * *.js* * to * *.min.js* * for the generated files.

## TODO:
- [ ] Determine folder structure and output dirs and lifecycle for individual widget scripts

