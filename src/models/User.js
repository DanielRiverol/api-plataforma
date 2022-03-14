import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        dni: {
            type: Number,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Active', 'Locked'],
            default: 'Active',
        },

        roles: [
            {
                ref: 'Role',
                type: Schema.Types.ObjectId,
            },
        ],
        courses: [
            {
                ref: 'Course',
                type: Schema.Types.ObjectId,
            },
        ],
        comision: [
            {
                ref: 'Comision',
                type: Schema.Types.ObjectId,
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
)
//Encriptación de password
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}
//Desencriptación de password y comparación
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default model('User', userSchema)
