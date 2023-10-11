import logo from './logo.svg';
import './App.css';
import {Component} from "react";

function ListItem({title}) {
  return (<li><input type={"checkbox"}/>{title}</li>);
}

function ItemList(props){
  return (<ol>
      <ListItem title={"Buy Potatoes"}/>
      <ListItem title={"Buy Tomatoes"}/>
      <ListItem title={"Buy Bleach"}/>
      <ListItem title={"Buy Soap"}/>
      <li>
          <input type={"checkbox"} className={"spacer"} />
          <input type={"text"} placeholder={"add new"}/>
      </li>
    </ol>);
}

function App() {
  return (
      <>
        <header>
          TODO List
        </header>
        <main>
          <ItemList/>
        </main>
      </>
  );
}

export default App;
