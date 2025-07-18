import FlightCard from "./FlightCard";

function PaymentPlans(){
    return (
    <div
      style={{ fontFamily: "Roboto" }}
      className="w-full flex justify-center px-4 sm:px-6 md:px-12 lg:px-20 mt-10"
    >
      <div className="w-full space-y-4">
        {/* Section Title */}
        <h2 className="text-lg sm:text-xl lg:text-3xl font-[700] text-black">
          Payment <span className="text-[#680099]">Plan</span>
        </h2>

        {/* Flight Cards */}
        <FlightCard
          date="Total Amount"
          airlineText="₹ 9,00,000 for 3 pax (inclusive of GST)."
        />
        <FlightCard
          date="TCS"
          airlineText="not collected"
        />
      </div>
    </div>
  );
}

export default PaymentPlans;