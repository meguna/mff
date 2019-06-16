require('http');
require('fs');
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cors());

app.listen(3005, '127.0.0.1');

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
  connection.query(`
    SELECT * FROM recipes
    ORDER BY recipes.${req.params.sort}
    LIMIT ?,5
    `,
  [+req.params.offset], (error, results) => {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.get('/api/getrecipes/sort=:sort', (req, res) => {
  const query = `
    SELECT * FROM recipes
    ORDER BY recipes.${req.params.sort}
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

app.post('/api/createnewrecipe', (req, res) => {
  const recipeName = mysql.escape(req.body.name);
  const recipeSize = req.body.size.length === 0 ? 'NULL' : mysql.escape(req.body.size);
  const recipeNotes = req.body.notes.length === 0 ? 'NULL' : mysql.escape(req.body.notes);

  let query = `
    INSERT INTO recipes (\`name\`, notes, size)
    VALUES (${recipeName}, ${recipeNotes}, ${recipeSize});
    SET @recid = LAST_INSERT_ID();`;

  req.body.ingredients.forEach((ing, i) => {
    const ingName = ing.name.length === 0 ? 'NULL' : mysql.escape(ing.name);
    const ingNotes = ing.name.length === 0 ? 'NULL' : mysql.escape(ing.notes);
    const ingAmt = ing.name.length === 0 ? 'NULL' : mysql.escape(ing.amount);
    const ingGroup = ing.name.length === 0 ? 'NULL' : mysql.escape(ing.groupId);

    query += `
    INSERT INTO recipe_ingredients (recipe_id, \`name\`, amount, notes, \`order\`, group_id)
    VALUES (@recid, ${ingName}, ${ingNotes}, ${ingAmt}, ${i}, ${ingGroup});
    `;
  });

  req.body.groups.forEach((group) => {
    const groupName = group.name.length === 0 ? 'NULL' : mysql.escape(group.name);
    const groupNotes = group.name.length === 0 ? 'NULL' : mysql.escape(group.notes);
    const groupId = group.name.length === 0 ? 'NULL' : mysql.escape(group.groupId);

    query += `
    INSERT INTO ingredient_groups (recipe_id, \`name\`, notes, group_id)
    VALUES (@recid, ${groupName}, ${groupNotes}, ${groupId});
    `;
  });

  connection.query(
    query,
    [req.params.id], (error, results) => {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  )
});
