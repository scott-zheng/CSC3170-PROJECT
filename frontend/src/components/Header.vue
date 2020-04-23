<template>

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

<style>

</style>