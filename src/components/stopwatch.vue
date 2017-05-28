<template lang="html">
  <div class="stopwatch">
    <div class="stopwatch-time">
      {{ hours }} : {{ minutes }} : {{ seconds }}
    </div>
    <button type="button" class="btn btn-primary btn-start-stop"
      :class="{ running: running }"
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

function getHours(timeElapsed) {
  const hours = parseInt((timeElapsed / (1000 * 60 * 60)) % 24, 10);
  return padZero(hours);
}

function getMinutes(timeElapsed) {
  const minutes = parseInt((timeElapsed / (1000 * 60)) % 60, 10);
  return padZero(minutes);
}

function getSeconds(timeElapsed) {
  const seconds = parseInt((timeElapsed / 1000) % 60, 10);
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
      }

      this.running = !this.running;
      this.buttonText = this.running ? 'Stop' : 'Start';
    },

    updatimeTime() {
      const timeElapsed = new Date() - this.startTime;
      this.hours = getHours(timeElapsed);
      this.minutes = getMinutes(timeElapsed);
      this.seconds = getSeconds(timeElapsed);
    },
  },
};
</script>

<style scoped>
.stopwatch {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 20px;
}

.stopwatch-time {
  font-size: 130px;
  text-align: center;
}
</style>
