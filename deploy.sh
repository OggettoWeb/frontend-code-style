#!/usr/bin/env sh

# abort on errors
set -e

# build
vuepress build

# navigate into the build output directory
cd .vuepress/dist

# if you are deploying to a custom domain
# echo 'oggetto.academy' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:OggettoWeb/frontend-code-style.git master:gh-pages

cd -