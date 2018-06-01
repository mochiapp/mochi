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

.mochi-page-content-wrapper
  display flex
  flex-direction column
  background-color $mochi-page-background-color

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

  & /deep/ > .q-card
    // box-shadow 0 0 0 1px rgba(0,0,0,0.05), 0 2px 0 0 rgba(0,0,0,0.08) !important
    box-shadow none !important
    background-color $mochi-page-item-background-color
</style>
