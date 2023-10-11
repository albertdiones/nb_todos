import logo from './logo.svg';
import './App.css';
import {Component, useEffect, useState} from "react";


const itemEndpoint = 'http://localhost:8000/api/items';

function ListItem({title}) {
    return (<li><input type={"checkbox"}/>{title}</li>);
}

function ListAddNew({onCreate}) {

    const addNewItem = (e) => {
        const requestBody = {
            "title": e.target.querySelector('[name=title]').value
        };

        fetch(
            itemEndpoint,
            {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            }
        ).then(
            () => onCreate()
        );

        e.preventDefault();
    }

    return (
        <li>
            <form onSubmit={addNewItem}>
                <input type={"checkbox"} className={"spacer"}/>
                <input name="title" type={"text"} placeholder={"add new"}/>
            </form>
        </li>
    );
}

function ItemList(props) {


    const [items, setItems] = useState([]);
    const [loading,setLoading] = useState(true);

    let reloadList = () => {
        fetch(itemEndpoint).then(
            (response) => {
                return response.json();
            }
        ).then(
            (data) => {
                setItems(data);
            }
        )
    };


    useEffect(
        reloadList,
        []
    )

    return (<ol className={loading ? 'loading' : ''}>
        {items.map((item) => <ListItem key={item.id} title={item.title}/>)}
        <ListAddNew onCreate={reloadList}/>
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
