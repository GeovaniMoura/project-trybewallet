// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
  totalValue: 0,
  isFetching: false,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'SUCESS_REQUEST':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'REQUEST':
    return {
      ...state,
    };
  case 'SUCESS_REQUEST_SAVE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, ...action.expense],
      totalValue: action.totalValue,
    };
  default:
    return state;
  }
};

export default wallet;
