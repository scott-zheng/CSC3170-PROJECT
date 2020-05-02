<template>
  <div>
    <a-layout style="background: rgb(255, 255, 255);">
      <a-layout-header class="layout-header">
        <Header class="header"/>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <p style="font-size: 25px;">{{vendorInfo.name}}</p>
        <a style = "float:right;"><router-link to='/vendorinfo'>Edit</router-link></a>
        <img
          alt="example"
          src="../assets/cide.jpg"
          width="20%" height="20%"
        />
        <a-descriptions title="Vendor Info">
          <a-descriptions-item label="Service">{{vendorInfo.service}}</a-descriptions-item>
          <a-descriptions-item label="Address">
            {{vendorInfo.address}}
          </a-descriptions-item>
          <a-descriptions-item label="Tel">{{vendorInfo.tel}}</a-descriptions-item>
          <a-descriptions-item label="Open time">{{vendorInfo.opentime}}</a-descriptions-item>
          <a-descriptions-item label="Close time">{{vendorInfo.closetime}}</a-descriptions-item>
        </a-descriptions>
        <a-button @click="checkin" type="primary">
          Check in
        </a-button>
        <!-- Comment -->
        <a-list
          v-if="comments.length"
          :dataSource="comments"
          :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
          itemLayout="horizontal"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-comment
              :author="item.person_name"
              avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              :content="item.Content"
              :datetime="moment(item.time).fromNow()"
            >
            </a-comment>
            <a-rate :default-value="5" disabled />
          </a-list-item>
        </a-list>
        <a-comment>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="hrbattery"
          />
          <div slot="content">
            <a-form-item>
              <a-textarea :rows="4" @change="handleChange" :value="value"></a-textarea>
            </a-form-item>
            <a-form-item>
              <a-button htmlType="submit" :loading="submitting" @click="handleSubmit" type="primary">
                Add Comment
              </a-button>
              <a-rate v-model="rateValue" />
            </a-form-item>
          </div>
        </a-comment>
      </a-layout-content> 
    </a-layout>
  </div>
</template>

<script>
import moment from 'moment';
import Header from '@/components/Header'
import axios from 'axios'
export default {
  data() {
    return {
      comments: [],
      submitting: false,
      value: '',
      rateValue: 2,
      moment,
      vendorInfo: {
        id: '',
        name: '',
        service: '',
        address: '',
        tel: '',
        opentime: '',
        closetime: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      if (!this.value) {
        return;
      }

      this.submitting = true;

      setTimeout(() => {
        this.submitting = false;
        this.comments = [
          {
            author: 'hrbattery',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: this.value,
            datetime: moment().fromNow(),
            rate: this.rateValue
          },
          ...this.comments,
        ];
        this.value = '';
      }, 1000);
    },
    handleChange(e) {
      this.value = e.target.value;
    },
    checkin() {
      this.$message.success('Checkin Success!');
    }
  },
  created: function() {
    // var id = 52658172
    var id = sessionStorage.getItem('Vendor_id')
    console.log(id)
    axios.post('/api/getVendorInfo',{
      vendor_id: id,
    }).then((response) => {
      var res = response.data[0];
      console.log(res);
      this.$data.vendorInfo.id = res.User_id;
      this.$data.vendorInfo.name = res.vname;
      this.$data.vendorInfo.address = res.vaddress;
      this.$data.vendorInfo.tel = res.vphoneNo;
      this.$data.vendorInfo.service = res.vservice;
      this.$data.vendorInfo.opentime = res.venueOpenTime;
      this.$data.vendorInfo.closetime = res.venueCloseTime;
    })
    axios.post('/api/getComment', {
      vendor_id: id,
    }).then((response) => {
      console.log(response.data);
      this.comments = response.data
    })
  },
  components: {
    Header
  }
};
</script>

<style>
.header {
  background: rgb(253, 253, 253);
  padding: 0;
  position: fixed;
  width: 100%;
  text-align: center;
}
.layout-header {
  background: rgb(253, 253, 253);
  width: 100%;
}
.layout-content {
  width: 100%;
  height: 100%;
  padding: 2% 5%;
}

</style>