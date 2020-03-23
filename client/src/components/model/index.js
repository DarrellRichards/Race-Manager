import React from 'react';

class Modal extends React.Component {
    render() {
        if (!this.props.show) return null;
        return (
            <div className="modal_backdrop">
                <div className="modal_custom" id="modal_custom">{this.props.children}</div>
            </div>
            )
    }
}


export default Modal;