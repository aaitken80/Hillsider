var Garden = require('../models/garden.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List

exports.getGarden = async function(query, page, limit){

    // Options setup for the mongoose paginate

    var options = {
        page,
        limit,
        populate: 'owner'
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var gardens = await Garden.paginate(query, options);
        
        // Return the Gardend list that was retured by the mongoose promise

        return gardens;

    } catch (e) {

        // return a Error message describing the reason 

        throw Error('Error while Paginating Garden')
    }
}

exports.createGarden = async function(garden){
    
    // Creating a new Mongoose Object by using the new keyword

    var newGarden = new Garden({
        title: garden.title,
        description: garden.description,
        owner: garden.owner ? garden.owner._id : undefined
    })

    try{

        // Saving the Garden 

        var savedGarden = await newGarden.save()

        return savedGarden;
    }catch(e){
      
        // return a Error message describing the reason     

        throw Error("Error while Creating Garden")
    }
}

exports.updateGarden = async function(garden){
    var id = garden.id

    try{
        //Find the old Garden Object by the Id
    
        var oldGarden = await Garden.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Garden")
    }

    // If no old Garden Object exists return false

    if(!oldGarden){
        return false;
    }

    console.log(oldGarden)

    //Edit the Garden Object

    oldGarden.title = garden.title
    oldGarden.description = garden.description
    oldGarden.owner = garden.owner


    console.log(oldGarden)

    try{
        var savedGarden = await oldGarden.save()
        return savedGarden;
    }catch(e){
        throw Error("And Error occured while updating the Garden");
    }
}

exports.deleteGarden = async function(id){
    
    // Delete the Garden

    try{
        var deleted = await Garden.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Garden Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Garden")
    }
}