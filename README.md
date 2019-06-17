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

## June 8
* set up API route and working form for POST request (only updates `recipes` 
  table)

## June 10

* minor update to package.json for security purposes

## June 11

* organized form into Field and IngField components while managing 
  communication between these new subcomponents and the main form component
* really clean UI UX!! 
* finished implemented complicated logic for adding ingredients, with the 
  automatic adding/removing of fields 

### immediate to do
* `notes` field for ingredients
* bare bones form validation (must have name, 1 ingredient, check input length)
* add ingredients to POST request (remember to put everything in one group 
  for now and update `group` table too)

#### features that would be great
* last ingredient field's placeholder says "click to add another ingredient"
* drag and drop ingredients to change order 
  (probably gonna be really long task without external library support)
* delete individual ingredients (button shows up when fields are focused)
  (easy if they are always there - no fancy appear/disappear)
* drag to group? some intuitive way to group the ingredients? 
  or just a new field "group"? (color code the groups?)
* grouping idea: "add new ingredient group +" button below the first field.
  on click starts with one ingredient, and same happens (new "add new 
  ingredient group" button shows up). adds massive complications to 
  react structuring, but probably pretty good in terms of usabiity
  ask mom what might feel intuitive for her
* tool tips ("groups are a handy way to remember which ingredients go
  together!")

#### Lessons
* GOD forms are such a pain in the ass
* sometimes React feels really tough because I don't always know when to 
  separate things into different components
* common pattern for passing data from child to parent - passing handler funcs
* HUUGe difficulty with dynamically setting an event handler (onFocus) for the 
  last child of a div inside the DOM. My goal was that whenever the user
  clicked on the last ingredients input fields, a new set of fields would
  automatically appear under it, so that they didn't have to keep clicking 
  some kind of "add" button to continuously input all of the ingredients. 
  although there are some antipattern ways to do it (`ReactDOM.findDomNode`)
  I wanted to find a method to do it programmatically, since maintaining ID #s
  for each ingredient is necessary elsewhere anyway. 
* React will re-render, just in case, any children components when the 
  parent component is re-rendered. let children components `extends 
  PureComponent` instead of `extends Component` and then it will only 
  update when there is a change in the state or props of the child component.
  don't do this with child components that use arrays/objects as props/state
  because the comparison done by PureComponent is shallow.

## June 12
* `notes` field for ingredients

## June 14
* (started) with adding groups - new component "inggroups"

## June 15
* each ingredient group updates the ingredient list & passes it back to 
  the main form
* remove ingredient with button
* use Feather Icons by Cole Bemis for UI icons
* form validation! require the 'name' field to not be empty
* add fields for group metadata (notes & name)

## June 16 
* update POST request handler - now the form is fully functional!!
* set up routing for the whole app as of right now

#### Lessons
* maintaining immutable objects is so important. `Object.assign` is great

## June 17
* refactoring lotsa code!
* api route for image upload
* add image component to form

#### Notes
* starting to wish I could use `assert()` in node/react like we did in C/C++.
  must be a good sign. will add testing suite when this project starts to get
  more robust

## General To Do Wflow

* ~~planning~~
* ~~set up db~~
* ~~fetch list of recipes~~
* ~~view details about recipe~~
* ~~form to add new recipe~~
* form to edit pre-existing recipe
* image handling (CRUD for images per recipe)
* search functionality
* ~~routing~~
* login / auth
* i18n with i18next & react-i18next
* responsive styling for mobile screens
* deploy to web
* set up demo page 
* mobile dev with React Mobile
* deploy to iOS App Store

## To Do Notes

* change document titles according to page
* change error message for "load more" to "no more to load" when there 
  is no more to load
* add little triangle next to sort button to show that it's a dropdown list
* testing
* sort
* ~~group Names & labels.~~
* ~~"load more" ingredients list~~
* "baking" vs "cooking" filter
* ~~MOVE INGREDIENT FETCH FUNCTION - DONT RE-RENDER MULTIPLE TIMES~~
* image handling
* drag to change ingredient order
* imperial / customary change! --> is this really necessary? 
* favicon
* page titles