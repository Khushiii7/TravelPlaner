import HotelComponent from "./HotelComponent";

function HotelBookings2({title, title2, data}) {
  return (
    <div
      style={{ fontFamily: "Roboto" }}
      className="w-full flex justify-center px-4 sm:px-6 md:px-8 my-10"
    >
      <div className="w-full max-w-7xl">
        <h2 className="text-lg sm:text-xl lg:text-3xl font-[700] text-black mb-6">
          {title} <span className="text-[#680099]">{title2}</span>
        </h2>

        <div className="flex overflow-x-auto gap-4">
          {data.map((item, index) => (
            <HotelComponent
              key={index}
              title={item.title}
              values={item.values}
              widthClass={item.widthClass}
            />
          ))}
        </div>



         {/* Optional Notes */}
        {title === "Hotel" && (
          <ul className="mt-6 text-sm text-gray-700 list-decimal list-inside space-y-1">
            <li>All Hotels Are Tentative And Can Be Replaced With Similar.</li>
            <li>Breakfast Included For All Hotel Stays.</li>
            <li>All Hotels Will Be 4★ And Above Category</li>
            <li>A maximum occupancy of 2 people/room is allowed in most hotels.</li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default HotelBookings2;
