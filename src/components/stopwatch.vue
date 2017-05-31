<template lang="html">
  <div class="stopwatch">
    <div class="stopwatch-time">
      {{ hours }} : {{ minutes }} : {{ seconds }}
    </div>
    <button type="button" class="btn btn-primary btn-start-stop"
      @click="toggleStopwatch()">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
function padZero(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
}

function getHours(time) {
  const hours = parseInt((time / (1000 * 60 * 60)) % 24, 10);
  return padZero(hours);
}

function getMinutes(time) {
  const minutes = parseInt((time / (1000 * 60)) % 60, 10);
  return padZero(minutes);
}

function getSeconds(time) {
  const seconds = parseInt((time / 1000) % 60, 10);
  return padZero(seconds);
}

export default {
  name: 'stopwatch',

  data() {
    return {
      hours: '00',
      minutes: '00',
      seconds: '00',
      buttonText: 'Start',
      running: false,
      startTime: null,
      elapsedTime: null,
      interval: null,
    };
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
        this.$store.dispatch('STOP_STOPWATCH', this.elapsedTime);
        this.resetTime();
      }

      this.running = !this.running;
      this.buttonText = this.running ? 'Stop' : 'Start';
    },

    updatimeTime() {
      this.elapsedTime = new Date() - this.startTime;
      this.hours = getHours(this.elapsedTime);
      this.minutes = getMinutes(this.elapsedTime);
      this.seconds = getSeconds(this.elapsedTime);
    },

    resetTime() {
      this.elapsedTime = null;
      this.hours = '00';
      this.minutes = '00';
      this.seconds = '00';
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
