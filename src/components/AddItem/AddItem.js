import React, {Component} from "react";

import './AddItem.css'

export default class AddItem extends Component {

    state = {
        label: ''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onItemAdd(this.state.label)
        this.setState({
            label: ''
        })
    }


    render() {
        return (
            <form
                className="add-form item-add-form d-flex"
                onSubmit={this.onSubmit}
            >
                <input type="text"
                       className="form-control"
                       onChange={this.onLabelChange}
                       placeholder="Add New To-Do"
                       value={this.state.label}
                />
                <button className="btn btn-outline-success float-right add-item">
                    Add
                </button>
            </form>
        )
    }
}