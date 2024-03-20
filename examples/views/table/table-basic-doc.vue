<template>
  <div class="ui-container">
    <div class="detail-title">普通表格</div>
    <div class="detail-des">
      <div class="des-item">
        epc常用布局，可以查看和处理大量的条目，常有导航至详情的作用。用户可在列表页对条目进行筛选、新增、编辑、下钻至条目完整详情页等操作。
      </div>
      <div class="des-item">
        通常表格表头操作按钮都采用白色按钮，若有特定场景，可采用蓝色按钮表示强调，红色按钮表示警示，禁用其他颜色按钮。
      </div>
      <div class="des-item">表格表头操作按钮超过8个，需放入下拉菜单中。</div>
    </div>

    <div class="detail-sub">
      <div class="sub-title">错误事例:</div>
      <div>顶部搜索条件对其方式；表头按钮五颜六色；表格列宽未根据列内容适应；</div>
    </div>
    <div class="detail-sub">
      <div class="sub-title">普通表格:</div>
      <img class="detail-img w80" :src="basicImg" />
    </div>
    <div class="detail-sub">
      <div class="sub-title">按钮过多:</div>
      <img class="detail-img w80" :src="basicImgTwo" />
    </div>
  </div>
</template>
<script setup>
import basicImg from '@/assets/images/table-basic.png'
import basicImgTwo from '@/assets/images/table-basic-two.png'
</script>
<style scoped lang="less"></style>
