<template>
  <div class="ui-container">
    <div class="detail-title">弹框详情</div>
    <div class="detail-des">
      <div class="des-item">通常详情信息不多时，可以采用弹出窗形式进行信息展示。</div>
      <div class="des-item">顶部信息展示区，根据实际信息条数，可以采用页面详情相关布局。</div>
      <div class="des-item">底部根据场景，可以采用表格或者多tab布局。</div>
    </div>

    <div class="detail-sub">
      <div class="sub-title">示例:</div>
      <img class="detail-img" :src="detailModalImg" />
    </div>
  </div>
</template>
<script setup>
import detailModalImg from '@/assets/images/detail-modal.png'
</script>
<style scoped lang="less"></style>
