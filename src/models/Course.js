import { Schema, model } from 'mongoose'

export const COURSE = [
    'Desarrollo web',
    'Robótica',
    'Experiencias inmersivas',
    'Ciencia de datos',
]
const courseSchema = new Schema(
    {
        name: {
            type: String,
        },
        comissions: [
            {
                ref: 'Comision',
                type: Schema.Types.ObjectId,
            },
        ],
        users:[{
            ref: 'User',
            type: Schema.Types.ObjectId,
        }]
    },
    {
        versionKey: false,
    }
)

export default model('Course', courseSchema)
