import React from 'react';
import {Button} from '../styled-components/button-component';
import {ButtonText} from '../styled-components/text-component';

interface ButtonProps {
  onPress: () => void;
  title: string;
}

export const ButtonConfirm: React.FC<ButtonProps> = (props) => {
  return (
    <Button onPress={props.onPress}>
      <ButtonText>{props.title}</ButtonText>
    </Button>
  );
};
