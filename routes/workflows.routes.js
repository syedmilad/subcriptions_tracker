import {Router} from "express";

const workflowsRouter = Router();

workflowsRouter.get('/',(req, res) => {
    res.send({
        message: "success",
    })
});

export default workflowsRouter;