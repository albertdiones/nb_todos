import logo from './logo.svg';
import './App.css';
import {Component, useEffect, useState} from "react";


const itemEndpoint = '/api/items';

function ListItem({id, title: propTitle, onDelete, onUpdate}) {
    const [editMode, setEditMode] = useState(false);
    const [originalTitle, setOriginalTitle] = useState(propTitle);
    const [title, setTitle] = useState(propTitle);

    const onCheckboxChange = (e) => {
        const checkbox = e.target;
        fetch(
            `${itemEndpoint}/${id}`,{
                method: "DELETE",
            }
        ).then(onDelete)
    }

    const activateEditMode = (e) => {
        const titleInput = e.target;
        setEditMode(true);
    }

    const updateItem = (e) => {
        e.preventDefault();
        const titleInput = e.target.querySelector('[name=title]');
        titleInput.blur();
    }

    const updateTitle = (newTitle) => {

        const requestBody = {
            "title": newTitle
        };

        setTitle(newTitle);
        fetch(
            `${itemEndpoint}/${id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            }
        ).then(() => {
            setOriginalTitle(newTitle);
            setEditMode(false);
        }).finally(onUpdate)
    }

    const cancelEdit = (e) => {
        setEditMode(false);
        setTitle(originalTitle);
    }

    const hotEdit = (e) => {
        updateTitle(title);
    }

    return (<li>
        <form onSubmit={updateItem}>
        <input type={"checkbox"} onChange={onCheckboxChange} className={editMode ? "spacer" : ""}/>
        <input
            name="title"
            type={"text"}
            value={title}
            onChange={(e) => { setTitle(e.target.value) } }
            onFocus={activateEditMode}
            onBlur={hotEdit}
        />
        </form>
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
        () => { reloadList() },
        []
    )

    return (<ol className={loading ? 'loading' : ''}>
        {items.map(
            (item) => <ListItem key={item.id} id={item.id} title={item.title} onDelete={reloadList} onUpdate={reloadList}/>)}
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
