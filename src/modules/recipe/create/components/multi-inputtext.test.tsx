import * as React from 'react';
import { shallow } from 'enzyme';

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
    shallow(<MultiInputText {...defaultProps} {...props} />);

  let result = getMultiInputText();

  describe('by default', () => {
    beforeEach(() => {
      // when
      result = getMultiInputText();
    });

    it('contain the add button', () => {
      // then
      expect(result.exists({ testID: 'add-button' })).toBe(true);
    });

    it('contain the first input text', () => {
      // then
      expect(result.exists({ testID: 'textInput 1' })).toBe(true);
      expect(result.exists({ testID: 'textInput 2' })).toBe(false);
    });

    it('contain the first delete button', () => {
      // then
      expect(result.exists({ testID: 'delete-button 1' })).toBe(true);
      expect(result.exists({ testID: 'delete-button 2' })).toBe(false);
    });
  });

  describe('when typing some text in the first input', () => {
    beforeEach(() => {
      // given
      result = getMultiInputText();

      // when
      result.find({ testID: 'textInput 1' }).simulate('changeText', 'some data');
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
        result.find({ testID: 'textInput 1' }).simulate('changeText', 'some data with other');
      });

      it('should call setData', () => {
        // then
        expect(setData).toHaveBeenCalledWith(['some data with other']);
      });
    });

    describe('when adding a new row', () => {
      beforeEach(() => {
        // when
        result.find({ testID: 'add-button' }).simulate('press');
      });

      it('show two inputs', () => {
        // then
        expect(result.exists({ testID: 'textInput 1' })).toBe(true);
        expect(result.exists({ testID: 'textInput 2' })).toBe(true);
      });

      describe('when deleting the first row', () => {
        beforeEach(() => {
          // when
          result.find({ testID: 'delete-button 1' }).simulate('press');
        });

        it('show one inputs', () => {
          // then
          expect(result.exists({ testID: 'textInput 1' })).toBe(true);
          expect(result.exists({ testID: 'textInput 2' })).toBe(false);
        });
      });
    });
  });
});
