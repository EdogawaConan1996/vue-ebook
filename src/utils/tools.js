import {setLocalStorage} from "./storage";

export function px2rem(px) {
  const ratio = 375 / 10
  return px / ratio
}

export function realPx(px) {
  const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth
  return px * (maxWidth / 375)
}

export function animationConfig() {
  return {
    animationTime: '0.2s',
    animationType: 'linear'
  }
}

export function flatten(array) {
  // eslint-disable-next-line no-console
  return [].concat(...array.map(item => [].concat(item,...flatten(item.subitems))))
}

export function find(navigation, item, level=0) {
  return item.parent ? find(navigation,navigation.filter(parentItem => parentItem.id === item.parent)[0], ++level) : level
}

export function switchLocale(vue) {
  if (vue.$i18n.locale === 'en') {
    vue.$i18n.locale = 'cn'
  } else {
    vue.$i18n.locale = 'en'
  }
  setLocalStorage('locale', vue.$i18n.locale)
}
