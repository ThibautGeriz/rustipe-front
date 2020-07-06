import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

type MultiInputText = {
  data: string[];
  setData(data: string[]): any;
  inputProps?: any;
  placeholder: string;
  defaultNumberOfInputs?: number;
};

export default function MultiInputText({
  data,
  setData,
  inputProps = {},
  placeholder,
  defaultNumberOfInputs = data.length + 1,
}: MultiInputText) {
  const [numberOfInput, setNumberOfInput] = React.useState(defaultNumberOfInputs);
  return (
    <View>
      {Array.from(Array(numberOfInput).keys()).map((i) => (
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
              setNumberOfInput(numberOfInput - 1);
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
        onPress={() => setNumberOfInput(numberOfInput + 1)}
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
