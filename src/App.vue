<template>
  <div class="training">
    <h1>Математичний тренажер. Рівень {{ level +1 }}</h1>
    <hr>
    <b-progress :value="questDone" :max="questMax" show-progress animated></b-progress>
    <div class="box">
    <transition name="flip" mode="out-in">
    <app-start-screen v-if="state == 'start'"
                  @onStart="onStart"
                  @Type="onType">
    </app-start-screen>
    <app-quession v-else-if="state == 'question'"
                  @success="onQuestSuccess"
                  @error="onQuestError"
                  :settings="levels[level]"
                  :level="level"
    ></app-quession>
    <app-message v-else-if="state == 'message'"
                  :type="message.type"
                  :text="message.text"
                  @onNext="onNext"
    ></app-message>
    <app-result-screen v-else-if="state == 'results'"
                  :stats="stats"
                  :level="level+1"
                  :levelLen="levels.length"
                  @repeat="onStart"
                  @nextLevel="onNextLevel"
                  @newStart="onNewStart"
    ></app-result-screen>
    <div v-else>Unknown state</div>
    </transition>
  </div></div>
</template>

<script>
import Levels from './lib/levels';
export default {
  data () {
    return {
      state: 'start', rem: 0,
      stats: {
        success: 0,
        error: 0,
        totalSuccess: 0,
        totalError: 0
      },
      message: {
        type: '',
        text: ''
      },
      questMax: Levels[0].questMax,
      level: 0,
      levels: Levels
      }
  },
  computed: {
    questDone(){
      return this.stats.success + this.stats.error - this.rem;
    }
    
  },
  methods: {
    onStart() {
      this.stats.success = 0;
      this.stats.error = 0;
      this.questMax = Levels[this.level].questMax;
      this.rem = 0;
      this.state = 'question';
    },
    onQuestSuccess(){
      this.state = 'message';
      this.message.text = 'Молодець!';
      this.message.type = 'success';
      this.stats.success++;
    },
    onQuestError(msg){
      this.state = 'message';
      this.message.text = msg;
      this.message.type = 'warning';
      this.stats.error++;
      this.questMax += 2;
      this.rem++;
    },
    onNext(){
      if(this.questDone < this.questMax){
        this.state = 'question';
      } else {
        this.stats.totalSuccess += this.stats.success;
        this.stats.totalError += this.stats.error;
        this.state = 'results';
      }
    },
    onNextLevel(){
      this.level++;
      this.questMax = Levels[this.level].questMax;
      this.onStart();
    },
    onNewStart(){
      this.state = 'start';
      this.level = 0;
      this.questMax = Levels[0].questMax;
      this.stats.success = 0;
      this.stats.error = 0;
      this.onType(null);
    },
    onType(type){
    for(let i=0;i<this.levels.length;i++){
      this.levels[i].type = type;
    };
    }
  }
}
</script>

<style scoped>
  .training {
    max-width: 700px;
    margin: 20px auto;
  }
  .box{
    margin: 10px 0;
  }
  .flip-enter{

  }
  .flip-enter-active{
    animation: flipInx .3s linear
  }
  .flip-leave{

  }
  .flip-leave-active{
    animation: flipOutx .3s linear
  }

  @keyframes flipInx{
  from{transform: rotateX(90deg);}
  to{transform: rotateX(0deg);}
  }
  @keyframes flipOutx{
  from{transform: rotateX(0deg);}
  to{transform: rotateX(90deg);}
  }
</style>
