require('http');
require('fs');
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const formidable = require('formidable');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: process.env.DB_PASS,
  database: 'mffdb',
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw err;
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const server = app.listen(3005, '127.0.0.1');
server.timeout = 1000 * 60 * 10;

app.get('/api/static/:folder/:file', (req, res) => {
  const options = {
    root: path.join(__dirname, '/assets/'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    },
  };

  const fileName = req.params.file;
  const folderName = req.params.folder;
  res.sendFile(`${folderName}/${fileName}`, options);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  next();
});

app.get('/api/getrecipes/offset=:offset-sort=:sort', (req, res) => {
  let order = 'DESC';
  if (req.params.sort === 'name') {
    order = 'ASC';
  }
  connection.query(`
    SELECT * FROM recipes
    ORDER BY recipes.${req.params.sort} ${order}
    LIMIT ?,5
    `,
  [+req.params.offset], (error, results) => {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.get('/api/getrecipes/sort=:sort', (req, res) => {
  let order = 'DESC';
  if (req.params.sort === 'name') {
    order = 'ASC';
  }
  const query = `
    SELECT * FROM recipes
    ORDER BY recipes.${req.params.sort} ${order}
    LIMIT 5
    `;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.get('/api/getingredients', (req, res) => {
  connection.query(`
    SELECT * FROM recipe_ingredients
    ORDER BY recipe_ingredients.update_date
    `,
  (error, results) => {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.get('/api/getingredients/:id', (req, res) => {
  connection.query(`
    SELECT * FROM recipe_ingredients 
    WHERE recipe_ingredients.recipe_id = ?
    `,
  [req.params.id], (error, results) => {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.get('/api/getingredientgroups/:id', (req, res) => {
  connection.query(`
    SELECT * FROM ingredient_groups 
    WHERE ingredient_groups.recipe_id = ?
    ORDER BY ingredient_groups.group_id
    `,
  [req.params.id], (error, results) => {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.get('/api/getrecipeimages/:id', (req, res) => {
  connection.query(`
    SELECT * FROM recipe_images
    WHERE recipe_images.recipe_id = ?
    ORDER BY recipe_images.order
    `,
  [req.params.id], (error, results) => {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

/**
 * endpoint for adding a new image to /static/userImages
 * takes: an HTML File object
 */
app.post('/api/addimage', (req, res) => {
  const form = formidable.IncomingForm();
  const fileNames = [];
  form.uploadDir = `${__dirname}/static/userImages`;
  form.mutiples = true;
  form.on('fileBegin', (name, file) => {
    file.name = file.name.split('.').join(`-${Date.now()}.`);
    file.path = `${form.uploadDir}/${file.name}`;
    fileNames.push(file.name);
  });

  form.on('error', (err) => {
    throw err;
  });

  form.parse(req, () => {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end(JSON.stringify(fileNames));
  });
});

/**
 * endpoint for adding a new recipe to the database. updates all
 * three tables (recipes, recipe_ingredients, ingredient_groups).
 * takes: name (string), notes (string), size(string),
 *        ingredients (array of objects), groups (array of objects)
 */
app.post('/api/createnewrecipe', (req, res) => {
  /**
   * function to check for empty strings and replace them with some value.
   * default value is 'NULL', the null value in mysql.
   * if a second parameter is passed, it is used as the replacement value.
   * otherwise, the given input is sanitized for mysql.
   */
  const sanitize = (input, replaceVal) => {
    let defaultOnNull = 'NULL';
    if (replaceVal) defaultOnNull = replaceVal;
    if (!input || input.length === 0) {
      return defaultOnNull;
    }
    return mysql.escape(input);
  };

  const recipeName = mysql.escape(req.body.name);
  const recipeSize = sanitize(req.body.size);
  const recipeNotes = sanitize(req.body.notes);
  let query = `
    INSERT INTO recipes (\`name\`, notes, size)
    VALUES (${recipeName}, ${recipeNotes}, ${recipeSize});
    SET @recid = LAST_INSERT_ID();`;

  req.body.ingredients.forEach((ing, i) => {
    const ingName = sanitize(ing.name);
    const ingNotes = sanitize(ing.notes);
    const ingAmt = sanitize(ing.amount);
    const ingGroup = sanitize(ing.groupId, 1);
    query += `
    INSERT INTO recipe_ingredients
    (recipe_id, \`name\`, amount, notes, \`order\`, group_id)
    VALUES (
      @recid, ${ingName}, ${ingAmt}, ${ingNotes}, ${i}, ${ingGroup});
    `;
  });

  req.body.groups.forEach((group) => {
    const groupName = sanitize(group.name);
    const groupNotes = sanitize(group.notes);
    const groupId = sanitize(group.groupId);
    query += `
    INSERT INTO ingredient_groups (recipe_id, \`name\`, notes, group_id)
    VALUES (@recid, ${groupName}, ${groupNotes}, ${groupId});
    `;
  });

  req.body.images.forEach((image, i) => {
    const imagePath = sanitize(image);
    query += `
    INSERT INTO recipe_images (recipe_id, \`order\`, image_path)
    VALUES (@recid, ${i}, ${imagePath});
    `;
  });

  connection.query(
    query, [req.params.id], (error, results) => {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  )
});
