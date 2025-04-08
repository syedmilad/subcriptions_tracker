import {Client as workflowClient} from "@upstash/workflow"
import {QSTASH_TOKEN, QSTASH_URL} from "./env.js";

export default workflowClient = new workflowClient({
    baseURL: QSTASH_URL,
    token: QSTASH_TOKEN,
})