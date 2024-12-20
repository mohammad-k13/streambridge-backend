interface IUser  {
  email: string,
  username: string,
  password: string,

  comparePassword: (hashedPassword: string) => boolean;
}

export default IUser;