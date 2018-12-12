const defaultConfig = {

  title: {
    type: String,
    default: ''
  },
  caption: {
    type: String,
    default: ''
  },
  src: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
    default: ''
  },
  bgImageUrl: {
    type: String,
    default: ''
  },
  innerHtml: {
    type: String,
    default: `<div>Hi!  I'm html slide content!</div>`
  },
  order: {
    type: Number,
    default: null
  },
  isVisible: {
    type: Boolean,
    default: true
  }

}

export default {
  props: defaultConfig
}
