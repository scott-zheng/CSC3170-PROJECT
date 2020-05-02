<template>
  <a-row type="flex" justify="center">
    <a-col :span="10">
      <div style="text-align: center; padding: 10%;">
      <h1>Public Recommendation System for CUHKSZ</h1>
      <h1><strong>Register</strong></h1>
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
        <a-radio-group style="margin-bottom: 25px" name="radioGroup" default-value="customer" @change="changeType">
          <a-radio value="customer">
            Customer
          </a-radio>
          <a-radio value="vendor">
            Vendor
          </a-radio>
        </a-radio-group>
        <a-form-model-item>
          <a-button type="primary" @click="submitForm('registerModel')">
          Submit
          </a-button>
          <a-button @click="resetForm('registerModel')" style="margin-left: 20px;">
          Reset
          </a-button>
          <a-button @click="toLogin()" style="margin-left: 20px;">
          Login
          </a-button>
        </a-form-model-item>
      </a-form-model>
      </div>
    </a-col>
  </a-row>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'Register',
  components: {

  },
  data() {
    let validatePhone = (rule, value, callback) => {
      const phoneReg = /^[0-9]*$/;
      if (value === '') {
        callback(new Error('Please input the phone number'));
      } else if (phoneReg.test(value) && value.length === 11) {
        this.$refs.registerModel.validateField('Password');
      } else {
        callback(new Error('Please input the correct phone number'));
      }
        callback();
    };
    let validateUserName =(rule, value, callback) => {
      const userReg = /^[a-zA-Z0-9_-]*$/;
      if (value === '') {
        callback(new Error('Please input the username'));
      } else {
        if (!userReg.test(value)) {
          callback(new Error('Username includes invalid characters'));
        } else if (value.length <= 1 || value.length > 20) {
          callback(new Error('The length of username should be between 2 and 20'));
        } else {
          callback();
        }
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else if (value.length < 8 || value.length > 128) {
        callback(new Error('The length of password should be between 8 and 128'));
      } else if (this.registerForm.pass2 !== '') {
        this.$refs.registerModel.validateField('pass2');
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
      userType: 'customer',
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
    changeType(e) {
      console.log(`checked = ${e.target.value}`);
      this.userType = e.target.value
    },
    addUser() {
      var name = this.registerForm.userName
      var phone = this.registerForm.phone
      var password = this.registerForm.pass

      axios.post('/api/addUser', {
        name: name,
        phone: phone,
        password: password,
      }).then((response) => {
        console.log('adduser:', response)
      })

      // obtain user_id for adding a customer/vendor 
      axios.post('/api/findUser', {
        phone: phone,
        password: password,
      }).then((response) => {
        console.log('findUser:', response)
        console.log('usertype:', this.userType)

        var user_id = response.data[0].User_id
        if (this.userType == 'customer') {
          axios.post('/api/addCustomer', { user_id: user_id, })
        } else if (this.userType == 'vendor') {
          axios.post('/api/addVendor', { user_id: user_id, })
        }
      })
    },
    
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addUser();
          this.$message.success('Successful register!')
          this.$router.push({path: '/login'}).catch(err => {err})
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
