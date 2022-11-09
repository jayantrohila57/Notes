const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please Enter the title'],
    unique: true,
    trim: true,
    maxlength: [40, 'Title cannot be more than of 40 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please Enter the description'],
    unique: true,
    maxlength: [200, 'Title cannot be more than of 250 characters'],
  },
})

module.exports = mongoose.models.Notes || mongoose.model('Notes', NoteSchema)
