<template>
  <div id="app">
    <div><a href="https://github.com/hspprogrammer/wangeditor-formatPaint" target="_blank">项目地址，请不要吝啬你的小星星。</a> </div>
    <div style="border: 1px solid #ccc;">
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editor"
                :defaultConfig="toolbarConfig"
                :mode="mode"
            />
            <Editor
                style="height: 500px; overflow-y: hidden;"
                v-model="html"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="onCreated"
            />
        </div>
  </div>
</template>

<script>
import Vue from 'vue'
import FormatPaintMenuConf,{withSelect} from "./assets/FormatPaint.js";
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { Boot } from '@wangeditor/editor';
Boot.registerMenu(FormatPaintMenuConf)
Boot.registerPlugin(withSelect)
export default {
  name: 'app',
  components: {
    Editor, Toolbar
  },
  data() {
          return {
              editor: null,
              html: '<p style="text-align: left;"><span style="color: rgb(225, 60, 57); background-color: rgb(9, 109, 217); font-size: 19px; font-family: 华文楷体;"><s><u><em><strong>使用说明</strong></em></u></s></span>：首先先将鼠标选中想要复制的文字格式上，再点击格式刷菜单，这时候选中的文字格式已经取到了，接下来选中要格式的文字，松开鼠标左键，就能看到格式好的样子了，继续选中会继续格式化，直到取消格式化按钮的选中状态。</p>',
              toolbarConfig: { 
				insertKeys:{
					index: 5, // 插入的位置，基于当前的 toolbarKeys
					keys: ['FormatPaintMenuConf']
				}
			  },
              editorConfig: { placeholder: '请输入内容...' },
              mode: 'default', // or 'simple'
          }
      },
      methods: {
          onCreated(editor) {
              this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
          },
      },
      mounted() {
      },
      beforeDestroy() {
          const editor = this.editor
          if (editor == null) return
          editor.destroy() // 组件销毁时，及时销毁编辑器
      }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
