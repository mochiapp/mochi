CMD1="
git config --global core.sshCommand \"ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no\"
secsepoch=\"$(date +"%y").$(date +%m).$(date +%d).$(date +%s)\"
cd $1
rm -Rf dist
git clone $2 dist
yarn build
cd dist
sed -i -e \"s/==GLOBAPPVERSION==/\$secsepoch/g\" index.html
git add .
git config --global user.name "$3"
git config --global user.email "$4"
git commit -am \"Build \$secsepoch\"
git tag -a \$secsepoch -m \"Build \$secsepoch\"
git push -u origin master
git push origin --tags
ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -A -t -p $5 $6 \"cd $7 && git init && git remote add origin $2 ; git config core.sshCommand \\\"ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no\\\" && git pull origin master && git fetch --tags --force\"
read -p \"Press enter to continue\"
"

echo "Launching..." ; vagrant ssh -- -t "bash -c '$CMD1'"