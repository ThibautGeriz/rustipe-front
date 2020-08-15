import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

type MultiInputText = {
  data: string[];
  setData(data: string[]): any;
  inputProps?: any;
  placeholder: string;
};

export default function MultiInputText({
  data,
  setData,
  inputProps = {},
  placeholder,
}: MultiInputText) {
  return (
    <View>
      {Array.from(Array(data.length + 1).keys()).map((i) => (
        <View style={styles.row} key={i}>
          <TextInput
            testID={`textInput ${i + 1}`}
            {...inputProps}
            placeholder={`${placeholder} ${i + 1}`}
            value={data[i]}
            style={[inputProps.style || {}, styles.input]}
            onChangeText={(text) => {
              if (data[i] == null) {
                const newData = [...data];
                newData[i] = text;
                setData(newData);
                return;
              }
              setData(
                data.map((row, index) => {
                  if (index === i) {
                    return text;
                  }
                  return row;
                }),
              );
            }}
          />
          <Button
            testID={`delete-button ${i + 1}`}
            icon="delete"
            compact={false}
            style={styles.deleteButton}
            onPress={() => {
              setData(data.filter((_, index) => i !== index));
            }}
          >
            {' '}
          </Button>
        </View>
      ))}
      <Button
        testID="add-button"
        icon="plus"
        mode="contained"
        style={styles.addButton}
        onPress={() => setData([...data, ''])}
      >
        Add
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'stretch',
  },
  deleteButton: { maxWidth: '10%' },
  addButton: { marginTop: 5 },
  input: { width: '90%' },
});
