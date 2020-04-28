<template>
	<div id="components-layout-demo-basic">
		<h1>
			Search Page
		</h1>
		<a-layout>
			<a-layout-header>
				<selectDiv>
					<catSelect></catSelect>
				</selectDiv>
				<selectDiv>
					<tagSelect></tagSelect>
				</selectDiv>
			</a-layout-header>
			<a-layout-content>
				<vendorDiv>
					<vendorCard></vendorCard>
				</vendorDiv>
				<vendorDiv>
					<vendorCard></vendorCard>
				</vendorDiv>
				<vendorDiv>
					<vendorCard></vendorCard>
				</vendorDiv>
			</a-layout-content>
			<a-layout-footer>Footer</a-layout-footer>
		</a-layout>
	</div>
</template>

<script>
	import catSelect from '@/components/catSelect.vue'
	import tagSelect from '@/components/tagSelect.vue'
	import vendorCard from '@/components/vendorCard.vue'
	
	export default {
		name: 'Search',
		components: {
			catSelect,
			tagSelect,
			vendorCard
		}
	}
</script>

<style>
	#components-layout-demo-basic {
		text-align: center;
	}

	#components-layout-demo-basic .ant-layout-header,
	#components-layout-demo-basic .ant-layout-footer {
		background: #e6e6e6;
		color: #fff;
	}

	#components-layout-demo-basic .ant-layout-footer {
		line-height: 1.5;
	}

	#components-layout-demo-basic .ant-layout-content {
		background: rgba(7, 68, 111, 1.0);
		color: #fff;
		min-height: 120px;
		line-height: 120px;
	}

	#components-layout-demo-basic>.ant-layout {
		margin-bottom: 48px;
	}

	#components-layout-demo-basic>.ant-layout:last-child {
		margin: 0;
	}
	
	selectDiv {
		display: inline-block;
	}
	
	vendorDiv {
		display: inline-block;
	}
</style>
