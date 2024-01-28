import { ParentComponent } from "solid-js"
export const Display : ParentComponent<{when:boolean,show?:string,hide?:string,class?:string}> = (props)=>{
    return <div style={{display:props.when?(props.show||"block"):(props.hide||"none")}} class={props.class}>{props.children}</div>
}