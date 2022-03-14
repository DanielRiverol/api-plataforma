import Comission from '../models/Comision'

export const createComission = async (req, res) => {
    try {
        const { name, number } = req.body
        const newComission = new Comission({
            name,
            number,
        })
        const comissionSaved = await newComission.save()
        res.status(200).json(comissionSaved)
        console.log(comissionSaved)
    } catch (error) {
        res.status(401).json(`An error has occured: ${error}`)
    }
}

export const getComissions = async (req, res) => {
    const comissions = await Comission.find()
    res.json(comissions)
}

export const getComissionById = async (req, res) => {
    try {
        const comission = await Comission.findById(req.params.id)
        if (!comission) {
            res.status(404).json('comission not found')
        } else {
            res.status(200).json(comission)
        }
    } catch (error) {
        res.status(401).json(`An error has occured: ${error}`)
    }
}

export const updateComissionById = async (req, res) => {
    try {
        const comissionUpdated = await Comission.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(200).json(comissionUpdated)
    } catch (error) {
        res.status(401).json(`An error has occured: ${error}`)
    }
}

export const deleteComissionById = async (req, res) => {
    try {
        await Comission.findByIdAndDelete(req.params.id)
        res.status(204).json()
    } catch (error) {
        res.status(401).json(`An error has occured: ${error}`)
    }
}
