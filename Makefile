deploy:
	cd dist
	git init
	git remote add origin git@github.com:CHNB128/Snake.js.git
	git add -A
	git commit -m "deploy"
	git push --set-upstream origin github-page