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
  the fields end up re-rendering after every `keyDown`.
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


## June 28 - July 1

* break to work on essay for scholarship foundation

## July 2 - 3

* started a new branch to try and fix huge bug - page keeps reloading on
  image upload, despite using preventDefault()

## July 4

* finally figured out the bug! It took me a while but it was right there
  all along. For some reason, I had been choosing to fetch/dynamically import
  the images in React using the local paths where Express was uploading the
  images.... instead of making Express serve the images. Very dumb! And I
  was wondering why React kept "live reloading" the page. Using hints from
  [here](https://github.com/facebook/create-react-app/issues/2541) and
  [here](https://stackoverflow.com/questions/51488646)
  I finally figured it out. Man, it took me days! And I had been doing it
  super wrong since before this project - even with meguna.co, I was struggling
  to figure out the right way to handle images with a tech stack like this.
  Another day, another lesson.
* FULLY IMPLEMENTED image upload / image delete / image update in RecipeForm.
  As in, show uploaded images as thumbnails on both versions of RecipeForm
  & allow user to mark them for deletion
* add new API endpoint - `deleteImageWithPath`
* add image view to RecipeInfo
* make sure max image count reflects # of images already uploaded (NOT TESTED)
* fix bug where trying to add an ingredient to a recipe that was saved without
  any breaks. fixed it by making sure that when fetched groups and fetched
  ingredients were empty arrays, they were replaced with initialgroups and
  initialingredient arrays instead.
* add broken image fallback in the API (404 image)
  [reference](https://blog.imagekit.io/how-to-handle-loading-images-that-may-not-exist-on-your-website-92e6c3c6ea63)
* add `match` to proptypes
* don't show dotted line above first group if there is only one group or
  if there are no ingredients
* show message if no ingredients are saved for a recipe.
* add landing page / `selectedId == -1` component called NoSelectedRecipe.

#### Lessons

* any time you're trying to dynamically import images in React, you're
  probably doing it wrong. You probably need to serve the images from a server
  instead.

## July 6
* reload selectedRecipe on update - notes, name, & size won't update since
  it is "cached"
* change StatusInfo to a format where a message prop and a status prop is
  passed
* set up a new StatusInfo that gets updated globally through redux variables
* change location to correct page after update/create form
* fix NewRecipeForm so that it sets selectedId === -1 when it mounts.
* make sure that recipeInfo panel updates after an user edits a recipe
* little fix - making sure page redirects to index if selectedId == 1.
  Since NoSelectedRecipe is already wired up to the index, I just have
  to redirect the page to display it.

#### Notes
* ...after all this I'm now thinking I don't need these notifications. 
  I feel like if the user is shown the finished display of the recipe they
  just edited or created, then it's pretty evident that it worked well.
  I guess it would be more useful if the update failed.
* So I've decided to keep the notification only for the fail case.

#### Lessons
* it is an anti-pattern to attempt to unmount a component on command. Instead,
  control whether that component is created by its parent or not. Setting up
  the notification div that disappears after a set interval was a little
  tricky but what I ended up doing was: have two components, StatusInfo and
  StatusInfoLogic. SI is the parent of SIL. SI only gets mounted whenever
  it's passed props that are not empty strings. When SI mounts, it changes
  a state variable after a delay. This variable toggles whether or not SIL
  is mounted or not. I found that this was the cleanest way to handle this
  timeout structure, outside of permanently having an empty place in the UI
  to display notifications. Since I was going for a "flash on top of the
  existing UI for a moment" look, this was probably the best way. 

## July 7

* add Error Boundary component for RecipeInfo

#### Lessons
* how to write error boundaries & how to integrate them into 
  [react-router](https://stackoverflow.com/questions/49130876)

## July 8
* add Error Boundary component for RecipeList
* more robust error handling with fetch requests - using response.ok
* add Error Boundary for entire app

## July 12
* initial Auth0 set up
* new branch to test auth stuff

## July 13
* working with Auth0's Lock.js

## July 14
* successfully set up login popup

## July 15
* research and testing more auth stuff

#### Notes
* Although an Auth0 writer sets up 
  [an example](https://www.sitepoint.com/redux-authentication-auth0/)
  where he saves `id_token`s in `localStorage`, it's discouraged practice
  on the [Auth0 docs](https://auth0.com/docs/security/store-tokens). My
  final decision is that it's better than the alternative, which would be to
  [store](https://dzone.com/articles/cookies-vs-tokens-the-definitive-guide)
  store the information as cookies. Since it seems like I only have to worry
  about 
* I still will be moving forward with the Lock.js implementation that I put
  together last time. Although the Auth0 SDK - React set up guide seemed
  pretty great, I felt like I didn't understand what was going on at all since
  everything is wrapped up in the little prewritten functions. Also, I wanted
  to use Lock.js intead of Universal Sign In.
* new Plan: use Firebase Auth instead. I will still have to make and send
  my own JWT cookies to the Express server (since I'm keeping that as is
  instead of using Firebase's DB) but the firebase server keeps a track
  of the sign in. I think. 
* actually, new new plan: DON'T use lock at all, don't migrate to firebase.
  Create a custom UI with Auth0.js (instead of lock) and provide the Auth
  information using Context API or Redux or something like that. So in essence
  it'll be what I was looking at doing with firebase, but with Auth0.
  Took me a while to actually see what options I have and how a lot of those
  options look similar regardless of the 3rd party service I choose to use.
* persisting user login seems simple enough with any 3rd party service because
  their internal servers manage the token expiration and things like that.
  This is something I did not realize when I started reading about auth.

## July 16-20
* add Auth functions (login, logout, silentauth, getter/setter funcs) to
  redux store
  * make sure that once logged in, you stay logged in after navigating away
* add Login component & route
* add Logout component & route
* add login.logout button
* configure Auth0
* add Auth component that communicates with Auth0
* add ProtectedRoutes (routes that redirect to `/login` if not logged in)

#### Notes
* lots of testing, trial & error, shifting around code and reading docs.
* final auth configuration that I've settled on:
  * Rely on both Lock.js and Auth0.js to handle most of the actual auth
    heavylifting. I wanted to use solely Auth0.js and combine it with a custom
    login UI, but doing this would be questionable security wise, according to
    the docs. The one way would be to use "Resource Owner Password Grant" flow.
    This requires that my UI implementation be absolutely foolproof so that
    passwords don't get stolen and I figured it wouldn't be great to take the
    chance. Whatever.
  * Use both Redux and Authentication component that exports a singleton
    instance of an auth0client. I didn't want to involve redux in the whole
    thing because it would make the app more complex, but I realized that the
    authentication functions I was writing were really editing things that
    belong in global state (`isAuthenticated`, etc). Another reason why
    I need to buffer the functions through Redux is that the components don't
    have a way to listen for changes in the `Auth0Client` object so displaying
    dynamic UIs based on async functions is impossible. So now my rule is that
    the Redux functions remain the single source of truth for my React
    components (with regards to authentication information), and the
    Auth0Client singleton is the single source of truth for the Redux
    functions.
* Looots and lots of headaches on this one. Took me days just to get through
  the non-API part of this authentication journey (to be fair, it took me
  a day or two just to realize that handling the API was a separate task from
  the general login/logout thing).

#### Lessons
* according to Dan Abramov: presentational components shouldn't be aware of
  redux state and should instead have those params passed through by
  container components. Makes sense.
* I feel a lot more comfortable writing Promises now. I've used them a lot in
  up until now but I didn't write them that often. Today I had a moment when
  I was trying to write a Auth0Client class function that would take a
  callback parameter and execute it after handling some async operations and
  I was like... why didn't I immediately think to use a Promise?
* After putting so many hours into this project, I have such a better 
  appreciation for the broad coding principles that we were taught in class.
  They really show their power when you have a big complicated thing in front
  of you and you really wished that you had thorough testing so the debugging
  would not be totally impossible. I mean, it already made sense in class, and
  there were definitely times where combing through the code was really tough,
  but it really does not compare with something like this. I'm really starting
  to see their importance. I never thought of their role in real big apps
  that big corporations provide, but if you put it that way they probably save
  lives. Reminds me of that [article in the Atlantic](https://bit.ly/2nc3OkU)
  about how programmers aren't really engineers.

## July 21
* Add a `/welcome` route & component. This will hold Demo, Sign Up, and
  Sign In buttons. Users not logged in will be redirected here if they try
  to access a protected route.
* troubleshoot problems with auto-login after signing up. Seemed to be an
  issue with the Lock.js options that I had configured (?) 
  [Reference](https://bit.ly/30JDCi3). Add separate functions for the login
  popup and the signup popup.

## July 22
* successfully implement first authenticated API route!! Woo hoo!
* add LoadMoreButton to RecipeList. shows "loading" while performing silent
  auth and "load more" otherwise.

#### Notes
* I had a lot of difficulties figuring this out. I even posted on the Auth0
  help forum (although I figured it out before I got anything back from it).
* The first problem: I call the external API from various components'
  `ComponentDidMount`, such as `fetchRecipe` from `RecipeIndex` or
  `fetchSelectedRecipe` from `RecipeInfo`. All of these fetch calls, once
  the auth stuff is set up, would require that an access token has already
  been granted by the auth0 server. Now, the app calls `checkAuthStatus()`,
  which silently signs in the user if they had already logged in recently,
  and this is the function that grabs the access token and makes it available
  for the other functions. My problem was that I didn't have a way to
  guarantee that `checkAuthStatus()` would definitely finish running before
  each component starts calling their fetch functions. In which case those
  fetch functions would need to call `checkAuthStatus()` themselves to get
  the token. 
* The solution: I decided that once logged in, the only fetch call that's
  immediately necessary is `fetchRecipes()`. The other ones are usually
  triggered by user action such as clicking on 'load more recipes' or 'edit
  this recipe' or something like that. So I had App.js call checkAuthStatus
  and then after that fetchRecipes. Of course, there is the race problem
  of the user clicking on things (and thus triggering other fetch calls)
  before the auth process is complete. I don't know what I would do in that
  case - perhaps disable links until it's done? Idk.
* Next problem: I was really uncertain about how to generate a JWT access token
  for the custom API that I had set up in Auth0 while at the same
  authenticating the user through the Auth0 Auth API. The problem seemed to
  be in the `audience` parameter of my `auth0.webAuth` setup. If I set it to
  https://myauth0domain/userInfo, it overrode consent requirements and didn't
  give me errors but gave me an opaque string instead of a proper JWT as the
  access token. The Auth0 forums told me that to solve this I needed to set
  `audience` to my custom API audience. So I do that, and now I get a
  `consent_required` error. Auth0 forums tell me that, to solve this problem,
  I need to set the `audience` to the `userInfo` endpoint that I had been 
  using. So it's a circular problem.
* The solution: After stumbling on a [guide](https://bit.ly/2y4fqdW) in the
  official Auth0 docs about access token formats (which didn't really come up 
  on google through out my multiple-day quest to figure this out, for some
  reason), I found out that I _definitely_ needed to set `audience` to my
  API audience, but the consent problem still persisted. What I ended up
  having to do was edit my hosts file so that http://mff.meguna.co:3000
  redirected to localhost:3000, and then work "locally" from there instead.
  (Auth0 requires user consent for localhost).
* I still have a decent bit more to do but I'm definitely over the hump since
  I got the main logic working. Now I just need to repeat what I did here
  with other fetch calls and other API endpoints.

#### Lessons
* JWT is pronounced 'jot' (why?)
* opaque string = random string that seems to provide no information

## July 23
* add API middleware called `callApi` that adds authorization headers to
  api calls
* add api authentication to all GET routes
* optimizing api calls & load time! minimizing the number of times the initial
  getToken() gets called and making sure all fetch calls are called _after_
  getting the token.
* more robust error handling with fetch calls. better handling of 
  `login_required` error
* App.js redirects to `/welcome` if unauthenticated.

#### Notes
* Adding authentication/authorization really slowed down the load time of
  the app. Different parts load at different times (RecipeList loads
  noticably later than RecipeInfo). I tried to fix the issue by
  short-circuiting calls to `getToken()` (so that if the token already exists,
  no call to the auth server is made) but it didn't help enough
* gonna refactor code so that any fetch calls that are necessary on first load
  are called in RecipeIndex all at once, instead of individually in RecipeInfo
  and RecipeList. I definitely want to still run `checkSession()` in App.js,
  but I want to separate out the initial fetch calls into each route - ie,
  Welcome (doesn't actually need to fetch) / RecipeIndex / Profile. So
  RecipeIndex will call all the recipe fetch calls once it's ready, as
  determined by App.js
* so what I ended up doing was call fetchRecipes() in RecipeIndex and
  call the other individual getIngredients(), etc in RecipeInfo (since I
  needed the route params to call the functions).

## July 24 - 28
* Fixed (? see below) problem where authentication was loading indefinitely
* Fixed some routing & redirect issues with App.js

Notes
* I was having a big problem where an auth0 request would just be loading
  indefinitely and I had no idea why. I asked around on the forum, to no avail,
  and now it's been a few days trying to figure it out and the problem just
  disappeared. Huge mystery. I don't know what's going on but I'm moving
  forward for now. Will be really annoying if the problem reappears. Hopefully
  it won't. **NOT SOLVED YET**
* no idea why a successful fetch in checkAuthStatus returns a promise
  rejection (with the correct successful result as the error payload). trying
  to figure it out

#### Lessons
* chrome devtools "Execution Context Selector" (iframes log their shit there)
* chrome devtools - use verbose console logs
* chrome devtools - turn on XHR logs in settings

## July 28
* merge get recipe fetch calls - big efficiency jump
* add Signup component, route, and redux action
* implement callApi middleware for ALL fetch calls that require authentication!
* fix problem i was having with wonky routes (remove `exact` from `/` route)
  lol
* instead of using `selected` object stored in redux, grab notes/name/size of
  recipe in `/recipeinfo` fetch call (since you're already doing that anyway).
  This was a big decision but ultimately it's for the better I think. Cleaner
  and more efficient. Accordingly, I got rid of the `fetchSelectedRecipe()`
  func
* minor style change: title font Souvenir -> Canela
* improved documentation/comments
* don't load page until auth is done
* fix bug in callApi where fetch request options were not being combined
  correctly
* fixes with making sure header stays hidden when navigating to /logout &
  /welcome
* handle expired token (run checkSession if token at hand is already expired)

#### Lessons
* more promises! Today I learned that the `.catch()` method on a Promise is
  the same thing as calling `then(null, errorCallback)`. The implication of
  this is that calling `then(successCb, errorCb)` is not the same as calling
  `.then().catch()` because the latter catches errors in the first `then()`
  as well as errors in the promise itself. [resource](https://bit.ly/2Mh4HFz)
* lots more work with `Object.assign()`. To copy values for nested objects,
  call `Object.assign()` twice - once for the parent and once for the inner
  child object that you want to copy. [source](https://bit.ly/2YaFGCT)
* every `<Route>` component renders *something* - if nothing matches, then it
  renders `null`, if something matches it renders a component. So if the route
  matches multiple `<Route>`s, then all of them render something.

## Aug 1
* add user_id database column
* check that the user calling the API endpoints is authorized to view/edit
  that recipe id! whew
* add Profile component & route. This allows user to view their info
* use `hashids` npm package to obfuscate recipe IDs in all URLs throughout
  the app. Awesome simple solution! Glad I found the package. Used a singleton
  pattern to manage it all. Feel proud of myself
* fixed a bug where changing the sort method to "Last Added" then clicking
  "Load More..." caused the 5th element to appear twice in the RecipeList
  array. This was caused by the fact that "If multiple rows have identical
  values in the ORDER BY columns, [mysql] is free to return those rows in any
  order" [source](https://bit.ly/2KgDBf7). I was unaware of this. Problem fixed
  by just declaring id's as the second ordering rule.

#### Notes
* on adding user authorization to API endpoints:
* My first thought was that I would have to set up functions in the Auth0Client
  singleton that would return the userId, and then send it along on all of my
  fetch calls so that I can check that the logged-in user is authorized to edit
  that specific recipe. This would have been terrible because then I would have
  to convert all of my GETs into POSTs and it just seemed super redundant. I
  had a feeling that there was a better way, but obviously there are a lot of
  situations in web development where there *should* be a simpler or better
  way but there just isn't.
* In this case, though, I was lucky. The better way was this: the checkJwt
  middleware that I had implemented previously (with the help of `express-jwt`)
  in the API actually already sets up the userId in an accessable variable.
  So I just needed to use that inside the API and just modify my mySQL queries.
* I started to write more complex queries (changing simple SELECT WHERE's to 
  INNER JOINS) but then I realized that it was also overly complicated for
  what I was trying to accomplish. So I wrote an express middleware that
  checked if the user was authorized, which would be used solely for
  parameterized routes, and that was that. Feels good to find satisfying
  solutions to code problems.

## Aug 2
* removed "userimages" from image file path for a sense of more security

#### Notes
* I wanted to add hashids to the image file paths but I couldn't find a quick
  and simple way to do it with express-static so I'll leave that for now. I
  think the image paths right now could be better but are ok as is.

## Aug 6
* quick style change - fix root font size (bless rem units!)
* quick fix for redux action - call login() if error in checkAuth()

## Aug 11-13
* develop hero illustrations for welcome page, Cookie (chef character) concept
  and test illustration, food illustrations, etc. Work in progress

## Aug 14
* set up AccountSettings component
* set up modal functionality

#### Lessons
* (CSS) Best way to shade the background behind a modal is to drop in a
  pseudoelement that fills the whole window with black & mid opacity.

## Aug 15
* set up new auth endpoints & functionality to change user's name & email
  address
* finally set up first slide on Welcome page, sans the hero illustration

#### Notes
* Problems with making user's root info reflect identical parameters in
  user_metadata [source](https://bit.ly/2Ze31Uh). Man I hate working with auth0

## Aug 16
* style changes
* delete Profile and replace its route with EditAccount component
* add back name parameter to "sign up" Lock.js configuration

## Aug 17
* implement forgot password
* mood for food --> foodnotes (rip) :(
* fix bug in DeleteRecipe where hashids were not being used in recipe link and
  was causing errors
* consistent font naming ("souvenir" --> "canela")
* make sure that if an ID token used in the authentication expires while the
  user is browsing the page, they are taken to the login page.
* in auth0 settings, set the expiration date for the id tokens to be 7,776,000
  seconds, or about 3 months. Too long?
* fix that old problem I used to have where the chained promises around
  `checkAuthStatus()` would mix up rejections and resolutions really weirdly.
  Not really a proper fix, since I still couldn't figure out what was causing
  the problem, but I rewrote `checkAuthStatus()` so that instead of returning
  a promise, it just executes a callback function passed in as a parameter.
  It solves the problem in that I catch the errors in the right place now, but
  yeah. Idk. Satisfactory, but unfinished.
* start adding translations for EN/JA on most simple UI buttons and such. Set
  up i18next. It's really annoying. [reference](https://bit.ly/2P0qV1u)
* full translations complete for:
  * recipe forms, both new & edit
  * delete recipe page
  * profile page
  * recipe list
  * header

#### Lessons
* learned about React Suspense

## Aug 18
* fix bug that caused EditRecipe to reload to /.
* save language settings from welcome/signup page into user_metadata in
  auth0 database connection.
* load language setting, right after silent authentication, from user_metadata
  and pass to i18next.
* add language setting to account settings. saves to user_metadata and updates
  i18next.
* remove language selection dropdown from authenticated header.
* touched up lots of styling errors in account settings modal.
* fix styles (font weight) in lock.js

#### Notes
* (also documented in Auth.js comments): 
  the user's language preference is stored as "nickname" because
  per auth0 rules, items stored in user_metadata cannot be accessed through
  auth0.js. Basic params like nickname, name, given_name, etc are available
  to access from auth0.js. Since I already do silent authentication with
  auth0.js every time a user navigates to the app, it seems too costly to do
  an operation with the management api every time as well. However, I still
  need to access the language parameter every time the user navigates to
  the app so that I can tell react-i18n which language to use.

## Aug 19-20
* implement recipe search functionality with corresponding redux funcs
* change RecipeList to have a "search mode" boolean. this helps the re-sorting
  dropdown and the search bar, as well as the list of recipes without those
  filters, coordinate.
* finally, hide "load more" button when there's no more to load! (added
  redux store param)
* implemented search's "fetch more" and "fetch" in a way that the client
  doesn't have to call different functions. if an offset value is passed to
  the client function, then it calls "fetch more". Ultimately, of course, the
  client has to determine when to call "more" and when not to, but I think
  this is a cleaner implementation than the non-search fetch implementation
  (which included different functions, "more" and "regular", that the client
  needs to call).

## Aug 22
* adjust styles for HD & MD laptop screens

#### Notes
* quick search is officially done!! This was a quick one.

## To Do Notes - moderate

* back/forward buttons on welcome page shows nothing
* maybe signup/signout shouldnt be on paths but should just be popup windows
* make signup/signout modals closable? what was the reasoning behind making it
  unclosable? there was a reason
* error notifications need to wrap - 40vw (image upload)
* translations not finished for: welcome page (needs to be written)
* handle expired access token
* profile section
  * delete account
  * require verification email to log in, since changing the email address
    doesn't require anything (eg retype password, etc.)
  * reset password flow (as opposed to "forgot password" flow)
* export as CSV functionality
* "baking" vs "cooking" filter, ability to add tags to recipes (csv)
* make sure ingredient names can wrap
* error notifications (ex. file size > 2mb) were not showing up properly
  on recipe image upload form. investigate
* add note on form saying to click on the box to get a new box for ingredient
* convert to styled-components?
* modularize Express API - reference
  [here](http://catlau.co/how-to-modularize-routes-with-the-express-router/)
* refactor reducers - divide into separate reducers & lint code
* editRecipe warning on navigating away from unsaved changes
* show 404 whenever a user navigates to /anypath/:nonexistentId. OR simply
  reload to `/` (current implementation) ? Pros/cons? Always take the option
  that provides more feedback to a user action?
* change document titles according to page
* add maximum number of ingredients & ingredient groups in form (just in case)

## Tasks to consider

* testing with Jest
* drag to change ingredient group order
* favicon
* FUN feature: color picker to choose a theme (replace --key-red in CSS) -
  forest green! etc.

## General Workflow Overview

* ~~planning~~
* ~~set up db~~
* ~~fetch list of recipes~~
* ~~view details about recipe~~
* ~~form to add new recipe~~
* ~~UPDATE form to edit pre-existing recipe~~
* ~~DELETE api routes & interface within UPDATE form~~
* ~~set up error boundary components for: RecipeInfo, RecipeForm, RecipeList,
  and general fallback for entire app~~
* ~~image handling (CRUD for images per recipe)~~
* search functionality
* ~~routing~~
* ~~authentication with auth0~~
* Welcome page
* i18n with i18next & react-i18next
* responsive styling for mobile screens
* graphics / illustrations
* deploy to web
* set up demo page

#### Demo Page Implemenation Plan
* set up user "guest" (password: "guest") in auth0
* on "Try Demo" button click, send user/pass combination to auth0 servers
  automatically and log in as guest (no user interaction required).
* at the same time, generate random username (guest-XXXX) with hashids and 
  store it in redux store. Send a request to API endpoint `/setupguest` that
  populates recipe tables with that username as owner.
* modify the authorization redux actions so that for guest login, the username
  will be identically generated with hashids (?) or passed to the function in
  some way. Make sure that any user interaction with the database will only
  change that specific temporary username's rows.
* show warning ribbon at top of window: "This is a demo. Your changes will
  not be saved."
* When the session ends, log out user and delete rows from table.

#### Additional Goals

* mobile dev with React Mobile
* deploy to iOS App Store
* AI/OCR to scan in handwritten notes & automatically input them

## List of Potential Graphics
* something under the "add a new recipe" header in /addRecipe
* 404 page
* landing page - demo / sign up / login buttons
* select a recipe! view
* 404 image
