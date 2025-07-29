
import { prisma } from "../config/db";
import { hashPassword } from "../utilis/bcrypt";


async function createUsers(){
       
     
    let ADMIN_USER_PASSWORD =  process.env.ADMIN_USER_PASSWORD!
    let USER1_PASSWORD =    process.env.USER1_PASSWORD!
     
    if(!ADMIN_USER_PASSWORD || !USER1_PASSWORD){
        console.log('first user password are not defined in .env')
        process.exit(1)
    }

    ADMIN_USER_PASSWORD = await hashPassword(ADMIN_USER_PASSWORD)
    USER1_PASSWORD = await hashPassword(USER1_PASSWORD)


    const admin_user = await prisma.user.upsert({where: {email: 'ndaghakangoma@gmail.com'}, update: {}, create: {email: 'ndaghakangoma@gmail.com', password: ADMIN_USER_PASSWORD, fullname: "Ndagha Kang'oma", role: 'ADMIN'}});

    const user1 = await prisma.user.upsert({where:{email: 'cis-025-19@must.ac.mw'}, update: {}, create: {email:'cis-025-19@must.ac.mw', password: USER1_PASSWORD, role: 'USER', fullname: "Ndagha Kang'oma"}});

    
    if(user1 && admin_user) console.log('first users created successfully.')
}

createUsers().catch(e=>{console.error(e)}).finally(async()=>{
    await prisma.$disconnect()
})