import React from 'react';
import {Text, View} from 'react-native';

interface User {
  name?: string;
  email: string;
  status?: number;
  isPremium?: boolean;
}

export default function HomeScreen() {
  const users: User[] = [
    {email: 'lucas@gmail.com'},
    {email: 'vinicius@gmail.com'},
    {email: 'leonardo@gmail.com'},
  ];
  console.log(users);
  return (
    <View>
      <Text> HomeScreen</Text>
    </View>
  );
}
