import FlexCarousel from './FlexCarousel.vue'
// import Slide from './Slide.vue'

const install = (Vue) => {
    Vue.component('flex-carousel', FlexCarousel)
    // Vue.component('slide', Slide)
}

export default {
    install
}

export {
    FlexCarousel
    // Slide
}
