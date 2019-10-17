const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/agents')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('could not connect to MongoDB'));


const agentSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, requiredL: true},
    password: {type: String,
        required: true,
        minlength: 8,
        maxlength: 13
    }
});

const Agent = mongoose.model('Agent', agentSchema);

// Comparison operators
// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to)
// lt (less than)
// lte (less than or equal to)
// in 
// nin (not in)

// logical operators
// or
// and

async function createAgent() {
    const agent = new Agent({
        firstName: 'Barry',
        lastName: 'Alan',
        email: 'BAlan@gmail.com',
        password: '24681012'
    });

    try{
        const result = await agent.save();
        console.log(result);
    }catch(err) {console.log('Error', err.message);}
}

async function getAgents() {
    // returns all the agents in the database
    agents = await Agent

        .find(); 

        // Starts with Ch
        //.find({firstName: /^Ch/}) 

        // Ends with d
        // .find({firstName: /d$/}) // its case sensitive - to remove add i after last /
        
        // contains d
        // .find({firstName: /.*d.*/}) 


        // .find({firstName: 'Chad'}) used to add a filter, can be property in the Schema 
        // .or([{firstName: 'Chad'}, {lastName: 'Alan'}]); // and operator works the same way
        // .sort({firstName: 1}) => sorts the agents in ascending order - for disceding order use -1
        // .select({firstName: 1}) // Properties that we want to be returned

        // Say you want to get Agents with a password less than 99999999
        /* .find({password: {$lt: 99999}})
        */

    console.log(agents);

}

async function updateAgent(id) {
    // Approach: Query first
    // findById()
    // Modify
    // save()

    const agent = await Agent.findById(id);
    if (!agent) return;
    agent.set({
        firstName: 'Wesley'
    })

    const result = await agent.save();
    console.log(result);
    
}

async function deleteAgent(id) {
    const result = await Agent.deleteOne({__id: id});
    console.log(result);
}

//updateAgent('5d9e58b3ac265d3af5d9d67c');
//getAgents();
//createAgent();

