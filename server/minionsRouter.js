const express = require('express'); 

const minionsRouter = express.Router();
module.exports= minionsRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
  } = require('./db')

 
/**
 * MINIONS ROUTERS
 */


minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id)
    if(!minion) {
        res.status(404).send('Incorrect Id');
        return;
    }else{
        req.minion = minion
        next();
    }
  });

// GET /api/ideas to get an array of all ideas.
minionsRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('minions'))
});

// POST /api/ideas to create a new idea and save it to the database.
minionsRouter.post('/', (req, res) =>{    
    const name = req.body.name;
    const title = req.body.title;
    const salary = req.body.salary;
    if (name && title && salary){
        addToDatabase('minions', req.body);
        res.send(req.body)
    } else{
        res.status(404).send('Information incompleted')
    }  
    
});

// GET /api/ideas/:ideaId to get a single idea by id.
minionsRouter.get('/:minionId', (req, res) => {
    const id =req.params.minionId;
    res.send(getFromDatabaseById('minions', id))
});

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res) =>{  
    const toUpdate = updateInstanceInDatabase('minions', req.body);
    res.send(toUpdate);
});

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res) => {
    const id =req.params.minionId;
    id ? res.send(deleteFromDatabasebyId('minions', id)) : res.status(404).send('Minion not found')
});


