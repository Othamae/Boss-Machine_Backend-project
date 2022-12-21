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


//GET /api/minions/:minionId/work to get an array of all work for the specified minion.
minionsRouter.get('/:minionId/work', (req, res) => {    
    const id =req.params.minionId;
    const works = getAllFromDatabase('work').filter((work)=> work.minionId == id) 
    res.send(works);
});

//POST /api/minions/:minionId/work to create a new work object and save it to the database.
minionsRouter.post('/:minionId/work', (req, res) => {    
    const id =req.params.minionId;
    req.body.minionId = id;    
    const work = addToDatabase('work', req.body)    
    res.send(work);
});

//PUT /api/minions/:minionId/work/:workId to update a single work by id.
minionsRouter.put('/:minionId/work/:workId', (req, res) => {    
    const minionId =req.params.minionId;
    const workId = req.params.workId;
    req.body.minionId = minionId;
    req.body.id = workId;
    const minionWorks = getAllFromDatabase('work').filter((work)=> work.minionId == minionId)    
    let workToUpdate = minionWorks.filter((work)=> work.id == workId)       
    workToUpdate = req.body;     
    updateInstanceInDatabase('work', workToUpdate)
    res.send(workToUpdate);
});

// DELETE /api/minions/:minionId/work/:workId to delete a single work by id.
minionsRouter.delete('/:minionId/work/:workId', (req, res) => {   
    res.send(deleteFromDatabasebyId('work',req.params.workId));
});
