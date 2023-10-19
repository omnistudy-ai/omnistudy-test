# OmniStudy Web Application

This directory will hold all files that are associated with the application part of the platform.  

The file structure is as follows:

```
app
⌙ components
    ⌙ [ComponentName]
        ⌙ [ComponentName].tsx
        ⌙ [ComponentName].css
    ⌙ ...
⌙ tools
    ⌙ [FeatureName]
        ⌙ [ClassName].ts
        ⌙ ...
    ⌙ ...
⌙ README.md
```

## Components
The components directory contains other directories associated with a specific component. Each subdirectory will be named after the containing component that it holds. Inside this directory, there will be a .tsx and a .css file with the same name as the component. Components in React are re-usable building blocks that construct the User Interface.  
* .tsx files: Represent JSX, in the Typescript language which is a hybrid between JavaScript and HTML
* .css files: Used for styling the UI of the webpage

## Tools
The tools directory will contain any Typescript classes and utility functions that may be used throughout the webpage. Using an OOP approach to creating a webpage may seem out of the ordinary but it is important to creating a robust, scalable platform.
* .ts files: similar to .java or .cc classes, they can be used to create classes in Typescript