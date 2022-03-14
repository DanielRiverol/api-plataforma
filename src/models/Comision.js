import { Schema, model } from 'mongoose'

const comisionSchema = new Schema(
    {
        name: {
            type: String,
        },
        number: {
            type: Number,
        },
        users: [
            { 
                ref: 'User', 
                type: Schema.Types.ObjectId 
            }
        ],
    },
    {
        versionKey: false,
    }
)
export default model('Comision', comisionSchema)
