import { Router } from 'express'
import * as comissionCtrl from '../controllers/comission.controller'
import { authJwt } from '../middlewares'
const router = Router()

router.get('/', comissionCtrl.getComissions)

router.get('/:id', comissionCtrl.getComissionById)

router.post(
    '/',
    [authJwt.verifyToken, authJwt.isAdmin],
    comissionCtrl.createComission
)

router.put(
    '/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    comissionCtrl.updateComissionById
)

router.delete(
    '/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    comissionCtrl.deleteComissionById
)

export default router
