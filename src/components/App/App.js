import React, { Component } from "react";

import AppHeader from "../AppHeader/AppHeader";
import SearchPanel from "../SearchPanel/SearchPanel";
import TodoList from "../TodoList/TodoList";
import ItemStatusFilter from "../ItemStatusFilter/ItemStatusFilter";
import AddItem from "../AddItem/AddItem";

import './App.css'

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Learn JavaScript'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Learn TypeScript'),
        ],
        searchText: '',
        filter: 'all' // All, active, done
    }

    createTodoItem(label) {
        return {
            label,
            done: false,
            important: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex(item => item.id === id)

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ]


            return { todoData: newArray }
        })
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text)

        this.setState(({ todoData }) => {
            const newArray = [
                ...todoData,
                newItem
            ]

            return {todoData: newArray}
        })
    }

    toggleEvent(array, id, propName) {
        const idx = array.findIndex(item => item.id === id)

        const oldItem = array[idx]
        const newItem = {...oldItem, [propName]: !oldItem[propName]}

        return  [
            ...array.slice(0, idx),
            newItem,
            ...array.slice(idx + 1)
        ]
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleEvent(todoData, id, 'important')
            }
        })
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleEvent(todoData, id, 'done')
            }
        })
    }

    searchTodos = (arr, searchText) => {
        if (searchText === '') {
            return arr
        }
        return arr.filter(item => {
               return item.label.toLowerCase().includes(searchText.toLowerCase())
            }
        )
    }

    filterTodos = (arr, filter) => {
        if (filter === 'all') {
            return arr
        } else if (filter === 'done') {
            return arr.filter(item => {
                return item.done === true
            })
        } else return arr.filter(item => {
            return item.done === false
        })

    }

    searchTodoItem = (searchText) => {
        this.setState({searchText})
    }

    onFilterChange = (filter) => {
        this.setState({filter})
    }

    render() {

        const { todoData, searchText, filter } = this.state

        const filteredItems = this.filterTodos(this.searchTodos(todoData, searchText), filter)

        const doneCount = todoData
            .filter(el => el.done)
            .length
        const todoCount = todoData.length - doneCount

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel
                        searchTodoItem={this.searchTodoItem}
                    />
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                    />
                </div>

                <TodoList
                    todos={filteredItems}
                    onDeleted={ this.deleteItem }
                    onToggleImportant={ this.onToggleImportant }
                    onToggleDone={ this.onToggleDone }
                />
                <AddItem
                    onItemAdd={ this.addItem }
                />
            </div>
        )
    }
}
