const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');



// Middleware
app.use(cors());
app.options('*', cors());

const agents = require('./routes/agents');
const properties = require('./routes/properties');
const customers = require('./routes/customers');
const auth = require('./routes/auth');
const authCustomer = require('./routes/authcustomer');
const search = require('./routes/search');


if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1); // exits the process -> 0 indicates success
}

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb+srv://Zolotov:0766576653@mongodb01-avlll.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('could not connect to MongoDB'));

app.use(express.json());
app.use('/agents', agents);
app.use('/properties', properties);
app.use('/customers', customers);
app.use('/agents/authentication', auth);
app.use('/customers/authentication', authCustomer);
app.use('/properties/search', search);

// Port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`));

// Authentication -> is the process identifying if the user is who they claim they are
// Authorization -> determining if the user has the right permissions to perform the given operations (Only logged in users can perform operations that modify data) 
// Only Admin users can delete data


// export <name of enviroment-variable>= value -> to set enviroment variables