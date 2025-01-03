interface IUser  {
  email: string,
  username: string,
  password: string,
  image?:string,

  comparePassword: (hashedPassword: string) => boolean;
}

export default IUser;