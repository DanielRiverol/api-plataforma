import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'

export const signUp = async (req, res) => {
    const { name, lastname, dni, email, password, roles } = req.body

    const newUser = new User({
        name,
        lastname,
        dni,
        email,
        password: await User.encryptPassword(password),
    })
    //Si no envia un rol, el rol predeterminado es alumno
    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } })
        newUser.roles = foundRoles.map((role) => role._id)
    } else {
        const role = await Role.findOne({ name: 'alumno' })
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()

    //token
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400, //24 hours
    })
    res.json({ token })
}

export const signIn = async (req, res) => {
    const { email, password } = req.body
    const userFound = await User.findOne({ email }).populate('roles')
    if (!req.body.email || !req.body.password) {
        res.json({ message: 'Ingrese un usuario y contraseña' })
    }
    if (!userFound) return res.status(400).json({ message: 'User not found' })
    const matchPassword = await User.comparePassword(
        password,
        userFound.password
    )

    if (!matchPassword)
        return res
            .status(401)
            .json({ token: null, message: 'Invalid password' })

    console.log(userFound)

    if (userFound.status != 'Active') {
        return res.status(401).send({
            message: 'Blocked Account. Please contact the administrator',
        })
    }

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400, //24 hours
    })
    console.log({token})
    /* res.json({ token }) */
    res.redirect("/api/v1")
    
}
//No implementado
export const verifyUser = async (req, res, next) => {
    await User.findOne({
        confirmationCode: req.params.confirmationCode,
    })
        .then((user) => {
            console.log(user)
            if (!user) {
                return res.status(404).send({ message: 'User Not found.' })
            }
            user.status = 'Active'
            // user.confirmationCode= ''

            user.save((err) => {
                if (err) {
                    res.status(500).send({ message: err })
                    return
                }
            })
        })
        .catch((e) => console.log('error', e))
    next()
}
