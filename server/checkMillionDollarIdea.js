const checkMillionDollarIdea = (req, res, next) => {
    console.log(req.body)
    const value = req.body.numWeeks * req.body.weeklyRevenue;
    console.log(value)
    if (value>= 1000000){
        next();
    }else{
        res.status(404).send('The idea is less that expected')
    }
};




// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
