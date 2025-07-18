import HotelComponent from "./HotelComponent";

const city = ["Singapore", "Singapore", "Singapore", "Singapore"];
const checkIn = ["24/02/2024", "24/02/2024", "24/02/2024", "24/02/2024"];
const checkOut = ["24/02/2024", "24/02/2024", "24/02/2024", "24/02/2024"];
const nights = ["2", "2", "2", "2"];
const hotelName = [
  "Super Townhouse Oak\nVashi Formerly Blue",
  "Super Townhouse Oak\nVashi Formerly Blue",
  "Super Townhouse Oak\nVashi Formerly Blue",
  "Super Townhouse Oak\nVashi Formerly Blue",
];

function HotelBookings() {
  return (
    <div style={{ fontFamily: "Roboto" }} className="w-full flex justify-center px-4 sm:px-6 md:px-8 my-10">
  <div className="w-full max-w-7xl">
    <h2 className="text-lg sm:text-xl lg:text-3xl font-[700] text-black mb-6">
      Hotel <span className="text-[#680099]">Bookings</span>
    </h2>

    {/* Table Layout */}
    <div className="flex overflow-x-auto gap-4">
      <HotelComponent title="City" values={city} widthClass="w-1/5 min-w-[100px]" />
      <HotelComponent
        title="Check In"
        values={checkIn}
        widthClass="w-1/5 min-w-[110px]"
      />
      <HotelComponent
        title="Check Out"
        values={checkOut}
        widthClass="w-1/5 min-w-[110px]"
      />
      <HotelComponent title="Nights" values={nights} widthClass="w-1/12 min-w-[60px]" />
      <HotelComponent
        title="Hotel Name"
        values={hotelName}
        widthClass="flex-1 min-w-[200px]"
      />
    </div>

    {/* Notes */}
    <ul className="mt-6 text-sm text-gray-700 list-decimal list-inside space-y-1">
      <li>All Hotels Are Tentative And Can Be Replaced With Similar.</li>
      <li>Breakfast Included For All Hotel Stays.</li>
      <li>All Hotels Will Be 4★ And Above Category</li>
      <li>
        A maximum occupancy of 2 people/room is allowed in most hotels.
      </li>
    </ul>
  </div>
</div>

  );
}

export default HotelBookings;