interface IViewCore {
  setup(): Promise<void>;
}
export abstract class ViewCore implements IViewCore {
  async setup() {}
}
