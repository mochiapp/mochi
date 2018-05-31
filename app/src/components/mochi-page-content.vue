<template>
  <q-page>
    <div class="mochi-page-content-wrapper absolute-full">
      <div class="mochi-page-content-header">
        <slot name="header" />
      </div>
      <div class="mochi-page-content-wrapper-inner">
        <div class="mochi-page-content">
          <slot />
        </div>
      </div>
      <div class="mochi-page-content-footer">
        <slot name="footer" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
}
</script>

<style scoped lang="stylus">
@import '~variables'

.vpage-content-wrapper
  display flex
  flex-direction column

  & > *
    width 100%
    margin auto

.mochi-page-content-wrapper-inner
  overflow auto
  width 100%
  height 100%
  flex 1 1 auto

.mochi-page-content
  width $mochi-page-content-max-width
  max-width 100%
  padding $mochi-page-content-padding
  margin auto

  & /deep/ > *
    width 100%
    margin-bottom 16px
</style>
