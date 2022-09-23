;(function() {
  function EasyScroll(el, opt = {}) {
    createHiddenStyle()
    const { scrollBehaviour = 'smooth', hidden = true } = opt

    if (globalThis.document == null) {
      throw new Error('EasyScroll must run after Document was rendered')
    }

    if (el == null) {
      throw new Error('el must be a document element or a string for querying element')
    }

    const toStr = Object.prototype.toString

    if (typeof el === 'string') {
      el = document.querySelector(el)
    } else if (!toStr.call(el).includes('HTML')) {
      throw new Error('el must be a document element')
    }
    
    if (el.childElementCount !== 1) {
      throw new Error('el must have only 1 childNode')
    }


    const child = el.children[0]
    const { width: w , height: h } = getComputedStyle(el)
    const { width: cw , height: ch } = getComputedStyle(child)
    const offsetX = parseInt(cw) - parseInt(w)
    const offsetY = parseInt(ch) - parseInt(h)
    let isAutoScroll = false
    let scrollTimer = 0
    let lastTime = 0
    const scrollObj = generateScrollObj()

    function generateScrollObj() {
      const O = {
        _percentX: 0,
        _percentY: 0
      }
      Object.defineProperties(O, {
        scrollPercentX: {
          get() {
            return this._percentX
          },
          set(val) {
            this._percentX = val
            if (isAutoScroll) {
              isAutoScroll = false
              return
            }
    
            el.scrollTo({
              left: val * offsetX,
              behavior: scrollBehaviour
            })
          } 
        },
        scrollPercentY: {
          get() {
            return this._percentY
          },
          set(val) {
            this._percentY = val
            if (isAutoScroll) {
              isAutoScroll = false
              return
            }
    
            el.scrollTo({
              top: val * offsetY,
              behavior: scrollBehaviour
            })
          } 
        }
      })
      return O
    }

    initWrapElem()
    function initWrapElem() {
      el.style.overflow = 'scroll'
      hidden && el.classList.add('noScrollBar')
    }
    
    initScrollEvent()
    function initScrollEvent() {
      el.addEventListener('scroll', (e) => {
        isAutoScroll = true
        scrollObj.scrollPercentY = el.scrollTop / offsetY
      })
    }
    
    initDragBehaviour()
    function initDragBehaviour() {
      let queue = []
      el.addEventListener('mousedown', (e) => {
        clearTimeout(scrollTimer)
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
      })

      function mouseMove(e) {
        e.preventDefault()
        queue.push(el.scrollTop)
        if (queue.length > 2) {
          queue.shift()
        }
        el.scrollBy({
          left: -e.movementX,
          top: -e.movementY
        })
      }
      
      function mouseUp(e) {
        if (queue.length > 0) {
          const offsetY = Math.round(queue[1] - queue[0])
          smoothScroll(offsetY, -offsetY / Math.abs(offsetY))
          queue = []
        }
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseUp', mouseUp)
      }

      function smoothScroll(offset, dir, timer) {
        if (offset === 0) return
        if (timer - lastTime >= offset * 10) {
          el.scrollBy({
            top: offset += dir,
            scrollBehaviour: 'smooth'
          })
        }
        scrollTimer = requestAnimationFrame(smoothScroll.bind(this, offset, dir))
      }
    }

    return scrollObj
  }

  globalThis.EasyScroll = EasyScroll

  if (globalThis.document) {
    createHiddenStyle()
  }
  function createHiddenStyle() {
    if (document.getElementsByClassName('easy-scroll-hidden').length > 0) return

    const css = document.createElement('style')
    css.classname = 'easy-scroll-hidden'
    css.innerHTML = `.noScrollBar::-webkit-scrollbar {
      display: none;
    }`
    document.head.appendChild(css)
  }
})()

module.exports = globalThis.EasyScroll
