import React from 'react'

const VehiclePanel = (props) => {
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
        <div onClick={()=>{
            props.setconfirmRidePanel(true)
        }} className="flex p-3 border-2 border-gray-200 mb-2 rounded-xl items-center w-full justify-between  hover:border-black cursor-pointer transition-colors duration-200">
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
          <h2 className="font-semibold text-xl">₹225.21</h2>
        </div>
        <div onClick={()=>{
            props.setconfirmRidePanel(true)
        }} className="flex p-3 border-2 border-gray-200 mb-2 rounded-xl items-center w-full justify-between cursor-pointer transition-colors duration-200 hover:border-black active:border-black">
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
          <h2 className="font-semibold text-xl">₹120</h2>
        </div>
        <div onClick={()=>{
            props.setconfirmRidePanel(true)
        }} className="flex p-3 border-2 border-gray-200 mb-2 rounded-xl items-center w-full justify-between cursor-pointer transition-colors duration-200 hover:border-black active:border-black">
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
          <h2 className="font-semibold text-xl">₹180</h2>
        </div>
      </div>
  )
}

export default VehiclePanel