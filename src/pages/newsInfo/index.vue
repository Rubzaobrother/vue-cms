<template>
  <div class="newsInfo-container">
      <!-- 大标题 -->
    <h3 class="title">{{ newsInfo.title }}</h3>
    <!-- 子标题 -->
    <P class="subtitle">
      <span>发表时间: {{ newsInfo.add_time | dateFormat }}</span>
      <span>点击:{{ newsInfo.click }}次</span>
    </P>
    <hr>
    <!-- 内容区域 -->
    <div class="content" v-html="newsInfo.content"></div>

    <!-- 评论子组件 -->
    <comment></comment>
  </div>
</template>

<script>
import comments from '../../components/comment'

export default {
  data() {
    return {
      id: this.$route.params.id, // 将URL 地址中传递过来的ID值 挂载到data上 方便调用
      newsInfo: {} //新闻对象
    };
  },
  //页面加载调用一次
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      //获取新闻详情
      this.$http.get("getnew/" + this.id).then(result => {
        console.log(result);
        if (result.body.status === 0) {
          this.newsInfo = result.body.message[0];
        } else {
          Toast("获取详情失败!");
        }
      });
    }
  },
  components: { //注册私有组件
      comment
  }
};
</script>

<style lang="less">
// scoped的作用 是为了限制样式只在当前组件中生效, 不会影响其他组件
// 原理 是给当前组件内所有的标签都加入了一个唯一的标识符属性 data-v-1fdaa4e8
// 然后, 在设置样式的时候 利用属性选择器来设置
.newsInfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    color: red;
    margin: 15px 0;
  }
  .subtitle {
    font-size: 13px;
    color: skyblue;
    display: flex;
    justify-content: space-between;
  }
  .content {
      img{
          width: 100%;
      }
  }
}
</style>