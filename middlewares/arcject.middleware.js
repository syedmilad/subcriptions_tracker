import aj from "../config/arcjet.js";

export const arcjectMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req,{requested: 1})

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()) res.status(409).json({error:"Rate Limit Exceeded"})
            // if(decision.reason.isBot()) res.status(403).json({error:"No Bot Allowed"})

            // res.status(404).json({error:"access denied"})
        }

        next()
    }catch(err) {
        console.log(`Arcjet middleware error: ${err}`);
        next(err)
    }
}