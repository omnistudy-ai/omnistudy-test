
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

noah_push:
	git add *
	git commit -m "$(msg)"
	git push -u origin noah
	git checkout main
	git branch -D noah
 
 noah_start:
 	 git checkout -b noah
	 git checkout noah