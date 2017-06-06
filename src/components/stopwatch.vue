<template lang="html">
  <div class="stopwatch">
    <div v-if="selectedProject" class="stopwatch-content">
      <div class="stopwatch-time">
        <div v-if="running">
          {{ hours }} : {{ minutes }} : {{ seconds }}
        </div>
        <div v-else>
          00 : 00 : 00
        </div>        
      </div>
      <button type="button" class="btn btn-primary btn-start-stop"
        @click="toggleStopwatch()">
        {{ running ? 'STOP' : 'START' }}
      </button>
    </div>
    <div v-else>
      <h1>Choose an item</h1>
    </div>
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

    updatimeTime() {
      this.elapsedTime = new Date() - this.startTime;
      this.hours = getHours(this.elapsedTime);
      this.minutes = getMinutes(this.elapsedTime);
      this.seconds = getSeconds(this.elapsedTime);
    },
  },
};
</script>

<style scoped>
.stopwatch {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 20px;
  background-color: #fff;
}

.stopwatch-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
}

.stopwatch-time {
  font-size: 130px;
  text-align: center;
}

.btn-start-stop {
  width: 140px;
  height: 40px;
  border-radius: 100px;
  background-color: #4d2c91;
  border-color: #4d2c91;
}

.btn-start-stop:hover {
  background-color: #401F84;
  border-color: #401F84;
}
</style>
