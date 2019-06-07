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
* currently have CORS enabled on API for local development. 
  take care when setting up production version
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

## June 2

* change database schema - groups now listed in Recipe_ingredients table
* create new fields Create_Time and Update_Time to sort by

## June 3

* changed recipe fetching mechanism to accomodate a "load more" scheme 
  where items are loaded chunk by chunk

#### Notes
* give some kind of UX response when there are no more items to load
* set up a group structure
  * groups should be labeled A, B, C..
  * names & notes fetched with separate call to database
* restructure dom!!! calling render() unnecessarily

## June 4

* totally restructure all of the modules in order to reduce React DOM 
  reconcillation (re-rendering). took so much time. 
* along with that, reorganize modules so that both RecipeInfo and RecipeList
  are called by RecipeIndex. to help ease possible headaches with routing 
  further down the line. 
* much more thorough error checking, loading checking, etc. 
* add support for displaying group notes and group labels.

#### Notes
* first thing tomorrow - code clean up. separate RecipeInfo into smaller parts
* more thorough checking for loading
* more thorough typechecking with PropsType
* add API support for sorting, then finally move onto POST requests
* react dev tools - GREAT new tool for developing in chrome. see when 
  components are being re-rendered. 

## June 5

* started trying to implement re-sorting. lots and lots of problems with
  the way the RecipeList fetching is implemented right now - probably need to 
  set up new redux actions for fetching a totally new list vs fetching the
  next pieces of a list that's already been loaded. 
* started setting up form for creating new recipe. will be a delicate endeavor
  trying to update two tables in the database at once & set up the form so that
  adding new ingredients & grouping them if necessary is painless and 
  intuitive. 
* committed partial changes for now. 

## June 7

* fully implement sorting! manually tested edge cases, but it needs to be
  done more comprehensively for the whole app 
* accordingly, new actions/reducers were added
* code refactoring 

#### Lessons
* only use embedded jsx expressions or variable assignment for conditional
  rendering - to reduce unnecessary unmounting



## To Do
* add little triangle next to sort button to show that it's a dropdown list
* testing
* Routing! react-router
* sort
* ~~group Names & labels.~~
* CSS for mobile 
* ~~"load more" ingredients list~~
* "baking" vs "cooking" filter
* ~~MOVE INGREDIENT FETCH FUNCTION - DONT RE-RENDER MULTIPLE TIMES~~
* add CRUD operations to API? 
* image handling
* drag to change ingredient order
* imperial / customary change! --> is this really necessary? 
* search functionality
* i18n with i18next & react-i18next
* React Native export