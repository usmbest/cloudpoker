import React, {Component} from "react";

export default class GolleNumberInput extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.stopPropagation();
    }
    render() {
        return <input type="number"
                      className={"inputVal golleInput " + this.props.className}
                      id={this.props.id}
                      placeholder={this.props.placeholder}
                      value={this.props.value}
                      onClick={this.handleClick}
                      onChange={this.props.onChange}/>;
    }
}