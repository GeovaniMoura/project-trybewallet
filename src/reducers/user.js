// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {
  user: {
    email: '',
  },
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
