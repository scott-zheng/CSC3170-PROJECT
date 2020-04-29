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
				<!-- 				<a-list
				v-if="vendors.length"
					:dataSource="vendors"
					:header="`${vendors.length} ${vendors.length > 1 ? 'results' : 'result'}`"
					:itemLayout="horizontal"
				>
					<a-list-item slot="renderItem" slot-scope="item">
						<vendorCard
						:name="item.name"
						:service="item.service"
						:address="item.address"
						:openHour="item.openHour"
						>
						</vendorCard>
					</a-list-item>
				</a-list> -->
				<h2> {{vendors.length}} {{vendors.length > 1 ? 'results' : 'result'}}</h2>
				<ul class="ulVendor">
					<!-- <vendorDiv> -->
					<li class="liVendor" v-for="(item,index) in vendors" :key="index">
						<vendorCard :name="item.name" :service="item.service" :address="item.address" :openHour="item.openHour">
						</vendorCard>
					</li>
					<!-- </vendorDiv> -->
				</ul>
				<!-- <vendorCard v-bind:name = "category"></vendorCard> -->
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

		data() {
			return {
				vendors: [{
						name: '711',
						service: 'grocery',
						address: '22nd shopping road',
						openHour: '7 am ~ 11pm',
					},
					{
						name: 'pandora',
						service: 'restuarant',
						address: '11nd shopping road',
						openHour: '8 am ~ 7pm',
					},
				],
				category: '',
				tag: '',
			};
		},

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

	.ulVendor {
		display: inline;
		white-space: nowrap;
	}

	.liVendor {
		list-style: none;
		display: inline-block;
		margin: 3px;
		margin-left: 5px;

		float: left;
	}
</style>
