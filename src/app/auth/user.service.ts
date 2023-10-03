import { User } from './user.model';

export class UserService {
  private dummyUserList: Array<User> = [
    {
      id: 1,
      name: 'Vukašin',
      surename: 'Stanković',
      email: 'vukasin.stankovic@gmail.com',
      password: 'vukasin1234',
      birthDate: new Date(2023, 7, 27),
      street: 'Radnih brigada',
      streetNumber: 0,
      phone: '0631234568',
    },
    {
      id: 2,
      name: 'Lazar',
      surename: 'Stanković',
      email: 'lazar.stankovic@gmail.com',
      password: 'lazar1234',
      birthDate: new Date(2023, 7, 27),
      street: 'Suboticka',
      streetNumber: 14,
      phone: '0631234567',
    },
  ];

  currentUser!: User | undefined;

  getUserName(user: User) {
    return user.email;
  }

  getAllUsers() {
    return this.dummyUserList;
  }

  getUserById(id: number): User {
    let foundUser!: User;
    this.dummyUserList.forEach((user) => {
      if (user.id === id) {
        foundUser = user;
      }
    });
    this.currentUser = foundUser;
    return foundUser;
  }

  getUser(userEmail: string): User | undefined {
    const foundUser = this.dummyUserList.find(
      (userToFind) => userToFind.email === userEmail
    );

    if (foundUser) {
      this.currentUser = foundUser;
    }

    console.log('Found user:');
    console.log(foundUser);
    return foundUser;
  }

  logOutUser() {
    this.currentUser = undefined;
  }

  getLogedUser(): User | undefined {
    return this.currentUser;
  }

  //   U produkciji ovaj metod bi zapravo proveravao hash vrednost lozinke
  isLoginParametersCorrect(userEmail: string, userPassword: string): boolean {
    return (
      this.dummyUserList.find(
        (userToFind) =>
          userToFind.email === userEmail && userToFind.password === userPassword
      ) != undefined
    );
  }

  registerUser(
    name: string,
    surename: string,
    email: string,
    password: string,
    birthDate: Date,
    street: string,
    streetNumber: number,
    phone: string
  ): User {
    let maxId: number = 0;

    this.dummyUserList.forEach((user) => {
      if (maxId < user.id) {
        maxId = user.id;
      }
    });

    let id = ++maxId;

    let user: User = {
      id,
      name,
      surename,
      email,
      password,
      birthDate,
      street,
      streetNumber,
      phone,
    };

    this.dummyUserList.push(user);

    this.currentUser = user;
    return user;
  }
}
