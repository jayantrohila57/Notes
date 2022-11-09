/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../utils/dbConnect'
import Notes, {deleteOne} from '../../../models/Notes'
dbConnect()

export default async (req, res) => {
  const {
    query: {id},
    method,
  } = req
  switch (method) {
    case 'GET':
      try {
        const notes = await Notes.findById(id)
        if (!notes) {
          res.status(400).json({success: false})
        }
        res.status(200).json({success: true, data: notes})
      } catch (error) {
        res.status(400).json({success: false})
      }
      break
    case 'PUT':
      try {
        const notes = await Notes.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!notes) {
          res.status(400).json({success: false})
        }
        res.status(201).json({success: true, data: notes})
      } catch (error) {
        res.status(400).json({success: false})
      }
      break
    case 'DELETE':
      try {
        const notes = await Notes.deleteOne({_id: id})
        if (!deleteOne) {
          return res.status(400).json({success: false})
        }
        res.status(201).json({success: true, data: notes})
      } catch (error) {
        res.status(400).json({success: false})
      }
      break
    default:
      res.status(400).json({success: false})
      break
  }
}
