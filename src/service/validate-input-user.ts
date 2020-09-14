export function validateName(name: string): boolean {
  const nameValidation = /[0-9]/;
  return name.length !== 0 && !nameValidation.test(name);
}

export function validateEmail(email: string): boolean {
  return email.indexOf('@') !== -1 && email.indexOf('.com') !== -1;
}

export function validatePhone(phone: string): boolean {
  const phoneValidation = /[a-z]|[A-Z]\W|_/;
  return !phoneValidation.test(phone) && phone.length === 8;
}

export function validateBirthDate(birthDate: string): boolean {
  const birthDateValidation = /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/;
  const parts: string[] = birthDate.split('-');
  const today = new Date();
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  return birthDateValidation.test(birthDate) && date <= today;
}

export function validatePassword(password: string): boolean {
  const passwordValidation = /(?=.{7,})(?=.*[0-9])(?=.*[a-z])|(?=.{7,})(?=.*[0-9])(?=.*[A-Z])/;
  return passwordValidation.test(password);
}
