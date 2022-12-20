const express = require('express');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea')

module.exports= ideasRouter;


const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
  } = require('./db')


ideasRouter.param('ideaId', (req, res, next, id) => {
    const ideaId = id;
    const ideas = getAllFromDatabase('ideas')
    if(!ideaId || ideaId> ideas.length) {
      res.status(404).send('Incorrect Id');
      return;
    }
    next();
  });

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('ideas'))
});

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', checkMillionDollarIdea, (req, res) =>{
    const name = req.body.name;
    const description = req.body.description;    
    if (name && description){
        addToDatabase('ideas', req.body);
        res.send(req.body)
    }else{
        res.status(404).send('Information incompleted')
    }  
    
});

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res) => {
    const id =req.params.ideaId;
    res.send(getFromDatabaseById('ideas', id))
});

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', (req, res) =>{  
    const toUpdate = updateInstanceInDatabase('ideas', req.body);
    res.send(toUpdate);
});

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res) => {
    const id =req.params.ideaId;
    id ? res.send(deleteFromDatabasebyId('ideas', id)) : res.status(404).send('Idea not found')
});

