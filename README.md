# Log

Documenting my progress as I move through the project.

## May 17

* planned database schema
* planned features
* planned prelim. design
* set up create-react-app
* started creating mysql database

## May 30

* finished setting up preliminary local database
* added really simple dummy data
* tested fetching data with Postman
* implemented Express API with one endpoint, /getrecipes
* created barebones for RecipeList module
* start implementing Redux
* set up Git repo
* started this log to keep track of tasks & progress and to maintain motivation
* set up redux! stores Selected Recipe and list of Recipes
* preliminary styling: warm red as theme color
* created simple RecipeInfo module to display the selected recipe's info

#### Notes
* currently have CORS enabled on API for local development. take care when setting up production version
* serviceworkers? 


## May 31

* Add method to grab list of ingredients from ingredient database
* populate ingredient database with real information
* updates to styles

## June 1

* establish global color variables in CSS
* Create new group database
* more research & develop list of new features that need to be added
* Add ESLint & Airbnb Style Guide
* went through and linted EVERYTHING!
* started adding functionality for GROUPING ingredients

#### Notes
* currently only support for recipes where ingredients have been grouped
  (not where Group_id column is null). Consider two options: 
  1. revising front end code so that ungrouped recipes are restructured so that
  all ingredients are one group, mimicking group structure. OR 2. make sure 
  that the Group_id field is always filled in on Form input when creating new
  recipe (ie, set default value in mysql table for Group_id to 1). Leaning
  towards 2. With #2, this means that we don't really need Ingredient_Groups
  table? Just put them all in one thing. 

## To Do
* MOVE INGREDIENT FETCH FUNCTION - DONT RE-RENDER MULTIPLE TIMES
* add CRUD operations to API? 
* image handling
* drag to change ingredient order
* imperial / customary change! 
* search functionality
* i18n with i18next & react-i18next
* React Native export