## AIcon 图标

### 基础用法

图标

```vue demo
<template>
  <!-- 风格一 -->
  <a-icon icon="DownloadOutlined" />
  <a-icon icon="LogoutOutlined" />
  <!-- 风格二 -->
  <a-icon type="logout" />
  <a-icon type="check-circle" theme="twoTone" twoToneColor="red" />
</template>

<script setup></script>
```

### API

| 参数         | 类型                               | 默认值     | 说明                                                                             |
| ------------ | ---------------------------------- | ---------- | -------------------------------------------------------------------------------- |
| icon         | string                             |            | 官方格式，带三种风格后缀 StepBackwardOutlined StepBackwardFilled UpCircleTwoTone |
| type         | string                             |            | 全小写，中划线分割，不带三种风格后缀                                             |
| theme        | 'filled' 、'outlined' 、 'twoTone' | 'outlined' | 配置 type 时生效，图标主题风格。可选实心、描线、双色等主题风格                   |
| twoToneColor | string                             |            | 配置 type 时生效，仅适用双色图标。设置双色图标的主要颜色                         |

### 事件

| 参数 | 说明 |
| ---- | ---- |

### 方法

| 名称 | 描述 | 说明 |
| ---- | ---- | ---- |

## FAQ

拓展官方 icon 用法
