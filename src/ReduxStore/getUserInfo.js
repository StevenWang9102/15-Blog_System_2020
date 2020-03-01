import { getUserFromSession,} from "../Components/UserComponent/AuthToken";

export const getUserInfoSagaLocal =()=>{
    // 这句此处还需要思考
    // 或是从 redux store 上面拿到
return getUserFromSession();
}