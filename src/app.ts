import express, { Application, Request, Response } from "express"
import cors from "cors"
import globalErrorHandler from "./middlewares/globalErrorHandler"
import morgan from "morgan"
import router from "./app/routers"
import logger, { morganErrorLogFormat } from "@helpers/logger"
import notFoundHandler from "@middleware/notFoundHandler"
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./swagger"
const app: Application = express()

app.use(cors())

// Parser 
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// Logger 
// Stream morgan logs to winston
app.use(morgan(morganErrorLogFormat, {
    stream: {
      write: (message: string) => logger.info(message.trim())
    }
  }));

  
app.get("/", (req: Request, res: Response)=>{
    res.send({
        message: "Server is up and running"
    })
})


// Mount API routes under /api/v1 prefix
app.use("/api/v1", router);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(globalErrorHandler);
// Not Found
app.use(notFoundHandler)


export default app