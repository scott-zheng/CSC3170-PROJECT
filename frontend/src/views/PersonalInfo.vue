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
        <a-button @click='modifyFormVisible=true'>Modify</a-button>
        <!-- Modify form for information-->
        <a-modal
          title="Modify form for information"
          :visible="modifyFormVisible"
        >
        <a-row type="flex" justify="center">
          <a-col :span="10">
            <a-form-model ref="modifyInfoModel" :model="modifyInfoForm" :rules="rules">
              <a-form-model-item has-feedback label="Name" prop="name">
                <a-input v-model="modifyInfoForm.name" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Phone" prop="phone">
                <a-input v-model="modifyInfoForm.phone" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Password" prop="pass">
                <a-input v-model="modifyInfoForm.pass" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Confirm Password" prop="pass2">
                <a-input v-model="modifyInfoForm.pass2" type="password" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Email" prop="email">
                <a-input v-model="modifyInfoForm.email" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Birthday" prop="birth">
                <a-input v-model="modifyInfoForm.birth" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Gender" prop="gender">
                <a-input v-model="modifyInfoForm.email" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="School" prop="school">
                <a-input v-model="modifyInfoForm.email" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="College" prop="college">
                <a-input v-model="modifyInfoForm.email" autocomplete="off" />
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
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import Header from '@/components/Header'
// const PersonalInfoFrom = [

// ]
export default {
  name: 'PersonalInfo',
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the phone number'));
      } else {
        if (this.ruleForm.phone !== '') {
          // 在第2行中的ref绑定了一个DOM组件loginModel，并可以用$refs来调用使用了ref绑定的元素和组件。
          // https://www.jianshu.com/p/623c8b009a85
          this.$refs.loginModel.validateField('pass');
          callback();
        }
        callback();
      }
    };
    return {
      modifyFormVisible:true,
      loginForm: {
        phone: '',
        pass: '',
      },
      rules: {
        name: [{ validator: validateName, trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        pass2: [{ validator: validatePass2, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }],
        birth: [{ validator: validateBirth, trigger: 'blur' }],
        gender: [{ validator: validateGender, trigger: 'blur' }],
        school: [{ validator: validateSchool, trigger: 'blur' }],
        college: [{ validator: validateCollege, trigger: 'blur' }],
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