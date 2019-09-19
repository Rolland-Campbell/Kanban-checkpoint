import mongoose from "mongoose"
import CommentService from './CommentService.js'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let _commentRepo = new CommentService().repository

let _schema = new Schema({
  title: { type: String, required: true },
  body: { type: String },
  authorId: { type: ObjectId, ref: 'User', required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true }
}, { timestamps: true })

//CASCADE ON DELETE
_schema.pre('deleteMany', function (next) {
  //lets find all the comments and remove them
  Promise.all([
    // @ts-ignore
    _commentRepo.deleteMany({ taskId: this._conditions._id }),
  ])
    .then(() => next())
    .catch(err => next(err))
})

//CASCADE ON DELETE
// _schema.pre('findOneAndRemove', function (next) {
//   //lets find all the lists and remove them
//   Promise.all([
//     // _taskRepo.deleteMany({ boardId: this._conditions._id })
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

export default class TaskService {
  get repository() {
    return mongoose.model('Task', _schema)
  }
}