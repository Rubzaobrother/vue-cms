<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表 -->
      <div class="mui-card" v-for="item in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{ item.title }}</h1>
              <div class="numbox">
                <span class="price">￥{{ item.sell_price }}</span>
                <div class="num">
                  <input @click="subtract(item.id)" type="button" value="-">
                  <input v-model="goodsCount[item.id]" type="number">
                  <input @click="increment(item.id)" type="button" value="+">
                </div>
                <a href="#">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div
            class="mui-card-content-inner"
          >这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getGoodsList();
  },
  data() {
    return {
      goodslist: [],
      goodsCount: this.$store.getters.goodsCount
    };
  },
  methods: {
    getGoodsList() {
      //获取到store中所有商品id 拼接处一个用逗号分隔的字符串
      let idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      if (idArr.length <= 0) {
        return;
      }

      this.$http.get("goods/getshopcarlist/" + idArr.join(",")).then(result => {
        if (result.body.status === 0) {
          this.goodslist = result.body.message;
        }
      });
    },
    subtract(id) {
      this.goodsCount[id] > 1 && this.goodsCount[id]--;
      this.$store.commit("updateCount", { id, count: this.goodsCount[id] });
    },
    increment(id) {
      this.goodsCount[id]++;
       this.$store.commit("updateCount", { id, count: this.goodsCount[id] });
    }
  }
};
</script>

<style lang="less">
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    .numbox {
      display: flex;
      height: 50px;
      align-items: center;
      justify-content: space-between;
      input {
        float: left;
        width: 30px;
        height: 30px;
        padding: 0;
        margin: 0;
        text-align: center;
        &[type="number"] {
          border-left: 0;
          border-right: 0;
          font-size: 12px;
          color: gray;
        }
      }
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
