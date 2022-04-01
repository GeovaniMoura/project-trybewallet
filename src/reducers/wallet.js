// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'SUCESS_REQUEST':
    return {
      currencies: action.payload,
      isFetching: false,
    };
  case 'REQUEST':
    return {
      isFetching: action.isFetching,
    };
  default:
    return state;
  }
};

export default wallet;
