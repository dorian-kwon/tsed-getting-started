import {$log} from "@tsed/common";
import {PlatformExpress} from "@tsed/platform-express";
import {Server} from "./Server";

async function bootstrap(settings = {}) {
  try {
    $log.debug("Start server...");
    const server = await PlatformExpress.bootstrap(Server, settings);

    await server.listen();
    $log.debug("Server initialized");
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
