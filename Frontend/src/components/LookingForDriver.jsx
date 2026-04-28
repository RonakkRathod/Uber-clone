import React from "react";

const LookingForDriver = (props) => {
  const { pickupLocation, destination, fare, vehicleType } = props;
  const formatFare = (value) => (typeof value === "number" ? `₹${value}` : "—");
  const vehicleImages = {
    car: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n",
    motorcycle:
      "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n",
    auto: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn",
  };
  const vehicleImage = vehicleImages[vehicleType] || vehicleImages.car;

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setvehicleFound(false);
        }}
      >
        {" "}
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5 ">Looking for a Driver</h3>
      <div className="flex gap-2 flex-col justify-between items-center">
        <img
          className="h-30"
          src={vehicleImage}
          alt={vehicleType ? `${vehicleType} ride` : "Selected ride"}
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-6 p-4 border-b-2">
            <i className="ri-map-pin-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">
                {pickupLocation || "Pickup not set"}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Pickup location</p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-4 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {destination || "Destination not set"}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Destination</p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-4">
            <i className="ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-lg font-medium">{formatFare(fare)}</h3>
              <p className="text-sm -mt-1 text-gray-600">Estimated fare</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
