<template>
	<div>
	<div class="alert alert-primary">
	<h3>Правильні відповіді: {{ stats.success }}</h3>
	<h3>Помилки: {{ stats.error }}</h3>
	<hr>
	<h4 v-if="endGame">Наступні рівні в стадії розробки</h4>
	<button class="btn btn-primary" @click="$emit('repeat')">Повторити рівень</button>
	<button v-if="!endGame" class="btn btn-primary" @click="$emit('nextLevel')">Наступний рівень</button>
	<button v-if="endGame" class="btn btn-primary" @click="$emit('newStart')">Вибрати інший тип тренажера</button>
	</div>
	<br/>
	<div v-show="endGame" class="alert">
	<h3>Статистика</h3>
	<h4>Всього правильних відповідей: {{ stats.totalSuccess }}</h4>
	<h4>Всього неправильних відповідей: {{ stats.totalError }}</h4>
	</div></div>
</template>

<script>
	export default {
		props: ['stats', 'level', 'levelLen'],
		data () {
			return {
				
			}
		},
		computed: {
			endGame: function (){
				return this.level >= this.levelLen;
			}
			 
    }

	}
	
</script>

<style scoped>
	.alert {
	text-align: center;
	}
	h3, btn, h4 {
		margin: 30px 0;
	}
	h4{
		color: red;
		font-weight: 200;
		font-style: italic;
	}
</style>