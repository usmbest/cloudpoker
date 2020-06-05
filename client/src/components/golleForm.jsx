import React, {Component} from "react";

class GolleNumberInput extends Component {
    render() {
        return <input type="number"
                      className="inputVal two columns golleInput"
                      id={this.props.id}
                      placeholder={this.props.placeholder}
                      value={this.props.value}
                      onChange={this.props.onChange}/>;
    }
}

export default class GolleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {values: this.newValues(), justUpdated: false}
        this.timeout = null;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    newValues() {
        return Array(this.props.values.length).fill('');
    }
    handleChange(ind, event) {
        // because event is a synthetic event, target cannot be accessed asynchronously in setState
        let value = event.target.value;
        this.setState(prevState => ({values: [...prevState.values.slice(0, ind), value, ...prevState.values.slice(ind + 1)]}));
    }
    handleSubmit() {
        let newValues = [];
        for (let i = 0; i < this.state.values.length; i++) {
            let value = this.state.values[i];
            if (value === '') {
                newValues.push(this.props.values[i]);
            } else {
                if (!parseInt(value) && value !== 0) {
                    alert('To customize Golle values, please input an integer.');
                    return;
                } else if (value < 0) {
                    alert(`Golle values must be between 0 and 51. ${value} is not.`);
                    return;
                } else if (value > 51) {
                    alert(`Golle values must be between 0 and 51. ${value} is not.`);
                    return;
                }
                // Only update changed values
                newValues.push(this.state.values[i]);
            }
        }

        this.props.socket.emit('setGolleNumbers', {values: newValues});
        this.setState({values: this.newValues(), justUpdated: true});

        if (this.timeout) { // this should always be false i think
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            this.setState({justUpdated: false});
            this.timeout = null;
        }, 1000);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.values.length !== prevProps.values.length) {
            console.log('different props.values lengths.', this.props.values, prevProps.values);
            this.setState({values: this.newValues()});
            return;
        }
        for (let i = 0; i < this.props.values.length; i++) {
            if (this.props.values[i] !== prevProps.values[i]) {
                console.log(this.props.values);
                console.log(this.state.values);
                this.setState({values: this.newValues()});
                break;
            }
        }
    }
    componentDidMount() {
        console.log(this.props.values);
        console.log(this.state.values);
    }
    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    render() {
        const numberInput = (val, ind) => {
            let id = `golle-${ind}`;
            const onChange = (e) => {this.handleChange(ind, e)};
            return <GolleNumberInput key={ind} placeholder={val} id={id} value={this.state.values[ind]} onChange={onChange}/>;
        }
        // \u2713 is a checkmark
        let buttonText = this.state.justUpdated? "Updated \u2713": "Update";
        return (
            <div className="row pad u-full-width">
                {this.props.values.map(numberInput)}
                <button disabled={this.state.justUpdated} className="button-primary four columns" id="golle-update" onClick={this.handleSubmit}>{buttonText}</button>
            </div>
        );
    }
}
