<template lang="html">
    <div v-if="running">
      <span class="md-display-3">
        {{ hours }} : {{ minutes }} : {{ seconds }}
      </span>
      <md-button md-theme="red" class="md-fab md-primary stopwatch-btn" @click="toggleStopwatch()">
        <md-icon>stop</md-icon>
      </md-button>
    </div>
    <div v-else>
      <span class="md-display-3">
        00 : 00 : 00
      </span>
      <md-button md-theme="green" class="md-fab md-primary stopwatch-btn" @click="toggleStopwatch()" v-bind:disabled="!selectedProject">
        <md-icon>play_arrow</md-icon>
      </md-button>
    </div>
</template>

<script>
import { getHours, getMinutes, getSeconds } from '@/util/time';

export default {
  name: 'stopwatch',

  data() {
    return {
      hours: '00',
      minutes: '00',
      seconds: '00',
      running: false,
      startTime: null,
      elapsedTime: null,
      interval: null,
    };
  },

  beforeDestroy() {
    if (this.running) {
      this.stopTime();
    }
  },

  computed: {
    selectedProject() {
      return this.$store.getters.selectedProject;
    },
  },

  methods: {
    toggleStopwatch() {
      if (!this.running) {
        this.updatimeTime(true);
        this.startTime = new Date();
        this.interval = setInterval(() => {
          this.updatimeTime();
        }, 1000);
      } else {
        this.stopTime();
      }

      this.running = !this.running;
    },

    stopTime() {
      const stopTime = new Date();
      clearInterval(this.interval);
      this.$store.dispatch('CREATE_TIME_ENTRY',
        {
          elapsedTime: this.elapsedTime,
          startTime: this.startTime,
          stopTime,
        },
      );

      this.$store.dispatch('FETCH_TIME_ENTRIES', {});

      this.elapsedTime = null;
    },

    updatimeTime(reset = false) {
      this.elapsedTime = new Date() - this.startTime;
      this.hours = reset ? '00' : getHours(this.elapsedTime);
      this.minutes = reset ? '00' : getMinutes(this.elapsedTime);
      this.seconds = reset ? '00' : getSeconds(this.elapsedTime);
    },
  },
};
</script>

<style scoped>
.stopwatch-btn {
  margin-top: 0px;
}
</style>
