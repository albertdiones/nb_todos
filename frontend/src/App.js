import logo from './logo.svg';
import './App.css';
import {Component, useEffect, useState} from "react";

function ListItem({title}) {
    return (<li><input type={"checkbox"}/>{title}</li>);
}

function ListAddNew() {
    return (
        <li>
            <input type={"checkbox"} className={"spacer"}/>
            <input type={"text"} placeholder={"add new"}/>
        </li>
    );
}

function ItemList(props) {


    const [items, setItems] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(
        () => {
            fetch('http://localhost:8000/api/items').then(
                (response) => {
                    return response.json();
                }
            ).then(
                (data) => {
                    setItems(data);
                }
            )
        },
        []
    )

    return (<ol className={loading ? 'loading' : ''}>
        {items.map((item) => <ListItem title={item.title}/>)}
        <ListAddNew/>
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
