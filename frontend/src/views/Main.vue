<template>
  <div>
    <a-layout>
      <a-layout-header class="layout-header">
        <Header class="header"/>
      </a-layout-header>
    </a-layout>

    <!-- Main page -->
    <p id='mainpage'>Main Page</p>

    <!-- Category -->
    <div class='text-content'>
        <h2 id="category">Category</h2>

        <!-- Cards -->
        <div style="background-color: #ececec; padding: 20px;">
            <a-row :gutter="16">
            <a-col :span="6">
                <a-card class="card" title="Card title" :bordered="true" hoverable="true" @click="onCard">
                <p>card content</p>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card class="card" title="Card title" :bordered="true" hoverable="true" @click="onCard">
                <p>card content</p>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card class="card" title="Card title" :bordered="false" hoverable="true" @click="onCard">
                <p>card content</p>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card class="card" title="Card title" :bordered="false" hoverable="true" @click="onCard">
                <p>card content</p>
                </a-card>
            </a-col>
            </a-row>
        </div>
    </div>

    <!-- Tags -->
    <div class='text-content'>
        <h2 id="tags">Tags</h2>

        <!-- checkbox group -->
        <a-form-model
            id="checkbox-group"
            ref="ruleForm"
            :model="form"
            :rules="rules"
        >
            <a-form-model-item prop="type">
            <a-checkbox-group v-model="form.type">
                <a-checkbox class="checkbox" value="1" name="type" style="font-size: 20px">
                drink
                </a-checkbox>
                <a-checkbox class="checkbox" value="2" name="type" style="font-size: 20px">
                lunch
                </a-checkbox>
                <a-checkbox class="checkbox" value="3" name="type" style="font-size: 20px">
                tag3
                </a-checkbox>
            </a-checkbox-group>
            </a-form-model-item>
            <a-form-model-item >
            <a-button type="primary" @click="onSearch">
                Search
            </a-button>
            <a-button style="margin-left: 10px;" @click="resetForm">
                Reset
            </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
  </div>
</template>



<script>
import Header from '@/components/Header'

export default {
    name: 'Main',
    data() {
        return {
            other: '',
            form: {
                name: '',
                type: [],
            },
            rules: {
                type: [
                    {
                        type: 'array',
                        required: true,
                        message: 'Please select at least one activity type',
                        trigger: 'change',
                    },
                ],
            },
        };
    },

    methods: {
        onSearch() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    // do search here

                    alert('search!');
                } else {
                    console.log('error search!!');
                return false;
                }
            });
        },
        resetForm() {
            this.$refs.ruleForm.resetFields();
        },

        onCard() {
            this.$router.push({path:'/login'}).catch(err => {err})
        }
    },

    components: {
        Header
    }
}
</script>



<style>
#mainpage {
    position: relative;
    margin-top: 0px;
    padding-top: 20px;
    float: left;
    padding-left: 80px;
    font-family: x-locale-heading-primary,zillaslab,Palatino,"Palatino Linotype",x-locale-heading-secondary,serif;
    font-weight: bold;
    font-size: 30px;
}

.text-content {
    position: relative;
    margin-top: 100px;
    margin-bottom: 100px;
    padding-top: 20px;
    border-top: 5px solid #3d7e9a;
}

h2 {
    /* float: left; */
    /* padding-left: 80px; */
    font-family: x-locale-heading-primary,zillaslab,Palatino,"Palatino Linotype",x-locale-heading-secondary,serif;
    font-weight: bold;
    font-size: 30px;
}

.checkbox {
    font-family: fantasy;
    font-weight: bold;
    color: blueviolet;
}

#checkbox-group {
    margin-bottom: 270px;
}

</style>