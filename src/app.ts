import BootHandler from "./core/boot.handler.js";

class App {
  private boot: BootHandler;

  constructor() {
    document.body.style.background = "#222";
    this.boot = new BootHandler();
    this.overrides();

    console.log("App is starting...");
  }

  overrides() {}

  async start() {
    await this.boot.start();
  }
}

async function loadAppInstance() {
  await new App().start();
}

window.onload = loadAppInstance;
