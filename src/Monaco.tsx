import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'

var MonacoEditor:monaco.editor.IStandaloneCodeEditor
var Main:HTMLElement
var keywords = ["print","move","if","end","and","or","loop"]
const customizer = {
    language:{
        name:"keystone-lang",
        token:{
            keywords:["print","move","if","end","and","or","loop"],
            tokenizer:{
                root:[
                    [/@?[a-zA-Z][\w$]*/,{
                        cases:{
                            '@keywords':'keyword',
                            '@default':'variable'
                        },
                    }],
                    [/".*?"/,'string'],
                    [/\d/g,'number'],
                    // [/\/\//,'comment']
                ]
            }
        }
    },
    theme:{
        name:'keystone-theme',
        theme:{
            base: 'vs-dark',
            rules: [
                { token: 'keyword', foreground: '#ff6600', fontStyle: "bold" },
                // { token: 'comment', foreground: '#cccccc' },
                { token: 'string', foreground: '#66aaff' },
                { token: 'number', foreground:"#faff00"},
                { token: 'variable', foreground: '#99ff55' },
                { token: '', foreground:"#ffffff"}
            ],
            inherit: false,
            colors: {}
        }
    }
}



export class Editor{
    constructor(private ref:HTMLElement){}
    init()
    {
        monaco.languages.register({id:"keystone-lang"})
        monaco.languages.setMonarchTokensProvider('keystone-lang',{
            keywords:keywords,
            tokenizer:{
                root:[
                    [/@?[a-zA-Z][\w$]*/,{
                        cases:{
                            '@keywords':'keyword',
                            '@default':'variable'
                        },
                    }],
                    [/".*?"/,'string'],
                    // [/\/\//,'comment']
                ]
            }
        })
        monaco.editor.defineTheme('keystone-theme',{
            base: 'vs-dark',
            rules: [
                { token: 'keyword', foreground: '#ff6600', fontStyle: "bold" },
                // { token: 'comment', foreground: '#cccccc' },
                { token: 'string', foreground: '#66aaff' },
                { token: 'variable', foreground: '#99ff55' },
                { token: '', foreground:"#ffffff"}
            ],
            inherit: false,
            colors: {}
        })
        
        Main = this.ref
        if(Main){
            self.MonacoEnvironment = {
                getWorker(_, label) {
                    if (label === 'json') {
                        return new jsonWorker()
                    }
                    if (label === 'css' || label === 'scss' || label === 'less') {
                        return new cssWorker()
                    }
                    if (label === 'html' || label === 'handlebars' || label === 'razor') {
                        return new htmlWorker()
                    }
                    if (label === 'typescript' || label === 'javascript') {
                        return new tsWorker()
                    }
                    return new editorWorker()
                }
            }
            MonacoEditor = monaco.editor.create(Main, {
                value: "function hello() {\n\talert('Hello world!');\n}",
                // theme:"keystone-theme",
                language:"typescript",
                fontSize:20,
                fontFamily:"ricty",
                minimap:{
                    enabled:false
                }
            })

            // MonacoEditor.addAction({
            //     id: 'insert-text-at-cusor-command',
            //     label: 'Command Snippet',
            //     keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10],
            //     contextMenuGroupId: 'snippets',
            //     contextMenuOrder: 1.5,
            //     run: function (ed) {
            //         MonacoEditor.focus()
            //         MonacoEditor.trigger('keyboard', 'type', {text: "for"});
            //     }
            // });

            // window.addEventListener('keydown',(e:KeyboardEvent)=>{
            //     if(e.key == "Enter"){
            //         this.set(this.get()+"\n")
            //     }
            //     // console.log(e.key)
            // })
        }
    }
    get():string{
        return MonacoEditor.getValue()
    }
    set(val:string):void{
        MonacoEditor.getModel()?.setValue(val)
    }
    get raw():monaco.editor.IStandaloneCodeEditor{
        return MonacoEditor
    }
    show():void{Main.style.display = "block"}
    hide():void{Main.style.display = "none"}
}