set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:Gr0mi4/weather-app.v2.git master:gh-pages

cd -
