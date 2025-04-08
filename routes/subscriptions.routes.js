import {Router} from "express";
import {createSubscription, getUserSubscriptions} from "../controllers/subscription.controller.js";
import {authorize} from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) => {
    res.send({title: "GET all subscriptions"})
});

subscriptionRouter.get('/id', (req, res) => {
    res.send({title: "GET subscription details"})
});

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/', (req, res) => {
    res.send({title: "UPDATE subscription"})
});

subscriptionRouter.delete('/', (req, res) => {
    res.send({title: "GET all subscription"})
});
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.delete('/:id/cancel', (req, res) => {
    res.send({title: "CANCEL subscription"})
});
subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({title: "GET upcoming renewals"})
});

export default subscriptionRouter