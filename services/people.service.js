// Gettign the Newly created Mongoose Model we just created 

var People = require('../models/people.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List

exports.getPeople = async function(query, page, limit){

    // Options setup for the mongoose paginate

    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var peoples = await People.paginate(query, options)
        
        // Return the Peopled list that was retured by the mongoose promise

        return peoples;

    } catch (e) {

        // return a Error message describing the reason 

        throw Error('Error while Paginating People')
    }
}

exports.createPeople = async function(people){
    
    // Creating a new Mongoose Object by using the new keyword

    var newPeople = new People({
        title: people.title,
        firstName: people.firstName,
        surname: people.surname,
        address1: people.address1,
        address2: people.address2,
        address3: people.address3,
        postCode: people.postCode,
        emailAddress: people.emailAddress,
        homePhone: people.homePhone,
        mobilePhone: people.mobilePhone,
        createdDate: new Date(),
        status: "NEW"
    })

    try{

        // Saving the People 

        var savedPeople = await newPeople.save()

        return savedPeople;
    }catch(e){
      
        // return a Error message describing the reason     

        throw Error("Error while Creating People")
    }
}

exports.updatePeople = async function(people){
    var id = people.id

    try{
        //Find the old People Object by the Id
    
        var oldPeople = await People.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the People")
    }

    // If no old People Object exists return false

    if(!oldPeople){
        return false;
    }

    console.log(oldPeople)

    //Edit the People Object

    oldPeople.title = people.title
    oldPeople.firstName = people.firstName
    oldPeople.surname = people.surname
    oldPeople.address1 = people.address1
    oldPeople.address2 = people.address2
    oldPeople.address3 = people.address3
    oldPeople.postCode = people.postCode
    oldPeople.status = people.status
    oldPeople.emailAddress = people.emailAddress,
    oldPeople.homePhone = people.homePhone,
    oldPeople.mobilePhone = people.mobilePhone,


    console.log(oldPeople)

    try{
        var savedPeople = await oldPeople.save()
        return savedPeople;
    }catch(e){
        throw Error("And Error occured while updating the People");
    }
}

exports.deletePeople = async function(id){
    
    // Delete the People

    try{
        var deleted = await People.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("People Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the People")
    }
}