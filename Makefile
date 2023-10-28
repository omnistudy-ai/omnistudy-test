owen_start:
	git checkout -b owen
	git checkout owen

owen_push:
	git add *
	git commit -m "$(msg)"
	git push -u origin noah
	git checkout main
	git branch -D owen