export function validateName(name: string): boolean {
  const nameValidation = /[0-9]|\W|_/;
  return name.length === 0 || nameValidation.test(name) ? false : true;
}

export function validateEmail(email: string): boolean {
  return email.indexOf('@') && email.indexOf('.com') === -1 ? false : true;
}

export function validatePhone(phone: string): boolean {
  return phone.indexOf('(') === -1 ||
    phone.indexOf(')') === -1 ||
    phone.indexOf('+') === -1 ||
    phone.indexOf('-') === -1
    ? false
    : true;
}

export function validateCpf(cpf: string): boolean {
  const cpfValidation = /[a-z]|[A-Z]|\W|_/;
  return cpf.length !== 11 || cpfValidation.test(cpf) ? false : true;
}

export function validateBirthDate(birthDate: string): boolean {
  if (birthDate.indexOf('-') !== -1) {
    const birthDateValidation = /(((0[1-9]|[12][0-9]|3[01])([-./])(0[13578]|10|12)([-./])(\d{4}))|(([0][1-9]|[12][0-9]|30)([-./])(0[469]|11)([-./])(\d{4}))|((0[1-9]|1[0-9]|2[0-8])([-./])(02)([-./])(\d{4}))|((29)(\.|-|\/)(02)([-./])([02468][048]00))|((29)([-./])(02)([-./])([13579][26]00))|((29)([-./])(02)([-./])([0-9][0-9][0][48]))|((29)([-./])(02)([-./])([0-9][0-9][2468][048]))|((29)([-./])(02)([-./])([0-9][0-9][13579][26])))$/;
    const parts = birthDate.split('-');
    const today = new Date();
    const date = new Date(parts[2], parts[1] - 1, parts[0]);
    return date <= today && birthDateValidation.test(birthDate) ? true : false;
  } else {
    return false;
  }
}
