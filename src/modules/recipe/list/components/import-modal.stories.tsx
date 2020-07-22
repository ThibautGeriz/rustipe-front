import React from 'react';
import { Provider, Button } from 'react-native-paper';
import { MockedProvider } from '@apollo/client/testing';

import ImportModal from './import-modal';

export default { title: 'Import Recipe Modal', component: ImportModal };

export const whenVisible = () => {
  const [visible, setVisible] = React.useState(true);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <MockedProvider mocks={[]} addTypename={false}>
      <Provider>
        <ImportModal visible={visible} onDismiss={hideModal} />

        <Button style={{ marginTop: 30 }} onPress={showModal}>
          Show
        </Button>
      </Provider>
    </MockedProvider>
  );
};

export const whenHidden = () => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <MockedProvider mocks={[]} addTypename={false}>
      <Provider>
        <ImportModal visible={visible} onDismiss={hideModal} />

        <Button style={{ marginTop: 30 }} onPress={showModal}>
          Show
        </Button>
      </Provider>
    </MockedProvider>
  );
};
