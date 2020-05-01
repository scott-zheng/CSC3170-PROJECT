<template>
	<div>
		<a-select defaultValue="Please select a category" style="width: 240px" @change="handleChange">
			<a-select-option v-for="(item, index) in categories" :key="index">{{item}}</a-select-option>
		</a-select>
	</div>
</template>
<script>
	export default {
		props: {
			categories: {
				type: Array,
				default: () => ["cat0", "cat1"]
			}
		},
		methods: {
			handleChange(value) {
				console.log(`selected ${value}`);
			},
		},
	};
</script>
