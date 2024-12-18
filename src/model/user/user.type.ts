interface IUser  {
  email: string,
  username: string,
  password: string,

  comparePassword: (hashedPassword: string) => void;
}

export default IUser;