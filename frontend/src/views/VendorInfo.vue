<template>
  <div>
    <a-layout style="background: rgb(255, 255, 255);">
      <a-layout-header class="layout-header">
        <Header class="header"/>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <p style="font-size: 25px;">Vendor information</p>
        <!-- List for information-->
        <img
          alt="example"
          src="../assets/cide.jpg"
          width="20%" height="20%"
        />
        <a-descriptions title="Vendor Info" bordered>
          <a-descriptions-item label="ID">{{infoForm.id}}</a-descriptions-item>
          <a-descriptions-item label="Name">{{infoForm.name}}</a-descriptions-item>
          <a-descriptions-item label="User name">{{infoForm.personname}}</a-descriptions-item>
          <a-descriptions-item label="User phone">{{infoForm.personphone}}</a-descriptions-item>
          <a-descriptions-item label="Service">{{infoForm.service}}</a-descriptions-item>
          <a-descriptions-item label="Address">{{infoForm.address}}</a-descriptions-item>
          <a-descriptions-item label="Tel" :span="2"> {{infoForm.phone}}</a-descriptions-item>
          <a-descriptions-item label="Open time" :span="2"> {{infoForm.opentime}}</a-descriptions-item>
          <a-descriptions-item label="Close time" :span="2"> {{infoForm.closetime}}</a-descriptions-item>
        </a-descriptions>
        <a-button @click="modifyFormVisible=true">Modify</a-button>
        <!-- Modify form for information-->
        <a-modal
          title="Modify form for information"
          :visible="modifyFormVisible"
          @cancel="handleCancel"
          @ok="submitForm('modifyInfoModel')"
        >
        <a-row type="flex" justify="center">
          <a-col :span="16">
            <a-form-model ref="modifyInfoModel" :model="modifyInfoForm" :rules="rules">
              <a-form-model-item has-feedback label="Name">
                <a-input v-model="modifyInfoForm.name" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="User Name">
                <a-input v-model="modifyInfoForm.personname" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="User Phone">
                <a-input v-model="modifyInfoForm.personphone" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Password" prop="pass">
                <a-input v-model="modifyInfoForm.pass" type="password" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Confirm Password" prop="pass2">
                <a-input v-model="modifyInfoForm.pass2" type="password" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Service">
                <a-input v-model="modifyInfoForm.service" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Address">
                <a-input v-model="modifyInfoForm.address" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Tel">
                <a-input v-model="modifyInfoForm.phone" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Open time">
                <a-time-picker :default-open-value="moment('00:00:00', 'HH:mm:ss')" v-model="modifyInfoForm.opentime" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Close time">
                <a-time-picker :default-open-value="moment('00:00:00', 'HH:mm:ss')" v-model="modifyInfoForm.closetime" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item>
                <a-button type="primary" @click="submitForm('modifyInfoModel')">
                Submit
                </a-button>
                <a-button @click="resetForm('modifyInfoModel')">
                Reset
                </a-button>
                <a-button @click="modifyFormVisible=false">
                Cancel
                </a-button>
              </a-form-model-item>
            </a-form-model>
          </a-col>
        </a-row>
        </a-modal>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import Header from '@/components/Header'
import axios from 'axios'
import moment from 'moment';
export default {
  name: 'PersonalInfo',
  data() {
    return {
      modifyFormVisible:false,
      infoForm: {
        id: '1',
        name: 'CIDE',
        phone: '1380919333',
        service: 'Startup Guidance',
        address: 'Letian Bldg. 3F No:1597 Letian Bldg.',
        opentime: '',
        closetime: '',
        personname: '',
        personphone: ''
      },
      modifyInfoForm: {
        name: '',
        personname: '',
        personphone: '',
        pass: '',
        pass2: '',
        phone: '',
        service: '',
        address: '',
        opentime: '',
        closetime: ''
      }
      // layout: {
      //   labelCol: { span: 4 },
      //   wrapperCol: { span: 14 },
      // },
    };
  },
  components: {
    Header,
  },
  methods: {
    moment,
    onChange(e) {
      console.log(`checked = ${e.target.value}`);
    },
    onChangeDate(date, dateString) {
      console.log(date, dateString);
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleCancel() {
      this.modifyFormVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post('/api/setVendorInfo',{
            id: this.infoForm.id,
            personname: this.modifyInfoForm.personname,
            personphone: this.modifyInfoForm.personphone,
            password: this.modifyInfoForm.pass,
            name : this.modifyInfoForm.name,
            phone : this.modifyInfoForm.phone,
            service : this.modifyInfoForm.service,
            address : this.modifyInfoForm.address,
            opentime : this.modifyInfoForm.opentime.format('hh:mm:ss'),
            closetime : this.modifyInfoForm.closetime.format('hh:mm:ss'),
          }).then((response) => {
            var res = response.data[0];
            console.log(res);
            this.$data.infoForm.id = res.User_id;
            this.$data.infoForm.name = res.vname;
            this.$data.infoForm.address = res.vaddress;
            this.$data.infoForm.phone = res.vphoneNo;
            this.$data.infoForm.service = res.vservice;
            this.$data.infoForm.opentime = res.venueOpenTime;
            this.$data.infoForm.closetime = res.venueCloseTime;
            this.$data.infoForm.personname = res.Person_Name;
            this.$data.infoForm.personphone = res.Phone_number;
          })
          this.$message.success('submit!');
        } else {
          this.$message.error('error submit!');
          this.$data.modifyFormVisible = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
    created: function() {
    // var id = 1
    var id = sessionStorage.getItem('user_id')
    console.log(id)
    axios.post('/api/getVendorInfo',{
      vendor_id: id,
    }).then((response) => {
      var res = response.data[0];
      console.log(res);
      this.$data.infoForm.id = res.User_id;
      this.$data.infoForm.name = res.vname;
      this.$data.infoForm.address = res.vaddress;
      this.$data.infoForm.phone = res.vphoneNo;
      this.$data.infoForm.service = res.vservice;
      this.$data.infoForm.opentime = res.venueOpenTime;
      this.$data.infoForm.closetime = res.venueCloseTime;
      this.$data.infoForm.personname = res.Person_Name;
      this.$data.infoForm.personphone = res.Phone_number;
    })
  },
}
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