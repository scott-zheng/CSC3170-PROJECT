<template>
	<div>
		<a-select style="width: 240px" @change="handleChange" placeholder="Please select a category">
			<a-select-option v-for="item in categories" :key="item.Category_id">{{item.Category_name}}</a-select-option>
		</a-select>
	</div>
</template>
<script>
	export default {
		props: {
			categories: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			handleChange(value) {
				console.log(`selected ${value}`);
				this.$emit("selectedCat", value);
			},
		},
	};
</script>
