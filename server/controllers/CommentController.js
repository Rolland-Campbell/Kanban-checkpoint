import BoardService from '../services/BoardService'
import ListService from '../services/ListService'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'
import TaskService from '../services/TaskService'
import CommentService from '../services/CommentService.js'

//let _boardService = new BoardService().repository
let _commentService = new CommentService().repository

//PUBLIC
export default class TaskController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('/:id', this.getById)
      .post('', this.create)
      // .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getById(req, res, next) {
    try {
      let data = await _commentService.findOne({ _id: req.params.id, authorId: req.session.uid })
      return res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _commentService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }
  async delete(req, res, next) {
    try {
      let data = await _commentService.findOneAndRemove({ _id: req.params.id })
      res.send("deleted value")
    } catch (error) { next(error) }
  }
}
