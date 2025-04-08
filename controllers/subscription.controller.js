import Subscription from "../models/subscriptions.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.create({
            ...req.body,
            user: req.user._id
        })

        res.status(201).json({
            message: "Subscription created successfully",
            data: subscriptions
        })
    } catch (err) {
        next(err)
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        console.log({
            "req.user.id": req.user.id,
            "req.user._id": req.user._id,
            "req.params.id": req.params.id,
        })
        //     check the user is same as the token
        if(req.user.id !== req.params.id){
            res.status(401).json({
                error: "you are not owner on this account"
            })
        }
        const subscriptions = await Subscription.find({user: req.params.id})
        res.status(200).json({
            success: true,
            data: subscriptions
        })
    } catch (err) {
        next(err)
    }
}