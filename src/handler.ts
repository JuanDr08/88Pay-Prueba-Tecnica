const serverless = require("serverless-http");
import { appServer } from "./app";


exports.handler = serverless(appServer);
