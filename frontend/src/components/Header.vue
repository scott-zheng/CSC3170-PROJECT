<template>
  <div>
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="mail"> <router-link to="/"> Home</router-link> </a-menu-item>
      <a-menu-item key="app" disabled> <a-icon type="appstore" />Navigation Two </a-menu-item>
      <a-menu-item key="login">
        <a-button type="primary" @click="showModal">Login</a-button>
      </a-menu-item>
    </a-menu>
    <a-modal
      title="Title"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
        <a-form-model-item has-feedback label="UserName" prop="user">
          <a-input v-model="ruleForm.user" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="Password" prop="pass">
          <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="Age" prop="age">
          <a-input v-model.number="ruleForm.age" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="submitForm('ruleForm')">
            Submit
          </a-button>
          <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
            Reset
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  
  data() {
    let checkPending;
    let checkAge = (rule, value, callback) => {
      clearTimeout(checkPending);
      if (!value) {
        return callback(new Error('Please input the age'));
      }
      checkPending = setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please input digits'));
        } else {
          if (value < 18) {
            callback(new Error('Age must be greater than 18'));
          } else {
            callback();
          }
        }
      }, 100);
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        callback();
      }
    };
    let validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the username'));
      } else {
        if (this.ruleForm.user !== '') {
          this.$refs.ruleForm.validateField('pass');
        }
        callback();
      }
    };
    return {
      current: ['mail'],
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      ruleForm: {
        user: '',
        pass: '',
        age: '',
      },
      rules: {
        user: [{ validator: validateUser, trigger: 'change' }],
        pass: [{ validator: validatePass, trigger: 'change' }],
        age: [{ validator: checkAge, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel() {
      console.log('Clicked cancel button');
      this.visible = false;
    },
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
  },
};
</script>
