import Course from '../models/Course'

export const createCourse = async (req, res) => {
    try {
        const { name, level } = req.body
        const newCourse = new Course({
            name,
            level,
        })
        const courseSaved = await newCourse.save()
        res.status(200).json(courseSaved)
        console.log(courseSaved)
    } catch (error) {
        res.status(401).json(`An error has occured: ${error}`)
    }
}

export const getCourses = async (req, res) => {
    const courses = await Course.find()
    res.json(courses)
}

export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        if (!course) {
            res.status(404).json('course not found')
        } else {
            res.status(200).json(course)
        }
    } catch (error) {
        res.status(401).json(`An error has occured: ${error}`)
    }
}

export const updateCourseById = async (req, res) => {
    try {
        const courseUpdated = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(200).json(courseUpdated)
    } catch (error) {
        res.status(401).json(`An error has occured: ${error}`)
    }
}

export const deleteCourseById = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id)
        res.status(204).json()
    } catch (error) {
        res.status(401).json(`An error has occured: ${error}`)
    }
}
