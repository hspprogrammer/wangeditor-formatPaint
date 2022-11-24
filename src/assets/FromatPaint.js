import { createEditor } from '@wangeditor/editor';

class FormatPaint {
	constructor() {
        this.title = '格式刷' // 自定义菜单标题
        // this.iconSvg = '<svg>...</svg>' // 可选
        this.tag = 'button'
        this.isSelect = false;
        this.formatJson = {
            bgColor: "rgb(115, 209, 61)",
            bold: true,
            color: "rgb(255, 77, 79)",
            fontFamily: "微软雅黑",
            fontSize: "24px",
            italic: true,
            text: "界面展现用户体验和",
            through: true,
            underline: true    
        }
        this.formatedHtml='';
    }
    getValue(editor) {                           // JS 语法
        return ''
    }

    // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
    isActive(editor) {         
        return this.isSelect;
    }

    // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
    isDisabled(editor) {                     // JS 语法
        return false
    }

    // 点击菜单时触发的函数
    exec(editor, value) {    
        if (this.isDisabled(editor)) return 
        const select = editor.getFragment()[0].children[0];
        if(!this.isSelect&&select.text.length){
            this.formatJson = {...select};
            this.isSelect = true;
        }else{
            editor.getSelectionText() 
            this.isSelect = false;
        }  
        editor.blur()
        editor.focus()                       // JS 语法
    }
    //设置格式化好的内容
    setFormatHtml(editor){
        if(!this.formatedHtml.length) return;
        editor.dangerouslyInsertHtml(this.formatedHtml)
        this.formatedHtml = ''
    }
}

//
const myFormatPaint = new FormatPaint();

export function withSelect(editor) {                            // JS 语法

    const { onChange,onBlur,onFocus} = editor // 获取当前 editor API
    const newEditor = editor

    
    newEditor.onChange = (editor)=>{
        onChange();
        if(myFormatPaint.isSelect){
            myFormatPaint.formatJson.text = newEditor.getSelectionText()
                const _editor = createEditor({
                    content: [myFormatPaint.formatJson]
                })
                myFormatPaint.formatedHtml = _editor.getHtml();
                if(!document.onmouseup){
                    document.onmouseup=()=>{
                        if(!myFormatPaint.formatedHtml.length) return;
                        myFormatPaint.setFormatHtml(newEditor)
                        document.onmouseup = null
                    }
              }
        }
        return;
    }
    return newEditor
}

 const FormatPaintMenuConf = {
    key: 'FormatPaintMenuConf', // 定义 menu key ：要保证唯一、不重复（重要）
    factory() {
      return myFormatPaint // 把 `YourMenuClass` 替换为你菜单的 class
    },
  }
  export default FormatPaintMenuConf;