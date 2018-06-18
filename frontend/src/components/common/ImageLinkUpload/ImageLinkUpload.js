// @flow
import React from 'react';
import styled from 'styled-components';
import SaveButton from '../../common/SaveButton';
import { Form, Button } from 'semantic-ui-react';

type Props = {
  linkVerified: boolean,
  veryfing: boolean,
  addImage: Function,
  verifyLink: Function,
  error: ?string,
  handleChange: Function,
  src: string,
};
type State = {};

class LinkUpload extends React.Component<Props, State> {
  renderButton = () => {
    const { linkVerified, veryfing, addImage, verifyLink } = this.props;

    return linkVerified ? (
      <SaveButton content="Add photo" basic icon="plus" onClick={addImage} />
    ) : (
      <Button
        content="Verify link"
        basic
        color="yellow"
        icon="linkify"
        onClick={verifyLink}
        loading={veryfing}
      />
    );
  };

  render() {
    const { error, src, handleChange } = this.props;
    const hasError = error !== null;
    return (
      <StyledLinkUpload className="LinkUpload">
        <Form error={hasError}>
          <Form.TextArea
            error={hasError}
            placeholder="Paste link containing an image."
            value={src}
            onInput={handleChange}
          />
          {this.renderButton()}
        </Form>
      </StyledLinkUpload>
    );
  }
}

const StyledLinkUpload = styled.section`
  min-height: ${props => props.height || '200px'};
  width: ${props => props.width || '220px'};
  text-align: right !important;

  .ui.button {
    margin-top: 6px;
  }
  .ui.form {
    height: 100%;
  }

  textarea {
    height: 150px;
  }
`;

export default LinkUpload;
