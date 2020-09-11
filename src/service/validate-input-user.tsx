import {Alert} from 'react-native';

export function validateName(name: string): boolean {
  const nameValidation = /[0-9]/;
  if (name.length === 0 || nameValidation.test(name)) {
    const error = `Incorrect input. "${name}" is not a valid name. Try again.`;
    Alert.alert(error);
    return false;
  } else {
    return true;
  }
}

export function validateEmail(email: string): boolean {
  const error = `Incorrect input. Email "${email}" is not valid. Try again.`;
  if (email.indexOf('@') && email.indexOf('.com') === -1) {
    Alert.alert(error);
    return false;
  } else {
    return true;
  }
}

export function validatePhone(phone: string): boolean {
  const phoneValidation = /[a-z]|[A-Z]\W|_/;
  const error = `Incorrect input. Phone "${phone}" is not valid. The correct format is 99999999 Try again.`;
  if (phoneValidation.test(phone)) {
    Alert.alert(error);
    return false;
  } else {
    return true;
  }
}

export function validateBirthDate(birthDate: string): boolean {
  const birthDateValidation = /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/;
  if (!birthDateValidation.test(birthDate)) {
    const error = `Invalid format. Birth date "${birthDate}" is not valid. The correct format is YYYY-MM-DD. Try again`;
    Alert.alert(error);
    return false;
  } else {
    const parts: string[] = birthDate.split('-');
    const today = new Date();
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    if (date >= today) {
      const error = `Invalid input. Date "${birthDate}" is not valid. It has to be a past date. Try again`;
      Alert.alert(error);
      return false;
    } else {
      return true;
    }
  }
}

export function validatePassword(password: string): boolean {
  const passwordValidation = /(?=.{7,})(?=.*[0-9])(?=.*[a-z])|(?=.{7,})(?=.*[0-9])(?=.*[A-Z])/;
  const error = 'Typo no containe. Try again';
  if (passwordValidation.test(password)) {
    return true;
  } else {
    Alert.alert(error);
    return false;
  }
}
