const Tools = require('../models/tools.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new Tool
exports.create = async (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  if (typeof data.Name !== 'undefined') updatedData['Name'] = data.Name
  if (typeof data.upNotes !== 'undefined') updatedData['upNotes'] = data.upNotes
  if (typeof data.NewField !== 'undefined') updatedData['NewField'] = data.NewField
  // Create a Tool
  const Tool = new Tools(updatedData)

  // Save Tool in the database
  Tool.save()
    .then((data) => {
      exports.findOne({ ID: data._id, res: options.res })
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while saving the record.',
      })
    })
}

exports.createAsPromise = (options) => {
  return new Promise(async (resolve, reject) => {
    const data = options.req ? options.req.body : options.data
    const { errorMessages } = data
    const updatedData = {}
    if (data._id) updatedData._id = data._id

    if (typeof data.Name !== 'undefined') updatedData['Name'] = data.Name
    if (typeof data.upNotes !== 'undefined') updatedData['upNotes'] = data.upNotes
    if (typeof data.NewField !== 'undefined') updatedData['NewField'] = data.NewField
    // Create a Tool
    const Tool = new Tools(updatedData)

    // Save Tool in the database
    Tool.save()
      .then((result) => {
        if (options.skipfind) {
          resolve(result)
        } else {
          exports.findOne({ ID: result._id, res: options.res }).then((result) => {
            resolve(result)
          })
        }
      })
      .catch((err) => {
        reject(errors.prepareError(err, errorMessages))
      })
  })
}

// Retrieve and return all Tools from the database.
exports.findAll = (options) => {
  const query = options.query ? options.query : options.req.query
  if (typeof query.populate === 'undefined') query.populate = 'true'
  const data = options.req ? options.req.body : options.data
  if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)
  if (!query.sortLanguage) query.sortLanguage = 'en'

  const findString = {}
  if (query.fixedSearch) {
    query.fixedSearch = JSON.parse(query.fixedSearch)
    findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
  }

  Tools.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })
    .collation({ locale: query.sortLanguage, strength: 1 })

    .then((tools) => {
      options.res.json(paginate.paginate(tools, { page: query.page, limit: query.limit || 10 }))
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while retrieving records.',
      })
    })
}

exports.find = (options) => {
  return new Promise((resolve, reject) => {
    const query = options.query ? options.query : options.req.query
    const data = options.req ? options.req.body : options.data
    let findString = query.searchString ? { $text: { $search: query.searchString } } : {}
    if (query.searchField) {
      if (Tools.schema.path(query.searchField)?.instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (Tools.schema.path(query.searchField)?.instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        if (query.exactMatch) {
          findString = { [query.searchField]: query.searchString }
        } else {
          findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
        }
      }

      if (Tools.schema.path(query.searchField)?.instance === 'ObjectId' || Tools.schema.path(query.searchField)?.instance === 'Array') {
        const ObjectID = require('mongoose').Types.ObjectId
        findString = { [query.searchField]: query.searchString ? new ObjectID(query.searchString) : null }
      }
    } else if (query.filters) {
      query.filters.forEach((filter) => {
        const parsed = typeof filter === 'string' ? JSON.parse(filter) : filter
        findString[parsed.field] = parsed.value
      })
    }
    if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)
    if (!query.sortLanguage) query.sortLanguage = 'en'
    if (query.fixedSearch) {
      query.fixedSearch = JSON.parse(query.fixedSearch)
      findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
    }

    Tools.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })
      .collation({ locale: query.sortLanguage, strength: 1 })

      .then((tool) => {
        resolve(paginate.paginate(tool, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single Tool with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    Tools.findById(id)

      .then((tool) => {
        if (!tool) {
          return options.res.status(404).send({
            message: 'Tool not found with id ' + id,
          })
        }
        resolve(paginate.paginate([tool]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'Tool not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving Tool with id ' + id,
        })
      })
  })
}

// Update a tool identified by the ID in the request
exports.update = (options) => {
  return new Promise(async (resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    if (typeof data.Name !== 'undefined') updatedData['Name'] = data.Name
    if (typeof data.upNotes !== 'undefined') updatedData['upNotes'] = data.upNotes
    if (typeof data.NewField !== 'undefined') updatedData['NewField'] = data.NewField
    // Find Tool and update it with the request body
    const query = { populate: 'true' }
    Tools.findByIdAndUpdate(id, updatedData, { new: true })

      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// Delete a tool with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    Tools.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
