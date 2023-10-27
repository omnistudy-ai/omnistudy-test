jamison_start:
	git checkout -b jamison
	git checkout jamison

jamison_push:
	git add *
	git commit -m "$(msg)"
	git push -u origin jamison
	git checkout main
	git branch -D jamison

owen_start:
	git checkout -b owen
	git checkout owen

owen_push:
	git add *
	git commit -m "$(msg)"
	git push -u origin owen
	git checkout main
	git branch -D owen