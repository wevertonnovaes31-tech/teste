import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const databasePath = path.resolve(__dirname, '../shared/database/tasks.json')

export default class TaskRepository {
    async #readDatabase() {
        try {
            const data = await readFile(databasePath, 'utf-8')

            if (!data.trim()) return []

            return JSON.parse(data)
        } catch(error) {
            return []
        }
    }

    async #writeDatabase(data) { 
        await writeFile(databasePath, JSON.stringify(data, null, 2)) 
    }

    async findAll() { 
        return this.#readDatabase() 
    }

    async findById(id) {
        const tasks = await this.#readDatabase()
        return tasks.find(task => task.id === id) || null
    }

    async create(task) {
        const tasks = await this.#readDatabase()
        tasks.push(task)

        await this.#writeDatabase(tasks)
        return task
    }

    async update(id, data) {
        const tasks = await this.#readDatabase()
        const index = tasks.findIndex(task => task.id === id)

        if (index === -1) return null

        tasks[index] = {
            ...tasks[index],
            ...data
        }

        await this.#writeDatabase(tasks)
        
        return tasks[index]
    }

    async delete(id) {
        const tasks = await this.#readDatabase()
        const index = tasks.findIndex(task => task.id === id)

        if (index === -1) return null

        tasks.splice(index, 1)
        await this.#writeDatabase(tasks)
        
        return true
    }
}