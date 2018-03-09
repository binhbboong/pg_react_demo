export default function generateHttpRequestActions(getFunc, types) {
  const [requestType, successType, errorType] = types;
  return function () {
    return function (dispatch) {
      dispatch({ type: requestType });
      return getFunc
        .then((res) => {
          dispatch({ type: successType, data: res });
        })
        .catch((err) => {
          dispatch({ type: errorType, data: err });
        });
    };
  };
}
