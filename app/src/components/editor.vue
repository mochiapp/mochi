<template>
  <div class="ob-editor-wrapper">
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,400italic,700|Roboto+Condensed:400,400italic,700|PT+Serif:400,400italic,700|Kalam:400,700|Ubuntu+Mono:400,400italic,700' rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
    <!-- <div v-html="content" style="max-height: 200px; overflow: hidden;"></div> -->

    <pre class="ob-editor-content" ref="obEditor" :spellcheck="spellcheck"></pre>

    <div id="toolbar" ref="obEditorToolbar">
      <select class="ql-font ob-sel-minwidth ob-sel-dd" title="Font">
        <option selected>Font</option>
        <option value="Roboto, Sans-serif">Sans Serif</option>
        <option value="'Roboto Condensed', Sans-serif">Condensed</option>
        <option value="'PT Serif', Serif">Serif</option>
        <option value="Kalam, Cursive">Handwriting</option>
        <option value="'Ubuntu Mono', Monospace">Monospace</option>
      </select>

      <select class="ql-size ob-sel-minwidth ob-sel-dd" title="Size">
        <option selected>Size</option>
        <option value="10.7px">8</option>
        <option value="12px">9</option>
        <option value="13.3px">10</option>
        <option value="14.7px">11</option>
        <option value="16px">12</option>
        <option value="18.7px">14</option>
        <option value="24px">18</option>
        <option value="32px">24</option>
        <option value="40px">30</option>
        <option value="48px">36</option>
        <option value="64px">48</option>
        <option value="80px">60</option>
        <option value="96px">72</option>
      </select>

      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <!-- <button class="ql-strike"></button> -->

      <!-- <button class="ql-underline"></button> -->
      <!-- <button class="ql-script" value="sub"></button> -->
      <!-- <button class="ql-script" value="super"></button> -->

      <select class="ql-ccstyles ob-sel-dd">
        <option value="strike"></option>
        <option value="underline"></option>
        <option value="super"></option>
        <option value="sub"></option>
      </select> 

      <select class="ql-color" title="Color">
        <option selected>Default</option>
        <option v-for="c in getColors()" :key="c" :value="c" />
      </select>

      <select class="ql-background" title="Background color">
        <option selected>Default</option>
        <option v-for="c in getColors()" :key="c" :value="c" />
      </select>

      <button class="ql-link"></button>

      <span class="ob-editor-dropdown-span">
        <svg viewBox="0 0 18 18"> <polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"></polygon> <polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"></polygon> </svg>
        <select class="ql-align">
          <option selected></option>
          <option value="right"></option>
          <option value="center"></option>
          <option value="justify"></option>
        </select>
      </span>
      
      <button class="ql-image"></button>
      
      <button title="Spellcheck" v-on:click="clickSpellcheck"><v-icon :color="spellcheck ? 'black' : 'grey lighten-1'">spellcheck</v-icon></button>

      <!-- // toolbar: [['bold', 'italic'], ['link', 'image'], [{ 'color': [] }, { 'background': [] }], [{ 'font': [] }]] -->
    </div>
  </div>
</template>

<style>
.ob-editor-dropdown-span {
  float: left;
  position: relative;
}

.ob-editor-dropdown-span > .ql-picker .ql-picker-label {
  width: 36px;
}

.ob-editor-dropdown-span > .ql-picker .ql-picker-label svg {
  width: 18px;
}

.ob-editor-dropdown-span > .ql-picker {
  width: 36px;
}

.ob-sel-dd .ql-picker-label > svg > .ql-stroke, .ob-editor-dropdown-span > svg > .ql-stroke {
  stroke: #ccc !important;
}

.ob-editor-dropdown-span > svg {
  position: absolute;
  margin-top: -9px;
  right: 0;
  top: 50%;
  width: 18px;
}

.ob-editor-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.ob-editor-content {
  overflow-y: auto;
  font-family: var(--ob-ed-font-family);
  font-size: var(--ob-ed-font-size);
  word-break: break-word;
}

.ob-editor-wrapper .ql-picker-options {
  top: inherit !important;
  bottom: 24px !important;
  box-shadow: rgba(0,0,0,0.1) 0 1px 4px !important;
}

.ql-container, .ql-toolbar {
  border: none !important;
}

