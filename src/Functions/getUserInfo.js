import { getUserFromSession,} from "./AuthToken";

export const getUserInfoSagaLocal =()=>{
    return getUserFromSession();
}