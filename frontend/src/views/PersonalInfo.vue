<template>
  <div>
    <a-layout style="background: rgb(255, 255, 255);">
      <a-layout-header class="layout-header">
        <Header class="header"/>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <p style="font-size: 25px;">Personal information</p>
        <!-- List for information-->
        <a-descriptions title="User Info" bordered>
          <a-descriptions-item label="ID">{{infoForm.id}}</a-descriptions-item>
          <a-descriptions-item label="name">{{infoForm.name}}</a-descriptions-item>
          <a-descriptions-item label="phone">{{infoForm.phone}}</a-descriptions-item>
          <a-descriptions-item label="email">{{infoForm.email}}</a-descriptions-item>
          <a-descriptions-item label="birth" :span="2"> {{infoForm.birth}}</a-descriptions-item>
          <a-descriptions-item label="gender">{{infoForm.gender}}</a-descriptions-item>
          <a-descriptions-item label="age" :span='2'>{{infoForm.age}}</a-descriptions-item>
          <a-descriptions-item label="school">{{infoForm.school}}</a-descriptions-item>
          <a-descriptions-item label="schoolDirector">{{infoForm.schoollDirector}}</a-descriptions-item>
          <a-descriptions-item label="schoolContact">{{infoForm.schoolContact}}</a-descriptions-item>
          <a-descriptions-item label="college">{{infoForm.college}}</a-descriptions-item>
          <a-descriptions-item label="collegeDirector">{{infoForm.collegeDirector}}</a-descriptions-item>
          <a-descriptions-item label="collegeContact">{{infoForm.collegeContact}}</a-descriptions-item>
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
                />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Gender">
                  <a-radio-group name="radioGroup" @change="onChange" :defaultValue="1">
                    <a-radio :value="1">Male</a-radio>
                    <a-radio :value="2">Female</a-radio>
                  </a-radio-group>
              </a-form-model-item>
              <a-form-model-item has-feedback label="School">
                <a-select defaultValue="CUHK" style="width: 120px" @change="handleChange">
                  <a-select-option value="CUHK">CUHK</a-select-option>
                  <a-select-option value="CUHKSZ">CUHKSZ</a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item has-feedback label="College">
                <a-select defaultValue="Shaw" style="width: 120px" @change="handleChange">
                  <a-select-option value="Shaw">Shaw</a-select-option>
                  <a-select-option value="Diligentia">Diligentia</a-select-option>
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
        id: '',
        name: '',
        phone: '',
        email: '',
        birth: '',
        gender: '',
        age: '',
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
          alert('submit!');
          this.$data.modifyFormVisible = false;
        } else {
          console.log('error submit!!');
          this.$data.modifyFormVisible = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
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
  width: 80%;
  height: 100%;
  padding: 2% 5%;
}

</style>