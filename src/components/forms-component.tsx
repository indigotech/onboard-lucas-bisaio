import React, {useState, useEffect} from 'react';
import {
  Label,
  Caption,
  colorError,
  themeColor,
} from '../styled-components/text-component';
import {Input} from '../styled-components/text-input-component';

interface FormProps {
  title: string;
  onChangeText: (text: string) => string;
  validateField: (text: string) => boolean;
  secureTextEntry?: boolean;
  readyToValidate: boolean;
  message: string;
}

export const Forms: React.FC<FormProps> = (props) => {
  const [value, setValue] = useState('');
  const [correctInput, setCorrectInput] = useState(true);

  useEffect(() => {
    if (props.readyToValidate) {
      setCorrectInput(props.validateField(value));
      console.log(value, correctInput, props.validateField(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, props.readyToValidate]);

  return (
    <>
      <Label color={correctInput ? themeColor : colorError}>
        {props.title}
      </Label>
      <Input
        color={correctInput ? themeColor : colorError}
        onChangeText={(text) => {
          setValue(text);
          props.onChangeText(text);
        }}
        autoCapitalize="none"
        secureTextEntry={props.secureTextEntry || false}
      />
      {!correctInput && <Caption>{props.message}</Caption>}
    </>
  );
};
