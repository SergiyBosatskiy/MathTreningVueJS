<template>
	<div class="alert alert-secondary">
		<b-form-select v-model="selected" :options="options" @input="onType" />
	<h3>Ви готові?</h3>
	<button class="btn btn-success" @click="$emit('onStart')">Старт</button>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				selected: null,
				options: [
        { value: null, text: 'Додавання двох чисел' },
        { value: 'threePlus', text: 'Додавання трьох чисел' },
        { value: 'plusMinus', text: 'Додати і відняти' },
        
      ]
			}
		},
		methods: {
			 onType(){
			 this.$emit('Type', this.selected);
			 }
			
		}
	}
</script>

<style scoped>
	.alert {
	text-align: center;
	}
	h3, btn {
		margin: 30px 0;
	}
</style>