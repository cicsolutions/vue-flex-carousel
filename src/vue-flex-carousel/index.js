import FlexCarousel from './components/_CarouselInput.vue'
import Slide from './components/_SlideInput.vue'

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
