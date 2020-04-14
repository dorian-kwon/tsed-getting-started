import {Controller, Get, Platform, Res} from "@tsed/common";

@Controller("/rest")
export class RestCtrl {

  constructor(private platform: Platform) {

  }

  @Get("/")
  public getRoutes(@Res() res: Res) {
    return this.platform.getRoutes();
  }
}
