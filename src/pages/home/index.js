import React, { useState } from "react";
import "./styles.module.css";
import bookingService from "../../services/booking";
import { timeSlotsArray, monthsArray, daysArray } from "../../constants";
import basicHelper from "../../helper";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState("book");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dateDay, setDateDay] = useState("");
  const [dateMonth, setDateMonth] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [sport, setSport] = useState("");
  const [players, setPlayers] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedOption === "book") {
      // Perform POST API request to /api/bookings with the form data
      // console the input values
      console.log(
        name,
        phone,
        email,
        dateDay,
        dateMonth,
        timeSlot,
        sport,
        players
      );
    } else if (selectedOption === "login") {
      // Perform POST API request to /api/admin/login with the form data
      // console the input values
      console.log(username, password);
    }
  };

  // check slot availability
  const checkAvailability = async () => {
    // console the input values
    console.log(dateDay, dateMonth);

    const serviceResponse = await bookingService.getBookingDetails(
      `${dateDay}-${dateMonth}-${new Date().getFullYear()}`
    );

    console.log(serviceResponse);

    const bookedSlots = basicHelper.generateSlots(serviceResponse.data);

    // console the booked slots
    console.log("booked", bookedSlots);

    // filter the available slots
    const updatedAvailableSlots = timeSlotsArray.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    console.log("available", updatedAvailableSlots);

    setAvailableSlots(updatedAvailableSlots);
  };

  return (
    <div>
      {/* Form */}
      <form onSubmit={handleFormSubmit}>
        {/* Options */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{
              margin: "0 10px",
              backgroundColor:
                selectedOption === "book" ? "blue" : "transparent",
              color: selectedOption === "book" ? "white" : "black",
            }}
            onClick={() => handleOptionChange("book")}
          >
            Book
          </button>
          <button
            style={{
              margin: "0 10px",
              backgroundColor:
                selectedOption === "login" ? "blue" : "transparent",
              color: selectedOption === "login" ? "white" : "black",
            }}
            onClick={() => handleOptionChange("login")}
          >
            Login
          </button>
        </div>

        {/* Book form fields */}
        {selectedOption === "book" && (
          <div>
            <div className="form-field">
              <label>
                Date<span>*</span>:
              </label>
              <div style={{ display: "flex" }}>
                <select
                  value={dateDay}
                  onChange={(e) => setDateDay(e.target.value)}
                  required
                >
                  <option value="">Day</option>
                  {daysArray.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  value={dateMonth}
                  onChange={(e) => setDateMonth(e.target.value)}
                  required
                >
                  <option value="">Month</option>
                  {monthsArray.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                {/* add button "check availability" here */}
                <button type="button" onClick={checkAvailability}>
                  Check Availability
                </button>
              </div>
            </div>
            <div className="form-field">
              <label>
                Name<span>*</span>:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Phone:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>
                Email<span>*</span>:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Time Slot:</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              >
                <option value="">Select a time slot</option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>Sport:</label>
              <input
                type="text"
                value={sport}
                onChange={(e) => setSport(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Players:</label>
              <input
                type="number"
                value={players}
                onChange={(e) => setPlayers(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Login form fields */}
        {selectedOption === "login" && (
          <div>
            <div className="form-field">
              <label>
                Username<span>*</span>:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>
                Password<span>*</span>:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {/* Submit button */}
        <button type="submit">
          {selectedOption === "book" ? "Request Reservation" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Home;
