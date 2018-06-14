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

export function dataURLtoUint8 (dataurl) {
  var arr = dataurl.split(',')
  // var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return u8arr
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

export function getBlobMoz (ary, q) {
  return new Promise((resolve, reject) => {
    q = q || 0.85

    loadExternalJs('https://cdn.rawgit.com/li-na/mozjpeg.js/master/demo/js/cjpeg.min.js')
    waitVarExists('cjpeg').then(async (cjpeg) => {
      console.log('getBlobMoz', '' + parseInt(q * 100))
      let output = cjpeg(ary, ['-quality', '' + parseInt(q * 100), '-optimize'])
      // console.log('out', output)
      var blob = new Blob([output.data], { type: 'image/jpeg' })
      resolve(blob)
    })
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

export function canvasToBmpUrl (canvas) {
  return canvas.toDataURL('image/bmp')
}

export function calcSsim (src1, src2) {
  return new Promise((resolve, reject) => {
    loadExternalJs('https://unpkg.com/ssim.js@^3.0.0')
    waitVarExists('ssim').then(async (ssim) => {
      console.log('ssim loaded')
      ssim(src1, src2/* , {ssim: 'bezkrovny', downsample: false} */)
        .then(function (out) {
          console.log('SSIM:', out.mssim, '(', out.performance, 'ms)')
          resolve(out)
        })
        .catch(function (err) {
          console.error('Error generating SSIM', err)
          reject(err)
        })
    })
  })
}

export function compressOptimalStep (opt) {
  return new Promise((resolve, reject) => {
    (async () => {
      let blob
      if (opt.algo !== 'mozjpeg') {
        blob = await getBlob(opt.canvas, 'image/jpeg', opt.qual)
      } else {
        blob = await getBlobMoz(opt.ary, opt.qual)
      }

      let src2 = blobToUrl(blob)
      let ss = await calcSsim(opt.src1, src2)
      console.log('qual', opt.qual, 'ssim', ss.mssim, opt.desired)
      if (Math.abs(opt.desired - ss.mssim) < opt.bestSsimDiff) {
        console.log('NEW BEST diff', opt.bestSsimDiff, Math.abs(opt.desired - ss.mssim))
        console.log('New best qual', opt.bestQual, opt.qual)
        opt.bestSsimDiff = Math.abs(opt.desired - ss.mssim)
        opt.bestQual = opt.qual
        opt.bestBlob = blob
      }
      opt.stepsDone++
      if (opt.stepsDone < opt.minSteps && opt.qualStep > 0.01) {
        console.log('NEXT STEP')
        let dir = 0
        if (ss.mssim > opt.desired) {
          dir = -1
        } else {
          dir = 1
        }
        console.log('dir', dir)
        if ((opt.lastDir !== dir && opt.lastDir !== 0) || opt.dirChanging !== 0 || opt.qual + dir * opt.qualStep > 0.999 || opt.qual + dir * opt.qualStep < 0.001) {
          opt.qualStep /= 2
          opt.dirChanging = 1
          console.log('opt.qualStep /= 2', opt.qualStep)
        }
        opt.qual += dir * opt.qualStep
        console.log('new qual', opt.qual)
        opt.lastDir = dir
        await compressOptimalStep(opt)
      }
      console.log('step done')
      resolve()
    })().catch(err => {
      reject(err)
    })
  })
}

export function compressOptimal (canvas, algo) {
  return new Promise((resolve, reject) => {
    (async () => {
      let opt = {
        desired: 0.98, // 0.985, (ssim)
        qualStep: 0.1,
        stepsDone: 0,
        minSteps: 10,
        qual: 0.8,
        bestQual: 0.85,
        bestSsimDiff: 1,
        lastDir: 0,
        dirChanging: 0,
        canvas: canvas,
        src1: canvasToBmpUrl(canvas),
        algo: algo
      }

      if (opt.algo === 'mozjpeg') {
        // opt.ary = dataURLtoUint8(canvasToBmpUrl(canvas))
        opt.ary = dataURLtoUint8(canvas.toDataURL('image/jpeg'), 1)
        // opt.ary = dataURLtoUint8(canvas.toDataURL('image/png'))
      }

      await compressOptimalStep(opt)
      console.log('DONE... Best qual', opt.bestQual)
      resolve(opt)
    })().catch(err => {
      reject(err)
    })
  })
}
