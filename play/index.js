/* eslint-disable */

import Vue from "vue"
import { play } from "vue-play"
import FlexCarousel from "../src/components/vue-flex-carousel/FlexCarousel.vue"
import Slide from "../src/components/vue-flex-carousel/FlexSlide.vue"

const containerWidth = 500;
const images = [
  {
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    bgColor: '',
    bgImageUrl: "https://placeimg.com/640/480/nature/3",
    innerHtml: `<div>Hi!  I'm html content!</div>`,
    data: {}
  },
  {
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    bgColor: '',
    bgImageUrl: "https://placeimg.com/640/480/nature/1",
    innerHtml: `<div>Hi!  I'm html content!</div>`,
    data: {}
  }
];
const slideCount = 4;

const generateSlides = (createElement) => new Array(slideCount).forEach(() =>
  createElement(Slide, {}, [
    createElement(
      "img",
      {
        style: { width: "100%" },
        attrs: { src: 'https://picsum.photos/800/1120/?random' }
      }
    )
  ])
)

const createContainer = (createElement, width, content) => createElement(
  'div',
  {
    style: {
      width: '100%',
      display: 'flex'
    }
  },
  [
    createElement(
      'div',
      {
        style: {
          width: `${width}px`
        }
      },
      content
    )
  ]
)

play("FlexCarousel", module)
  .add("Default", h => createContainer(
      h, containerWidth, [h(FlexCarousel, {}, generateSlides(h))]
    )
  )
