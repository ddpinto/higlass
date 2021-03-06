import { drag } from 'd3-drag';
import { event, mouse, select } from 'd3-selection';
import PropTypes from 'prop-types';
import React from 'react';

import { getDarkTheme } from './services/is-dark-theme';

import styles from '../styles/DraggableDiv.module.scss'; // eslint-disable-line no-unused-vars

class DraggableDiv extends React.Component {
  constructor(props) {
    super(props);

    this.dragTopRight = drag()
      .on('start', this.dragStart.bind(this))
      .on('drag', this.dragTopRightFunc.bind(this));
    this.dragTopLeft = drag()
      .on('start', this.dragStart.bind(this))
      .on('drag', this.dragTopLeftFunc.bind(this));
    this.dragBottomRight = drag()
      .on('start', this.dragStart.bind(this))
      .on('drag', this.dragBottomRightFunc.bind(this));
    this.dragBottomLeft = drag()
      .on('start', this.dragStart.bind(this))
      .on('drag', this.dragBottomLeftFunc.bind(this));

    this.dragBottom = drag()
      .on('start', this.dragStart.bind(this))
      .on('drag', this.dragBottomFunc.bind(this));
    this.dragTop = drag()
      .on('start', this.dragStart.bind(this))
      .on('drag', this.dragTopFunc.bind(this));
    this.dragLeft = drag()
      .on('start', this.dragStart.bind(this))
      .on('drag', this.dragLeftFunc.bind(this));
    this.dragRight = drag()
      .on('start', this.dragStart.bind(this))
      .on('drag', this.dragRightFunc.bind(this));

    this.minWidth = 10;
    this.minHeight = 10;
    this.bottomHandleWidth = 20;

    this.state = {
      uid: this.props.uid,
      width: this.props.width,
      height: this.props.height,
      top: this.props.top,
      left: this.props.left
    };

    this.domBody = select('body').node();
  }

  /* -------------------------- Life Cycle Methods -------------------------- */

  componentDidMount() {
    select(this.bottomHandle).call(this.dragBottom);
    select(this.topHandle).call(this.dragTop);

    select(this.leftHandle).call(this.dragLeft);
    select(this.rightHandle).call(this.dragRight);
  }

  componentWillReceiveProps(newProps) {
    if ('width' in newProps) {
      this.setState({ width: newProps.width });
    }

    if ('height' in newProps) {
      this.setState({ height: newProps.height });
    }
  }

  /* ---------------------------- Custom Methods ---------------------------- */

  dragBottomFunc() {
    const ms = mouse(this.domBody);

    let newHeight = this.dragStartHeight + (ms[1] - this.dragStartMousePos[1]);
    newHeight = newHeight > this.minHeight ? newHeight : this.minHeight;

    this.setState({ height: newHeight });

    event.sourceEvent.stopPropagation();
    this.sizeChanged();
  }

  dragLeftFunc() {
    const ms = mouse(this.domBody);

    let newWidth = this.dragStartWidth - (ms[0] - this.dragStartMousePos[0]);
    newWidth = newWidth > this.minWidth ? newWidth : this.minWidth;

    let newLeft = this.dragStartLeft + ms[0] - this.dragStartMousePos[0];
    newLeft = newWidth > this.minWidth ? newLeft : this.dragStartLeft + this.dragStartWidth - this.minWidth;

    this.setState({
      left: newLeft,
      width: newWidth
    });

    event.sourceEvent.stopPropagation();
    this.sizeChanged();
  }

  dragTopFunc() {
    const ms = mouse(this.domBody);

    let newHeight = this.dragStartHeight - (ms[1] - this.dragStartMousePos[1]);
    newHeight = newHeight > this.minHeight ? newHeight : this.minHeight;

    let newTop = this.dragStartTop + ms[1] - this.dragStartMousePos[1];
    newTop = newHeight > this.minHeight
      ? newTop
      : this.dragStartTop + this.dragStartHeight - this.minHeight;

    this.setState({
      top: newTop,
      height: newHeight
    });

    event.sourceEvent.stopPropagation();
    this.sizeChanged();
  }

  dragRightFunc() {
    const ms = mouse(this.domBody);

    let newWidth = this.dragStartWidth + (ms[0] - this.dragStartMousePos[0]);
    newWidth = newWidth > this.minWidth ? newWidth : this.minWidth;

    this.setState({
      width: newWidth
    });

    event.sourceEvent.stopPropagation();
    this.sizeChanged();
  }

  dragBottomLeftFunc() {
    const ms = mouse(this.domBody);

    let newHeight = this.dragStartHeight + (ms[1] - this.dragStartMousePos[1]);
    newHeight = newHeight > this.minHeight ? newHeight : this.minHeight;

    let newWidth = this.dragStartWidth - (ms[0] - this.dragStartMousePos[0]);
    newWidth = newWidth > this.minWidth ? newWidth : this.minWidth;

    let newLeft = this.dragStartLeft + ms[0] - this.dragStartMousePos[0];
    newLeft = newWidth > this.minWidth
      ? newLeft
      : this.dragStartLeft + this.dragStartWidth - this.minWidth;

    this.setState({
      top: this.state.top,
      left: newLeft,
      width: newWidth,
      height: newHeight
    });

    event.sourceEvent.stopPropagation();
    this.sizeChanged();
  }

  dragBottomRightFunc() {
    const ms = mouse(this.domBody);

    let newWidth = this.dragStartWidth + (ms[0] - this.dragStartMousePos[0]);
    newWidth = newWidth > this.minWidth ? newWidth : this.minWidth;

    let newHeight = this.dragStartHeight + (ms[1] - this.dragStartMousePos[1]);
    newHeight = newHeight > this.minHeight ? newHeight : this.minHeight;

    this.setState({
      top: this.state.top,
      left: this.state.left,
      width: newWidth,
      height: newHeight
    });

    event.sourceEvent.stopPropagation();
    this.sizeChanged();
  }


