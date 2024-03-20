<template>
  <div class="ui-container">
    <div class="detail-title">弹框表单</div>
    <div class="detail-des">
      <div class="des-item">
        表单页是一种用于信息添加、录入的页面类型。用来确保用户按照要求录入信息提交给系统使用或引导用户进行应用设置。
      </div>
      <div class="des-item">
        通常新增或者编辑操作，推荐以弹框表单形式展示；header和footer区域用分割线分割；确定按钮为蓝色、取消按钮为白色。
      </div>
      <div class="des-item">
        录入项分单列布局和双列布局，一般选项较多时可用双列布局、较少时可用单列布局。
      </div>
    </div>

    <div class="detail-sub">
      <div class="sub-title">错误事例:</div>
      <div>无顶部title、底部按钮居中、无分割线</div>
    </div>

    <div class="detail-sub">
      <div class="sub-title">双列布局:</div>
      <img class="detail-img" :src="formModalImg" />
    </div>

    <div class="detail-sub">
      <div class="sub-title">单列布局:</div>
      <img class="detail-img" :src="formModalImgTwo" />
    </div>
  </div>
</template>
<script setup>
import formModalImg from '@/assets/images/form-modal.png'
import formModalImgTwo from '@/assets/images/form-modal-two.png'
</script>
2
<style scoped lang="less"></style>
