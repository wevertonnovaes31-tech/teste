import { v4 as uuidv4 } from 'uuid'

export default class Task {
    static #priorityOptions = ['low', 'medium', 'high']

    #id
    #title
    #description
    #priority
    #status = 'pending'

    constructor(title, description = '', priority) {
        Task.#verifyTitle(title)
        Task.#verifyPriority(priority)

        this.#id = uuidv4()
        this.#title = title
        this.#description = description
        this.#priority = priority.toLowerCase()
    }

    static #verifyTitle(title) {
        if (typeof title !== 'string') 
            throw new TypeError('Titulo deve ser uma string')
        if (title.trim().length < 3)
            throw new RangeError('Titulo deve ter de três a mais caracteres')
    }

    static #verifyPriority(priority) {
        if (typeof priority !== 'string')
            throw new TypeError('Prioridade deve ser uma string')
        if (!Task.#priorityOptions.includes(priority.toLowerCase()))
            throw new TypeError(`Prioridade deve estar entre ${Task.#priorityOptions.join(' ,')}`)
    }

    get serialization() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            priority: this.#priority,
            status: this.#status
        }
    }
}