  dragTopRightFunc() {
    const ms = mouse(this.domBody);

    let newHeight = this.dragStartHeight - (ms[1] - this.dragStartMousePos[1]);
    newHeight = newHeight > this.minHeight ? newHeight : this.minHeight;

    let newTop = this.dragStartTop + ms[1] - this.dragStartMousePos[1];
    newTop = newHeight > this.minHeight
      ? newTop
      : this.dragStartTop + this.dragStartHeight - this.minHeight;

    let newWidth = this.dragStartWidth + (ms[0] - this.dragStartMousePos[0]);
    newWidth = newWidth > this.minWidth ? newWidth : this.minWidth;

    this.setState({
      top: newTop,
      left: this.state.left,
      width: newWidth,
      height: newHeight
    });

    event.sourceEvent.stopPropagation();
    this.sizeChanged();
  }

  dragTopLeftFunc() {
    const ms = mouse(this.domBody);

    let newWidth = this.dragStartWidth - (ms[0] - this.dragStartMousePos[0]);
    newWidth = newWidth > this.minWidth ? newWidth : this.minWidth;

    let newLeft = this.dragStartLeft + ms[0] - this.dragStartMousePos[0];
    newLeft = newWidth > this.minWidth
      ? newLeft
      : this.dragStartLeft + this.dragStartWidth - this.minWidth;

    let newHeight = this.dragStartHeight - (ms[1] - this.dragStartMousePos[1]);
    newHeight = newHeight > this.minHeight ? newHeight : this.minHeight;

    let newTop = this.dragStartTop + ms[1] - this.dragStartMousePos[1];
    newTop = newHeight > this.minHeight
      ? newTop
      : this.dragStartTop + this.dragStartHeight - this.minHeight;

    this.setState({
      top: newTop,
      left: newLeft,
      width: newWidth,
      height: newHeight
    });

    event.sourceEvent.stopPropagation();

    this.sizeChanged();
  }

  dragStart() {
    this.dragStartMousePos = mouse(this.domBody);

    this.dragStartWidth = this.state.width;
    this.dragStartHeight = this.state.height;

    this.dragStartTop = this.state.top;
    this.dragStartLeft = this.state.left;

    event.sourceEvent.stopPropagation();
  }

  sizeChanged() {
    if (this.props.sizeChanged) {
      this.props.sizeChanged(this.state);
    }
  }

  rotateClicked() {
    this.props.trackRotated(this.state.uid);
  }

  closeClicked() {
    this.props.trackClosed(this.state.uid);
  }

  /* ------------------------------ Rendering ------------------------------- */

  render() {
    const dragColor = getDarkTheme() ? 'white' : 'black';

    const divStyle = {
      top: this.state.top,
      left: this.state.left,
      width: this.state.width,
      height: this.state.height,
      backgroundColor: 'transparent',
      boxSizing: 'border-box',
      opacity: this.props.opacity
    };

    const resizeWidth = 10;
    const resizeHeight = 10;

    const bottomStyle = {
      left: (this.state.width / 2) - (resizeWidth / 2),
      bottom: 1,
      width: resizeWidth,
      borderBottom: `1px solid ${dragColor}`,
      borderTop: `1px solid ${dragColor}`,
    };
    const topStyle = {
      left: (this.state.width / 2) - (resizeWidth / 2),
      top: 1,
      width: resizeWidth,
      borderBottom: `1px solid ${dragColor}`,
      borderTop: `1px solid ${dragColor}`,
    };
    const leftStyle = {
      left: 1,
      top: (this.state.height / 2) - (resizeHeight / 2),
      height: resizeHeight,
      borderLeft: `1px solid ${dragColor}`,
      borderRight: `1px solid ${dragColor}`,
    };
    const rightStyle = {
      right: 1,
      top: (this.state.height / 2) - (resizeHeight / 2),
      height: resizeHeight,
      borderLeft: `1px solid ${dragColor}`,
      borderRight: `1px solid ${dragColor}`,
    };

    const resizeHandleDivs = {
      bottom: (
        <div
          key="bottom"
          ref={(c) => { this.bottomHandle = c; }}
          styleName="bottom-draggable-handle"
          style={bottomStyle}
        />
      ),
      top: (
        <div
          key="top"
          ref={(c) => { this.topHandle = c; }}
          styleName="top-draggable-handle"
          style={topStyle}
        />
      ),
      right: (
        <div
          key="right"
          ref={(c) => { this.rightHandle = c; }}
          styleName="right-draggable-handle"
          style={rightStyle}
        />
      ),
      left: (
        <div
          key="left"
          ref={(c) => { this.leftHandle = c; }}
          styleName="left-draggable-handle"
          style={leftStyle}
        />
      )
    };
    const resizeHandles = [...this.props.resizeHandles]
      .map(x => resizeHandleDivs[x]);

    return (
      <div
        ref={(c) => { this.divContainer = c; }}
        className={this.props.className}
        style={divStyle}
        styleName="draggable-div"
      >
        {resizeHandles}
      </div>
    );
  }
}

DraggableDiv.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  left: PropTypes.number,
  opacity: PropTypes.number,
  resizeHandles: PropTypes.object,
  sizeChanged: PropTypes.func,
  top: PropTypes.number,
  trackClosed: PropTypes.func,
  trackRotated: PropTypes.func,
  uid: PropTypes.string,
  width: PropTypes.number
};

export default DraggableDiv;
