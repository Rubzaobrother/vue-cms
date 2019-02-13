<template>
  <div class="newsList-container">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="(item,index) in newsList " :key="index">
        <router-link :to="'/home/newsInfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发布时间: {{item.add_time | dateFormat}}</span>
              <span>点击:{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList: []
    };
  },
  //页面加载调用一次
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$http.get("getnewslist").then(result => {
        // console.log(result)
        this.newsList = result.body.message;
        // console.log(newsList)
      });
    }
  }
};
</script>

<style lang="less">
.newsList-container {
  .mui-table-view {
    li {
      h1 {
        font-size: 14px;
      }
      .mui-ellipsis {
        font-size: 12px;
        color: skyblue;
        display: flex;
        justify-content: space-around;
      }
    }
  }
}
</style>