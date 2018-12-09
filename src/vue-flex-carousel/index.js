import FlexCarousel from './FlexCarousel.vue'
import Slide from './FlexSlide.vue'

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
