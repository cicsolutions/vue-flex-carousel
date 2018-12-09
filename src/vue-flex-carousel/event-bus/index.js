import Vue from "vue";

export const events = {
  callbacks: {
    onCarouselReady: 'on-carousel-ready',
    onGoToPrevious: 'on-go-to-previous',
    onGoToNext: 'on-go-to-next',
    onGoTo: 'on-go-to',
    onSlideClick: 'on-slide-click'
  },
}

export const bus = new Vue();

// ideas
// 6. onTransitionStart
// 7. onTransitionEnd
// 8. onSlideClick