.ql-toolbar {
  /* background-color: var(--color-main); */
  box-shadow: 0 -8px 10px -6px var(--ob-shadow-color) !important;
}

.ob-editor-wrapper button i {
  font-size: 20px !important;
}

.ql-picker.ob-sel-minwidth {
  width: inherit !important;
}

.ql-picker.ob-sel-minwidth .ql-picker-label {
  padding-right: 20px !important;
}

.ql-color-picker .ql-picker-options {
  width: 212px !important;
}

.ql-color-picker .ql-picker-item:first-child {
  color: black !important;
  background-color: white !important;
  width: 100% !important;
  height: inherit !important;
}

.ql-color-picker .ql-picker-item:first-child::before {
  content: "Default" !important;
}

.ql-font .ql-picker-options .ql-picker-item:first-child, .ql-size .ql-picker-options .ql-picker-item:first-child {
  color: white !important;
  background-color: white !important;
}

.ql-font .ql-picker-options .ql-picker-item:first-child::before, .ql-size .ql-picker-options .ql-picker-item:first-child::before {
  content: "Default" !important;
  color: black;
}

.ql-font .ql-picker-options .ql-picker-item:first-child:hover::before, .ql-size .ql-picker-options .ql-picker-item:first-child:hover::before {
  color: #06c;
}

.ql-ccstyles .ql-picker-item {
  padding: 0 !important;
}
.ql-ccstyles .ql-picker-label {
  float: left;
  position: relative;
  width: 38px;
}
.ql-ccstyles .ql-picker-label::before {
  font-size: 22px;
  font-family: 'Material Icons';
  content: 'strikethrough_s';
  position: absolute;
  left: 2px;
  top: 1px;
  /* font-family: "FontAwesome"; */
  /* content: "\f12b"; */
}
.ql-ccstyles .ql-picker-item::before {
  /* font-family: 'Material Icons';
  font-size: 18px;
  content: 'format_underlined'; */
  font-family: "FontAwesome";
  font-size: 18px;
  content: "\f0cd";
}
.ql-ccstyles .ql-picker-item[data-value="strike"] {
  transform: translateX(-3px)
}
.ql-ccstyles .ql-picker-item[data-value="strike"]::before {
  font-size: 22px;
  font-family: 'Material Icons';
  content: 'strikethrough_s';
}
.ql-ccstyles .ql-picker-item[data-value="sub"]::before {
  content: "\f12c";
}
.ql-ccstyles .ql-picker-item[data-value="super"]::before {
  content: "\f12b";
}

.ob-editor-wrapper input.ql-image[type=file] {
  display: none;
}

/* Set dropdown font-families */
.ob-editor-wrapper .ql-font span[data-label="Default"]::before {
  font-family: var(--ob-ed-font-family);
}
.ob-editor-wrapper .ql-font span[data-label="Regular"]::before {
  font-family: "Roboto";
}
.ob-editor-wrapper .ql-font span[data-label="Condensed"]::before {
  font-family: "Roboto Condensed";
}
.ob-editor-wrapper .ql-font span[data-label="Serif"]::before {
  font-family: "PT Serif";
}
.ob-editor-wrapper .ql-font span[data-label="Handwriting"]::before {
  font-family: "Kalam";
}
.ob-editor-wrapper .ql-font span[data-label="Monospace"]::before {
  font-family: "Ubuntu Mono";
}
</style>

<script>
import 'quill/dist/quill.snow.css'
import Quill from 'quill/dist/quill'
import Renderer from '@/lib/quill/deltatodoc'
import { loadExternalJs, waitVarExists } from '@/modules/load'

let quill

function shadeColor2 (color, percent) {
  var f = parseInt(color.slice(1), 16)
  var t = percent < 0 ? 0 : 255
  var p = percent < 0 ? percent * -1 : percent
  var R = f >> 16
  var G = f >> 8 & 0x00FF
  var B = f & 0x0000FF
  return '#' + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1)
}

