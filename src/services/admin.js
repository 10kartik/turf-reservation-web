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

    return response;
  }

  async getCurrentAdmin() {
    const url = constants.coreConstantsObj.apiDomain + `/api/admin/current`;

    return await ServiceClass.getEndpoint(url);
  }

  async getPendingBookings() {
    const url = constants.coreConstantsObj.apiDomain + `/api/admin/bookings`;

    return await ServiceClass.getEndpoint(url);
  }

  async confirmBooking(bookingId) {
    const url =
      constants.coreConstantsObj.apiDomain + `/api/admin/bookings/${bookingId}/confirm`;

    return await ServiceClass.putEndpoint(url);
  }
}

const adminService = new AdminService();

export default adminService;
