import { ConfigProvider, MappingAlgorithm, theme } from 'antd'
import { FC, memo, ReactNode } from 'react'

const studioDarkAlgorithm: MappingAlgorithm = (seedToken, mapToken) => {
  // 使用 antd 默认的暗色算法生成基础token，这样其他不需要定制的部分则保持原样
  const baseToken = theme.darkAlgorithm(seedToken, mapToken)
  return {
      ...baseToken,
      colorBgLayout: '#20252b', // Layout 背景色
      colorBgContainer: '#282c34', // 组件容器背景色
      colorBgElevated: '#32363e', // 悬浮容器背景色
  }
}

const antdComponentTheme = {}

const _ConfigProvider: FC<{children: ReactNode}> = memo(({children}) => {
  return (
      <ConfigProvider theme={{
          algorithm: studioDarkAlgorithm,
          components: {
              ...antdComponentTheme,
              Menu: {
                  itemBg: 'none',
                  itemColor: '#bfbfbf',
                  itemSelectedColor: '#2196F3',
                  itemSelectedBg: 'none',
                  itemBorderRadius: 2,
              },
              Form: {
                labelColor: 'rgb(156,163,175, 0.8)',
              },
              Table: {
                  borderRadius: 2,
                  headerBorderRadius: 2,
                  cellPaddingBlock: 12,
                  headerBg: '#343434',
                  colorBgContainer: '#252525',
              },
              Input: {
                  borderRadius: 2,
                  borderRadiusLG: 2,
                  borderRadiusXS: 2,
                  borderRadiusSM: 2,
                  colorBgContainer: '#1a1a1a',
                  colorText: 'rgb(156,163,175, 0.9)',
              },
              Button: {
                  borderRadius: 2,
                  borderRadiusLG: 2,
                  borderRadiusXS: 2,
                  borderRadiusSM: 2,
              },
              Select: {
                  borderRadius: 2,
                  borderRadiusLG: 2,
                  borderRadiusXS: 2,
                  borderRadiusSM: 2,
                  selectorBg: '#252525',
                  optionSelectedBg: '#29323f'
              },
              TreeSelect: {},
              InputNumber: {
                  borderRadius: 2,
                  borderRadiusLG: 2,
                  borderRadiusXS: 2,
                  borderRadiusSM: 2,
                  colorBgContainer: '#1a1a1a',
                  colorText: 'rgb(156,163,175, 0.9)',
              },
              Slider: {
                  trackBg: '#0086ce',
                  trackHoverBg: '#1EB1FFFF',
                  dotBorderColor: '#7fabff',
                  handleColor: '#3e80ff',
                  railSize: 3,
              },
              Collapse: {
                  borderRadius: 2,
                  borderRadiusLG: 2,
                  borderRadiusXS: 2,
                  borderRadiusSM: 2,
              },
              Modal: {
                  borderRadiusLG: 4,
                  headerBg: '#1f1f1f',
                  colorBgContainer: '#1f1f1f',
                  colorBgElevated: '#1f1f1f',
                  paddingMD: 15,
                  paddingContentHorizontalLG: 15
              }

          }
      }}>
        {children}
      </ConfigProvider>
  )
})

export default _ConfigProvider