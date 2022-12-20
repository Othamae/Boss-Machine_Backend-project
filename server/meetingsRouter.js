const express = require('express');

const {
    createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase
  } = require('./db')

 
const meetingsRouter = express.Router();
module.exports= meetingsRouter;

meetingsRouter.param('meetingId', (req, res, next, id) => {
    const meetingId = id;
    const meeting = getAllFromDatabase('meetings')
    if(!meetingId || meetingId> meeting.length) {
      res.status(404).send('Incorrect Id');
      return;
    }
    next();
  });

// GET /api/meetings to get an array of all meetings.
meetingsRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('meetings'))
});


// POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post('/', (req, res) =>{   
    const time = req.body.time;
    const note = req.body.note;
    if (time  && note){
        const meetingCreated = createMeeting()
        addToDatabase('meetings', meetingCreated);
        res.send(meetingCreated)
    } else{
        res.status(404).send('Information incompleted')
    }  
    
});

// DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete('/', (req, res) => {
    res.send(deleteAllFromDatabase('meetings'));
});
