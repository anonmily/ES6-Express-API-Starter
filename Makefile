start:
	# Just run the compiled distribution version
	node dist/index.js

test:
	# Just run the tests
	mocha --compilers js:babel-core/register src/server/tests/

devbabelnode:
	# If you want to run and compile ES6 on the fly...very slow, but hey.
	nodemon src/index.js --exec babel-node --presets es2015

dev:
	# Compile ES6 on the fly and keep watching
	babel src -d dist --presets es2015 --watch &

	# Run mocha tests on the fly and keep watching
	mocha --watch --compilers js:babel-core/register src/server/tests/ &

	# Nodemon (watch for changes and restart server)
	nodemon dist/index.js

build:
	# Just compile ES6
	babel src -d dist --presets es2015 --watch

buildwatch:
	# Compile ES6 on the fly and keep watching
	babel src -d dist --presets es2015 --watch