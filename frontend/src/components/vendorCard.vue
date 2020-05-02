<template>
  <div>
    <a-card v-bind:title = "name" style="width: 400px">
      <!--img
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        slot="cover"
      /-->
      <a @click="handleJump" href="/vendor" slot="extra">Details</a>
        <p>Service: {{service}}</p>
        <p>Address: {{address}}</p>
        <p>Open Time: {{openTime}}</p>
		<p>Close Time: {{closeTime}}</p>
		<p>Phone Number: {{phoneNo}}</p>
    </a-card>
  </div>
</template>

<script>
	export default {
		props: {
			id:{
				type: Number,
				default: 123
			},
			name: {
				type: String,
				default: 'EmptyVendorName'
			},
			service: {
				type: String,
				default: 'EmptyVendorService'
			},
			address: {
				type: String,
				default: 'EmptyVendorAddress'
			},
			openTime: {
				type: String,
				default: 'EmptyVendorOpenHour'
			},
			closeTime: {
				type: String,
				default: 'EmptyVendorCloseHour'
			},
			phoneNo: {
				type: String,
				default: 'EmptyVendorPhoneNo'
			}
		},
		methods: {
			handleJump() {
				console.log("junp to: ", this.id)
				sessionStorage.setItem('Vendor_id', this.id)
			},
		}
	}
</script>