import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

//middleware

// Allow only your frontend domain
app.use(cors({
    origin: 'https://game-liard-sigma.vercel.app',  // <-- your frontend URL
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    credentials: true   // allow cookies if needed
}));

app.use(express.json());

//api end points
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/',(req,res)=>{
    res.send("Api Working");
});

app.listen(port, ()=> console.log('Server is running on PORT : '+ port));