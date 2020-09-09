interface User {
  name: string;
  email: string;
  id?: number;
  birthDate?: string;
  phone?: string;
  role?: string;
}

const usersList = () => {
  const users: User[] = [
    {name: 'joão', email: 'joão@gmail.com', birthDate: '12/04/1998'},
    {name: 'guilherme', email: 'guilherme@gmail.com', birthDate: '03/12/1994'},
    {name: 'pedro', email: 'pedro@gmail.com', birthDate: '22/02/2010'},
    {name: 'juliana', email: 'juliana@gmail.com', birthDate: '17/07/2002'},
    {name: 'felipe', email: 'felipe@gmail.com', birthDate: '16/09/1995'},
    {name: 'marta', email: 'marta@gmail.com', birthDate: '10/08/1995'},
    {name: 'mariana', email: 'mariana@gmail.com', birthDate: '22/07/1993'},
    {name: 'giovane', email: 'giovane@gmail.com', birthDate: '12/05/1980'},
    {name: 'yasmin', email: 'yasmin@gmail.com', birthDate: '30/11/2001'},
    {name: 'fernando', email: 'fernando@gmail.com', birthDate: '24/06/1999'},
    {name: 'ana', email: 'ana@gmail.com', birthDate: '07/02/1990'},
    {name: 'gabriel', email: 'gabriel@gmail.com', birthDate: '11/10/2000'},
    {name: 'lucas', email: 'lucas@gmail.com', birthDate: '29/01/1991'},
    {name: 'giovana', email: 'giovana@gmail.com', birthDate: '14/05/2001'},
    {name: 'laura', email: 'laura@gmail.com', birthDate: '02/12/1994'},
    {name: 'rodrigo', email: 'rodrigo@gmail.com', birthDate: '21/04/2001'},
    {name: 'amanda', email: 'amanda@gmail.com', birthDate: '31/08/1998'},
    {name: 'vinicius', email: 'vinicius@gmail.com', birthDate: '09/10/1997'},
  ];
  return users;
};

export default usersList();
