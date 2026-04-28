import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VehiclePanel = (props) => {
  const {
    fare,
    fareLoading,
    fareError,
    onSelectVehicle,
    selectedVehicleType,
  } = props;
  
  const formatFare = (value) => (typeof value === "number" ? `₹${value}` : "—");
  const isSelected = (type) => selectedVehicleType === type;

  return (
    <div>
        <h5
          className="p-1 text-center w-[93%] absolute top-0"
          onClick={() => {
            props.setvehiclePanel(false);
          }}
        >
          <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
        </h5>
        {fareLoading && (
          <div className="space-y-3">
            {[0, 1, 2].map((item) => (
              <div
                key={`fare-skeleton-${item}`}
                className="flex p-3 border-2 border-gray-100 rounded-xl items-center w-full justify-between"
              >
                <Skeleton height={40} width={56} />
                <div className="w-1/2">
                  <Skeleton height={14} width={100} />
                  <Skeleton height={12} width={80} className="mt-2" />
                  <Skeleton height={12} width={120} className="mt-2" />
                </div>
                <Skeleton height={18} width={60} />
              </div>
            ))}
          </div>
        )}
        {!fareLoading && fareError && (
          <p className="text-sm text-red-500 mb-2">{fareError}</p>
        )}
        {!fareLoading && (
          <div onClick={()=>{
            onSelectVehicle?.("car", fare?.car)
          }} className={`flex p-3 border-2 mb-2 rounded-xl items-center w-full justify-between hover:border-black cursor-pointer transition-colors duration-200 ${isSelected("car") ? "border-black" : "border-gray-200"}`}>
          <img
            className="h-10"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
            alt=""
          />
          <div className="w-1/2">
            <h4 className="font-medium text-base">
              Uber Go{" "}
              <span>
                <i className="ri-user-3-fill"></i>4
              </span>
            </h4>
            <h5 className="font-medium text-base">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable , compact rides
            </p>
          </div>
          <h2 className="font-semibold text-xl">{formatFare(fare?.car)}</h2>
        </div>
        )}
        {!fareLoading && (
          <div onClick={()=>{
            onSelectVehicle?.("motorcycle", fare?.motorcycle)
          }} className={`flex p-3 border-2 mb-2 rounded-xl items-center w-full justify-between cursor-pointer transition-colors duration-200 hover:border-black active:border-black ${isSelected("motorcycle") ? "border-black" : "border-gray-200"}`}>
          <img
            className="h-10"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n"
            alt=""
          />
          <div className="w-1/2">
            <h4 className="font-medium text-base">
              Moto{" "}
              <span>
                <i className="ri-user-3-fill"></i>1
              </span>
            </h4>
            <h5 className="font-medium text-base">3 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable , motorcycle rides
            </p>
          </div>
          <h2 className="font-semibold text-xl">{formatFare(fare?.motorcycle)}</h2>
        </div>
        )}
        {!fareLoading && (
          <div onClick={()=>{
            onSelectVehicle?.("auto", fare?.auto)
          }} className={`flex p-3 border-2 mb-2 rounded-xl items-center w-full justify-between cursor-pointer transition-colors duration-200 hover:border-black active:border-black ${isSelected("auto") ? "border-black" : "border-gray-200"}`}>
          <img
            className="h-15 w-15"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn"
            alt=""
          />
          <div className="w-1/2">
            <h4 className="font-medium text-base">
              Uber Auto{" "}
              <span>
                <i className="ri-user-3-fill"></i>3
              </span>
            </h4>
            <h5 className="font-medium text-base">5 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable , compact rides
            </p>
          </div>
          <h2 className="font-semibold text-xl">{formatFare(fare?.auto)}</h2>
          </div>
        )}
      </div>
  )
}

export default VehiclePanel