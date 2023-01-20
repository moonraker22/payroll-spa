export const initial = {
  x: '100vw',
}
export const animate = {
  x: 0,
  transition: {
    duration: 0.2,
    ease: 'easeInOut',
  },
}
export const exit = {
  x: '-100vw',
  transition: {
    duration: 0.2,
    ease: 'easeInOut',
  },
}
export const initialFade = {
  opacity: 0,
}
export const animateFade = {
  opacity: 1,
  transition: {
    duration: 0.5,
    ease: 'easeInOut',
  },
}
