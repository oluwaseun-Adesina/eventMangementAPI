const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoutes') 
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/auth')
const dotenv = require('dotenv')
dotenv.config();
const eventRoutes = require('./routes/eventRoutes')
const attendeeRoutes = require('./routes/attendeeRoutes')
// var port = process.env.PORT || 3000;
// express app
const app = express();

//CONNECT TO MONGO DB

mongoose.connect(process.env.dbURIlocal, { useNewUrlParser: true, useUnifiedTopology: true })
    //.then((result) => app.listen(3000))
    .then((result) => app.listen(process.env.PORT || 3000, function() {
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
      }))
    .catch((err) => console.log(err))
// register view engine
app.set('view engine', 'ejs');

//routes
//middleware and static file
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());



app.get('*', checkUser);

//blog routes
app.use(authRoute)
app.use(eventRoutes, requireAuth)
app.use(attendeeRoutes, requireAuth) 
// app.use('/blogs', blogRoutes);
//app.get('/blogs/create')
//app.use(authRoute)
// 404 page
app.use((req, res) => {
    //res.status(404).sendFile("./views/404.html", {root: __dirname});
    res.status(404).json('404', { title: "Error 404" });
});
