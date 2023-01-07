import jwt from "jsonwebtoken";

const verifyJwt = (handler) => {
  return async (req, res) => {
      const accessToken = req.headers.authorization?.split(' ')[1]
      if (!accessToken) return res.status(403).json({message: "Not authenticated"})
      await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=> {
          if (err) return res.status(403).json({message: err.message})
          req.auth = {
              user: decoded.user
          }
          // console.log(err)
          return handler(req, res)
      })

  }
}

export default verifyJwt