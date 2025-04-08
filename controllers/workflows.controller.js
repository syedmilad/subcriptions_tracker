import {createRequire} from "module"
import Subscription from "../models/subscriptions.model.js";

const require = createRequire(import.meta.url) // TO Change the import
const {serve} = require("@upstash/workflow/express")


export const sendReminders = serve(async (context) => {
    const subscriptionId = context.requestPayload
    const subscription = await fetchSubscription(context, subscriptionId)
})
    
async function fetchSubscription(context, subscriptionId) {
    return await context.run("get subscription", async () => {
        return await Subscription.findById(subscriptionId).populate("user", "name email")
    })
}