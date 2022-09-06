rm -rf dist &&
yarn build
cd dist
git init
git add .
git commit -m "更新文档"
git branch -M master
git remote add origin git@github.com:luoshushu/vue3-SL-UI-doc.git
git push -f -u origin master
