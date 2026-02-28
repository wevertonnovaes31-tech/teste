import TaskController from "./task.controller.js";
import { Router } from "express";

const routes = Router()
const controller = new TaskController()

routes.get('/tasks', controller.getAll)
routes.get('/tasks/:id', controller.getById)
routes.post('/tasks', controller.create)
routes.put('/tasks/:id', controller.update)
routes.delete('/tasks/:id', controller.delete)
export default routes