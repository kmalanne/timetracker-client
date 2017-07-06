<template lang="html">
  <div v-if="selectedProject" class="stopwatch-content">
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
      <md-button md-theme="green" class="md-fab md-primary stopwatch-btn" @click="toggleStopwatch()">
        <md-icon>play_arrow</md-icon>
      </md-button>
    </div>
  </div>
  <div v-else>
     <span class="md-display-3">Choose a project</span>
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
        clearInterval(this.interval);
        this.$store.dispatch('CREATE_TIME_ENTRY', this.elapsedTime);
        this.elapsedTime = null;
      }

      this.running = !this.running;
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
