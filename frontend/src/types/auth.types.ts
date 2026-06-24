type Error = {
  message: string;
  errors?: {
    [key: string]: string[];
  };
};

type signIn = {
  email: string;
  password: string;
};

type signUp = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type Success =  {
  message: string;
}

export type { Error, signIn, signUp , Success };
