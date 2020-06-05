import React, {Component} from "react";

export default class GolleNumberInput extends Component {
    render() {
        return <input type="number"
                      className={"inputVal golleInput " + this.props.className}
                      id={this.props.id}
                      placeholder={this.props.placeholder}
                      value={this.props.value}
                      onChange={this.props.onChange}/>;
    }
}