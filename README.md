# easy-scroll
Easy-scroll enhance the overflow content scroll behavior, you can scroll by default way(scrollbar) or setting the scroll percent, even drag-scroll behavior(like mobile web performance) is supported. 

There is a sample run on <https://stan-bk.github.io/easier-scroll/>
# Usage
```
npm install easier-scroll
```
This module will register a global methods `EasierScroll`, it's work on DOM,  you should make sure the target element is already rendered in DOM when using it.
```js
// CommonJS
const EasierScroll = require('easier-scroll')
// ESModule
import EasierScroll from ('easier-scroll')

// you can also access EasierScroll from globalThis
const EasierScroll = globalThis.EasierScroll

const config = EasierScroll(
  el: '.easier-scroll', // pass a element, or a string that can be query by document.querySelector
  options: {
    scrollBehaviour: 'instant', // default 'smooth', define the scroll behavior
    hidden: false, // default true, define the scrollbar visibility
    scrollXcb: (scrollPercentX) => console.log(scrollPercentX), // function fire when scrollPercentX had changed
    scrollYcb: (scrollPercentY) => console.log(scrollPercentY) // function fire when scrollPercentY had changed
  }
)

config.scrollPercentX = 1 // 0 ~ 1, 调整横向滚动距离百分比
config.scrollPercentY = 1 // 0 ~ 1, 调整竖向滚动距离百分比
config.isHiddenPercent = false // 显示原声滚动条，默认为true
```