// function blendColors (c0, c1, p) {
//   var f = parseInt(c0.slice(1), 16), t = parseInt(c1.slice(1), 16), R1 = f >> 16, G1 = f >> 8 & 0x00FF, B1 = f & 0x0000FF, R2 = t >> 16, G2 = t >> 8 & 0x00FF, B2 = t & 0x0000FF
//   return '#' + (0x1000000 + (Math.round((R2 - R1) * p) + R1) * 0x10000 + (Math.round((G2 - G1) * p) + G1) * 0x100 + (Math.round((B2 - B1) * p) + B1)).toString(16).slice(1)
// }

export default {
  data () {
    return {
      spellcheck: false
    }
  },

  props: [
    'content'
  ],

  mounted () {
    let that = this

    this.quillRegisterAll()

    quill = new Quill(this.$refs.obEditor, {
      theme: 'snow',
      modules: {
        toolbar: {
          container: this.$refs.obEditorToolbar,
          handlers: this.quillGetHandlers()
        }
      },
      bounds: this.$refs.obEditor // Prevents popups, like link edits, to be outside of the editor pane (and possibly clipped by the parents).
    })

    // Set the content this way (instead of innerHTML), so whitespace is not automatically collapsed.
    // todo Protect against code injection?
    quill.clipboard.dangerouslyPasteHTML(0, this.content)

    quill.on('text-change', function (delta, oldDelta, source) {
      let deltaOps = quill.getContents().ops
      // console.log('deltaOps', deltaOps)
      let doc = new Renderer(deltaOps)
      let res = doc.convertTo('html')
      // console.log('res', res)
      let html = res.content
      // todo Protect against code injection?
      that.$emit('editChanged', html)
      // console.log('!!! html', html)
    })
  },

/*
--------------------------------------------------------------------------
--------------------------------------------------------------------------
*/

  methods: {

/*
--------------------------------------------------------------------------
*/

    clickSpellcheck () {
      this.spellcheck = !this.spellcheck

      // Force redraw, so spellcheck red underlines are removed.
      var range = quill.getSelection()
      let deltaOps = quill.getContents().ops
      quill.setContents(deltaOps)
      quill.setSelection(range)
      quill.root.focus()
    },

/*
--------------------------------------------------------------------------
*/

    getBaseColors () {
      let ret = []
      ret.push('#980000')
      ret.push('#ff0000')
      ret.push('#ff9900')
      ret.push('#ffff00')
      ret.push('#00ff00')
      ret.push('#00ffff')
      ret.push('#4a86e8')
      ret.push('#0000ff')
      ret.push('#9900ff')
      ret.push('#ff00ff')
      return ret
    },

/*
--------------------------------------------------------------------------
*/

    getColors () {
      let ret = []
      ret.push('#000000')
      ret.push('#434343')
      ret.push('#666666')
      ret.push('#999999')
      ret.push('#b7b7b7')
      ret.push('#cccccc')
      ret.push('#d9d9d9')
      ret.push('#efefef')
      ret.push('#f3f3f3')
      ret.push('#ffffff')

      let baseColors = this.getBaseColors()
      ret = [...ret, ...baseColors]

      for (let f of [0.8, 0.5, -0.3, -0.6]) {
        let colors = [...baseColors]
        for (let i in colors) {
          colors[i] = shadeColor2(colors[i], f)
        }
        ret = [...ret, ...colors]
      }

      return ret
    },

/*
--------------------------------------------------------------------------
*/

    quillRegisterAll () {
      let that = this

      let Font = Quill.import('attributors/style/font')
      Font.whitelist = null // Allow any!?
      Quill.register(Font, true)

      let Size = Quill.import('attributors/style/size')
      Size.whitelist = null // Allow any!?
      Quill.register(Size, true)

      let Align = Quill.import('attributors/style/align')
      Align.whitelist = null // Allow any!?
      Quill.register(Align, true)

      let BlockEmbed = Quill.import('blots/block/embed')
      class ImageBlot extends BlockEmbed {
        static create (value) {
          let node = super.create()
          if (value.iid && value.iid !== '') {
            let iconSVG = `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 90 66'><defs><symbol id='a' viewBox='0 0 90 66' opacity='0.3'><path d='M85 5v56H5V5h80m5-5H0v66h90V0z'/><circle cx='18' cy='20' r='6'/><path d='M56 14L37 39l-8-6-17 23h67z'/></symbol></defs><use xlink:href='#a' width='90px' x='0'/></svg>`
            node.setAttribute('src', 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(iconSVG))
            node.setAttribute('width', '50px')
            that.quillImgIpfsLoad(value.iid).then((src) => {
              node.setAttribute('src', '')
              node.setAttribute('src', src)
              node.removeAttribute('width')
            })
          } else {
            node.setAttribute('src', value.url)
          }
          value.alt && node.setAttribute('alt', value.alt)
          node.setAttribute('iid', value.iid)
          return node
        }
        static value (node) {
          return {
            alt: node.getAttribute('alt'),
            url: node.getAttribute('src'),
            iid: node.getAttribute('iid')
          }
        }
      }
      ImageBlot.blotName = 'image'
      ImageBlot.tagName = 'img'
      Quill.register(ImageBlot)
    },

/*
--------------------------------------------------------------------------
*/

    quillGetHandlers () {
      return {
        'ccstyles': function (value) {
          // console.log('ccstyles', value, quill.getFormat())
          switch (value) {
            case 'strike':
              quill.format('strike', !quill.getFormat().strike)
              break
            case 'underline':
              quill.format('underline', !quill.getFormat().underline)
              break
            case 'super':
              quill.format('script', quill.getFormat().script === 'super' ? false : 'super')
              break
            case 'sub':
              quill.format('script', quill.getFormat().script === 'sub' ? false : 'sub')
              break
          }
        },

        'image': this.quillImgHandler.bind(this)
      }
    },

/*
--------------------------------------------------------------------------
*/

    quillImgHandler () {
      let that = this

      let fileInput = quill.container.querySelector('input.ql-image[type=file]')

      if (fileInput == null) {
        fileInput = document.createElement('input')
        fileInput.setAttribute('type', 'file')
        fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon')
        fileInput.classList.add('ql-image')

        fileInput.addEventListener('change', () => {
          that.quillImgFileSelected(fileInput)
        })

        quill.container.appendChild(fileInput)
      }

      fileInput.click()
    },

/*
--------------------------------------------------------------------------
*/

    quillImgFileSelected (fileInput) {
      let that = this

      const files = fileInput.files
      if (!files || !files.length) {
        return
      }

      quill.enable(false)

      var reader = new FileReader()
      reader.addEventListener('load', function () {
        that.quillImgIpfsUpload(reader.result).then((data) => {
          that.quillImgEmbed(data)
          fileInput.value = ''
        }).catch(error => {
          console && console.error('quill image upload failed', error)
          quill.enable(true)
        })
      }, false)

      reader.readAsArrayBuffer(files[0])
    },

/*
--------------------------------------------------------------------------
*/

    quillImgIpfsUpload (data) {
      let that = this

      return new Promise((resolve, reject) => {
        that.initIpfs().then((ipfs) => {
          ipfs.on('ready', () => {
            ipfs.files.add(Buffer.from(data)).then((response) => {
              let blob = new Blob([data])
              resolve({ipfsId: response[0].hash, base64Url: window.URL.createObjectURL(blob)})
            }).catch((err) => {
              console && console.error('Error uploading to IPFS', err)
              reject(err)
            })
          })
        })
      })
    },

/*
--------------------------------------------------------------------------
*/

    quillImgEmbed (data) {
      const range = quill.getSelection(true)

      quill.enable(true)

      quill.insertEmbed(
        range.index,
        'image',
        {
          // alt: '',
          url: data.base64Url,
          iid: data.ipfsId
        },
        Quill.sources.USER
      )

      quill.setSelection(range.index + 1, Quill.sources.SILENT)
    },

/*
--------------------------------------------------------------------------
*/

    initIpfs () {
      loadExternalJs('https://unpkg.com/ipfs/dist/index.min.js')
      return new Promise((resolve, reject) => {
        waitVarExists('Ipfs').then((IPFS) => {
          resolve(new IPFS())
        })
      })
    },

/*
--------------------------------------------------------------------------
*/

    quillImgIpfsLoad (iid) {
      let that = this

      return new Promise((resolve, reject) => {
        that.initIpfs().then((ipfs) => {
          ipfs.on('ready', () => {
            ipfs.files.cat(iid, function (err, file) {
              if (err) {
                throw err
              }
              var blob = new Blob([file])
              resolve(window.URL.createObjectURL(blob))
            })
          })
        })
      })
    }
  }
}
</script>
