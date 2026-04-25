import React from "react";

const LocationSearchPanel = (props) => {
  // console.log(props);

  // sample array for location random locations
  const locations = [
    "24B, RR Coding School,  Near Post-office,Ahmedabad-380021",
    "12/A, MG Road, Near Metro Station, Bengaluru-560001",
    "45, Park Street, Opp. City Mall, Kolkata-700016",
    "88, FC Road, Shivajinagar, Pune-411005",
    "19, Banjara Hills Road No. 12, Hyderabad-500034",
    "7, Marine Drive, Churchgate, Mumbai-400020",
    "102, Anna Salai, Teynampet, Chennai-600018",
  ];
  return (
    <div>
      {/* just sample data */}
      {locations.map((location, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              props.setvehiclePanel(true);
              props.setpanelOpen(false);
            }}
            className="flex gap-4 border-2 active:border-black border-gray-100 rounded-xl p-3 my-2 items-center justify-start"
          >
            <h2 className="bg-[#eee] h-6 w-8 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{location}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
