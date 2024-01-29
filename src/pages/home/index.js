import React, { useState } from "react";
import "./styles.module.css";
import bookingService from "../../services/booking";
import { timeSlotsArray, monthsArray, daysArray } from "../../constants";
import basicHelper from "../../helper";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

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
  const [isSlotAvailable, setIsSlotAvailable] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  function isDateEntered() {
    return dateDay && dateMonth;
  }

  function isRequiredFieldsFilled() {
    return name && dateDay && dateMonth && timeSlot;
  }

  // write reset form function here
  function resetForm() {
    setName("");
    setPhone("");
    setEmail("");
    setDateDay("");
    setDateMonth("");
    setTimeSlot("");
    setSport("");
    setPlayers("");
    setUsername("");
    setPassword("");
    setAvailableSlots([]);
    setIsSlotAvailable(false);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedOption === "book") {
      // Perform POST API request to /api/bookings with the form data
      // console the input values

      if (!isRequiredFieldsFilled()) {
        return;
      }

      const serviceResponse = await bookingService.sendBookingDetails({
        name,
        phone,
        email,
        dateDay,
        dateMonth,
        timeSlot,
        sport,
        players,
      });

      console.log(serviceResponse);

      if (serviceResponse.success) {
        // Show modal with success message
        setBookingId(serviceResponse.data.booking_id);
        toggleModal();

        // reset the form
        resetForm();
      }
    } else if (selectedOption === "login") {
      // Perform POST API request to /api/admin/login with the form data
      // console the input values
      console.log(username, password);
    }
  };

  // check slot availability
  const checkAvailability = async () => {
    if (!isDateEntered()) {
      return;
    }
    const serviceResponse = await bookingService.getBookingDetails(
      `${new Date().getFullYear()}-${dateMonth}-${dateDay}`
    );

    const bookedSlots = basicHelper.generateSlots(serviceResponse.data);

    // filter the available slots
    const updatedAvailableSlots = timeSlotsArray.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    if (updatedAvailableSlots.length === 0) {
      window.alert("No slots available for the selected date");
      setIsSlotAvailable(false);
    }

    setIsSlotAvailable(true);
    setAvailableSlots(updatedAvailableSlots);
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Booking Status</ModalHeader>
        <ModalBody>Your booking was successful!</ModalBody>
        <ModalBody>Copy Booking ID: {bookingId}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      {/* Form */}
      <Form onSubmit={handleFormSubmit}>
        {/* Options */}
        <div className="d-flex justify-content-center">
          <Button
            style={{
              margin: "0 10px",
              backgroundColor:
                selectedOption === "book" ? "blue" : "transparent",
              color: selectedOption === "book" ? "white" : "black",
            }}
            onClick={() => handleOptionChange("book")}
          >
            Book
          </Button>
          <Button
            style={{
              margin: "0 10px",
              backgroundColor:
                selectedOption === "login" ? "blue" : "transparent",
              color: selectedOption === "login" ? "white" : "black",
            }}
            onClick={() => handleOptionChange("login")}
          >
            Login
          </Button>
        </div>

        {/* Book form fields */}
        {selectedOption === "book" && (
          <div>
            <FormGroup>
              <Label for="date">
                Date<span>*</span>:
              </Label>
              <div style={{ display: "flex" }}>
                <Input
                  type="select"
                  value={dateDay}
                  onChange={(e) => {
                    setDateDay(e.target.value);
                    setIsSlotAvailable(false);
                  }}
                  required
                >
                  <option value="">Day</option>
                  {daysArray.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </Input>
                <Input
                  type="select"
                  value={dateMonth}
                  onChange={(e) => {
                    setDateMonth(e.target.value);
                    setIsSlotAvailable(false);
                  }}
                  required
                >
                  <option value="">Month</option>
                  {monthsArray.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </Input>
                {/* add button "check availability" here */}
                <div className="d-flex align-items-center mt-2">
                  {!isSlotAvailable ? (
                    <Button
                      type="button"
                      onClick={checkAvailability}
                      disabled={!isDateEntered()}
                    >
                      Check Availability
                    </Button>
                  ) : (
                    <div className="text-success font-weight-bold">
                      ✅ Slots available
                    </div>
                  )}
                </div>
              </div>
            </FormGroup>

            <FormGroup>
              <Label for="name">
                Name<span>*</span>:
              </Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="phone">Phone:</Label>
              <Input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="timeSlot">
                Time Slot<span>*</span>:
              </Label>
              <Input
                type="select"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                required
              >
                <option value="">Select a time slot</option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="sport">Sport:</Label>
              <Input
                type="text"
                value={sport}
                onChange={(e) => setSport(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="players">Players:</Label>
              <Input
                type="number"
                value={players}
                onChange={(e) => setPlayers(e.target.value)}
              />
            </FormGroup>
          </div>
        )}

        {/* Login form fields */}
        {selectedOption === "login" && (
          <div>
            <FormGroup>
              <Label for="username">
                Username<span>*</span>:
              </Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">
                Password<span>*</span>:
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
          </div>
        )}

        {/* Submit button */}
        <Button type="submit" disabled={!isRequiredFieldsFilled()}>
          {selectedOption === "book" ? "Request Reservation" : "Login"}
        </Button>
      </Form>
    </div>
  );
};

export default Home;
