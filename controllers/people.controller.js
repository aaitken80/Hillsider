// Accessing the Service that we just created

var PeopleService = require('../services/people.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getPeople = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var Peoples = await PeopleService.getPeople({}, page, limit)
        
        // Return the Peoples list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: Peoples, message: "Succesfully Peoples Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createPeople = async function(req, res, next){

    // Req.Body contains the form submit values.

    var People = {
        title: req.body.title,
        firstName: req.body.firstName,
        surname: req.body.surname,
        address1: req.body.address1,
        address2: req.body.address2,
        address3: req.body.address3,
        postCode: req.body.postCode,
        emailAddress: req.body.emailAddress,
        homePhone: req.body.homePhone,
        mobilePhone: req.body.mobilePhone
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdPeople = await PeopleService.createPeople(People)
        return res.status(201).json({status: 201, data: createdPeople, message: "Succesfully Created People"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "People Creation was Unsuccesfull"})
    }
}

exports.updatePeople = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var People = {
        id,
        title: req.body.title ? req.body.title : null,
        firstName: req.body.firstName ? req.body.firstName : null,
        surname: req.body.surname ? req.body.surname : null,
        address1: req.body.address1 ? req.body.address1 : null,
        address2: req.body.address2 ? req.body.address2 : null,
        address3: req.body.address3 ? req.body.address3 : null,
        postCode: req.body.postCode ? req.body.postCode : null,
        emailAddress: req.body.emailAddress ? req.body.emailAddress : null,
        homePhone: req.body.homePhone ? req.body.homePhone : null,
        mobilePhone: req.body.mobilePhone ? req.body.mobilePhone : null,
    }

    try{
        var updatedPeople = await PeopleService.updatePeople(People)
        return res.status(200).json({status: 200, data: updatedPeople, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removePeople = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await PeopleService.deletePeople(id)
        return res.status(204).json({status:204, message: "Succesfully People Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}