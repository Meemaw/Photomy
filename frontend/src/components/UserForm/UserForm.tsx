import * as React from 'react';
import { Button, Form } from 'semantic-ui-react';

import { ButtonClick } from '../../meta/types/Function';
import { User } from '../../meta/types/User';
import FormInputField, { EmailFormField } from '../common/FormInputField';
import SaveButton from '../common/SaveButton';
import DeleteAccount from '../modules/Settings/DeleteAccount';

type Props = {
  handleChange: any;
  values: User;
  isSubmitting: boolean;
  handleSubmit: ButtonClick;
  errors: any;
  width?: number;
};

const UserForm = ({
  handleSubmit,
  isSubmitting,
  errors,
  handleChange,
  width,
  values: { first_name, last_name, email },
}: Props) => {
  return (
    <Form size="small">
      <Form.Group widths="equal">
        <FormInputField
          fluid
          icon="user"
          label="First Name"
          iconPosition="left"
          placeholder="First Name"
          fieldName="first_name"
          handleChange={handleChange}
          value={first_name}
          errors={errors}
        />

        <FormInputField
          fluid
          icon="user"
          label="Last Name"
          iconPosition="left"
          placeholder="Last Name"
          fieldName="last_name"
          handleChange={handleChange}
          value={last_name}
          errors={errors}
        />
      </Form.Group>

      <EmailFormField fluid value={email} errors={errors} readOnly fieldName="email" />
      <ProgressiveButtons narrowThreshold={300} width={width!}>
        <SaveButton loading={isSubmitting} type="submit" onClick={handleSubmit} />
        <DeleteAccount />
      </ProgressiveButtons>
    </Form>
  );
};

type ProggresiveButtonsProps = {
  children: React.ReactNode[];
  narrowThreshold: number;
  width: number;
};

const ProgressiveButtons = ({ width, narrowThreshold, children }: ProggresiveButtonsProps) => {
  return width >= narrowThreshold ? (
    <Button.Group>
      {children.map((child: React.ReactNode, index: number) => {
        return [child, index !== children.length - 1 && <Button.Or key={index} />];
      })}
    </Button.Group>
  ) : (
    <Button.Group vertical fluid>
      {children}
    </Button.Group>
  );
};

export default UserForm;
