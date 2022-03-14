import { Router } from 'express'
import * as authCtrl from '../controllers/auth.controller'
import { verifySignUp } from '../middlewares'

const router = Router()

router.post('/signin', authCtrl.signIn)

router.post(
    '/signup',
    [
        verifySignUp.checkDuplicatedUsernameOrEmail,
        verifySignUp.checkRoleExisted,
    ],
    authCtrl.signUp
)


export default router
