import logo from './logo.svg';
import './App.css';
import {Component} from "react";

class ItemList extends Component {
  render() {
    return <ol>
      <li><input type={"checkbox"}/>Buy Potatoes</li>
      <li><input type={"checkbox"}/>Buy Tomatoes</li>
      <li><input type={"checkbox"}/>Buy Cucumber</li>
      <li><input type={"checkbox"}/>Buy Lettuce</li>
    </ol>;
  }
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
