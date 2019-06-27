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

## June 20 - 23

* spent three whole days trying to fix this ridiculous bug where first 
  ingredient of all of but the first ingGroups were being tied logically
  (changing one also changes the other) in NewRecipeForm. Fixed a lot of
  state/props that hadn't been properly reassigned after the modularization of
  RecipeForm - making sure props were only being used to initialize
  component-managed state, making sure component state was being maintained,
  etc. The fixes didn't solve the huge bug, but they definitely were
  necessarily fixes that would have caused other problems down the line.
* looked into adding testing suites to the project. 

#### Lessons
* Good practice: Don't set state using props unless you're only initializing
  state using props.
* The huge bugs were caused by trying to reform an already fully functional
  NewRecipeForm into a base form component, RecipeForm, and change the
  NewRecipeForm into a parent component that gives props to RecipeForm. This
  was so that I could reuse the form component for EditRecipeForm, since
  a lot of the functionality - particularly, state management within IngGroups
  and IngFields etc - would stay the same. But the reorganization/refactoring
  process caused a lot of little errors and a lot of big errors. Obviously
  as abstraction was increased the data structures became a lot more complex,
  which would have been true regardless of whether I started with the
  structure or reorganized it the way I did. So the added reorganization
  process just introduced a lot more problems to an already complex issue.
  Looking forward, more thorough planning and sketching out could have helped
  avoid this issue.

## June 24

* fixed huge bug. Turns out it was caused by not properly updating the 
  ingredients[] state inside RecipeForm's `onAddGroup()`. So basically this was
  an exercise in walking through all the teeny parts of the codebase. Fun. 
* switch nodejs mysql package from `mysql` to `mysql2` because the former
  will unconditionally replace all ?'s with query parameters (or a big fat
  NULL if you don't provide one) regardless of whether the ?'s are inside
  string literals. Really annoying!
* add an "edit this recipe" button above RecipeInfo's main content
* fix - "add new recipe" button only active around text, not colored div
* add API endpoint for updating recipe records
* update structure & fetch logic for the forms. some bugs remain in the
  update logic.
* all of the React logic uses camelCase 'groupId' instead of snake-case.
  Consolidated since things were super messy - bAd!!

## June 25

* fixed bug that caused lots of unexpected behavior when, in EditRecipeForm,
  a user deleted all ingredients of a group. Fixed it by adding a new method
  `onRemoveGroup()` and making sure that groupIds are renumbered whenever that
  happens.
* make sure that each form gets custom status messages ("your recipe has been
  updated" / "your recipe has been added").
* add new API endpoint: deleteRecipe.
* add new component: deleteRecipe. add nav buttons to the component. UI colors
  on cancel/delete buttons to guide user action. entire thing successfully
  implemented.

#### Notes
* "the recipe has been deleted successfully" notification doesn't really
  display at the moment because right after deleting, the window redirects
  to the home page, and the status messages only show up within the Delete
  component right now. Fix would be to add status message to redux so that
  any component can go and change it, but I haven't done it yet.

#### Lessons
* watch out for when using indices as keys in lists! Obviously, very important
  (since React uses them in its reconcillation algorithm). I had used indices
  for the IngGroup collection previously, but since I'm now reindicing the
  groups, I needed to keep a separate index (`elemId`) that live and die with
  each group to use as the keys. `groupId`, on the other hand, is used to tie
  the groups and ingredients together. Also, needless to say, unstable keys
  like `Math.random()` is really bad for things like input fields, since
  the fields end up re-rendering after every keyDown.
* This whole project is becoming more and more complex. The data structures
  are starting to feel hard to manage. If this project has taught me anything,
  it's that there are very real reasons why people go on about modularity and
  single point of truth. And why some people are so eager to use Typescript
  with their React projects. I've obviously had to chase through miles of code
  looking for bugs before, particularly in comp40, but it's just another thing
  with this codebase. So many places where information changes hands, and gets
  mutated one way or another, recommunicated to other pieces, and on and on.
  The bug search just gets extended by days and days without having strong
  PropType declarations and all that.

## June 26
* added filesystem image deletion into API DELETE recipe endpoint.
* link up delete images endpoint with delete component.
* clickable title links to index ('/')
* recipeInfo redesign - cleaner, more consistent styles with really nice
  display for group notes & group name! :)

## June 27
* fix bug that caused page reload on image upload

## To Do Notes - Immediate

* reload selectedRecipe on update - notes, name, & size won't update since
  it is "cached"
* show uploaded images as thumbnails on EditRecipeForm (and NewRecipeForm?)
  & allow user to mark them for deletion
* editRecipe warning on navigating away from unsaved changes
* show 404 whenever a user navigates to /anypath/:nonexistentId.
* add page for index
* add page for selectedId == -1.
* (elaborated in Jul 25 Notes) - add notification field to Redux Store
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
* ~~DELETE api routes & interface within UPDATE form~~
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
