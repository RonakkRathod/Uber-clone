import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LocationSearchPanel = (props) => {
  const { suggestions, suggestionsLoading, suggestionsError, onSelect } = props;

  return (
    <div>
      {suggestionsLoading && (
        <div className="space-y-3">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={`suggestion-skeleton-${item}`}
              className="flex gap-4 border-2 border-gray-100 rounded-xl p-3 items-center"
            >
              <Skeleton circle height={24} width={24} />
              <div className="flex-1">
                <Skeleton height={14} width="80%" />
                <Skeleton height={10} width="60%" className="mt-2" />
              </div>
            </div>
          ))}
        </div>
      )}
      {!suggestionsLoading && suggestionsError && (
        <p className="text-sm text-red-500">{suggestionsError}</p>
      )}
      {!suggestionsLoading &&
        !suggestionsError &&
        suggestions?.map((suggestion, index) => {
          const label = suggestion?.displayName || "";
          return (
            <div
              key={`${label}-${index}`}
              onClick={() => {
                onSelect?.(suggestion);
              }}
              className="flex gap-4 border-2 active:border-black border-gray-100 rounded-xl p-3 my-2 items-center justify-start"
            >
              <h2 className="bg-[#eee] h-6 w-8 flex items-center justify-center rounded-full">
                <i className="ri-map-pin-fill"></i>
              </h2>
              <h4 className="font-medium">{label}</h4>
            </div>
          );
        })}
    </div>
  );
};

export default LocationSearchPanel;
