<template>
  <div class="ui-container">
    <div class="detail-title">页面表单</div>
    <div class="detail-des">
      <div class="des-item">该场景适用于以新页面形式引导用户进行输入。</div>
      <div class="des-item">
        操作按钮位于底部，与表单输入项左对齐；保存按钮为蓝色、取消按钮为白色。
      </div>
    </div>
    <div class="detail-sub">
      <div class="sub-title">单列布局:</div>
      <img class="detail-img" :src="formPageImg" />
    </div>
    <div class="detail-sub">
      <div class="sub-title">左右布局:</div>
      <img class="detail-img w80" :src="formPageImgTwo" />
    </div>
  </div>
</template>
<script setup>
import formPageImg from '@/assets/images/form-page.png'
import formPageImgTwo from '@/assets/images/form-page-two.png'
</script>
<style scoped lang="less"></style>
