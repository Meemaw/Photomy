import * as React from 'react';
import { Button, Form } from 'semantic-ui-react';
import styled from 'styled-components';

import { ButtonClick, OnTextAreaChange } from '../../../meta/types/Function';
import SaveButton from '../../common/SaveButton';

type Props = {
  linkVerified: boolean;
  veryfing: boolean;
  addImage: ButtonClick;
  verifyLink: ButtonClick;
  error?: string;
  handleChange: OnTextAreaChange;
  src: string;
};

class LinkUpload extends React.Component<Props, object> {
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

type StyleProps = {
  height?: number;
  width?: number;
};

const StyledLinkUpload = styled.section<StyleProps>`
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
