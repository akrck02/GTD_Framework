# Creating UI components

This module exports functions to manipulate the visual tree (DOM) of your applications.
We are not trying to reinvent the wheel here, every function relies on HTMLElement objects.

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

Sometimes, HTML elements need special attributes that you can pass to the function.
```Typescript
const profilePicture = uiComponent({
	type : "img",
	attributes : {
		src : "./images/cat.png"
	}
}) 

document.body.appendChild(profilePicture)
```

