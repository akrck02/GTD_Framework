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

Every script is a module, the modules may be dependant of other modules.
Read the docs below to understand the usage and behaviour.
## Learn how to 
- [Create UI components.](./docs/dom.md)
- [Make http requests.](./docs/http.md)
- [Create views.](./docs/view.md)
- [Set routes for your app.](./docs/router.md)
- [Text internationalisation.](./docs/i18n.md)
- [Save and load app configuration.](./docs/configuration.md)
- [Load icons.](./docs/icons.md)
- [Set up and handle signals.](./docs/signals.md)

## Utility modules
- [Browser tools.](./docs/browser.md)
- [Path tools.](./docs/paths.md)
- [Cryptographic tools.](./docs/crypto.md)
