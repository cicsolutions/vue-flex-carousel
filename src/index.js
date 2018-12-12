import FlexCarousel from './components/FlexCarousel'
import Slide from './components/SlideInput'

const install = (Vue) => {
  Vue.component('flex-carousel', FlexCarousel)
  Vue.component('slide', Slide)
}

export default {
  install
}

export {
  FlexCarousel,
  Slide
}
