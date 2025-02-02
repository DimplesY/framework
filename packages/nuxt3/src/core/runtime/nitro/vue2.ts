/**
 * This template is only used for @nuxt/bridge
 *
 * TODO: Move to bridge once render functions was more reusable
 */

// @ts-ignore
import { createRenderer } from '#vue2-server-renderer'
const _renderer = createRenderer({})

// @ts-ignore
const __VUE_SSR_CONTEXT__ = globalThis.__VUE_SSR_CONTEXT__ = {}

export function renderToString (component, context) {
  return new Promise((resolve, reject) => {
    _renderer.renderToString(component, context, (err, result) => {
      const styles = [__VUE_SSR_CONTEXT__, context].map(c => c && c._styles && c._styles.default).filter(Boolean)
      if (!context._styles) { context._styles = {} }
      context._styles.default = {
        ids: [...styles.map(s => s.ids)],
        css: styles.map(s => s.css).join(''),
        media: styles.map(s => s.media).join('')
      }
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

// Basic renderer
// import _renderToString from 'vue-server-renderer/basic'
// export function renderToString (component, context) {
//   return new Promise((resolve, reject) => {
//     _renderToString(component, context, (err, result) => {
//       if (err) {
//         return reject(err)
//       }
//       return resolve(result)
//     })
//   })
// }
