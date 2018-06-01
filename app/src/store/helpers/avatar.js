import {Ucavatar} from 'ucavatar'

export default function generateAvatar (pub) {
  let canvas = document.createElement('canvas')
  canvas.style.cssText = 'display: none;'
  document.body.appendChild(canvas)
  Ucavatar(canvas, pub, 38)
  let url = canvas.toDataURL('image/png')
  canvas.outerHTML = ''
  return url
}
