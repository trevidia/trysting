import cors from "cors";

function CorsMiddleware(req, res){
    const corsOptions = {
        origin: "*",
        methods: ["GET", "POST"],
    }
    console.log(req.headers)
    const corsMiddleware = cors(corsOptions)
  return new Promise((resolve, reject) =>{

      corsMiddleware(req, res, (result)=>{
          if (result instanceof Error){
              return reject(result)
          }
          return resolve(result)
      })
})
}

export default CorsMiddleware