```vue demo
<template>
  <a-result
    status="success"
    title="Successfully Purchased Cloud Server ECS!"
    sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
  >
    <template #extra>
      <a-button key="console" type="primary">Go Console</a-button>
      <a-button key="buy">Buy Again</a-button>
    </template>
  </a-result>

  <a-divider />

  <a-result title="Your operation has been executed">
    <template #extra>
      <a-button key="console" type="primary">Go Console</a-button>
    </template>
  </a-result>

  <a-divider />

  <a-result status="warning" title="There are some problems with your operation.">
    <template #extra>
      <a-button key="console" type="primary">Go Console</a-button>
    </template>
  </a-result>

  <a-divider />

  <a-result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
    <template #extra>
      <a-button type="primary">Back Home</a-button>
    </template>
  </a-result>
</template>

<script lang="ts" setup></script>
```
