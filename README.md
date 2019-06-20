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
* add little triangle next to sort button to show that it's a dropdown list
* form validation! require the 'name' field to not be empty
* add fields for group metadata (notes & name)

## June 16 
* update POST request handler - now the form is fully functional!! took a
  while to get the mysql queries and JSON request body working together
* set up routing for the whole app as of right now

#### Lessons
* maintaining immutable objects is so important. `Object.assign` is great
* use `mysql.escape()` when using template strings instead of passing query
  variables as an array argument
* lots of risks surrounding sending multiple mysql queries in one POST
  action but I settled on doing it anyway while being careful to
  thoroughly sanitize the input

## June 17
* refactoring lotsa code!
* api route for image upload
* successfully set up image upload field in form + working POST endpoint
* huge style overhaul based on AI mockup. new fonts Apercu / Souvenir / Styrene
* update create-recipe main form to include image upload

#### Notes
* starting to wish I could use `assert()` in node/react like we did in C/C++.
  must be a good sign. will add testing suite when this project starts to get
  more robust

#### Lessons
* React Memos! quick optimization trick for stateless functional components
* Fragments to forgo wrapper div tags
* react DevTools will look like it's re-rendering components a lot if they're
  wrapped in `connect()` for Redux purposes. Quick check using the profiler
  tools will show what's really being re-rendered.
* Formidable dislikes body-parser. Also, instead of finagling with having
  multiple forms or multiple submit buttons within a form, set an onChange
  event listener on the file upload input tag. headache resolved.

## June 18
* update main createrecipe API endpoint to upload image paths to database
* add image table to database
* fix bug where tabbing through the form causes buggy undefined behavior.
  it was because the "delete ingredient" button had an activated tabIndex
* fix bug that allowed unvalidated form to send
* clear input fields on successful submit, including image input
* after adding new recipe, re-fetch & update the RecipeList!
* fix bug that sent empty groups/ingredients to DB if recipes.name existed
* add status (success/fail) to create recipe form.
* fix bug in API where sort order wasn't applying correctly (hadn't been
  using ASC or DESC keywords in query)
* optimizing selective loading in RecipeInfo
* RecipeInfo image loading!!!!!!!!!!!!
* change -70- to ~~70~~!! cute hidden feature
* fetch selectedRecipe if it's not already in the list
* fix buggy behavior: when you change sort method, sometimes RecipeInfo panel
  hides the recipe name title.

#### Lessons
* as always, setState() gotchas with multiple calls and its async nature
* it's really fun to get to this point in a project. There is so much to do,
  so many little things to tweak. It's the first time I get to really
  interact with such a big project and it is genuinely exciting to look at
  what I've done so far and what I've got left to do. I love that I never stop
  find little things I want to change and add and improve.

## June 19

* fix a huge bug that was causing lots of related problems when selectedRecipe
  was updated for various reasons. for some reason when changing the
  sortMethod, the selectedRecipe tended to change unpredictably. Fixed the
  problems by checking the parts of the code that were changing selectedId
  and selected, and replacing them with redux functions that interacted with
  the store instead (as it should have been from the start). also added
  a quick change to shouldComponentUpdate in RecipeInfo and set it up so that
  there isn't any annoying flashing when the sortMethod is changed.

#### Lessons
* don't mix update logic for redux store and component state. if you're using
  redux state in a component and need to update it even for a second, always
  always make reducers/actions for that instead of leaving it in component
  state. In particular, my big mistake was updating some parameters inside
  `index.js`'s `mapStateToProps()`. I wanted to update selectedId (a redux
  variable) using the url parameters, and had done that inside that function.
  Big mistake. Call dispatch functions inside the actual component to do
  that work instead.

## To Do Notes - Immediate

* "add new recipe" button only active around text, not colored div
* routing - when loading an url for a recipe that's not in the "most recent"
  list (and thus not loaded yet), what to do? make new View for this?
* change document titles according to page
* change error message for "load more" to "no more to load" when there 
  is no more to load
* testing with Jest
* "baking" vs "cooking" filter
* drag to change ingredient order
* imperial / customary change! --> is this really necessary?
* favicon
* add maximum number of ingredients & ingredient groups (just in case)
* FUN feature: color picker to choose a theme (replace --key-red in CSS) -
  forest green! etc.

## General Workflow Plan

* ~~planning~~
* ~~set up db~~
* ~~fetch list of recipes~~
* ~~view details about recipe~~
* ~~form to add new recipe~~
* UPDATE form to edit pre-existing recipe
* DELETE api routes & interface within UPDATE form
* image handling (CRUD for images per recipe)
* search functionality
* ~~routing~~
* login / auth
* i18n with i18next & react-i18next
* responsive styling for mobile screens
* graphics / illustrations
* deploy to web
* set up demo page 
* mobile dev with React Mobile
* deploy to iOS App Store
* AI/OCR to scan in handwritten notes & automatically input them

## List of Potential Graphics
* something under the "add a new recipe" header in /addRecipe
* 404 page
* landing page - demo / sign up / login buttons
* select a recipe! view
