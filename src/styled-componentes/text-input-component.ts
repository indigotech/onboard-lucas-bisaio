import styled from 'styled-components/native';

export const Input = styled.TextInput<{color: string}>`
  text-align: center;
  font-size: 20px;
  width: 340px;
  height: 50px;
  border-width: 1px;
  border-radius: 25px;
  border-color: ${(props) => `${props.color}`};
`;
