<template>
  <a-row type="flex" justify="center">
    <a-col :span="10">
      <a-form-model ref="registerModel" :model="registerForm" :rules="rules">
        <a-form-model-item has-feedback label="UserPhone" prop="phone">
          <a-input v-model="registerForm.phone" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="UserName" prop="userName">
          <a-input v-model="registerForm.userName" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="Password" prop="pass">
          <a-input v-model="registerForm.pass" type="password" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="Confirm password" prop="pass2">
          <a-input v-model="registerForm.pass2" type="password" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="submitForm('registerModel')">
          Submit
          </a-button>
          <a-button @click="resetForm('registerModel')">
          Reset
          </a-button>
          <a-button @click="toLogin()">
          Login
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-col>
  </a-row>
</template>

<script>
// @ is an alias to /src
// import Header from '@/components/Header'

export default {
  name: 'Register',
  components: {
    // Header
  },
  data() {
    let validatePhone = (rule, value, callback) => {
      const phoneReg = /^[0-9]/;
      if (value === '') {
        callback(new Error('Please input the phone number'));
      } else if (phoneReg.test(value) && value.length === 11) {
          // 在第2行中的ref绑定了一个DOM组件registerModel，并可以用$refs来调用使用了ref绑定的元素和组件。
          // https://www.jianshu.com/p/623c8b009a85
          this.$refs.registerModel.validateField('Password');
      } else {
        callback(new Error('Please input the correct phone number'));
      }
        callback();
    };
    let validateUserName =(rule, value, callback) => {
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
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else if (value.length <= 8 || value.length >= 128) {
        callback(new Error('The length of password should be between 8 and 128'));
      } else if (this.registerForm.pass2 !== '') {
        this.$refs.registerModel.validateField('Password2');
      }
      callback();
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.registerForm.pass) {
        callback(new Error('The password are not the same!'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        phone: '',
        userName: '',
        pass: '',
        pass2: ''
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: 'blur', len: 11}],
        userName: [{ validator: validateUserName, trigger: 'blur', min: 1, max: 20}],
        pass: [{ validator: validatePass, trigger: 'blur', min: 8, max: 128}],
        pass2: [{ validator: validatePass2, trigger: 'blur', min: 8, max: 128}],
      },
      // layout: {
      //   labelCol: { span: 4 },
      //   wrapperCol: { span: 14 },
      // },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin(){
      this.$router.push({path:'/login'}).catch(err => {err})
    }
  },
}
</script>
