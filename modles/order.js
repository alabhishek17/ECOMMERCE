const mongoose = require("mongoose")

const iteamsSchema = {
    product: {
        type: mongoose.Types.ObjectId,
    },
    qty: {
        type: Number,
    },
};

const addressSchema = {
    addressLine1: {
        type: String,
        required: true,
    },
    addressLine2: {
        type: String,
        required: false,
        default: "-",
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    _id: false,
}


const orderSchema = new mongoose.Schema(
    {
    items: {
        type: [iteamsSchema],
    },

    totalAmount: {
        type: Number
    },

    deliveryAddress: {
        type: addressSchema
    },
    billingAddress: {
        type: addressSchema
    },
    modeofPayment: {
        type: String,
        enum: ["COD", "ONLINE"],
    },
    orderStatus: {
        type: String,
        enum: ["PENDING", "IN_PROCESS", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED", "RETURN", "CANCLED"],
        default: "PENDING"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
    }

},
    {
        timestamps: true,  //createdAt, updatedAt
    }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;