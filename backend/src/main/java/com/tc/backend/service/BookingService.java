package com.tc.backend.service;

import com.tc.backend.exception.InvalidBookingRequestException;
import com.tc.backend.exception.ResourceNotFoundException;
import com.tc.backend.model.BookedRoom;
import com.tc.backend.model.Room;
import com.tc.backend.repository.IBookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService{
    private final IBookingRepository iBookingRepository;
    private final IRoomService iRoomService;

    public List<BookedRoom> getAllBookings() {
        return iBookingRepository.findAll();
    }

    @Override
    public List<BookedRoom> getBookingsByUserEmail(String email) {
        return iBookingRepository.findByGuestEmail(email);
    }


    @Override
    public void cancelBooking(Long bookingId) {
        iBookingRepository.deleteById(bookingId);
    }

    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return iBookingRepository.findByRoomId(roomId);
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new InvalidBookingRequestException("Check-in date must come before check-out date");
        }
        Room room = iRoomService.getRoomById(roomId).get();
        List<BookedRoom> existingBookings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest,existingBookings);
        if (roomIsAvailable){
            room.addBooking(bookingRequest);
            iBookingRepository.save(bookingRequest);
        }else{
            throw new InvalidBookingRequestException("Sorry, This room is not available for the selected dates;");
        }
        return bookingRequest.getBookingConfirmationCode();
    }

    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return iBookingRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(()->new ResourceNotFoundException("No booking found with booking code: " + confirmationCode));
    }

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );
    }
}
