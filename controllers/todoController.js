let bodyParser = require('body-parser')
let mongoose = require('mongoose')

//connect to the database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://admin:admin@ds139890.mlab.com:39890/todo-db')

//create a schema
let todoSchema = new mongoose.Schema({
    item: String
})

// create the model
let Todo = mongoose.model('Todo', todoSchema)


// gives access to the body of a post request via the req.body param
let urlencodedParser = bodyParser.urlencoded({extended: false})     

module.exports = function(app) {

    app.get('/todo', function(req, res) {
        // get data from mongo and pass it to the view
        Todo.find({}, function(err, data) {
            if (err) throw err
            res.render('todo', {todos: data})
        }) 
    })

    // Add  Tasks via $.ajax (todo-list.js)
    app.post('/todo', urlencodedParser, function(req, res) {
        //get data from the view and add it to the mongodb
        Todo(req.body).save(function(err, data) {
            if (err) throw err
            res.json(data)
        })
    })

    // Delete a Task via $.ajax (todo-list.js)
    app.delete('/todo/:item', function(req, res) {
        //delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data) {
            if (err) throw err
            res.json(data)
        })
    })

}
