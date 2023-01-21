export const initial = { opacity: 0, y: 80, scale: 0.8 }
export const animate = { opacity: 1, y: 0, scale: [0.9, 1.2, 1] }
export const transition = {
  type: 'spring',
  stiffness: 90,
  damping: 15,
}
export const exit = { opacity: 0 }
// export const animate = {
//   x: 0,
//   transition: {
//     duration: 0.2,
//     ease: 'easeInOut',
//   },
// }
// export const exit = {
//   x: '-100vw',
//   transition: {
//     duration: 0.2,
//     ease: 'easeInOut',
//   },
// }
// export const initialFade = {
//   opacity: 0,
// }
// export const animateFade = {
//   opacity: 1,
//   transition: {
//     duration: 0.5,
//     ease: 'easeInOut',
//   },
// }

// const container = {
//   hidden: { x: 0, opacity: 0, scale: 0.8 },
//   visible: {
//     x: 0,
//     opacity: 1,
//     scale: [0.8, 1, 1.2, 1.4, 1.2, 1],
//     transition: {
//       type: 'spring',
//       stiffness: 90,
//       delay: 0.2,
//       damping: 15,
//       delayChildren: 0.5,
//       staggerDirection: -1,
//       staggerChildren: 0.4,
//     },
//   },
// }
// const items = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1 },
// }

// const items = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1 },
// }
