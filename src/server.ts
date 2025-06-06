import 'module-alias/register';
import { Server } from "http"
import app from "./app"



const main = async () =>{
    const server: Server = app.listen(3000, ()=>{
        console.log("Server is up and running on ", 3000)
    })
}

main()