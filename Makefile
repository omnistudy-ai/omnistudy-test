# Run this script after every time you pull
install:
	cd client && npm install
	cd functions && npm install

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

# Create and switch over to new branch: abbaas
abbaas_start:
	git checkout -b abbaas
	git checkout abbaas
	git pull origin main
# Stage, commit, and push changes to branch: abbaas
abbaas_push:
	git add *
	git commit -m "$(msg)"
	git push -u origin abbaas
	git checkout main
	git branch -D abbaas

# Create and switch over to new branch: konrad
konrad_start:
	git checkout -b konrad
	git checkout konrad
	git pull origin main
# Stage, commit, and push changes to branch: konrad
konrad_push:
	git add *
	git commit -m "$(msg)"
	git push -u origin konrad
	git checkout main
	git branch -D konrad
	
# Create and switch over to new branch: alec
alec_start:
	git checkout -b alec
	git checkout alec
	git pull origin main
# Stage, commit, and push changes to branch: alec
alec_push:
	git add *
	git commit -m "$(msg)"
	git push -u origin alec
	git checkout main
	git branch -D alec

# Start react app client
start_client:
	cd client && npm start
