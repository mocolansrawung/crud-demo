const express = require('express');
const { request } = require('http');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');

// pls use this 'middleware' that is going to parsed the request body as url encoded data.
app.use(express.urlencoded({ extended: true }));
// anticipated the json input
app.use(express.json());

// method-override
app.use(methodOverride('_method'));

// setting up the ejs views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuid(),
        username: 'Todd Boehly',
        comment: 'Chelsea is the best club in the world nowadays.'
    },
    {
        id: uuid(),
        username: 'Thomas Tuchel',
        comment: 'We need to recovery immedietely.'
    },
    {   
        id: uuid(),
        username: 'Erik Ten Hag',
        comment: 'United have to set their mentality back.'
    },
    {
        id: uuid(),
        username: 'James Ward-Prowse',
        comment: 'Give as much free kick as possible and I will show you how good I am.'
    }
];

// REST: representational state transfer
// perform CRUD operations.
// CRUD: create, read, update, and delete

// GET /comments - list all comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});

// POST /comments - create a new comment
// We need 2 route for input and post.
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    // res.send('It worked!')
    res.redirect('/comments');
});

// GET /comments/:id - get one comment using ID
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
});

// PATCH OR UPDATE /comments/:id - updating information
app.patch('/comments/:id', (req, res) => {
    // res.send('Updating something!');
    const { id } = req.params; // the initial comment we want to edit
    const newCommentText = req.body.comment; // what we got from the form
    const foundComment = comments.find(c => c.id === id); // finding the comment based on the id
    foundComment.comment = newCommentText; // change the existing comment with the one from the form
    res.redirect('/comments'); // redirect once the newcomment already succeed
});

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
});

// DELETE /comments/:id - destroy/remove one comment
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    // const foundComment = comments.find(c => c.id === id);
    comments  = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

// testing the get
app.get('/tacos', (req, res) => {
    res.send('GET /tacos response')
});

app.post('/tacos', (req, res) => {
    // console.log(req.body) // once we know this, we could destructure this from req.body
    const { meat, qty } = req.body;
    res.send(`OK, here are your ${qty} ${meat} tacos`)
});

// a must in building server.
app.listen(3000, () => {
    console.log('Listening to Port 3000.')
});



