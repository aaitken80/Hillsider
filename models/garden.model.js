var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var GardenSchema = new mongoose.Schema({
    title: String,
    description: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'People'},
    createdDate: { type: Date, default: Date.now }
})

GardenSchema.plugin(mongoosePaginate)
const Garden = mongoose.model('Garden', GardenSchema)

module.exports = Garden;