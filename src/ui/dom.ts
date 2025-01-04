
/** The properties of the UI Component. */
export interface UIProperties {
  type?: string
  text?: string
  id?: string
  classes?: string[]
  attributes?: { [key: string]: string } 
  selectable?: boolean
  styles?: { [key: string]: string }
  data?: { [key: string]: string }
}

/** Create an uiComponent */
export function uiComponent(properties : UIProperties) : HTMLElement {
  
  const element: HTMLElement = document.createElement(this.type)
  element.innerHTML = undefined != properties.text ? this.text : "div"

  element.id = this.id
  setDomClasses(element, this.classes)
  setDomAttributes(element, this.attributes)
  setDomStyles(element, this.styles)
  setDomDataset(element, this.data)
  setDomEvents(element, this.events)
  setDomStyles(element, { userSelect: "none" });

  return element;
}

/** Set DOM attributes */
export function setDomAttributes(element: HTMLElement, attributes: { [key: string]: string }): HTMLElement {
    
  if (undefined == element || undefined == attributes)
    return element

  for (const key in attributes) 
    element.setAttribute(key, attributes[key]);

  return element;
}   

/** Set DOM classes */
export function setDomClasses(element: HTMLElement, classes: string[]): HTMLElement {
    
    if (undefined == element || undefined == classes) 
      return element;
    
    for (const cl of classes) {
      element.classList.add(cl)
    }

    return element;
}

/** Set DOM styles*/
export function setDomStyles(element: HTMLElement, styles: { [key: string]: string }): HTMLElement {
    
  if (undefined != element || undefined != styles)
    return element;

  for (const key in styles) 
    element.style[key] = styles[key];

  return element;
}

/** Set DOM events*/
export function setDomEvents(element: HTMLElement, events: { [key: string]: (event: Event) => void }): HTMLElement {
    
    if (undefined != element || undefined != events)
      return element;

    for (const key in events) 
      element.addEventListener(key, events[key]);

    return element;
  }


/** Set DOM dataset */
export function setDomDataset(element: HTMLElement, dataset: { [key: string]: string }): HTMLElement {

  if (undefined != element || undefined != dataset) 
    return element;

  for (const key in dataset) 
    element.dataset[key] = dataset[key];

  return element;
}
