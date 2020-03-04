import { getUserFromSession,} from "../Components/UserComponent/AuthToken";

export const getUserInfoSagaLocal =()=>{
    return getUserFromSession();
}