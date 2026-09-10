import { create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export type Booking = {
    venue : string;
    date : string;
    session : string;
    guestCount : number;
    customerName : string;
    customerEmail : string;
    customerPhone : string;
    typeOfEvent : string;
    brideName : string;
    groomName : string;
    typeofpackage : string
};


type BookingStore = {
    booking : Booking;
    updateBooking : (values: Partial<Booking>) => void;
    resetBooking: () => void;
}

const emptyBooking : Booking = {
    venue : "",
    date : "",
    session : "",
    guestCount :0,
    customerName : "",
    customerEmail : "",
    customerPhone : "",
    typeOfEvent : "",
    brideName : "",
    groomName : "",
    typeofpackage : ""
}


export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      booking: emptyBooking,

      updateBooking: (values) =>
        set((state) => ({
          booking: {
            ...state.booking,
            ...values,
          },
        })),

      resetBooking: () => set({ booking: { ...emptyBooking } }),
    }),

    {
      name: "booking-draft",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);