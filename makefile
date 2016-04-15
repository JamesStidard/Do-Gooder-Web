init:
	jspm install
	npm install
build:
	- rm consts.js
	echo "export const debug = false\n" > consts.js
	- rm -rf build
	mkdir build
	jspm bundle-sfx --minify app/main build/app.min.js
	node_modules/.bin/html-dist index.html --remove-all --minify --insert app.min.js -o build/index.html
	cp -r resources* build/
	cp loading.css build/loading.css
	- rm consts.js
	echo "export const debug = true\n" > consts.js
deploy:
	aws s3 sync build/ s3://com-template-project
