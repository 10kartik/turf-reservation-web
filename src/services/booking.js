import ServiceClass from "./triggerApi";
import constants from "../constants";

class BookingService {
  async getBookingDetails(date) {
    console.log(
      "coreConstants.apiDomain",
      constants.coreConstantsObj.apiDomain
    );
    const url =
      constants.coreConstantsObj.apiDomain + `/api/bookings?date=${date}`;
    console.log(url);
    return await ServiceClass.getEndpoint(url);
  }

  async sendBookingDetails(bookingDetails) {
    const url = constants.coreConstantsObj.apiDomain + `/api/bookings`;
    return await ServiceClass.postEndpoint(url, bookingDetails);
  }
}

const bookingService = new BookingService();

export default bookingService;
