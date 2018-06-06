#### manager.hgobox.com
管理后台

#### 公用组件api

1.ButtonUpload 

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| onChange(files) | 上传结束后的回调函数,参数为上传文件的集合files | Function | 无 |
| children | 组件的子节点 | JSX | 无 |
| category | 上传范畴 | String | logo |
| filetype | 上传文件类型 | String | image |
| source | 来源类型 | String | manager |
| accept | MIME类型 | String | image/png,image/jpeg |
| showUploadList | 是否展示 uploadList, 可设为一个对象，用于单独设定 showPreviewIcon 和 showRemoveIcon | 是否展示 uploadList, 可设为一个对象，用于单独设定 showPreviewIcon 和 showRemoveIcon | true |
| disabled | disabled | boolean | false |
| mutiple | 是否允许上传多个文件 | boolean | false |
| num | 上传文件的最大数量(mutiple为true的前提下) | number | 1 |






