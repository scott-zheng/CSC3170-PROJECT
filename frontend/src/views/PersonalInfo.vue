<template>
  <div>
    <a-layout style="background: rgb(255, 255, 255);">
      <a-layout-header class="layout-header">
        <Header class="header"/>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <p style="font-size: 25px;">Personal information</p>
        <!-- List for information-->
        <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <a-descriptions title="User Info" bordered>
          <a-descriptions-item label="ID">{{infoForm.id}}</a-descriptions-item>
          <a-descriptions-item label="Name">{{infoForm.name}}</a-descriptions-item>
          <a-descriptions-item label="Phone">{{infoForm.phone}}</a-descriptions-item>
          <a-descriptions-item label="Email">{{infoForm.email}}</a-descriptions-item>
          <a-descriptions-item label="Birth" :span="2"> {{infoForm.birth}}</a-descriptions-item>
          <a-descriptions-item label="Gender">{{infoForm.gender}}</a-descriptions-item>
          <a-descriptions-item label="School">{{infoForm.school}}</a-descriptions-item>
          <a-descriptions-item label="SchoolDirector">{{infoForm.schoolDirector}}</a-descriptions-item>
          <a-descriptions-item label="SchoolContact">{{infoForm.schoolContact}}</a-descriptions-item>
          <a-descriptions-item label="College">{{infoForm.college}}</a-descriptions-item>
          <a-descriptions-item label="CollegeDirector">{{infoForm.collegeDirector}}</a-descriptions-item>
          <a-descriptions-item label="CollegeContact">{{infoForm.collegeContact}}</a-descriptions-item>
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
              <a-form-model-item has-feedback label="Name" prop="name">
                <a-input v-model="modifyInfoForm.name" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Phone" prop="phone">
                <a-input v-model="modifyInfoForm.phone" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Password" prop="pass">
                <a-input v-model="modifyInfoForm.pass" type="password" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Confirm Password" prop="pass2">
                <a-input v-model="modifyInfoForm.pass2" type="password" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Email" prop="email">
                <a-input v-model="modifyInfoForm.email" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Birthday">
                <a-date-picker
                  @change="onChangeDate"
                  type="date"
                  placeholder="Pick a date"
                  style="width: 100%;"
                  v-model="modifyInfoForm.birth"
                  format="YYYY-MM-DD"
                />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Gender">
                  <a-radio-group name="radioGroup" v-model="modifyInfoForm.gender" defaultValue="male">
                    <a-radio value="male">Male</a-radio>
                    <a-radio value="female">Female</a-radio>
                  </a-radio-group>
              </a-form-model-item>
              <a-form-model-item has-feedback label="School">
                <a-select defaultValue="SSE" style="width: 120px" v-model="modifyInfoForm.school">
                  <a-select-option value="SSE">SSE</a-select-option>
                  <a-select-option value="SME">SME</a-select-option>
                  <a-select-option value="HSS">HSS</a-select-option>
                  <a-select-option value="LHS">LHS</a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item has-feedback label="College">
                <a-select defaultValue="Shaw" style="width: 120px" v-model="modifyInfoForm.college">
                  <a-select-option value="Shaw">Shaw</a-select-option>
                  <a-select-option value="Dilligent">Diligentia</a-select-option>
                  <a-select-option value="Muse">Muse</a-select-option>
                  <a-select-option value="Harmonia">Harmonia</a-select-option>
                </a-select>
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
export default {
  name: 'PersonalInfo',
  data() {
    let validateName =(rule, value, callback) => {
      const userReg = /^[a-zA-Z0-9_-]/;
      if (value === '') {
        callback(new Error('Please input the user name'));
      } else {
        if (userReg.test(value) && value.length >= 1 && value.length <= 20) {
          callback();
        } else{
          callback(new Error('The length of user name should be between 1 and 20'));
        }
      }
    };
    let validatePhone = (rule, value, callback) => {
      const userContact = /^[0-9]/;
      if (value === '') {
          callback(new Error('请输入手机号'));
      } else {
          if (userContact.test(value) && value.length === 11) {
              callback();
          } else{
              callback(new Error('请输入正确的手机号'));
          }
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter the password'));
      } else if (value.length <= 8 || value.length >= 128) {
        callback(new Error('The length of password should be between 8 and 128'));
      } else if (this.modifyInfoForm.pass2 !== '') {
        this.$refs.modifyInfoModel.validateField('pass2');
        callback()
      }
      callback()
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter the password again'));
      } else if (value !== this.modifyInfoForm.pass) {
        callback(new Error('The password are not the same!'));
      } else {
        callback();
      }
    };
    let validateEmail =(rule, value, callback) => {
      const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (value === '') {
        callback(new Error('Please enter the email'));
      } else {
        if (emailReg.test(value)) {
          callback();
        } else{
          callback(new Error('Please enter the correct email'));
        }
      }
    };
    return {
      modifyFormVisible:false,
      rules: {
        name: [{ validator: validateName, trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        pass2: [{ validator: validatePass2, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }],
      },
      infoForm: {
        id: '98212489',
        name: 'hrbattery',
        phone: '13530006000',
        email: '',
        birth: '',
        gender: '',
        school: '',
        schoolDirector: '',
        schoolContact: '',
        college: '',
        collegeDirector: '',
        collegeContact: '',
      },
      modifyInfoForm: {
        name: '',
        pass: '',
        pass2: '',
        phone: '',
        email: '',
        birth: '',
        gender: '',
        school: '',
        college: '',
      }
      // layout: {
      //   labelCol: { span: 4 },
      //   wrapperCol: { span: 14 },
      // },
    };
  },
  components: {
    Header
  },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.value}`);
      this.modifyInfoForm.gender = e.target.value;
    },
    onChangeDate(date, dateString) {
      console.log(date, dateString);
    },
    schoolChange(value) {
      console.log(`selected ${value}`);
      this.modifyInfoForm.school = value;
    },
    collegeChange(value) {
      console.log(`selected ${value}`);
      this.modifyInfoForm.college = value;
    },
    handleCancel() {
      this.modifyFormVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post('/api/setPersonInfo',{
            id: this.infoForm.id,
            birth: this.modifyInfoForm.birth.format("YYYY-MM-DD"),
            password: this.modifyInfoForm.pass,
            name : this.modifyInfoForm.name,
            email : this.modifyInfoForm.email,
            phone : this.modifyInfoForm.phone,
            gender : this.modifyInfoForm.gender,
            school : this.modifyInfoForm.school,
            college : this.modifyInfoForm.college,
          }).then((response) => {
            var res = response.data[0];
            console.log(res);
            this.$data.infoForm.id = res.User_id;
            this.$data.infoForm.name = res.Person_Name;
            this.$data.infoForm.phone = res.Phone_number;
            this.$data.infoForm.email = res.Email;
            this.$data.infoForm.birth = res.Birthday;
            this.$data.infoForm.gender = res.Gender;
            this.$data.infoForm.school = res.School_name;
            this.$data.infoForm.schoolDirector = res.school_director;
            this.$data.infoForm.schoolContact = res.school_contact;
            this.$data.infoForm.college = res.College_name;
            this.$data.infoForm.collegeDirector = res.college_director;
            this.$data.infoForm.collegeContact = res.college_contact;
            this.$data.modifyFormVisible = false;
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
    // var id = 98212489
    var id = sessionStorage.getItem('user_id')
    console.log(id)
    axios.post('/api/getPersonInfo',{
      user_id: id,
    }).then((response) => {
      var res = response.data[0];
      console.log(res);
      this.$data.infoForm.id = res.User_id;
      this.$data.infoForm.name = res.person_name;
      this.$data.infoForm.phone = res.Phone_number;
      this.$data.infoForm.email = res.Email;
      this.$data.infoForm.birth = res.Birthday;
      this.$data.infoForm.gender = res.Gender;
      this.$data.infoForm.school = res.School_name;
      this.$data.infoForm.schoolDirector = res.school_director;
      this.$data.infoForm.schoolContact = res.school_contact;
      this.$data.infoForm.college = res.College_name;
      this.$data.infoForm.collegeDirector = res.college_director;
      this.$data.infoForm.collegeContact = res.college_contact;
    })
  }
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