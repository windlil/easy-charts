export const CommonConfig = {
  x: 0,
  y: 0,
  z: 0,
  width: 300,
  height: 300,
  animate: false,
  dataSource: 'static',
  theme: 'classicDark',
}

export const CommonBaseSettingConfig = [
  {
    name: 'name',
    label: '名称',
    type: 'input',
  },
  {
    name: 'width',
    label: '宽度',
    type: 'number',
  },
  {
    name: 'height',
    label: '高度',
    type: 'number',
  },
  {
    name: 'x',
    label: 'x轴',
    type: 'number'
  },
  {
    name: 'y',
    label: 'y轴',
    type: 'number'
  },
  {
    name: 'z',
    label: '层级',
    type: 'number'
  },
]

export const CommonBaseActionsConfig = [
  {
    name: 'eventType',
    label: '选择事件',
    type: 'select',
    options: [
      {
        key: 'showMessage',
        value: '消息提醒',
      },
    ],
    childSetting: [
      {
        type: 'select',
        name: 'type',
        label: '提醒类型',
        options: [
          {
            key: 'success',
            value: '成功',
          },
          {
            key: 'warn',
            value: '警告'
          },
          {
            key: 'danger',
            value: '危险'
          },
        ],
      },
    ],
  }
]


export const CommonDataMapSetting= [
  {
    name: 'xField',
    label: 'x轴',
    type: 'select',
    default: 'name',
  },
  {
    name: 'yField',
    label: 'y轴',
    type: 'select',
    default: 'value',
  }
]