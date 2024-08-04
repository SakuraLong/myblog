# MdRenderer

## 已安装插件
### markdown-it-container
#### 提示块
- warning
- tip
- info
- success
示例：
```md
::: warning
这是警告
:::
```
#### 折叠块
- spoiler
示例：
```md
::: spoiler 点击展开
这是详情
:::
```
#### 图片块
- image
```md
::: image 这是图片信息
!(图片信息)[图片路径]
:::
```
### markdown-it-emoji
### markdown-it-anchor
### markdown-it-toc-done-right
### markdown-it-katex
### markdown-it-footnote
### markdown-it-abbr
### markdown-it-sub
### markdown-it-sup
### markdown-it-textual-uml
### 自定义layout插件
示例
```md
{(begin|container)}
{(begin|item|w=50%)}
宽度是50%的div
{(end)}
{(begin|item|w=50%)}
宽度是50%的div
{(end)}
{(end)}
```