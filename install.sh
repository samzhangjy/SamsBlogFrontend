#!/usr/bin/env sh

echo 'Did you commited all changes? (y/n) '

read commited

if [ $commited != 'y' ]
then
    git remote >> tt.txt
    echo 'Please enter you commit message: '
    read message
    echo 'Committing changes...\n'
    git add .
    git commit -m $message
    echo 'Changes commited!'
fi


# Abort on errors
# set -e

# Delete the dist folder
rm -rf ./dist

# Push to origin
git push origin master

# Build
npm run build

# Navigate into the build output directory
cd dist

# Init / reinit git
git checkout $(git show-ref --verify --quiet refs/heads/production || echo '-b') production
# Add all changes
git add -A
# Commit the changes
git commit -m 'Deploy to samzhangjy.github.io automatically'

# Push to GitHub
git push -f git@github.com:samzhangjy/samzhangjy.github.io.git master

cd ../client

# Delete the dist folder
rm -rf ./dist

git checkout master
