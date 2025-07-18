import React from 'react';

function TravelItem({ label, value }) {
  return (
    <div className="gap-2 flex flex-col justify-center">
      <p style={{ fontFamily: "Roboto" }} className="font-roboto font-[700] text-xl leading-none">
        {label}
      </p>
      <p style={{ fontFamily: "Roboto" }} className="font-roboto font-[400] text-sm leading-none">
        {value}
      </p>
    </div>
  );
}

export default TravelItem;
