// Coloque aqui suas actions
const saveLoginInfo = ({ email }) => ({
  type: 'LOGIN',
  email,
});

const failedRequest = (error) => ({ type: 'FAILED_REQUEST', error });

const sucessRequest = (payload) => ({ type: 'SUCESS_REQUEST', payload });

const requestAPI = () => ({ type: 'REQUEST', isFetching: true });

export function getCurrencies() {
  return async (dispatch) => {
    dispatch(requestAPI);
    try {
      const result = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await result.json();
      const currencies = Object.entries(data).map((item) => item[0])
        .filter((item) => item !== 'USDT');
      dispatch(sucessRequest(currencies));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}

export default saveLoginInfo;
