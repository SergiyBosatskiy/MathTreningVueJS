<template>
	<div>
	<div class="alert">
	<h3 v-if="this.settings.type == 'threePlus'">{{ x }} + {{ y }} + {{ z }} = ?</h3>
	<h3 v-else-if="this.settings.type == 'plusMinus'">{{ x }} + {{ y }} - {{ z }} = ?</h3>
	<h3 v-else>{{ x }} + {{ y }} = ?</h3>
	<hr>
		<div class="buttons">
			<button class="btn btn-success" 
				v-for="number in answers"
				@click="onAnswer(number)"
				>{{ number }}
			</button>
		</div>
		</div>
		<p>
			<span class="timer">{{ tick }}</span> Сек.</p>
	</div>
</template>

<script>
	let timer;
	export default {
		props: ['settings'],
		data() {
			return {
				tick: this.settings.timer,
				
				x: mtRand(this.settings.from, this.settings.to),
				y: mtRand(this.settings.from, this.settings.to),
				z: mtRand(this.settings.from, this.settings.to)
			}
		},
		computed: {
			good() {
				switch (this.settings.type){
				case "threePlus": return this.x + this.y + this.z;
				case "plusMinus": return this.x + this.y - this.z;
				default: return this.x + this.y;
				}
			},
			answers() {
				let res = [this.good];

				while(res.length < this.settings.variants){
					let num = mtRand(this.good - this.settings.range, this.good + this.settings.range);
					if(res.indexOf(num) === -1){
					res.push(num);
					}
				}

				return res.sort(function(){
					return Math.random() > 0.5;
				});
			}
		},
		methods: {
			onAnswer(num) {
				if(num == this.good){
					this.$emit('success');
				} else {
					switch (this.settings.type){
					case "threePlus": this.$emit('error', `${this.x} + ${this.y} + ${this.z} = ${this.good}`);
					break;
					case "plusMinus": this.$emit('error', `${this.x} + ${this.y} - ${this.z} = ${this.good}`);
					break;				
					default: this.$emit('error', `${this.x} + ${this.y} = ${this.good}`);
					}
				}
			},
			timer(go) {
				if(go === 'end'){
					clearInterval(timer);
				} else{
				
				timer = setInterval(() => {
				 	--this.tick;
				 	if (this.tick<=0) {this.$emit('error', 'Час вийшов');}
				 }, 1000);
				}
			}
		},
		mounted : function(){
			this.timer(); 
    	},
    	destroyed: function(){
    		this.timer('end');
    	}
	}

	function mtRand(min, max) {
		let diff = max- min;
		return Math.floor(Math.random() * (diff + 1)) + min;
	}
</script>

<style scoped>
	 .alert {
	 	padding-top: 20px;
	 	background-color: #eee;
	 }

	 .buttons {
	 	display: flex;
	 	justify-content: space-around;
	 }

	 .btn {
	 	margin: 20px 0;
	 }
	 p{
	 	text-align: center;
	 }
	 span{
	 	font-size: 2rem;
	 	font-weight: 700;
	 }
</style>