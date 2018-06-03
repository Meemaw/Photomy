import React from 'react';

function withHover(WrappedComponent) {
  return class WithHover extends React.PureComponent {
    state = { hovered: false };

    onMouseEnter = () => this.setState({ hovered: true });

    onMouseLeave = () => this.setState({ hovered: false });

    render() {
      return (
        <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          <WrappedComponent {...this.props} {...this.state} />
        </div>
      );
    }
  };
}

export default withHover;
