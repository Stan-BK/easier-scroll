# easy-scroll
Easy-scroll enhance the overflow content scroll behavior, you can scroll by default way(scrollbar) or setting the scroll percent, even drag-scroll behavior(like mobile web performance) is supported. 

# Usage
```
npm install @Kkk/easy-scroll
```
This module will register a global methods `EasyScroll`, it's work on DOM,  you should make sure the target element is already rendered in DOM when using it.
```js
// CommonJS
const EasyScroll = require('@kkk/easy-scroll')
// ESModule
import EasyScroll from ('@kkk/easy-scroll')

// you can also access EasyScroll from globalThis
const EasyScroll = globalThis.EasyScroll

EasyScroll(
  el: '.easy-scroll', // pass a element, or a string that can be query by document.querySelector
  options: {
    scrollBehaviour: 'instant', // default 'smooth', define the scroll behavior
    hidden: false // default true, define the scrollbar visibility
  }
)
```