require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const db = require('./models');
const taskRouter = require('./controllers/tasks'); // Adjust path as needed
const methodOverride = require('method-override');


// environment variables
SECRET_SESSION = process.env.SECRET_SESSION;

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(methodOverride("_method"));


app.use(flash());            // flash middleware

app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));

// add passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.use((req, res, next) => {
  res.locals.user = req.user || null; // Assign req.user to res.locals.user, or null if not available
  next(); // Continue to the next middleware/route handler
});


app.use('/auth', require('./controllers/auth'));
app.use(taskRouter);

app.get('/', async (req, res) => {
  try {
    const tasks = await db.Task.findAll({
        include: [{
            model: db.user, // Use 'user' if that's how your model is named
            as: 'users',    // Adjust the 'as' alias based on your association definition
            attributes: ['name'], // Fetch only the 'name' attribute of the user
            through: { attributes: [] } // Avoid fetching extra attributes from the join table
        }]
    });

    let name = req.user ? req.user.name : 'Guest';
    res.render('index', { tasks, name });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error');
  }
});


// Add this below /auth controllers
app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get(); 
  res.render('profile', { id, name, email });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
