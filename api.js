require('http');
const fs = require('fs');
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
require('path');
const cors = require('cors');
const formidable = require('formidable');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

/** Constants */

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: process.env.DB_PASS,
  database: 'mffdb',
  multipleStatements: true,
});

const authConfig = {
  domain: 'dev-jknyt6s8.auth0.com',
  audience: 'https://dev-jknyt6s8.auth0.com/userinfo',
};

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

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256'],
});

/** server */

connection.connect((err) => {
  if (err) throw err;
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const server = app.listen(3005, '127.0.0.1');
server.timeout = 1000 * 60 * 10;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  next();
});

app.get('/api/getrecipes/offset=:offset-sort=:sort', checkJwt, (req, res) => {
  let order = 'DESC';
  if (req.params.sort === 'name') {
    order = 'ASC';
  }
  connection.query(`
    SELECT * FROM recipes
    ORDER BY recipes.${req.params.sort} ${order}
    LIMIT ${+req.params.offset},5
    `,
  (error, results) => {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.get('/api/getrecipes/sort=:sort', checkJwt, (req, res) => {
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

app.get('/api/getrecipe/:id', checkJwt, (req, res) => {
  connection.query(`
    SELECT * FROM recipes
    WHERE id = ${+req.params.id}
    `,
  (error, results) => {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.get('/api/getingredients', checkJwt, (req, res) => {
  connection.query(`
    SELECT * FROM recipe_ingredients
    ORDER BY recipe_ingredients.update_date
    `,
  (error, results) => {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.get('/api/getingredients/:id', checkJwt, (req, res) => {
  connection.query(`
    SELECT * FROM recipe_ingredients 
    WHERE recipe_ingredients.recipe_id = ${mysql.escape(req.params.id)}
    `,
  (error, results) => {
    if (error) throw error;
    const modified = results.map(ing => ({
      name: ing.name,
      amount: ing.amount,
      notes: ing.notes,
      groupId: ing.group_id,
      elemId: ing.id,
    }));
    res.end(JSON.stringify(modified));
  });
});

app.get('/api/getingredientgroups/:id', checkJwt, (req, res) => {
  connection.query(`
    SELECT * FROM ingredient_groups 
    WHERE ingredient_groups.recipe_id = ${mysql.escape(req.params.id)}
    ORDER BY ingredient_groups.group_id
    `,
  (error, results) => {
    if (error) throw error;
    const modified = results.map(group => ({
      name: group.name,
      notes: group.notes,
      groupId: group.group_id,
      elemId: group.id,
    }));
    res.end(JSON.stringify(modified));
  });
});

app.get('/api/getrecipeimages/:id', checkJwt, (req, res) => {
  connection.query(`
    SELECT * FROM recipe_images
    WHERE recipe_images.recipe_id = ${mysql.escape(req.params.id)}
    ORDER BY recipe_images.order
    `,
  (error, results) => {
    if (error) throw error;
    const modified = results.map(img => ({
      imagePath: img.image_path,
      elemId: img.id,
    }));
    res.end(JSON.stringify(modified));
  });
});

app.get('/api/getrecipeinfo/:id', checkJwt, (req, res) => {
  const id = mysql.escape(req.params.id);
  connection.query(`
    SELECT * FROM recipe_ingredients 
    WHERE recipe_ingredients.recipe_id = ${id};

    SELECT * FROM recipe_images
    WHERE recipe_images.recipe_id = ${id}
    ORDER BY recipe_images.order;

    SELECT * FROM ingredient_groups 
    WHERE ingredient_groups.recipe_id = ${id}
    ORDER BY ingredient_groups.group_id;

    SELECT * FROM recipes
    WHERE id = ${id};
    `,
  (error, results) => {
    if (error) throw error;
    const ingredients = results[0].map(ing => ({
      name: ing.name,
      amount: ing.amount,
      notes: ing.notes,
      groupId: ing.group_id,
      elemId: ing.id,
    }));
    const groups = results[2].map(group => ({
      name: group.name,
      notes: group.notes,
      groupId: group.group_id,
      elemId: group.id,
    }));
    const images = results[1].map(img => ({
      imagePath: img.image_path,
      elemId: img.id,
    }));
    const info = results[3][0];
    res.end(JSON.stringify({
      images,
      groups,
      ingredients,
      info,
    }));
  });
});
/**
 * endpoint for adding a new image to /static/userImages
 * takes: an HTML File object
 */
app.post('/api/addimage', checkJwt, (req, res) => {
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
app.post('/api/createnewrecipe', checkJwt, (req, res) => {
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
    const imagePath = sanitize(image.imagePath);
    query += `
    INSERT INTO recipe_images (recipe_id, \`order\`, image_path)
    VALUES (@recid, ${i}, ${imagePath});
    `;
  });

  connection.query(
    query, (error, results) => {
      if (error) throw error;
      res.end(JSON.stringify(results[0].insertId));
    }
  );
});

app.post('/api/updateRecipe/:id', checkJwt, (req, res) => {
  const recipeId = +req.params.id;
  const recipeName = sanitize(req.body.name);
  const recipeSize = sanitize(req.body.size);
  const recipeNotes = sanitize(req.body.notes);
  let query = `
    UPDATE recipes
    SET \`name\` = ${recipeName},
        notes = ${recipeNotes},
        size = ${recipeSize},
        update_date = NOW()
    WHERE id = ${recipeId}
    ;`;

  query += `
    DELETE FROM recipe_ingredients
    WHERE recipe_id = ${recipeId};
  `;

  req.body.ingredients.forEach((ing, i) => {
    const ingName = sanitize(ing.name);
    const ingNotes = sanitize(ing.notes);
    const ingAmt = sanitize(ing.amount);
    const ingGroup = sanitize(ing.groupId);

    query += `
    INSERT INTO recipe_ingredients
    (recipe_id, \`name\`, amount, notes, \`order\`, group_id)
    VALUES (
      ${recipeId}, ${ingName}, ${ingAmt}, ${ingNotes}, ${i}, ${ingGroup});
    `;
  });

  query += `
    DELETE FROM ingredient_groups
    WHERE recipe_id = ${recipeId};
  `;

  req.body.groups.forEach((group) => {
    const groupName = sanitize(group.name);
    const groupNotes = sanitize(group.notes);
    const groupId = sanitize(group.groupId, 1);
    query += `
    INSERT INTO ingredient_groups (recipe_id, \`name\`, notes, group_id)
    VALUES (${recipeId}, ${groupName}, ${groupNotes}, ${groupId});
    `;
  });

  query += `
    DELETE FROM recipe_images
    WHERE recipe_id = ${recipeId};
  `;

  req.body.images.forEach((image, i) => {
    const imagePath = sanitize(image.imagePath);
    query += `
    INSERT INTO recipe_images (recipe_id, \`order\`, image_path)
    VALUES (${recipeId}, ${i}, ${imagePath});
    `;
  });

  connection.query(
    query, (error, results) => {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

app.delete('/api/deleteImageWithPath/:path', checkJwt, (req, res) => {
  try {
    fs.unlinkSync(`${__dirname}/static/userImages/${req.params.path}`);
  } catch (err) {
    throw err;
  }
  res.end(JSON.stringify(req.params.path));
});

app.delete('/api/deleteRecipe/:id', checkJwt, (req, res) => {
  const recipeId = +req.params.id;
  let images = [];
  connection.query(`
    SELECT * FROM recipe_images
    WHERE recipe_images.recipe_id = ${recipeId}
    ORDER BY recipe_images.order
    `,
  (imgDbDelError, imgArray) => {
    if (imgDbDelError) throw imgDbDelError;
    images = imgArray;
    if (images.length !== 0) {
      images.forEach((img) => {
        try {
          fs.unlinkSync(`${__dirname}/static/userImages/${img.image_path}`);
        } catch (err) {
          throw err;
        }
      });
    }
  });
  const query = `
    DELETE FROM recipe_ingredients
    WHERE recipe_id = ${recipeId};
  
    DELETE FROM ingredient_groups
    WHERE recipe_id = ${recipeId};

    DELETE FROM recipe_images
    WHERE recipe_id = ${recipeId};

    DELETE FROM recipes
    WHERE id = ${recipeId};
  `;
  connection.query(
    query, (recDbDelError, finalResults) => {
      if (recDbDelError) throw recDbDelError;
      res.end(JSON.stringify(finalResults));
    }
  );
});

app.use('/static', express.static('static'));

app.use((req, res) => {
  res.status(404).sendFile(`${__dirname}/static/404.jpg`);
});
