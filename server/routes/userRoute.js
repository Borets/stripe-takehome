import express from 'express'; 
import User from '../models/userModel'

const router = express.Router(); 

router.get("/createadmin", async (req, res) => { 
    try{
        const user = new User ({
            name: 'Slav',
            email: 'slav@gmail.com',
            password: '1234', 
            isAdmin: true 
        }); 
        
        const newUser = await user.save();
        res.send(user); 

    } catch {
        res.send({msg: error.message})
    }

});

export default router;