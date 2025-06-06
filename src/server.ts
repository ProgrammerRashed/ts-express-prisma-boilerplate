import 'module-alias/register';
import { Server } from "http"
import app from "./app"
import logger from '@helpers/logger';



const main = async () =>{
    const server: Server = app.listen(3000, ()=>{
        logger.info("Server is up and running on ", 3000)
    })
}

main()