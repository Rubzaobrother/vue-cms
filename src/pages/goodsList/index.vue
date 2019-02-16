<template>
  <div class="goods-list">
    <div class="item" v-for="(item,index) in goodsList" :key="index" @click="goDetail(item.id)">
      <img :src="item.img_url">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  created() {
    this.getGoodsList();
  },
  data() {
    return {
      pageindex: 1,
      goodsList: []
    };
  },
  methods: {
    getGoodsList() {
      this.$http.get("getgoods?pageindex=" + this.pageindex).then(result => {
        if (result.body.status === 0) {
          this.goodsList = this.goodsList.concat(result.body.message);
        }
      });
    },
    getMore() {
      this.pageindex++;
      this.getGoodsList();
    },
    goDetail(id){
        this.$router.push('/home/goodsInfo/' + id);
    }
  }
};
</script>

<style lang="less">
.goods-list {
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  padding: 2px;
  .item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 3px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
  }
  .info {
    background-color: #ddd;
    p {
      padding: 5px;
      margin: 0;
    }
    .price {
      .now {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
      .old {
        text-decoration: line-through;
        font-size: 12px;
        margin-left: 10px;
      }
    }
    .sell {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>