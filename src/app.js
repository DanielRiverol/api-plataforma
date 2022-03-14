import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import pkg from '../package.json'
import courseRoute from './routes/course.route'
import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'
import comissionRoute from './routes/comission.route'
import homeRoute from './routes/home.route'
import path from 'path'

import { CreateRoles, CreateCourses } from './libs/initialSetup'

//init
const app = express()
CreateRoles()
CreateCourses()

//Settings
app.set('PORT', process.env.PORT || 3000)
const corsOptions = {}




app.set('pkg', pkg)
app.set('views', path.join(__dirname,'views'))
//app.engine('html', require('ejs').renderFile )
app.set('view engine', 'ejs')

//middlewares
app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//Static files
app.use(express.static(path.join(__dirname, 'public')))

//route inicial
 app.get('/', (req, res) => {
    res.render('index',{title:'Bienvenidos a la Plataforma'})
     
}) 

app.use('/api/v1/course', courseRoute)
app.use('/api/v1/comission', comissionRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1', homeRoute)
/* app.use(function(req, res, next){
    res.status(404).render('404', {title: "Sorry, page not found"});
}); */

export default app;
