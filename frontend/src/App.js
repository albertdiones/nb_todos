import logo from './logo.svg';
import './App.css';
import {Component, useEffect, useState} from "react";


const itemEndpoint = 'http://localhost:8000/api/items';

function ListItem({id, title, onDelete}) {

    const onCheckboxChange = (e) => {
        const checkbox = e.target;
        fetch(
            `${itemEndpoint}/${id}`,{
                method: "DELETE",
            }
        ).then(onDelete)
    }

    return (<li>
        <input type={"checkbox"} onChange={onCheckboxChange}/>
        {title}
    </li>);
}

function ListAddNew({onCreate}) {


    const addNewItem = (e) => {

        const titleInput = e.target.querySelector('[name=title]');

        const requestBody = {
            "title": titleInput.value
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
            () => {
                onCreate().then(
                    () => {
                        titleInput.value = '';
                        titleInput.blur();
                    }
                )
            }
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

function ItemList({onCheck}) {


    const [items, setItems] = useState([]);
    const [loading,setLoading] = useState(true);

    let reloadList = () => {
        return fetch(itemEndpoint).then(
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
        {items.map((item) => <ListItem key={item.id} id={item.id} title={item.title} onDelete={reloadList}/>)}
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
