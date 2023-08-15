import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import customerRouter from './routes/customerRoutes'
import businessRouter from './routes/businessRoutes'
import resetPasswordRouter from './routes/passwordResetRoutes'
import accomodationRouter from './routes/accomodation'
import cartRouter from './routes/cart';
import purchaseRouter from './routes/purchase'


dotenv.config()
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: true,
    credential: true
}

//middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser());

app.get('/',(req:Request, res: Response)=>{
    res.send("<h1>TRAVEL BOOKING SERVER</h1>")
})

//routes
app.use("/customer-auth",customerRouter)
app.use("/business-auth", businessRouter)
app.use("/",resetPasswordRouter)
app.use("/api/accomodations", accomodationRouter)
app.use('/cart', cartRouter)
app.use('/purchase', purchaseRouter)

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})