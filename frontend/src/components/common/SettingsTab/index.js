// @flow
import * as React from 'react';
import { Accordion, Button, List, Divider } from 'semantic-ui-react';

type Props = { renderTitle: Function, renderContent: Function, icon: string };
type State = { open: boolean };

class SettingsTab extends React.Component<Props, State> {
  state = { open: false };

  handleClick = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  };

  render() {
    const { open } = this.state;
    const { renderTitle, renderContent, icon, ...rest } = this.props;

    return (
      <React.Fragment>
        <Divider style={{ marginTop: '0px', paddingTop: '0px', marginBottom: '4px' }} />
        <Accordion {...rest}>
          <Accordion.Title active={open} style={{ cursor: 'auto' }}>
            <List divided relaxed>
              <List.Item>
                <List.Content floated="right">
                  <Button basic onClick={this.handleClick}>
                    Edit
                  </Button>
                </List.Content>
                <List.Icon name={icon} size="large" verticalAlign="middle" />
                <List.Content>{renderTitle()}</List.Content>
              </List.Item>
            </List>
          </Accordion.Title>
          <Accordion.Content style={{ paddingBottom: '20px' }} active={open}>
            {renderContent()}
          </Accordion.Content>
        </Accordion>
      </React.Fragment>
    );
  }
}

export default SettingsTab;
