noah_start:
	git checkout -b owen
	git checkout owen

noah_push:
	git add *
	git commit -m "$(msg)"
	git push -u origin noah
	git checkout main
	git branch -D noah