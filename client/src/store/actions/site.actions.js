import axios from "axios";
import * as actions from './index';
import { getAuthHeader, } from "utils/tools";

axios.defaults.headers.post['Content-Type'] = 'application-json';


export const updateSiteVars = (vars) => {
    return async(dispatch) => {
        try {
            const site = await axios.patch(`/api/site`, vars, getAuthHeader());
            
            dispatch(actions.siteGetVars(site.data));
            dispatch(actions.successGlobal('Site Information updated.'));
        }catch(error) {
            dispatch(actions.errorGlobal(error.response.data.message));
        }
    }
}