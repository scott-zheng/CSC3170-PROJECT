<template>
  <div>
    <a-card v-bind:title = "name" style="width: 300px">
      <!--img
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        slot="cover"
      /-->
      <a href="#" slot="extra">Details</a>
        <p>Service: {{service}}</p>
        <p>Address: {{address}}</p>
        <p>Open Hour:{{openHour}}</p>
    </a-card>
  </div>
</template>

<script>
	export default {
		props: {
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
			openHour: {
				type: String,
				default: 'VendorOpenHour'
			}
		}
	}
</script>