echo "Enter your commit message:"
read message
git add -A
git commit -m "$message"
read hi
git push https://github.com/samzhangjy/SamsBlogFrontend.git master
npm run build
cd dist
git init
git add -A
git commit -m "Deploy"
git push https://github.com/samzhangjy/samzhangjy.github.io.git master -f
cd ..