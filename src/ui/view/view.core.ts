/**
 * This interface represents the core of a view
 * it handles the logic of the view, calculations, etc.
 * @author akrck02
 */
interface IViewCore {
  setup(): Promise<void>;
}

/**
 * This class contains the basic functionality for a view core
 * it handles the logic of the view, calculations, etc.
 * @implements IViewCore the view core interface
 * @author akrck02
 */
export abstract class ViewCore implements IViewCore {
  /**
   * The setup method of the view core
   * override this method to setup the view core child
   */
  async setup() {}
}
