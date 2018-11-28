import React from 'react';
import { findDOMNode } from "react-dom";
import './style/DateTimeRange.css'
import { DateTimeRangePicker } from './DateTimeRangePicker';

class DateTimeRangeContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            x : 0,
            y : 0,
            width : 0
        }
        this.resize = this.resize.bind(this);
        this.onClickContainerHandler= this.onClickContainerHandler.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.changeVisibleState = this.changeVisibleState.bind(this);
        this.keyDown = this.keyDown.bind(this);
    }

    componentDidMount(){
        window.addEventListener('resize', this.resize);
        document.addEventListener("keydown", this.keyDown, false);
        this.resize();
    }

    componentWillMount(){
        window.removeEventListener('resize', this.resize);
        document.removeEventListener("keydown", this.keyDown, false);
    }

    resize(){
        const domNode = findDOMNode(this).children[0];
        let boundingClientRect = domNode.getBoundingClientRect();
        let x = boundingClientRect.top + boundingClientRect.height + 2;
        let y = boundingClientRect.left + 2;        
        this.setState({x:x, y:y, width:boundingClientRect.width});
    }

    keyDown(e){
        if (e.keyCode === 27) {
            this.setState({visible:false});
            document.removeEventListener("keydown", this.keyDown, false);
        }
    }

    onClickContainerHandler(event){
        if(!this.state.visible){
            document.addEventListener('click', this.handleOutsideClick, false);
            document.addEventListener("keydown", this.keyDown, false);
            this.changeVisibleState();
        }
    }

    handleOutsideClick(e) {
        // ignore clicks on the component itself
        if(this.state.visible){
            if (this.container.contains(e.target)) {
                return;
            }
            document.removeEventListener('click', this.handleOutsideClick, false);
            this.changeVisibleState();
        }
    }

    changeVisibleState(){
        this.setState(prevState => ({
            visible: !prevState.visible,
         }));
    }

    shouldShowPicker(){
        if(this.state.visible && this.state.width < 680){
            return "block"
        } else if(this.state.visible){
            return "flex"
        }else {
            return "none"
        }
    }
    
    render(){
        let showPicker = this.shouldShowPicker();   
        let x = this.state.x;
        let y = this.state.y;
        return (
                <div id="container" onClick={this.onClickContainerHandler} ref={container => { this.container = container; }}>
                    <div id="children">
                        {this.props.children}
                    </div>
                    <div id="daterangepicker" className="daterangepicker" style={{top:x, left:y, display:showPicker}}>
                        <DateTimeRangePicker 
                            ranges={this.props.ranges}
                            start={this.props.start}
                            end={this.props.end}
                            local={this.props.local}
                            applyCallback={this.props.applyCallback}
                            changeVisibleState={this.changeVisibleState}
                        />
                    </div>
                </div>
        )
    }
}
export default DateTimeRangeContainer;