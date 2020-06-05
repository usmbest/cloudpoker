import React, {Component} from "react";
import GolleNumberInput from "./golleNumberInput";

class GolleInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {values: this.newValues()}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    newValues() {
        return Array(this.props.values.length).fill('');
    }
    handleChange(ind, event) {
        // because event is a synthetic event, target cannot be accessed asynchronously in setState
        let value = event.target.value;
        this.setState(prevState => ({values: [...prevState.values.slice(0, ind), value, ...prevState.values.slice(ind + 1)]}));
    }
    handleSubmit(e) {
        let newValues = [];
        for (let i = 0; i < this.state.values.length; i++) {
            let value = this.state.values[i];
            if (value === '') {
                newValues.push(this.props.values[i]);
            } else {
                if (!parseInt(value) && parseInt(value) !== 0) {
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
                newValues.push(parseInt(this.state.values[i]));
            }
        }

        this.props.socket.emit('setGolleNumbers', {values: newValues});
        this.setState({values: this.newValues()});
        this.props.closeInfo(e);
    }
    handleKeyDown(e) {
        e.stopPropagation();
        // Number 13 is the "Enter" key on the keyboard
        if (e.keyCode === 13) {
            e.preventDefault();
            this.handleSubmit(e);
        } else if (e.keyCode === 27) { // esc key
            this.props.closeInfo(e);
        }
    }
    componentDidMount() {
        document.getElementById('golle-info').addEventListener('keydown', this.handleKeyDown);
    }
    componentWillUnmount() {
        document.getElementById('golle-info').removeEventListener('keydown', this.handleKeyDown);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.showInfo && !prevProps.showInfo) {
            document.getElementById('golle-0').focus();
        }
        if (this.props.values.length !== prevProps.values.length) {
            console.log('different props.values lengths.', this.props.values, prevProps.values);
            this.setState({values: this.newValues()});
        } else {
            for (let i = 0; i < this.props.values.length; i++) {
                if (this.props.values[i] !== prevProps.values[i]) {
                    // console.log('new props values', this.props.values);
                    // console.log('old state values', this.state.values);
                    this.setState({values: this.newValues()});
                    break;
                }
            }
        }
    }

    render() {
        console.log(this.props.showInfo);
        let golleInfoClassName = this.props.showInfo? "popuptext show": "popuptext";
        const numberInput = (val, ind) => {
            let id = `golle-${ind}`;
            const onChange = (e) => {this.handleChange(ind, e)};
            return <GolleNumberInput className="four columns" key={ind} placeholder={val} id={id} value={this.state.values[ind]} onChange={onChange}/>;
        }
        let rows = [];
        for (let i = 0; i < this.props.values.length; i+=3) {
            rows.push((
                <div key={i} className="row pad u-full-width">
                    {this.props.values.slice(i, i + 3).map((val, ind)=>numberInput(val, i + ind))}
                </div>
            ))
        }
        return (
            <div className={golleInfoClassName} id="golle-info">
                {rows}
                <div className="button-primary" onClick={this.handleSubmit}>Submit</div>
            </div>
        );
    }
}


export default class GolleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {showInfo: false};
        this.handleClick = this.handleClick.bind(this);
        this.closeInfo = this.closeInfo.bind(this);
        this.handleInfoMouseUp = this.handleInfoMouseUp.bind(this);
    }
    handleClick() {
        this.setState({showInfo: true});
    }
    closeInfo(e) {
        if (e) e.stopPropagation();
        this.setState({showInfo: false});
    }
    handleInfoMouseUp(e) {
        e.stopPropagation();
    }
    componentDidMount() {
        window.addEventListener('mouseup', this.closeInfo);
        document.getElementById('golle-info').addEventListener('mouseup', this.handleInfoMouseUp)
    }
    componentWillUnmount() {
        window.removeEventListener('mouseup', this.closeInfo);
        document.getElementById('golle-info').removeEventListener('mouseup', this.handleInfoMouseUp)
    }

    render() {
        return (
            <div className="button popup" onClick={this.handleClick}>
                <span>RNG Settings</span>
                <GolleInfo values={this.props.values} socket={this.props.socket} showInfo={this.state.showInfo} closeInfo={this.closeInfo}/>
            </div>
        );
    }
}