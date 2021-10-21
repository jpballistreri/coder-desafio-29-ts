import passport from "passport";
//import { UserModel } from "../models/user";
import Config from "../config";
import {
  VerifyFunction,
  StrategyOption,
  Strategy as FaceBookStrategy,
} from "passport-facebook";
import { Request, Response, NextFunction } from "express";
//import { yargs } from "yargs/yargs";
import { hideBin } from "yargs/helpers";
var argv = require("yargs/yargs")(process.argv.slice(2)).argv;

const fb_app_id = argv.fb_app_id ? argv.fb_app_id : false;
const fb_app_secret = argv.fb_app_secret ? argv.fb_app_secret : false;

interface strategyOptionsI {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  profileFields: string[];
  passReqToCallback: true;
}

const strategyOptions: strategyOptionsI = {
  clientID: Config.FACEBOOK_APP_ID,
  clientSecret: Config.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:8080/api/auth/facebook/callback",
  profileFields: ["id", "displayName", "photos", "emails"],
  passReqToCallback: true,
};

const loginFunc: any = async (
  accessToken: string,
  refreshToken: string,
  profile: string,
  done: any
) => {
  console.log("SALIO TODO BIEN");
  console.log(accessToken);
  console.log(refreshToken);
  console.log(profile);
  return done(null, profile);
};

passport.use(new FaceBookStrategy(strategyOptions, loginFunc));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj: any, cb) {
  cb(null, obj);
});

export const isLoggedIn = (req: Request, res: Response, done: any) => {
  if (!req.isAuthenticated()) return res.render("login");

  done();
};

export default passport;
