<template>
  <mobile-icon-button :mobile-icon="mobileIcon" @click="checkClick"
                      ref="button"
                      id="btnCheck"
                      :class="{ shaking }"
  >
    <slot></slot>
  </mobile-icon-button>
</template>

<script>
import MobileIconButton from "@/components/MobileIconButton";

export default {
  components: {MobileIconButton},
  props: {
    enabled: {type: Boolean, required: true},
    mobileIcon: {type: String, required: true}
  },
  data: () => ({shaking: false}),
  methods: {
    checkClick() {
      if (this.enabled) {
        this.$emit("clicked")
      } else {
        this.shaking = true
      }
    }
  },
  mounted() {
    this.$refs.button.$el.addEventListener("animationend", () => {
      this.shaking = false
    })
  }
}
</script>

<style scoped>
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.shaking {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
</style>
