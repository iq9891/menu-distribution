cd docs
git init
git add -A
git commit -m 'docs($site): deploy site'
git push -f git@github.com:iq9891/menu-distribution.git master:gh-pages
