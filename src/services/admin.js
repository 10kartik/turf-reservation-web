import ServiceClass from "./triggerApi";
import constants from "../constants";
// import Cookies from "js-cookie";

class AdminService {
  async loginAdmin(username, password) {
    const url = constants.coreConstantsObj.apiDomain + `/api/admin/login`;

    const response = await ServiceClass.postEndpoint(url, {
      username,
      password,
    });

    if (response.status) {
      // Print cookie
    }
    return response;
  }
}

const adminService = new AdminService();

export default adminService;
