import { loadExternalJs, waitVarExists } from '../../plugins/load'
import {EXIF} from 'exif-js'
const pica = require('pica')()

export function limitPixelSize (img, maxW, maxH) {
  return new Promise((resolve, reject) => {
    var perc = maxW / img.width
    if (maxH / img.height < perc) {
      perc = maxH / img.height
    }
    if (perc > 1) {
      perc = 1
    }

    var canvas = document.createElement('canvas')

    let width = parseInt(img.width * perc, 10)
    let height = parseInt(img.height * perc, 10)

    canvas.width = width
    canvas.height = height

    pica.resize(img, canvas).then(result => {
      resolve(canvas)
    })
  })
}

export function exifRotate (img, canvas) {
  return new Promise((resolve, reject) => {
    try {
      EXIF.getData(img, async function () {
        let orientation = EXIF.getTag(this, 'Orientation')

        console.log('orientation', orientation)

        let width = canvas.width
        let height = canvas.height

        var canvas2 = document.createElement('canvas')
        canvas2.width = width
        canvas2.height = height
        var ctx = canvas2.getContext('2d')
        ctx.save()
        var styleWidth = canvas2.style.width
        var styleHeight = canvas2.style.height
        if (orientation) {
          if (orientation > 4) {
            canvas2.width = height; canvas2.style.width = styleHeight
            canvas2.height = width; canvas2.style.height = styleWidth
          }
          switch (orientation) {
            case 2: ctx.translate(width, 0); ctx.scale(-1, 1); break
            case 3: ctx.translate(width, height); ctx.rotate(Math.PI); break
            case 4: ctx.translate(0, height); ctx.scale(1, -1); break
            case 5: ctx.rotate(0.5 * Math.PI); ctx.scale(1, -1); break
            case 6: ctx.rotate(0.5 * Math.PI); ctx.translate(0, -height); break
            case 7: ctx.rotate(0.5 * Math.PI); ctx.translate(width, -height); ctx.scale(-1, 1); break
            case 8: ctx.rotate(-0.5 * Math.PI); ctx.translate(-width, 0); break
          }
        }

        // ctx.drawImage(img,0,0)
        ctx.drawImage(canvas, 0, 0, width, height)
        ctx.restore()

        resolve(canvas2)
      })
    } catch (error) {
      resolve(canvas)
    }
  })
}

export function getBlob (canvas, tp, q) {
  return new Promise((resolve, reject) => {
    tp = tp || 'image/jpeg'
    q = q || 0.85 // https://developers.google.com/speed/docs/insights/OptimizeImages
    pica.toBlob(
      canvas,
      tp,
      q
    ).then(blob => resolve(blob))
    // canvas.toBlob(
    //   blob => resolve(blob),
    //   tp,
    //   q
    // )
  })
}

export function compressWithGuetzli (canvas) {
  return new Promise((resolve, reject) => {
    // loadExternalJs('https://cdn.rawgit.com/chai2010/guetzli-js/master/dist/lib/cxx-emscripten/guetzli.out.js')
    loadExternalJs('../statics/guetzli.js')
    waitVarExists('guetzli_encode_RGBA').then(async (guetzliEncodeRGBA) => {
      let ctx = canvas.getContext('2d')
      let imgd = ctx.getImageData(0, 0, canvas.width, canvas.height)

      let s = guetzliEncodeRGBA(
        imgd.data,
        canvas.width,
        canvas.height,
        0,
        85
      )

      var q = window.guetzli_cToUint8Array(window.guetzli_string_data(s), window.guetzli_string_size(s))
      window.guetzli_string_delete(s)

      resolve(new Blob([q], {type: 'application/octet-stream;'}))
    })
  })
}

export function blobToUrl (q) {
  var urlCreator = window.URL || window.webkitURL
  var imageUrl = urlCreator.createObjectURL(q)
  return imageUrl
}
