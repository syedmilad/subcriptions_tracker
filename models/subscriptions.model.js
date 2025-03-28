import mongoose from "mongoose";

const subscriptionsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: 2,
        maxlength: 100
    },
    price:{
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be greater than 0"],
    },
    currency:{
        type: String,
        enum: ["USD","PKR","IND"],
        default: "PKR"
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
        type: String,
        enum: ["sports", "entertainment", "lifestyle", "finance", "news", "technologies", "others"],
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment methods is required"],
        trim: true
    },
    status: {
        type: String,
        enum: ["active","canceled","expired"],
        default: "active"
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: "Start date must be in the past"
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function(value){
               return value > this.startDate
            },
            message: "Start date must be in the past"
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    }
},{timestamps: true});

subscriptionsSchema.pre("save",function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 265
        }

        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate < new Date()){
        this.status = "expired"
    }
    next()
});

const Subscription = mongoose.model("Subscription", subscriptionsSchema);

export default Subscription;