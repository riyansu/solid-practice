import { Component, Show, createSignal, createEffect, Switch, Match, For, onMount, Ref, onCleanup } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { digitToHex, asHexRGB } from './colors';
import { MonacoEditor } from 'solid-monaco';
import { Display } from './CustomSolid';
import * as monaco from 'monaco-editor'
import { Editor } from './Monaco';

const App: Component = () => {
  const [opacity,setOpacity] = createSignal(Math.floor(Math.random()*100))
  const [name,setName] = createSignal("")
  const [page,setPage] = createSignal(0)
  const [code,setCode] = createSignal("")
  const isMultFive = ()=> opacity()%5===0 && opacity()!==0
  let logoMark
  let mainEditor: any

  window.addEventListener('keydown',(e:KeyboardEvent)=>{
    if(e.code === "ArrowRight" && e.metaKey){
      e.preventDefault()
      setPage(current => current+1)
    }
    if(e.code === "ArrowLeft" && e.metaKey){
      e.preventDefault()
      setPage(current => current-1)
    }
  })

  createEffect(()=>{
    const test = new Editor(mainEditor)
    test.init()
  })

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <Switch fallback={<>The Page No.{page()} is not found</>}>
          <Match when={page()===1}>
            <img src={logo} class={`pointer-events-none animate-[spin_3s_linear_infinite]`} alt="logo" style={{opacity:opacity()/100,height:`${opacity()/3+10}vmin`}} ref={logoMark} id="tester"/>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              class={styles.link}
              href="https://github.com/solidjs/solid"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Solid
            </a> <br />
            <input type="range" oninput={(e)=>{setOpacity(parseInt(e.target.value))}} value={opacity()}/> <br />
            Opacity of this Logo is {opacity()} <br />
            <input type="text" placeholder='Your name here.' style="color:black" onInput={(e)=>{setName(e.target.value)}} value={name()} class='outline-none'/> <br />
            <For each={Array.from({length:opacity()})}>{(_,i)=><>
              <span style={{color:asHexRGB(opacity()*3,255-opacity()*2,opacity())}}>Opacity-Color</span>
            </>}</For>
          </Match>
          <Match when={page()===0}>
              <button class='btn' onClick={()=>{alert('CLICKED')}}>Click me !!</button>
          </Match>
          <Match when={page()===-1}><></></Match>
        </Switch>
        <Display when={page()===0} class='w-full h-full'>
          {/* <MonacoEditor language='typescript' height='500px' options={{fontSize:20,fontWeight:"bold",fontLigatures:true}} value={code()} onChange={(val)=>{setCode(val)}} ref={mainEditor}/> <br /> */}
          <div ref={mainEditor} class='h-96 w-full text-left'></div>
          {code().replace(/\n/g,"→").replace(/ /g,"•") || "NONE"}
        </Display>
        <Display when={page()===-1} class='w-full h-full'>
          {/* <MonacoEditor language='typescript' height='500px' options={{fontSize:20,fontWeight:"bold",fontLigatures:true}} value={code()} onChange={(val)=>{setCode(val)}} ref={mainEditor}/> <br /> */}
          {/* <div ref={mainEditor} class='h-96 w-full text-left'></div>
          {code().replace(/\n/g,"→").replace(/ /g,"•") || "NONE"} */}
        </Display>
      </header>
    </div>
  );
};

const Test:Component = ()=>{
  return <></>
}

export default App;
