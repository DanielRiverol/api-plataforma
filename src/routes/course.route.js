import { Router } from 'express'
import * as courseCtrl from '../controllers/course.controller'
import { authJwt } from '../middlewares'
const router = Router()

router.get('/', courseCtrl.getCourses)

router.get('/:id', courseCtrl.getCourseById)

router.post(
    '/',
    [authJwt.verifyToken, authJwt.isAdmin],
    courseCtrl.createCourse
)

router.put(
    '/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    courseCtrl.updateCourseById
)

router.delete(
    '/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    courseCtrl.deleteCourseById
)

export default router
