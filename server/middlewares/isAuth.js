import jwt from "jsonwebtoken"

//req — the request sent by the browser to the backend.
//res — the response the backend sends back to the browser or client.
//next — a function that passes control to the next middleware or route handler if authentication succeeds.

const isAuth = async (req, res, next) => {
    try {
        let {token} = req.cookies

        if(!token) {
            return res.status(400).json({message: "user does not have a token"})
        }

        //This line verifies a JWT (JSON Web Token) to check whether it is valid and returns the data stored inside it.
        // The browser sends the cookie (token) automatically, but the backend must explicitly read and verify it.
    const verifyToken = jwt.verify(token , process.env.JWT_SECRET)
      if(!verifyToken){
            return res.status(400).json({message:"user does not have a valid token"})
        }

        //req.userId = verifyToken.userId means storing the logged-in user's ID inside the request object so that the next middleware or route can use it.
        // Why not res.userId?
        //Because req.userId is used to pass the authenticated user's ID to the next middleware or route handler, whereas res is used to send a response back to the frontend.
        req.userId = verifyToken.userId
        next()
    } catch (error) {
         return res.status(500).json({message:`isAuth error : ${error}`})
    }
}
export default isAuth

/*
Yes! req and res are objects provided by Express.js to your route handler or middleware. 

1. req — Request object
Contains information about the incoming request from the browser.
req.body       // Data sent in the request body
req.cookies    // Cookies sent by the browser
req.params     // URL parameters
req.query      // Query string parameters
req.userId     // Custom property you add yourself
*/