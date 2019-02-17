<template>
    <div>
        <!-- 评论 -->
        <comment :id="id"></comment>
    </div>
</template>

<script>
export default {
    created() {
        
    },
    data() {
        return {
            id: this.$route.params.id
        }
    },
}
</script>

<style lang="less">
    
</style>