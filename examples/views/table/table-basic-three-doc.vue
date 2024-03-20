<template>
  <div class="ui-container">
    <div class="detail-title">双列表格</div>
    <div class="detail-des">
      <div class="des-item">epc常用布局，需要展示三个表格，通常右侧表格是左侧表格的详情信息。</div>
      <div class="des-item">
        根据应用场景，通常推荐采用右侧增加tab来展示，特殊场景可采用上下布局。
      </div>
    </div>

    <!-- <div class="detail-sub">
      <div class="sub-title">推荐布局:</div>
      <img class="detail-img w80" :src="TableThree" />
    </div> -->
    <div class="detail-sub">
      <div class="sub-title">推荐布局:</div>
      <img class="detail-img w80" :src="TableThreeTab" />
    </div>
  </div>
</template>
<script setup>
//import TableThree from '@/assets/images/table-three.png'
import TableThreeTab from '@/assets/images/table-threetab.png'
</script>
<style scoped lang="less"></style>
