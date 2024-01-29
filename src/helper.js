class BasicHelper {
  generateSlots(data) {
    const slotsSet = new Set();

    if (!data || !data.booking_by_date) {
      return [];
    }

    // Iterate over the booking data and extract start_time and end_time
    for (const bookingDate in data.booking_by_date) {
      const bookings = data.booking_by_date[bookingDate];
      bookings.forEach((booking) => {
        const { start_time, end_time } = booking;

        // Split the range into individual time slots
        for (let i = Number(start_time); i < Number(end_time); i++) {
          const slot = `${i}-${i + 1}`;
          slotsSet.add(slot);
        }
      });
    }

    // Convert set to array and sort
    const slotsArray = [...slotsSet].sort();

    return slotsArray;
  }
}

module.exports = new BasicHelper();
