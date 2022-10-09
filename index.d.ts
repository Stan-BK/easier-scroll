interface EasierScrollOption {
  hidden?: Boolean
  scrollXcb?: (percent: number) => any
  scrollYcb?: (percent: number) => any
}

interface EasierScrollControlObj {
  _percentX: number
  _percentY: number
  _isHidden: boolean
  scrollPercentX: number
  scrollPercentY: number
  isHiddenScrollbar: boolean
}

declare module 'easier-scroll' {
  export default function EasierScroll(el: HTMLElement | string, opt: EasierScrollOption): EasierScrollControlObj
}