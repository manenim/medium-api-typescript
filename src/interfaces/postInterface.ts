export interface IPost {
    title: string
    description: string
    body: string
    date: Date
    tags: string[]
    comments: { body: string; date: Date }[]
    hidden: boolean
    meta: {
        likes: number
    }
}
