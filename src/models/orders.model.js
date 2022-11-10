import mongoose from "mongoose"
 
const Order = mongoose.model('Orders',{
    products: { type: "Mixed", default: [], required: true },
    order: {type: "string", required: true},
    timestamp: {type: "string", required: true},
    email: {type: "string", required: true},
    address: {type: "string", required: true},
    status: { type: "string", default: "created", required: true}
});

export default Order