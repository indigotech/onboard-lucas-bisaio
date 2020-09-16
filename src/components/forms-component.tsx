import React, {useState, useRef} from 'react';
import {
  Label,
  Caption,
  colorError,
  themeColor,
} from '../styled-components/text-component';
import {Input} from '../styled-components/text-input-component';

interface FormParams {
  title: string;
  onChangeText: (text: string) => string;
  validateField: (text: string) => boolean;
  secureTextEntry?: boolean;
  buttonClicked: number;
  message: string;
}

export function getValue(value: any) {
  return value;
}

export const Forms: React.FC<FormParams> = (props) => {
  const [value, setValue] = useState('');
  const correctInput = useRef(true);

  if (props.buttonClicked) {
    correctInput.current = props.validateField(value);
  }

  return (
    <>
      <Label color={correctInput.current ? themeColor : colorError}>
        {props.title}
      </Label>
      <Input
        color={correctInput.current ? themeColor : colorError}
        onChangeText={(text) => {
          setValue(text);
          props.onChangeText(text);
        }}
        autoCapitalize="none"
        secureTextEntry={props.secureTextEntry || false}
      />
      {!correctInput.current && <Caption>{props.message}</Caption>}
    </>
  );
};
