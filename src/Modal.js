import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

/**
 * Model uses a React Portal to wrap child elements 
 * in a div outside the root div. Useful for popups,
 * dialogs, etc. E.g.,
 * <pre><code>
 *   <Modal>
 *     <ChildDialog/>
 *   </Modal>
 * </code></pre>
 */
export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.state = {
            mounted: false
        };
    }

    componentDidMount() {
        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node. If a child
        // component requires to be attached to the DOM tree
        // immediately when mounted, for example to measure a
        // DOM node, or uses 'autoFocus' in a descendant, add
        // state to Modal and only render the children when Modal
        // is inserted in the DOM tree.
        modalRoot.appendChild(this.el);
        this.setState({
            mounted: true
        });
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.state.mounted ? this.props.children : null,
            this.el
        );
    }
}