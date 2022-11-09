/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../utils/dbConnect'
import Notes from '../../../models/Notes'
dbConnect()

export default async (req, res) => {
  const {method} = req
  switch (method) {
    case 'GET':
      try {
        const notes = await Notes.find({})
        res.status(200).json({success: true, data: notes})
      } catch (error) {
        res.status(400).json({success: false})
      }
      break
    case 'POST':
      try {
        const notes = await Notes.create(req.body)
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
