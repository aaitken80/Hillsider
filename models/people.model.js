var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var PeopleSchema = new mongoose.Schema({
    title: String,
    firstName: String,
    surname: String,
    address1: String,
    address2: String,
    address3: String,
    postCode: String,
    emailAddress: String,
    homePhone: String,
    mobilePhone: String,
    createdDate: Date,
    status: String
})

PeopleSchema.plugin(mongoosePaginate)
const People = mongoose.model('People', PeopleSchema)

module.exports = People;