import {Router} from "express";

const userRouter = Router();

userRouter.get('/', (req,res)=>{
    res.send("GET all users")
})
userRouter.get('/:id', (req,res)=>{
    res.send("GET user details")
})
userRouter.post('/', (req,res)=>{
    res.send("CREATE user details")
})
userRouter.put('/:id', (req,res)=>{
    res.send("UPDATE user details")
})
userRouter.delete('/:id', (req,res)=>{
    res.send("DELETE user details")
})

export default userRouter;