
# Transpile typescript to javascript
tsc

## Minify css and javascript
./lit -f styles.env && rollup temp/src/main.js --file out/main.js --format iife

## Set to production mode
echo "Setting to production mode"
