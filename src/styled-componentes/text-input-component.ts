import styled from 'styled-components/native';

export const Input = styled.TextInput`
  text-align: center;
  font-size: 20px;
  width: 340px;
  height: 50px;
  border-width: 5px;
  border-radius: 25px;
  border-color: #cccc;
`;

export const InputNewUser = styled(Input)`
  width: 200px;
  height: 40px;
  border-width: 3px;
  margin: 12px;
`;
