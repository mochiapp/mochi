<template>
  <span>
    {{ctime}}
  </span>
</template>

<script>
export default {
  data() {
    return {
      tmp: 0
    }
  },

  props: {
    interval: {
      type: Number,
      default: 30
    },
    time: {
      type: Number
    }
  },

  mounted() {
    setInterval(this.onInterval, this.interval * 1000)
  },

  computed: {
    ctime () {
      var time = this.time + this.tmp
      time /= 1000
      // return moment.unix(time).format('dddd, MMMM Do, YYYY h:mm:ss A')
      return moment.unix(time).fromNow()
    }
  },

  methods: {
    onInterval() {
      this.tmp ++
      if (this.tmp > 100) {
        this.tmp = 0
      }
    }
  }
}
</script>
