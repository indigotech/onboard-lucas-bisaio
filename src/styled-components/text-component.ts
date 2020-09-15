import styled from 'styled-components/native';

export const Title = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: #2c0735;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Label = styled.Text<{color: string}>`
  font-size: 20px;
  font-weight: normal;
  color: ${(props) => `${props.color}`};
  margin: 12px;
`;
