<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表 -->
      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
            v-model="$store.getters.goodsSelected[item.id]"
            @change="goodsChange(item.id, $store.getters.goodsSelected[item.id])"></mt-switch>
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
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计(不含运费)</p>
              <p>已勾选商品 <span class="red">{{  $store.getters.goodsCountAndAmount.count }}</span> 件,
               总价 <span class="red">￥{{ $store.getters.goodsCountAndAmount.amount }}</span></p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
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
    subtract(id) {  //减少
      this.goodsCount[id] > 1 && this.goodsCount[id]--;
      this.$store.commit("updateCount", { id, count: this.goodsCount[id] });
    },
    increment(id) { //增加
      this.goodsCount[id]++;
       this.$store.commit("updateCount", { id, count: this.goodsCount[id] });
    },
    remove(id,i){  //删除
      this.goodslist.splice(i, 1)
      this.$store.commit("removeFromCar", id)
    },
    goodsChange(id,selected){
      this.$store.commit("updateGoodsSelected",{id, selected})
    },

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
  .jiesuan{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red{
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
