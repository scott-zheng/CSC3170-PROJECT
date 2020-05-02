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
        <a-radio-group style="margin-bottom: 25px" name="radioGroup" default-value="customer" @change="changeType">
          <a-radio value="customer">
            Customer
          </a-radio>
          <a-radio value="vendor">
            Vendor
          </a-radio>
        </a-radio-group>
        <a-form-model-item>
          <a-button type="primary" @click="submitForm('loginModel')">
          Submit
          </a-button>
          <a-button @click="resetForm('loginModel')" style="margin-left: 20px;">
          Reset
          </a-button>
          <a-button @click="toRegister()" style="margin-left: 20px;">
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
import axios from 'axios'

export default {
  name: 'Login',
  components: {

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
          this.$refs.loginModel.validateField('pass');
          callback();
        }
        callback();
      }
    };
    return {
      userType: 'customer',
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
    changeType(e) {
      console.log(`checked = ${e.target.value}`);
      this.userType= e.target.value;
    },
    testLogin() {
      return new Promise(user_id => {
        axios.post('/api/findUser',{
          phone: this.loginForm.phone,
          password: this.loginForm.pass,
        }).then((response) => {
          console.log(response)

          var content = response.data;
          if (content.length != 0) {
            var id = content[0].User_id;
            console.log('usertype:', this.userType)
            console.log('user_id:', id)
            
            // user type check
            var valid;
            if (this.userType == 'customer') {
              axios.post('/api/findCustomer', {user_id: id}).then((res) => {
                valid = (res.data.length != 0)
                console.log('valid:', valid)
                if (valid) {
                  user_id(id);
                  this.$message.success("Successfully login!");
                }
                else this.$message.error("Incorrect phone number or password.");
              })
            } else if (this.userType == 'vendor') {
              axios.post('/api/findVendor', {user_id: id}).then((res) => {
                valid = (res.data.length != 0)
                console.log('valid:', valid)
                if (valid) {
                  user_id(id);
                  this.$message.success("Successfully login!");
                }
                else this.$message.error("Incorrect phone number or password.");
              })
            }
          } 
          else this.$message.error("Incorrect phone number or password.");
        })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // test login validity
          this.testLogin().then((user_id) => {
            console.log("user_id_2:", user_id);

            if (user_id) {  // successfully login
              // set user session id and user type
              sessionStorage.setItem("user_id", user_id);
              sessionStorage.setItem("user_type", this.userType);
              // jump to search page
              this.$router.push({path:'/search'}).catch(err => {err})
            }
          })
        } else {
          this.$message.error('Login error');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toRegister() {
      this.$router.push({path:'/register'}).catch(err => {err})
    },
  },
}
</script>
