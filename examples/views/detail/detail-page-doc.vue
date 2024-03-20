<template>
  <div class="ui-container">
    <div class="detail-title">页面详情</div>
    <div class="detail-des">
      <div class="des-item">
        该场景适用于以新页面形式向用户展示一个对象的完整信息，主要用于信息浏览，通常展示信息量比较多。
      </div>
      <div class="des-item">顶部左侧展示title，右侧放操作按钮。</div>
      <div class="des-item">
        基本详情：可使用不同栏分割线将相关内容分组，将主体内容呈现于一整张卡片中。
      </div>
      <div class="des-item">
        高级详情：当详情页内容量大复杂度高时，可以拆分为多个页签，作为辅助导航引导用户浏览信息。
      </div>
    </div>

    <div class="detail-sub">
      <div class="sub-title">基本详情:</div>
      <img class="detail-img w80" :src="detailPageImg" />
    </div>
    <div class="detail-sub">
      <div class="sub-title">高级详情:</div>
      <img class="detail-img w80" :src="detailPageImgOne" />
      <img class="detail-img w80" :src="detailPageImgTwo" />
    </div>
  </div>
</template>
<script setup>
import detailPageImg from '@/assets/images/detail-page.png'
import detailPageImgOne from '@/assets/images/detail-page-one.png'
import detailPageImgTwo from '@/assets/images/detail-page-two.png'
</script>
<style scoped lang="less"></style>
