import React from "react";
import FlightCard from "./FlightCard";

function FlightSummary() {
  return (
    <div
      style={{ fontFamily: "Roboto" }}
      className="w-full flex justify-center px-4 sm:px-6 md:px-12 lg:px-20 mt-10"
    >
      <div className="w-full space-y-4">
        {/* Section Title */}
        <h2 className="text-lg sm:text-xl lg:text-3xl font-[700] text-black">
          Flight <span className="text-[#680099]">Summary</span>
        </h2>

        {/* Flight Cards */}
        <FlightCard
          date="Thu 10 Jan'24"
          airlineText="From Delhi (DEL) To Singapore (SIN)."
        />
        <FlightCard
          date="Thu 10 Jan'24"
          airlineText="From Delhi (DEL) To Singapore (SIN)."
        />
        <FlightCard
          date="Thu 10 Jan'24"
          airlineText="From Delhi (DEL) To Singapore (SIN)."
        />
        <FlightCard
          date="Thu 10 Jan'24"
          airlineText="From Delhi (DEL) To Singapore (SIN)."
        />

        {/* Note */}
        <p className="text-[13px] sm:text-sm text-gray-700 mt-2 font-roboto">
          <span className="font-[300]">Note:</span> All Flights Include Meals, Seat Choice (Excluding XL), And 20kg/25kg Checked Baggage.
        </p>
      </div>
    </div>
  );
}

export default FlightSummary;
