import React, {Component} from "react";

export default class SearchPanel extends Component{

    state ={
        searchText: ''
    }

    searchTodoItem = (e) => {
        const searchText = e.target.value
        this.setState({searchText})
        this.props.searchTodoItem(searchText)
    }

    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="Search todos"
                   onChange={this.searchTodoItem}
                   value={this.state.searchText}
            />
        )
    }

}
