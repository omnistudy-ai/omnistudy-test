# Create and switch over to new branch: noah
noah_start:
	git checkout -b noah
	git checkout noah
	git pull origin main
# Stage, commit, and push changes to branch: noah
noah_push:
	git add *
	git commit -m "$(msg)"
	git push -u origin noah
	git checkout main
	git branch -D noah

# Create and switch over to new branch: owen
owen_start:
	git checkout -b owen
	git checkout owen
	git pull origin main
# Stage, commit, and push changes to branch: owen
owen_push:
	git add *
	git commit -m "$(msg)"
	git push -u origin owen
	git checkout main
	git branch -D owen

# Create and switch over to new branch: jamison
jamison_start:
	git checkout -b jamison
	git checkout jamison
	git pull origin main
# Stage, commit, and push changes to branch: jamison
jamison_push:
	git add *
	git commit -m "$(msg)"
	git push -u origin jamison
	git checkout main
	git branch -D jamison

# Start react app client
start_client:
	cd client && npm start