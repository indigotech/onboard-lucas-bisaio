import {Alert} from 'react-native';

export function validateName(name: string): boolean {
  const nameValidation = /[0-9]|\W|_/;
  if (name.length === 0 || nameValidation.test(name)) {
    var error = `Incorrect input. "${name}" is not a valid name. Try again.`;
    Alert.alert(error);
    return false;
  } else {
    return true;
  }
}

export function validateEmail(email: string): boolean {
  var error = `Incorrect input. Email "${email}" is not valid. Try again.`;
  if (email.indexOf('@') && email.indexOf('.com') === -1) {
    Alert.alert(error);
    return false;
  } else {
    return true;
  }
}

export function validatePhone(phone: string): boolean {
  const phoneValidation = /[a-z]|[A-Z]\W|_/;
  var error = `Incorrect input. Phone "${phone}" is not valid. The correct format is 99999999 Try again.`;
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
    var error = `Invalid format. Birth date "${birthDate}" is not valid. The correct format is DD-MM-YYYY. Try again`;
    Alert.alert(error);
    return false;
  } else {
    const parts: string[] = birthDate.split('-');
    const today = new Date();
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    console.log(date, parts, date > today, birthDateValidation.test(birthDate));
    if (date >= today) {
      var error = `Invalid input. Date "${birthDate}" is not valid. It has to be a past date. Try again`;
      Alert.alert(error);
      return false;
    } else {
      return true;
    }
  }
}

export function validatePassword(password: string): boolean {
  const passwordValidation = /(?=.{7,})(?=.*[0-9])(?=.*[a-z])|(?=.{7,})(?=.*[0-9])(?=.*[A-Z])/;
  var error =
    'Invalid input. Password is not valid. It have to containe letters and numbers. Try again';
  if (passwordValidation.test(password)) {
    return true;
  } else {
    Alert.alert(error);
    return false;
  }
}
