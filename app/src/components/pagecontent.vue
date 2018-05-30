<template>
  <q-page>
    <div class="ob-pagecontent-wrapper absolute-full">
      <div class="ob-pagecontent-header">
        <slot name="header"></slot>
      </div>
      <div class="ob-pagecontent-wrapper-inner">
        <div class="ob-pagecontent">
          <slot></slot>
        </div>
      </div>
      <div class="ob-pagecontent-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
@import '~variables'

.ob-pagecontent-wrapper
  display: flex;
  flex-direction: column;

  & > *
    width: 100%;
    margin: auto;

.ob-pagecontent-wrapper-inner
  overflow: auto;
  width: 100%;
  height: 100%;
  flex: 1 1 auto;

.ob-pagecontent
  width: $pagecontent-max-width;
  max-width: 100%;
  padding: $pagecontent-padding;
  margin: auto;

  & > *
    width: 100%;
    margin-bottom: 16px;
</style>
