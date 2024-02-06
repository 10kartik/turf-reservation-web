import ServiceClass from "./triggerApi";
import constants from "../constants";

class BookingService {
  async getBookingDetails(date) {
    console.log("API Domain=>", constants.coreConstantsObj.apiDomain);
    const url =
      constants.coreConstantsObj.apiDomain + `/api/bookings?date=${date}`;
    return await ServiceClass.getEndpoint(url);
  }

  async sendBookingDetails(bookingDetails) {
    const url = constants.coreConstantsObj.apiDomain + `/api/bookings`;
    bookingDetails = {
      guest_name: bookingDetails.name,
      guest_phone: bookingDetails.phone,
      guest_email: bookingDetails.email,
      sport: bookingDetails.sport,
      attendees: bookingDetails.players,
      booking_date: `${new Date().getFullYear()}-${bookingDetails.dateMonth}-${
        bookingDetails.dateDay
      }`,
      start_time: bookingDetails.timeSlot.split("-")[0],
      end_time: bookingDetails.timeSlot.split("-")[1],
    };

    return await ServiceClass.postEndpoint(url, bookingDetails);
  }

  async getBookingInfo(bookingId) {
    const url =
      constants.coreConstantsObj.apiDomain + `/api/bookings/${bookingId}`;

    return await ServiceClass.getEndpoint(url);
  }
}

const bookingService = new BookingService();

export default bookingService;
