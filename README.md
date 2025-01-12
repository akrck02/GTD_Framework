# Getting things done library.

This is a library to develop web applications things easier.
Every script is a module, they can be loaded importing the script.
*see module dependencies*

Example for a script importing a module: 

``` Typescript

    import {uiComponent} from "./dom.js" 

    const title = uiComponent({
        type = "h1",
        text = "Hello world!"
    })

    document.body.appendChild(title)

```
