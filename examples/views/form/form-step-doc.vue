<template>
  <div class="ui-container">
    <div class="detail-title">分布表单</div>
    <div class="detail-des">
      <div class="des-item">该场景适用于以分布形式引导用户进行输入。</div>
      <div class="des-item">每一步进行单独校验，布局分三种形式行内多列，行内单列，上下单列。</div>
    </div>
    <div class="detail-sub">
      <div class="sub-title">行内多列:</div>
      <img class="detail-img" :src="formStepImgOne" />
    </div>
    <div class="detail-sub">
      <div class="sub-title">行内单列:</div>
      <img class="detail-img w80" :src="formStepImgTwo" />
    </div>
    <div class="detail-sub">
      <div class="sub-title">上下单列:</div>
      <img class="detail-img w80" :src="formStepImgThree" />
    </div>
  </div>
</template>
<script setup>
import formStepImgOne from '@/assets/images/form-step-one.png'
import formStepImgTwo from '@/assets/images/form-step-two.png'
import formStepImgThree from '@/assets/images/form-step-three.png'
</script>
<style scoped lang="less"></style>
