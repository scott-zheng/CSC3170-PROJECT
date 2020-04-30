<template>
  <a-row type="flex" justify="center">
    <a-col :span="10">
      <div style="text-align: center; padding: 10%;">
      <h1>Public Recommendation System for CUHKSZ</h1>
      <h1><strong>Log in</strong></h1>
      <a-form-model ref="loginModel" :model="loginForm" :rules="rules">
        <a-form-model-item has-feedback label="UserPhone" prop="phone">
          <a-input v-model="loginForm.phone" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="Password" prop="pass">
          <a-input v-model="loginForm.pass" type="password" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="submitForm('loginModel')">
          Submit
          </a-button>
          <a-button @click="resetForm('loginModel')">
          Reset
          </a-button>
          <a-button @click="toRegister()">
          Register
          </a-button>
        </a-form-model-item>
      </a-form-model>
      </div>
    </a-col>
  </a-row>
</template>

<script>
// @ is an alias to /src
// import Header from '@/components/Header'

export default {
  name: 'Login',
  components: {
    // Header
  },
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
        if (this.loginForm.phone !== '') {
          // 在第2行中的ref绑定了一个DOM组件loginModel，并可以用$refs来调用使用了ref绑定的元素和组件。
          // https://www.jianshu.com/p/623c8b009a85
          this.$refs.loginModel.validateField('pass');
          callback();
        }
        callback();
      }
    };
    return {
      loginForm: {
        phone: '',
        pass: '',
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
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
          this.$router.push({path:'/search'}).catch(err => {err})
          this.$message.success('Login successful!');
        } else {
          this.$message.error('Login error');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toRegister(){
      this.$router.push({path:'/register'}).catch(err => {err})
    }
  },
}
</script>
