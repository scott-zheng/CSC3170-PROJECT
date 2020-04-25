<template>
  <div>
    <a-layout style="background: rgb(255, 255, 255);">
      <a-layout-header class="layout-header">
        <Header class="header"/>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <p style="font-size: 25px;">Vendor name</p>
        <a-descriptions title="User Info">
          <a-descriptions-item label="Service">Zhou Maomao</a-descriptions-item>
          <a-descriptions-item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </a-descriptions-item>
        </a-descriptions>
        <!-- Comment -->
        <a-list
          v-if="comments.length"
          :dataSource="comments"
          :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
          itemLayout="horizontal"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-comment
              :author="item.author"
              :avatar="item.avatar"
              :content="item.content"
              :datetime="item.datetime"
            >
            </a-comment>
          </a-list-item>
        </a-list>
        <a-comment>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <div slot="content">
            <a-form-item>
              <a-textarea :rows="4" @change="handleChange" :value="value"></a-textarea>
            </a-form-item>
            <a-form-item>
              <a-button htmlType="submit" :loading="submitting" @click="handleSubmit" type="primary">
                Add Comment
              </a-button>
            </a-form-item>
          </div>
        </a-comment>
      </a-layout-content> 
    </a-layout>
  </div>
</template>

<script>
import moment from 'moment';
import Header from '@/components/Header'

export default {
  data() {
    return {
      comments: [],
      submitting: false,
      value: '',
      moment,
    };
  },
  methods: {
    handleSubmit() {
      if (!this.value) {
        return;
      }

      this.submitting = true;

      setTimeout(() => {
        this.submitting = false;
        this.comments = [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: this.value,
            datetime: moment().fromNow(),
          },
          ...this.comments,
        ];
        this.value = '';
      }, 1000);
    },
    handleChange(e) {
      this.value = e.target.value;
    },
  },
  components: {
    Header
  }
};
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