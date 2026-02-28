import TaskRepository from "./task.repository.js";
import Task from "./task.model.js";
import AppError from "../shared/errors/appError.js";

const repository = new TaskRepository()

export default class TaskService {
    async getAllTasks() {
        return await repository.findAll()
    }

    async getTaskById(id) {
        if (!id) {
            throw new Error('ID obrigatório')
        }

        const task = await repository.findById(id)

        if (!task) {
            throw new AppError('Tarefa não encontrada', 404)
        }

        return task
    }

    async createTask(title, description, priority) {
        if (!title) throw new Error('Título obrigatório')
        if (!priority) throw new Error('Prioridade obrigatória')

        const newTask = new Task(title, description, priority)
        return repository.create(newTask.serialization)
    }

    async toggleTaskStatus(id) {
        const task = await repository.findById(id)

        if (!task) {
            throw new AppError('Tarefa não encontrada', 404)
        }

        const newStatus = task.status === 'pending' ? 'complete' : 'pending'

        return repository.update(id, {status: newStatus})
    }

    async deleteTask(id) {
        const task = await repository.findById(id)

        if (!task) {
            throw new AppError('Tarefa não encontrada', 404)
        }

        repository.delete(id)

        return task
    }
}
