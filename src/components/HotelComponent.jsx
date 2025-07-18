function HotelComponent({ title, values, widthClass }){
    return (
    <div style={{ fontFamily: "Roboto" }} className={`flex flex-col ${widthClass}`}>
      <div className="bg-[#321E5D] text-white font-[500] text-center py-3 text-xl rounded-t-4xl">
        {title}
      </div>

      {values.map((val, index) => (
        <div
          key={index}
          className={`bg-[#F9EEFF] font-[300] text-center py-4 px-2 text-base border-t border-white ${
            index === values.length - 1 ? "rounded-b-2xl" : ""
          }`}
        >
          {val}
        </div>
      ))}
    </div>
  );
}

export default HotelComponent;