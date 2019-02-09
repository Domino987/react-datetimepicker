import React from 'react';
import '../style/DateTimeRange.css'
import { addFocusStyle } from '../utils/StyleUtils';

class ApplyCancelButtons extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hoverColourApply: "#5cb85c",
            hoverColourCancel: "#fff",
            applyFocus: false,
            cancelFocus: false,
        }
        this.bindToFunctions();
    }

    bindToFunctions(){
        this.mouseEnterApply = this.mouseEnterApply.bind(this);
        this.mouseLeaveApply = this.mouseLeaveApply.bind(this);
        this.mouseEnterCancel = this.mouseEnterCancel.bind(this);
        this.mouseLeaveCancel = this.mouseLeaveCancel.bind(this);
        this.cancelPressed = this.cancelPressed.bind(this);
        this.applyPressed = this.applyPressed.bind(this);
        this.applyOnKeyPress = this.applyOnKeyPress.bind(this);
        this.cancelOnKeyPress = this.cancelOnKeyPress.bind(this);
        this.applyOnFocus = this.applyOnFocus.bind(this);
        this.applyOnBlur = this.applyOnBlur.bind(this);
        this.cancelOnBlur = this.cancelOnBlur.bind(this);
        this.cancelOnFocus = this.cancelOnFocus.bind(this);
    }
    
    mouseEnterApply(e){
        this.setState({hoverColourApply: "#3e8e41"})
    }

    mouseLeaveApply(e){
        this.setState({hoverColourApply: "#5cb85c"})
    }

    mouseEnterCancel(e){
        this.setState({hoverColourCancel: "rgb(192, 185, 185)"})
    }

    mouseLeaveCancel(e){
        this.setState({hoverColourCancel: "#fff"})
    }

    cancelPressed(e){
        this.props.changeVisibleState();
    }

    applyPressed(e){
        this.props.applyCallback();
    }

    applyOnFocus(){
        this.setState({applyFocus:true});
    }

    applyOnBlur(){
        this.setState({applyFocus:false});
    }

    cancelOnFocus(){
        this.setState({cancelFocus:true}); 
    }

    cancelOnBlur(){
        this.setState({cancelFocus:false}); 
    }

    isSpaceBarOrEnterPressed(e){
        if(e.keyCode === 32 || e.keyCode === 13){
            return true;
        }
        return false;
    }

    applyOnKeyPress(e){
        if(this.isSpaceBarOrEnterPressed(e)){
            this.props.applyCallback();
        }
    }

    cancelOnKeyPress(e){
        if(this.isSpaceBarOrEnterPressed(e)){
            this.props.changeVisibleState();
        }
    }

    renderButton(className, onMouseEnter, onMouseLeave, onClick, style, onKeyDown, onFocus, onBlur, text){
        let styleLocal;
        if(text === "Apply"){
            styleLocal = addFocusStyle(this.state.applyFocus, style);
        }else{
            styleLocal = addFocusStyle(this.state.cancelFocus, style);  
        }
        return(
            <div 
                className={className}
                onMouseEnter={onMouseEnter} 
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                style={styleLocal}
                onKeyDown={onKeyDown}
                tabIndex={0}
                onFocus={onFocus}
                onBlur={onBlur}
            >
                {text}
            </div>
        );
    }

    getMaxDateBox(){
        if(this.props.maxDate){
            return(
                <div className="maxDateLabel">
                    Max Date: {this.props.maxDate.format(this.props.local.format)}
                </div>
            )
        }
    }

    render(){
        let maxDateBox = this.getMaxDateBox();
        return(
            <div id="buttonContainer" className="buttonContainer">
                {maxDateBox}
                {
                    this.renderButton("buttonSeperator applyButton", 
                        this.mouseEnterApply,
                        this.mouseLeaveApply,
                        this.applyPressed,
                        {backgroundColor:this.state.hoverColourApply},
                        this.applyOnKeyPress,
                        this.applyOnFocus,
                        this.applyOnBlur,
                        "Apply"
                    )
                }

                {
                    this.renderButton("buttonSeperator cancelButton", 
                        this.mouseEnterCancel,
                        this.mouseLeaveCancel,
                        this.cancelPressed,
                        {backgroundColor:this.state.hoverColourCancel},
                        this.cancelOnKeyPress,
                        this.cancelOnFocus,
                        this.cancelOnBlur,
                        "Cancel"
                    )
                }
            </div>
        );
    }
}
export default ApplyCancelButtons