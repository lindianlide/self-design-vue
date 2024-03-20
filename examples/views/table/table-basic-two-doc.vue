<template>
  <div class="ui-container">
    <div class="detail-title">双列表格</div>
    <div class="detail-des">
      <div class="des-item">epc常用布局，需要展示两个表格，通常右侧表格是左侧表格的详情信息。</div>
      <div class="des-item">根据应用场景，左右布局可以按3/7、4/6、5/5分布。</div>
    </div>

    <div class="detail-sub">
      <img class="detail-img w80" :src="TableTwo" />
    </div>
  </div>
</template>
<script setup>
import TableTwo from '@/assets/images/table-two.png'
</script>
<style scoped lang="less"></style>
