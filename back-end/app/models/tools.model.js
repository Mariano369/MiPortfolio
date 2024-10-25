const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ToolsSchema = mongoose.Schema(
  {
    Name: {
      type: String,
    },

    upNotes: {
      type: Number,
    },

    NewField: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

ToolsSchema.plugin(mongoosePaginate)
ToolsSchema.index({
  Name: 'text',
  upNotes: 'text',
  NewField: 'text',
})

const myModel = (module.exports = mongoose.model('Tools', ToolsSchema, 'tools'))
myModel.schema = ToolsSchema
