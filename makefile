init:
	jspm install
	npm install
build:
	- rm consts.js
	echo "export const debug = false\n export const ws_url = 'wss://do-gooder.herokuapp.com/websocket'" > consts.js
	- rm -rf built
	mkdir built
	jspm bundle-sfx --minify app/main built/app.min.js
	node_modules/.bin/html-dist index.html --remove-all --minify --insert app.min.js -o built/index.html
	cp loading.css built/loading.css
	- rm consts.js
	echo "export const debug = true\n export const ws_url = 'ws://localhost:8888/websocket'" > consts.js
deploy:
	aws s3 sync build/ s3://com-template-project
