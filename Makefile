noah_start:
	git checkout -b noah
	git checkout noah
	git pull origin main

noah_push:
	git add *
	git commit -m "$(msg)"
	git push -u origin noah
	git checkout noah
	git branch -D noah