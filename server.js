const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//this makes it so the data sent via a POST is readable by the server - see 11.2.5
//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
//parses routes to find other linked data (like CSS and js files for front end - the 'public' is a reference to the  folder/directory with the same name, and thus, everything in it)
app.use(express.static('public'));


app.use('/api', apiRoutes);
apiRoutes.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`API Server now on port ${PORT}!`);
})