import styled from 'styled-components/native';

export const colorError = '#F00';
export const themeColor = '#2C0735';

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

export const Caption = styled.Text`
  font-size: 12px;
  font-weight: normal;
  color: ${colorError};
  margin-top: 8px;
`;

export const ButtonText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  color: #fff;
`;
