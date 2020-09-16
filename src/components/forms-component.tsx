import React, {useState, useRef} from 'react';
import {Input} from '../styled-components/text-input-component';
import {
  Label,
  Caption,
  colorError,
  themeColor,
} from '../styled-components/text-component';

interface FormParams {
  title: string;
  message: string;
  buttonClicked: number;
  secureTextEntry?: boolean;
  onChangeText: (text: string, error: boolean) => void;
  validateField: (text: string) => boolean;
}
export interface Inputs {
  value: string;
  valid: boolean;
}

export const Forms: React.FC<FormParams> = (props) => {
  const input = useRef('');
  const correctInput = useRef(true);

  function handleSubmit(text: string) {
    if (props.buttonClicked) {
      correctInput.current = props.validateField(input.current);
    }
    props.onChangeText(text, correctInput.current);
  }

  return (
    <>
      <Label color={correctInput.current ? themeColor : colorError}>
        {props.title}
      </Label>
      <Input
        color={correctInput.current ? themeColor : colorError}
        onChangeText={handleSubmit}
        autoCapitalize="none"
        secureTextEntry={props.secureTextEntry || false}
      />
      {!correctInput.current && <Caption>{props.message}</Caption>}
    </>
  );
};
