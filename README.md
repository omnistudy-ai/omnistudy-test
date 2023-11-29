# OmniStudy Project - Google Developer Students Club

## About The Project
During this semester, we will be utilizing Google and other third-party technologies to build a state of the art AI study, learning, and education tracking platform. We will develop this project as a web application open to all to make studying and learning in academic settings easier, more efficient, and overall more exciting.

## Meet The Team
* Project Manager: Jamison Grudem (grude013@umn.edu)
* Frontend Developers:
    * Owen Kanzler (kanz3750@stthomas.edu)
    * Noah Schlorf (schlo348@umn.edu)
    * Abbaas Mohamud (moha1747@umn.edu)
* Backend Developers:
    * Alec DuVall (duval120@umn.edu)
    * Konrad Trestka (trest017@umn.edu)
    * Braydon Higgins (higgi567@umn.edu)

## Project Features
* Static Informational Website
* AI Listening
* Assignment Assistance
* Textbook Upload Feature
* Quiz Generator
* Flashcard Creator
* AI-Powered Summaries
* Assignment Tracking
* Course Scheduling

## Setting Up Your Local Environment
1. Gaining access to the code  
    a. If you are just getting started, clone the repo
    ```sh
    git clone https://github.com/omnistudy-ai/omnistudy-test.git
    ```  
    b. If you already have a previous copy of the code, pull the latest version
    ```sh
    git pull
    ```
2. Install the dependencies in the client/functions folder
    ```sh
    cd client
    npm install
    cd ..
    cd functions
    npm install
    ```
    OR
    ```sh
    make install
    ```
3. Run the application
    ```sh
    cd client
    npm start
    ```

## Making Changes
Before making changes, but after pulling, switch to a new branch titled with your name:
1. Display your local branches
    ```sh
    git branch
    ```
2. Switch off the main branch
    * If this branch was shown when running the above command, simply use the checkout command to switch to that branch:
    ```sh
    git checkout <your-name>
    ```
    * If the branch does not exist locally, create it and switch to it:
    ```sh
    git checkout -b <your-name>
    ```
3. Make your changes
4. Add your changes to the staging area
    ```sh
    git add .
    ```
5. Commit your changes
    ```sh
    git commit -m "<your-commit-message>"
    ```
6. Push your changes to the remote repository
    ```sh
    git push -u origin <your-name>
    ```
    * If you receive an error stating that origin does not exist, run the following command:
    ```sh
    git remote add origin https://github.com/omnistudy-ai/omnistudy-test.git
    ```
    * Then, try pushing again

* If your pull request has been merged, delete your branch locally, pull the changes into your local main branch, then create a new branch again to use updated code.
    ```sh
    git checkout main
    git branch -D <your-name>
    git pull
    git checkout -b <your-name>
    ```
## Alternative Making Changes Method
1. Ensure you are on the main branch
    ```sh
    git checkout main
    ```
2. Pull the latest changes
    ```sh
    git pull
    ```
3. Run the makefile command to initialize making changes on your branch
    ```sh
    make <your-name>_start
    ```
4. Make your changes
5. Run the makefile command to stage, commit, push your changes, and then switch back to the main branch (deleting your specific branch locally).
    ```sh
    make <your-name>_push msg="<your-commit-message>"
    ```
## Testing Your Code
I have provided the necessary team members with a .env file that contains all of the proper API keys to use the Firebase platform to test your code. I am going to be creating a guide to use the local Firebase emulators soon and provide you with mock data to use for testing. For now, continue as normal.

====================================IMPORTANT====================================  
* PLEASE DO NOT MERGE ANY BRANCHES OR CONFIRM PULL REQUESTS ON THE github.com WEBSITE. I WILL BE HANDLING ALL OF THAT. IF YOU HAVE ANY QUESTIONS, PLEASE CONTACT ME.
* PLEASE BY ANY MEANS DO NOT PUSH THIS .env FILE TO THE PUBLIC GITHUB REPOSITORY. THIS FILE CONTAINS SENSITIVE INFORMATION THAT SHOULD NOT BE SHARED WITH ANYONE OUTSIDE OF THE TEAM.
