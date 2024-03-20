<script lang="ts">
import { withInstall } from '@packages/utils/util'
import { createVNode } from 'vue'
import * as IconsVue from '@ant-design/icons-vue'

function toCamelCase(type, theme) {
  //check-circle 转化为 CheckCircle
  const toCamelCaseType = type
    .replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
    .replace(/-([a-z])/g, function (match, letter) {
      return letter.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
    })
  if (theme) {
    return toCamelCaseType + theme.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
  } else {
    return toCamelCaseType + 'Outlined'
  }
}
export const CIcon = (props: {
  icon: string
  type?: string
  theme?: string
  twoToneColor?: string
}) => {
  let { icon, type, theme, twoToneColor } = props
  var antIcon: { [key: string]: any } = IconsVue
  if (type) {
    icon = toCamelCase(type, theme)
  }
  return createVNode(antIcon[icon], { twoToneColor })
}
CIcon.displayName = 'AIcon'
export default withInstall(CIcon)
</script>
