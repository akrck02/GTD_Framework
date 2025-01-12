# Creating UI components

This module exports functions to manipulate the visual tree (DOM) of your applications.
We are not trying to reinvent the wheel here, every function relies on javascript native `HTMLElement` objects.

## How to  create a new element

You can create a new element calling the `uiComponent()` function.

``` Typescript
const title = uiComponent({
  type : "h1",
  id: "app-title",
  text : "My new app"
})

const subtitle = uiComponent({
  type : "h2",
  classes : ["pretty", "subtitle-new"],
  text : "Hello user, subtitle here!"
})

document.body.appendChild(title)
document.body.appendChild(subtitle)
```

Result HTML:
``` html
<body>
  <h1 id="app-title">My new app</h1>
  <h2 class="pretty subtitle-new">Hello user, subtitle here!</h2>
</body>
```

<hr> 

### Styles
For prototyping, you can also set inline styles.
``` Typescript
const banner = uiComponent({
  type: "div",
  text: "hello there!",
  styles : {
  	width : "2rem",
	height: "1rem",
	background: "#222222",
	color: "#fafafa"
  }
})

document.body.appendChild(banner)
```

Result HTML:
``` html
<div style="width:2rem; height:2rem; background:#222222; color:#fafafa;">
  hello there!
</div>
```

<hr>

### Attributes
Sometimes, HTML need special attributes, just use the `attributes` property.
```Typescript
const profilePicture = uiComponent({
  type : "img",
  attributes : {
    src : "./images/cat.png"
  }
}) 

document.body.appendChild(profilePicture)
```

Result HTML:
``` Html
<img src="./images/cat.png"/>
```

<hr>

### Data 
To add `data` attributes to HTML, just use the `data` property.
``` Typescript
const section = uiComponent({
  type : "section",
  data : {
    topic : "code",
    language : "typescript"
  }
})

document.body.appendChild(section)
```

Result HTML:
``` Html
<section data-topic="code" data-language="typescript"/>
```