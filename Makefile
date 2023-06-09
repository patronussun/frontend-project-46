install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

tests:
	npx jest

test-coverage:
	npm test