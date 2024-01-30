import React, { useEffect, useState } from "react";
import adminService from "../../services/admin";
import { ProgressBar } from "react-loader-spinner";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";
import "./adminDashboard.css";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const adminServiceResponse = await adminService.getPendingBookings();

        if (!adminServiceResponse.success) {
          throw new Error("Error fetching bookings");
        }
        setBookings(adminServiceResponse.data.booking_by_date);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [refreshKey]);

  const handleConfirmBooking = async (bookingId) => {
    // Handle the logic to confirm the booking with the given bookingId
    const adminServiceResponse = await adminService.confirmBooking(bookingId);

    // Update the state to remove the booking with the given bookingId
    if (adminServiceResponse.success) {
      setRefreshKey((prevKey) => prevKey + 1);
    }
  };

  return (
    <Container className="scrollable-container">
      {isLoading && (
        <Row
          className="justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <ProgressBar color="#00BFFF" height={100} width={100} />
        </Row>
      )}
      {!isLoading &&
        Object.entries(bookings).map(([date, bookingsByDate]) => (
          <Row key={date} className="mb-4">
            <Col>
              <h2 className="mb-3">{date}</h2>
              <ListGroup>
                {bookingsByDate.map((booking) => (
                  <ListGroupItem key={booking._id}>
                    <Row>
                      <Col md={3}>
                        <strong>Guest Name:</strong> {booking.guest_name}
                      </Col>
                      <Col md={2}>
                        <strong>Start Time:</strong> {booking.start_time}
                      </Col>
                      <Col md={2}>
                        <strong>End Time:</strong> {booking.end_time}
                      </Col>
                      {booking.guest_email && (
                        <Col md={3}>
                          <strong>Email:</strong> {booking.guest_email}
                        </Col>
                      )}
                      {booking.guest_phone && (
                        <Col md={2}>
                          <strong>Phone:</strong> {booking.guest_phone}
                        </Col>
                      )}
                      {booking.sport && (
                        <Col md={2}>
                          <strong>Sport:</strong> {booking.sport}
                        </Col>
                      )}
                      {booking.attendees && (
                        <Col md={2}>
                          <strong>Attendees:</strong> {booking.attendees}
                        </Col>
                      )}
                      <Col md={2}>
                        <Button
                          color="primary"
                          className="confirm-button"
                          onClick={() => handleConfirmBooking(booking._id)}
                        >
                          Confirm
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>
          </Row>
        ))}
    </Container>
  );
};

export default AdminDashboard;
