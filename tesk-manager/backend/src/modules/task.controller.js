import TaskService from "./task.service.js";

const service = new TaskService()

export default class TaskController {
    async getAll(req, res, next) {
        try {
            const tasks = await service.getAllTasks()
            return res.status(200).json(tasks)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params
            const task = await service.getTaskById(id)

            return res.status(200).json(task)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const { title, description, priority } = req.body
            const task = await service.createTask(title, description, priority)

            return res.status(201).json(task)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const updatedTask = await service.toggleTaskStatus(id)

            return res.status(200).json(updatedTask)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await service.deleteTask(id)

            return res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}