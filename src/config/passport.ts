import passport from "passport";
import { BasicStrategy } from "passport-http";
import { User, UserInstance } from "../models/User";
import { NextFunction, Request, Response } from "express";

const notAuthorizedJson = {status: 401, message: 'Não autorizado'}

//configura a Strategy

passport.use(new BasicStrategy(async (email,password, done)=>{
    if(email && password){
        const user = await User.findOne({
            where: {email, passport}
        })
        if (user){
            return done(null,user)
        }

    }
    return done(notAuthorizedJson, false)
 
}))
// middleware
export const privateRoute = (req: Request, res:Response, next: NextFunction) => {
     passport.authenticate('basic', (err: Error,user:UserInstance) => {
        return user ? next() : next(notAuthorizedJson)
    })(req,res,next)

}

export default passport