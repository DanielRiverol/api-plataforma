import Role from '../models/Role'
import Course from '../models/Course'

export const CreateRoles = async () => {

   try {
        //verifica que los roles no esten creados
    const count = await Role.estimatedDocumentCount()
    
    if (count > 0) return
    
    const values = await Promise.all([
        new Role({ name: 'admin' }).save(),
        new Role({ name: 'alumno' }).save(),
        new Role({ name: 'mentor' }).save(),
    ])
    
    console.log(values)
   } catch (error) {
       console.error(error)
   }
}
export const CreateCourses = async () => {

    try {
         //verifica que los cursos no esten creados
     const count = await Course.estimatedDocumentCount()
     
     if (count > 0) return
     
     const values = await Promise.all([
         new Course({ name: 'Desarrollo Web' }).save(),
         new Course({ name: 'Robótica' }).save(),
         new Course({ name: 'Experiencias inmersivas' }).save(),
         new Course({ name: 'Ciencia de datos' }).save(),
     ])
     
     console.log(values)
    } catch (error) {
        console.error(error)
    }
 }
