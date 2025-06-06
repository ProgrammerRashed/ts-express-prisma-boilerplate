import express, { Application, NextFunction, Request, Response } from "express"
import cors from "cors"
import globalErrorHandler from "./middlewares/globalErrorHandler"
const app: Application = express()

import router from "./app/routers"
import { StatusCodes } from "http-status-codes"
app.use(cors())

// Parser 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req: Request, res: Response)=>{
    res.send({
        message: "Server is up and running"
    })
})


app.use("/api", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!"
        }
    })
})
export default app