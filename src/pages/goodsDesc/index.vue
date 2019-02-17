<template>
    <div class="goodsDesc-container">
        <h3> {{ goodsDesc.title }} </h3>
        <hr>
        <div class="content" v-html="goodsDesc.content"></div>
    </div>
</template>

<script>
export default {
    created() {
         this.getGoodsDesc()
    },
    data() {
        return {
            goodsDesc:{},
            id : this.$route.params.id
        }
    },
    methods: {
        getGoodsDesc(){
            this.$http.get("goods/getdesc/" + this.id).then(result =>{
                this.goodsDesc = result.body.message[0]
            })
        }
    },
}
</script>

<style lang="less">
    .goodsDesc-container{
        padding: 4px;
        h3{
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
</style>