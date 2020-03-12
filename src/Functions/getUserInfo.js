import { getUserFromSession } from "./AuthToken";

export const getUserInfoSagaLocal = (state) => {
  const userInformationSaga = state.userReducer.userInformation;
  if (userInformationSaga && userInformationSaga.token) 
    return userInformationSaga;
  else return getUserFromSession();
};
