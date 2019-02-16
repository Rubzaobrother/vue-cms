<template>
  <div class="goodsInfo-container">
    <!-- 商品详情 --- {{this.$route.params.id}} -->
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
                市场价:<del>￥2399</del> &nbsp;&nbsp;销售价: <span class="now_price">
                    ￥2199
                </span>
            </p>
            <p>购买数量:
                
            </p>
            <p>
                <mt-button type="primary" size="small">立即购买</mt-button>
                <mt-button type="danger" size="small">加入购物车</mt-button>
            </p>
        </div>
      </div>
    </div>

    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header"></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner"></div>
      </div>
      <div class="mui-card-footer">页脚</div>
    </div>
  </div>
</template>

<script>
export default {
    
  created() {
      this.getLunbotu()
  },
  data() {
    return {
        id:this.$route.params.id,
        Lunbotu:[],
    };
  },
  methods: {
      getLunbotu(){
          this.$http.get("getthumimages/" + this.id).then(result =>{
              this.Lunbotu = result.body.message
          })
      }
  }
};
</script>

<style lang="less">
  .goodsInfo-container{
      background-color: #eee;
      overflow: hidden;

      .now_price{
          color: red;
          font-size: 16px;
          font-weight: bold;
      }
  }

</style>