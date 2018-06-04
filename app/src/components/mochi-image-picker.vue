<template>
  <div class="wrapper">
    <q-dialog
      v-model="xshowDialog"
      class="dialog"
    >
      <span slot="title">{{ xtitle }}</span>

      <div slot="body">
        <div>
          <div
            ref="img"
            class="img"
            src="../statics/test.jpg"
          />
        </div>
        <div class="row">
          <q-btn
            icon="camera_alt"
            @click="clickUpload"
          />
          <q-btn
            icon="rotate_left"
            @click="clickRotateLeft"
          />
          <q-btn
            icon="rotate_right"
            @click="clickRotateRight"
          />
          <div class="col row items-center justify-end">
            <img
              ref="prev2"
              class="prev prev2"
            >
            <img
              ref="prev1"
              class="prev prev1"
            >
          </div>
        </div>
      </div>

      <template
        slot="buttons"
        slot-scope="props"
      >
        <q-btn
          :label="$t('Cancel')"
          @click="props.cancel"
        />
        <q-btn
          :label="$t('Apply')"
          color="primary"
          @click="clickApply"
        />
      </template>
    </q-dialog>

    <input
      id="file"
      ref="file"
      class="file"
      type="file"
      name="file"
      accept=".png, .jpg, .jpeg, .gif"
      @change="readURL"
    >
  </div>
</template>

<script>
import i18next from 'i18next'
import {EXIF} from 'exif-js'
import {Croppie} from 'croppie'
import 'croppie/croppie.css'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },

    title: {
      type: String,
      default: '-'
    },

    src: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      croppie: null
    }
  },

  computed: {
    xtitle () { return this.title === '-' ? i18next.t('image:select_image') : this.title },
    xshowDialog: {
      get () { return this.showDialog },
      set (v) { if (!v) this.$emit('dialog-closed') }
    }
  },

  beforeCreate () {
    i18next.loadNamespaces('image')
  },

  mounted () {
    this.initCroppie()
  },

  methods: {
    clickUpload () {
      this.$refs.file.click()
    },

    initCroppie () {
      let that = this
      var el = this.$refs.img

      this.croppie && this.croppie.destroy()

      el.addEventListener('update', function (ev) {
        that.updatePreview()
      })

      this.croppie = new Croppie(el, {
        enableExif: false,
        viewport: { width: 160, height: 160, type: 'circle' },
        boundary: { width: 160, height: 160 },
        showZoomer: true,
        enableOrientation: true,
        enforceBoundary: false
      })

      that.setUrl({
        url: that.src,
        zoom: 1
      })
    },

    setUrl (data) {
      let that = this
      that.croppie.bind(data).then(_ => {
        setTimeout(_ => {
          that.updatePreview()
        }, 200)
      })
    },

    updatePreview () {
      let that = this
      setTimeout(_ => {
        that.croppie.result({
          type: 'rawcanvas',
          size: 'viewport',
          format: 'jpeg',
          quality: 1,
          circle: false
        }).then(function (data) {
          let src = data.toDataURL('image/png')
          that.$refs.prev1.src = src
          that.$refs.prev2.src = src
        })
      }, 1)
    },

    readURL () {
      let that = this
      let input = this.$refs.file
      if (input.files && input.files[0]) {
        var reader = new FileReader()

        reader.onload = function (e) {
          let exif = that.getExif()
          that.setUrl({
            url: e.target.result,
            orientation: exif.orientation
          })
        }

        reader.readAsDataURL(input.files[0])
      }
    },

    getExif () {
      let ret = {}
      var img1 = this.$refs.img
      EXIF.getData(img1, function () {
        ret.make = EXIF.getTag(this, 'Make')
        ret.model = EXIF.getTag(this, 'Model')
        ret.orientation = EXIF.getTag(this, 'Orientation')
      })
      return ret
    },

    clickRotateLeft () {
      this.croppie.rotate(90)
    },

    clickRotateRight () {
      this.croppie.rotate(-90)
    },

    clickApply () {
      let that = this
      that.croppie.result({
        type: 'rawcanvas',
        size: 'viewport',
        format: 'jpeg',
        quality: 1,
        circle: false
      }).then(function (data) {
        that.$emit('image-picked', { src: data.toDataURL('image/png') })
      })
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~variables'

.dialog /deep/ .modal-body
    min-height 260px
    max-height inherit !important

.img
  width 300px

.file
  display none

.prev
  border-radius 50%

.prev1
  width 40px
  height 40px
  margin-left $flex-gutter-xs

.prev2
  width 24px
  height 24px
</style>
