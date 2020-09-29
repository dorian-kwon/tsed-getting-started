import {Configuration, Inject, PlatformApplication} from "@tsed/common";
import "@tsed/platform-express";
import "@tsed/swagger";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as methodOverride from "method-override";
import {join} from "path";

const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  logger: {
    debug: true,
    logRequest: true,
    requestFields: ["reqId", "method", "url", "headers", "query", "params", "duration"]
  },
  mount: {
    "/rest": [
      `${rootDir}/controllers/**/*.ts` // Automatic Import, /!\ doesn't works with webpack/jest, use  require.context() or manual import instead
    ]
  },
  componentsScan: [
    "${rootDir}/mvc/**/*.ts",
    "${rootDir}/services/**/*.ts",
    "${rootDir}/middlewares/**/*.ts"
  ],
  swagger: [
    {
      path: "/api-docs"
    }
  ],
  calendar: {
    token: true
  },
  statics: {
    "/": join(__dirname, "..", "statics")
  }
})
export class Server {
  @Inject()
  app: PlatformApplication;

  /**
   * This method let you configure the middleware required by your application to works.
   * @returns {Server}
   */
  $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));

    return null;
  }
}
