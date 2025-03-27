import {Router} from "express";

const authRouter = Router();

authRouter.post('/sign-in', (req,res)=>{
    res.send({title: "user signed in"});
})
authRouter.post('/sign-up', (req,res)=>{
    res.send({title: "user signed up"});
})
authRouter.post('/sign-out', (req,res)=>{
    res.send({title: "user signed out"});
})

export default authRouter;