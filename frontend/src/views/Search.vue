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
					<catSelect :categories="category" @selectedCat = "handleCatChange"></catSelect>
				</selectDiv>
				<selectDiv>
					<tagSelect :tags="tag" @selectedTags = "handleTagChange"></tagSelect>
				</selectDiv>
                <a-button type="primary" @click="handelSubmit">Submit</a-button>
                </block>
                <block v-if="venforVisitable">
				<h3> {{vendors.length}} {{vendors.length > 1 ? 'results' : 'result'}}</h3>
				<ul class="ulVendor">
					<!-- <vendorDiv> -->
					<li class="liVendor" v-for="(item,index) in vendors" :key="index">
						<vendorCard :id="item.User_id" :name="item.vname" :service="item.vservice" :address="item.vaddress" :openTime="item.venueOpenTime" :closeTime="item.venueCloseTime" :phoneNo="item.vphoneNo">
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
	import axios from 'axios'
	
	export default {
		name: 'Search',
        data() {
            return {
                vendors: [{
						// User_id: 123,
						// vname: '711',
						// vservice: 'grocery',
						// vaddress: '22nd shopping road',
						// venueCloseTime: "21:00:00",
						// venueOpenTime: "10:00:00",
						// vphoneNo: "123456"
					},
				],
				category: [{
						Category_id: 123,
						Category_name: 'cafe'
					},
					{
						Category_id: 156,
						Category_name: 'canteen'
					}
				],
				tag: [{
						Tag_id: 235,
						Tag_name: 'cosy'
					},
					{
						Tag_id: 290,
						Tag_name: 'dirty'
					}
				],
                venforVisitable: false,
				selectedCat: 0,
				selectedTag: [],
				submitValid: false,
            }
        },
		components: {
			catSelect,
			tagSelect,
			vendorCard,
            Header
		},
		methods: {
			handleCatChange(catId) {
				console.log("search page cat update: ", catId)
				this.selectedCat = catId
				console.log("data cat: ", this.selectedCat)
			},
			handleTagChange(tags) {
				console.log("search page tags update: ", tags)
				this.selectedTag = tags
				console.log("data Tags: ", this.selectedTag)
			},
			getAllTags() {
				axios.get('/api/getTag').then((response) => {
					console.log(response.data[0])
					this.tag = response.data
					console.log("receive tags: ", this.tag[1])
				})
			},
			getAllcats() {
				axios.get('/api/getCategory').then((response) => {
					console.log(response.data[0])
					this.category = response.data
				})
			},
			getVendors() {
				axios.post('/api/searchVendor',{
					category: this.selectedCat,
					tag: this.selectedTag,
				}).then((response) => {
					console.log(response.data)
					this.vendors = response.data
				})
			},
			handelSubmit() {
				if (this.selectedCat == 0 || this.selectedTag.length == 0) {
					return
				}
				console.log("submit category:", this.selectedCat)
				console.log("submit tags:", this.selectedTag)
				this.getVendors()
				this.venforVisitable=true
			},
		},
		created:function(){
			this.getAllTags()
			this.getAllcats()
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
