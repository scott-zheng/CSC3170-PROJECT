<template>
	<div id="components-layout-demo-basic">
		<a-layout>
            <a-layout-header class="layout-header">
                <Header class="header"/>
            </a-layout-header>
			<a-layout-content>
                <h1>Search Page</h1>
                <block>
                <selectDiv>
					<catSelect/>
				</selectDiv>
				<selectDiv>
					<tagSelect/>
				</selectDiv>
                <a-button type="primary" @click="venforVisitable=true">Submit</a-button>
                </block>
                <block v-if="venforVisitable">
				<h2> {{vendors.length}} {{vendors.length > 1 ? 'results' : 'result'}}</h2>
				<ul class="ulVendor">
					<!-- <vendorDiv> -->
					<li class="liVendor" v-for="(item,index) in vendors" :key="index">
						<vendorCard :name="item.name" :service="item.service" :address="item.address" :openHour="item.openHour">
						</vendorCard>
					</li>
					<!-- </vendorDiv> -->
				</ul>
                </block>
			</a-layout-content>
			<!--a-layout-footer>Footer</a-layout-footer-->
		</a-layout>
	</div>
</template>

<script>
	import catSelect from '@/components/catSelect.vue'
	import tagSelect from '@/components/tagSelect.vue'
	import vendorCard from '@/components/vendorCard.vue'
    import Header from '@/components/Header'
	
	export default {
		name: 'Search',
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
                venforVisitable: false
            }
        },
		components: {
			catSelect,
			tagSelect,
			vendorCard,
            Header
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
	
    block {
		display: block;
	}

	vendorDiv {
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
