<template>
  <div>
    <a-card v-bind:title = "name" style="width: 400px">
      <!--img
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        slot="cover"
      /-->
      <a href="#" slot="extra">Details</a>
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
				default: 'VendorName'
			},
			service: {
				type: String,
				default: 'VendorService'
			},
			address: {
				type: String,
				default: 'VendorAddress'
			},
			openTime: {
				type: String,
				default: 'VendorOpenHour'
			},
			closeTime: {
				type: String,
				default: 'VendorCloseHour'
			},
			phoneNo: {
				type: String,
				default: 'VendorPhoneNo'
			}
		}
	}
</script>