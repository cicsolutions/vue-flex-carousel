import Vue from "vue";

export const events = {
  callbacks: {
    onCarouselReady: 'on-carousel-ready',
    onGoPrevSlide: 'on-go-prev-slide',
    onGoNextSlide: 'on-go-next-slide',
    onGoPrevPage: 'on-go-prev-page',
    onGoNextPage: 'on-go-next-page',
    onGoToSlide: 'on-go-to-slide',
    onSlideClick: 'on-slide-click'
  }
}

export const bus = new Vue();

// ideas
// 6. onTransitionStart
// 7. onTransitionEnd
