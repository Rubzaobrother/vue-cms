<template>
    <div class="photoinfo-container">
        <h3>{{ photoInfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间:{{ photoInfo.add_time | dateFormat}}</span>
            <span>点击:{{ photoInfo.click }}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoInfo.content"></div>

        <!-- 评论子组件 -->
        <comment :id=id></comment>
    </div>
</template>

<script>


export default {
    created() {
        this.getPhotoInfo()
    },
    data(){
        return {
            id: this.$route.params.id,
            photoInfo:{}
        }
    },
    methods: {
        getPhotoInfo(){
            this.$http.get("getimageInfo/" + this.id).then(result =>{
                this.photoInfo = result.body.message[0]
            })
        }
    },
}
</script>

<style lang="less">
    .photoinfo-container{
        padding: 3px;
        h3{
            color: #26A2FF;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle{
            display: flex;
            justify-content: space-between; 
            font-size: 13px;
        }
        .content{
            font-size: 13px;
            line-height: 30px;
        }
    }
</style>