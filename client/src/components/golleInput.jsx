import React, {Component} from "react";

export default class GolleInput extends Component {
    constructor(props) {
        super(props);
        this.state = {values: []}
        for (let i = 0; i < this.props.values; i++) {
            this.state.values.push('');
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSetSuccessfully = this.onSetSuccessfully.bind(this);
        this.numberInput = this.numberInput.bind(this);
    }
    handleChange(ind, event) {
        this.setState(prevState => ({values: [...prevState.values.slice(0, ind), event.target.value, ...prevState.values.slice(ind + 1)]}));
    }
    handleKeydown(e) {
        if (e.keyCode === 13) {
            this.handleSubmit(e);
        }
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
    }
    onSetSuccessfully(data) {
        this.setState({values: data.values});
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        for (let i = 0; i < this.props.values.length; i++) {
            if (this.props.values[i] !== prevProps.values[i]) {
                this.setState({values: [...this.props.values]});
                break;
            }
        }
    }
    componentDidMount() {
        this.props.socket.on('setGolleNumbers', this.onSetSuccessfully);
    }
    componentWillUnmount() {
        this.props.socket.off('setGolleNumbers', this.onSetSuccessfully);
    }
    numberInput(val, ind) {
        let className = "inputVal two columns golleInput";
        let id = `golle-${ind}`;
        const onChange = (e) => {this.handleChange(ind, e)};
        return <input key={ind} type="number" placeholder={val} className={className} id={id} value={this.state.values[ind]} onChange={onChange}/>
    }
    render() {
        return (
            <div className="row pad u-full-width">
                {this.props.values.map(this.numberInput)}
                <button className="button-primary four columns" id="golle-update" onClick={this.handleSubmit}>Update</button>
            </div>
        );
    }
}
