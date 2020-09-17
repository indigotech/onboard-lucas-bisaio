import React, {useState, useEffect, useRef} from 'react';
import {InputState} from '../pages/login-page';
import {
  Label,
  Caption,
  colorError,
  themeColor,
} from '../styled-components/text-component';
import {Input} from '../styled-components/text-input-component';

interface FormProps<T> {
  title: string;
  message: string;
  readyToValidate: boolean;
  handleChangeText: (value: T) => T;
  validateField: (text: string) => boolean;
  secureTextEntry?: boolean;
}

export const Forms: React.FC<FormProps<InputState>> = (props) => {
  const {validateField, readyToValidate} = props;
  const value = useRef('');
  const [correctInput, setCorrectInput] = useState(true);

  useEffect(() => {
    if (readyToValidate) {
      setCorrectInput(validateField(value.current));
    }
  }, [validateField, readyToValidate]);

  function handleSubmit(text: string) {
    value.current = text;
    if (readyToValidate) {
      setCorrectInput(validateField(value.current));
    }
    props.handleChangeText({
      text: value.current,
      isValid: validateField(value.current),
    });
  }

  return (
    <>
      <Label color={correctInput ? themeColor : colorError}>
        {props.title}
      </Label>
      <Input
        color={correctInput ? themeColor : colorError}
        onChangeText={handleSubmit}
        autoCapitalize="none"
        secureTextEntry={props.secureTextEntry || false}
      />
      {!correctInput && <Caption>{props.message}</Caption>}
    </>
  );
};
