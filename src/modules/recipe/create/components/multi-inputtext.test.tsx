import * as React from 'react';
import { render, RenderAPI, fireEvent } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';

import MultiInputText from './multi-inputtext';

describe('Multi Input text', () => {
  const setData = jest.fn();

  beforeEach(() => {
    setData.mockReset();
  });

  const defaultProps = {
    data: [],
    setData,
    placeholder: 'some field',
  };
  const getMultiInputText = (props?: any) =>
    render(<MultiInputText {...defaultProps} {...props} />);

  let result: RenderAPI;

  describe('by default', () => {
    beforeEach(() => {
      // when
      result = getMultiInputText();
    });

    it('contain the add button', () => {
      // then
      expect(result.queryByTestId('add-button')).toBeEnabled();
    });

    it('contain the first input text', () => {
      // then
      expect(result.queryByTestId('textInput 1')).toBeEnabled();
      expect(result.queryByTestId('textInput 2')).toBeFalsy();
    });

    it('contain the first delete button', () => {
      // then
      expect(result.queryByTestId('delete-button 1')).toBeEnabled();
      expect(result.queryByTestId('delete-button 2')).toBeFalsy();
    });
  });

  describe('when typing some text in the first input', () => {
    beforeEach(() => {
      // given
      result = getMultiInputText();

      // when
      fireEvent.changeText(result.getByTestId('textInput 1'), 'some data');
    });

    it('should call setData', () => {
      // then
      expect(setData).toHaveBeenCalledWith(['some data']);
    });

    describe('when updating text in the first input', () => {
      beforeEach(() => {
        // given
        result = getMultiInputText();

        // when
        fireEvent.changeText(result.getByTestId('textInput 1'), 'some data with other');
      });

      it('should call setData', () => {
        // then
        expect(setData).toHaveBeenCalledWith(['some data with other']);
      });
    });

    describe('when adding a new row', () => {
      beforeEach(() => {
        // when
        fireEvent.press(result.getByTestId('add-button'));
      });

      it('show two inputs', () => {
        // then
        expect(result.queryByTestId('textInput 1')).toBeEnabled();
        expect(result.queryByTestId('textInput 2')).toBeEnabled();
      });

      describe('when deleting the first row', () => {
        beforeEach(() => {
          // when
          fireEvent.press(result.getByTestId('delete-button 1'));
        });

        it('show one inputs', () => {
          // then
          expect(result.queryByTestId('textInput 1')).toBeEnabled();
          expect(result.queryByTestId('textInput 2')).toBeFalsy();
        });
      });
    });
  });
});
