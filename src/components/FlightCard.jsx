function FlightCard({ date, airlineText }) {
  return (
    <div className="w-full gap-12 flex flex-col sm:flex-row border border-[#541C9C] rounded-lg overflow-hidden">
      <div className="arrow-left w-full sm:w-48 px-4 py-3 flex items-center justify-center text-black font-[500] text-sm sm:text-base lg:text-xl border-b sm:border-b-0 sm:border-r border-[#541C9C]">
        {date}
      </div>

      <div className="flex-1 px-4 py-3 flex items-center text-black text-sm sm:text-base lg:text-xl">
        <span className="font-[700]">Fly Air India</span>&nbsp;
        <span className="font-[300]">{airlineText}</span>
      </div>
    </div>
  );
}

export default FlightCard;
