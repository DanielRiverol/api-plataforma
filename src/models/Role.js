import { Schema, model } from 'mongoose'
export const ROLE = ['admin', 'mentor', 'alumno']
const roleSchema = new Schema(
    {
        name: String,
    },
    {
        versionKey: false,
    }
)
export default model('Role', roleSchema)
