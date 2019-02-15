<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BBBBB的内容(最多BBBBB120字)" v-model="commentContent"></textarea>
    <mt-button type="primary" size="large" @click="postContent">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, index) in comments" :key="item.add_time">
        <div class="cmt-title">第 {{ index + 1 }} 楼&nbsp;&nbsp;用户:{{ item.user_name }}&nbsp;&nbsp;发表时间:{{ item.add_time | dateFormat }}</div>
        <div class="cmt-body">{{ item.content === "undefined" ? "此用户很懒"  : item.content}}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';
export default {
  data() {
    return {
      pageIndex: 1,
      comments: [],
      commentContent:''
    };
  },
  //页面加载调用一次
  created() {
    this.getComments();
  },
  methods: {
    getComments() {   //获取评论
      this.$http
        .get("getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          // this.comments = result.body.message;
          // 获取评论拼接新数据
          this.comments = this.comments.concat(result.body.message)
        });
    },
    getMore(){ //
      this.pageIndex++;
      this.getComments();
    },
    postContent(){
      if(this.commentContent.trim().length === 0) 
      return Toast("内容不能为空"); 
       this.$http.post('postcomment/' + this.id , {content : this.commentContent})
       .then(result=>{
         console.log(result.body)
         this.comments = [];
         this.pageIndex = 1;
         this.getComments();
         this.commentContent=''
       })
    }
  },
  props: ["id"]
};
</script>

<style lang="less">
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>