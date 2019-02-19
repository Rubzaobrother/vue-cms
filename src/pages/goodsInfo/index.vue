<template>
  <div class="goodsInfo-container">
    <!-- 商品详情 --- {{this.$route.params.id}} -->
    <!-- 小球动画 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :banners="Lunbotu"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买 -->
    <div class="mui-card">
      <div class="mui-card-header">商品的名称标题</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥2399</del> &nbsp;&nbsp;销售价:
            <span class="now_price">￥2199</span>
          </p>
          <div class="numbox">
            <span class="title">购买数量:</span>
            <input 
            @click="buyCount >= 2 && buyCount--" 
            type="button"
            value="-"
            :disabled="buyCount == 1"
            >
            <input
              @change="filterMaxCount"
              v-model="buyCount"
              type="text"
              onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
              onafterpaste="this.value=this.value.replace(/[^\d]/g,'') "
              name="f_order"
              value="1"
            >   
            <input
              @click="buyCount < goodsInfo.stock_quantity && buyCount++"
              type="button"
              value="+"
              :disabled="buyCount == goodsInfo.stock_quantity"
            >
          </div>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号: {{goodsInfo.goods_no}}</p>
          <p>库存情况: {{goodsInfo.stock_quantity}}</p>
          <p>上架时间: {{goodsInfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="gocomment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getLunbotu(), this.getGoodsInfo();
  },
  data() {
    return {
      id: this.$route.params.id,
      Lunbotu: [],  //轮播图
      goodsInfo: {},  //商品信息
      buyCount: 1,    
      ballFlag: false,  //控制小球
    };
  },
  methods: {
    getLunbotu() {
      this.$http.get("getthumimages/" + this.id).then(result => {
        this.Lunbotu = result.body.message;
      });
    },
    getGoodsInfo() {
      this.$http.get("goods/getinfo/" + this.id).then(result => {
        this.goodsInfo = result.body.message[0];
      });
    },
    filterMaxCount() {
      if (this.buyCount > this.goodsInfo.stock_quantity) {
        this.buyCount = this.goodsInfo.stock_quantity;
      }
    },
    goDesc(id) {
      this.$router.push("/home/goodsDesc/" + id);
    },
    gocomment(id) {
      this.$router.push("/home/goodsComment/" + id);
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
        // id: 商品id, count: 要购买的数量, price: 商品的单价, selected: false
      var goodsinfo = {
        id: this.id,
        count: 
      }
    },
    beforeEnter(el) {
      el.style.transform = "translate(0px, 0px)";
    },
    enter(el, done) {
      el.offsetWidth;
      // 获取小球的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取页面的位置
      const badePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const x = badePosition.left - ballPosition.left;
      const y = badePosition.top - ballPosition.top;

      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.transition = "all 1s cubic-bezier(.4, -0.3, 1, .68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    }
  }
};
</script>

<style lang="less">
.goodsInfo-container {
  background-color: #eee;
  overflow: hidden;
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 137px;
  }

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 10px 0;
    }
  }

  .numbox {
    display: flex;
    height: 35px;
    align-items: center;
    margin-bottom: 10px;
    .title {
      margin-right: 5px;
    }
    input {
      width: 35px;
      height: 35px;
      padding: 0;
      margin: 0;
      text-align: center;

      &[type="text"] {
        border-left: 0;
        border-right: 0;
        color: #ccc;
        font-size: 14px;
      }
    }
  }
}
</style>