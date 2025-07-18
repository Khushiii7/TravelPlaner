import React from "react";

const TravelDays = ({ day, date, title, activities = [] }) => {
  if (!day || !Array.isArray(activities)) return null;
  try {
    const safeActs = Array.isArray(activities) ? activities : [];
    const morningActs = safeActs.filter(a => a && a.timeOfDay === 'Morning');
    const afternoonActs = safeActs.filter(a => a && a.timeOfDay === 'Afternoon');
    const eveningActs = safeActs.filter(a => a && a.timeOfDay === 'Evening');

    return (
      <div className="w-full flex justify-center my-10">
        <div className="flex w-[95%]">
          {/* Left vertical bar */}
          <div className="flex flex-col items-center justify-center bg-[#6C2EBE] rounded-2xl px-4" style={{ minWidth: 100, maxWidth: 120 }}>
            <span className="text-white text-lg font-semibold mb-2">Day</span>
            <span className="text-white text-5xl font-bold leading-none">{day}</span>
          </div>

          {/* White card */}
          <div className="flex-1 bg-white rounded-2xl shadow p-8 ml-6 flex">
            {/* Left badge, date, title */}
            <div className="flex flex-col items-center min-w-[180px]">
              {/* Circular gradient badge */}
              <div className="w-28 h-28 rounded-full flex items-center justify-center mb-2" style={{ background: 'linear-gradient(135deg, #4ba1eb 0%, #936fe0 100%)' }}>
                <span className="text-white text-3xl font-bold">{day}</span>
              </div>
              <div className="text-center mt-2">
                <div className="font-bold text-lg text-black">{date}</div>
                <div className="text-sm text-gray-700 mt-1">{title}</div>
              </div>
            </div>                                   

            {/* Timeline */}
            <div className="flex-1 relative pl-8">
              {/* Vertical gradient line */}
              <div className="absolute left-4 top-3 bottom-3 w-0.5 bg-gradient-to-b from-purple-400 to-purple-200"></div>

              {/* Morning */}
              {morningActs.length > 0 && (
                <div className="flex items-start mb-8 relative">
                  <div className="absolute -left-5  top-1 w-3 h-3 rounded-full bg-purple-500"></div>
                  <div className="ml-6">
                    <div className="font-bold text-lg mb-2">Morning</div>
                    <ul className="list-disc ml-5 text-gray-800 space-y-1">
                      {morningActs.map((a, i) => <li key={i}>{a.name}</li>)}
                    </ul>
                  </div>
                </div>
              )}

              {/* Afternoon */}
              {afternoonActs.length > 0 && (
                <div className="flex items-start mb-8 relative">
                  <div className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-purple-500"></div>
                  <div className="ml-6">
                    <div className="font-bold text-lg mb-2">Afternoon</div>
                    <ul className="list-disc ml-5 text-gray-800 space-y-1">
                      {afternoonActs.map((a, i) => <li key={i}>{a.name}</li>)}
                    </ul>
                  </div>
                </div>
              )}

              {/* Evening */}
              {eveningActs.length > 0 && (
                <div className="flex items-start relative">
                  <div className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-purple-500"></div>
                  <div className="ml-6">
                    <div className="font-bold text-lg mb-2">Evening</div>
                    <ul className="list-disc ml-5 text-gray-800 space-y-1">
                      {eveningActs.map((a, i) => <li key={i}>{a.name}</li>)}
                    </ul>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.error('Error rendering TravelDays:', err);
    return null;
  }
};

export default TravelDays;
