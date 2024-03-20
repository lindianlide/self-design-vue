/**
 * 获取本地图
 * @param name // 文件名 如 doc.png
 * @returns {*|string}
 */
export const getAssetsImages = (name) => {
  return new URL(`@/assets/images/${name}`, import.meta.url).href
}
