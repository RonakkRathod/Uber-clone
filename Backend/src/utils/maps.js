import axios from "axios";
import { ApiError } from "./apiError.js";

const getAddressCordinates = async (address) => {

	if (!address || !address.trim()) {
		throw new ApiError(400, "Address is required");
	}

	const LOCATIONIQ_API_KEY = process.env.LOCATIONIQ_API_KEY;

	if (!LOCATIONIQ_API_KEY) {
		throw new ApiError(500, "LocationIQ API key is missing");
	}

	let results;

	try {
		const response = await axios.get("https://us1.locationiq.com/v1/search", {
			params: {
				key: LOCATIONIQ_API_KEY,
				q: address,
				format: "json",
				limit: 1,
			},
		});

		results = response?.data;
	} catch (error) {
		const statusCode = error?.response?.status || 500;
		const providerMessage =
			error?.response?.data?.error ||
			error?.response?.data?.message ||
			error?.message ||
			"Failed to geocode address";

		throw new ApiError(statusCode, providerMessage);
	}

	if (!Array.isArray(results) || results.length === 0) {
		throw new ApiError(404, "Address not found. Please enter a more specific location");
	}

	const lat = Number(results[0].lat);
	const lng = Number(results[0].lon);

	if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
		throw new ApiError(500, "Invalid geocoding response");
	}

	return {
		lat,
		lng,
	};
};

const getDistanceTime = async (origin, destination) => {
	if (!origin || !destination) {
		throw new ApiError(400, "Origin and destination are required");
	}

	let originCoordinates = origin;
	let destinationCoordinates = destination;

	if (typeof origin === "string") {
		originCoordinates = await getAddressCordinates(origin);
	}

	if (typeof destination === "string") {
		destinationCoordinates = await getAddressCordinates(destination);
	}

	if (
		!Number.isFinite(originCoordinates?.lat) ||
		!Number.isFinite(originCoordinates?.lng) ||
		!Number.isFinite(destinationCoordinates?.lat) ||
		!Number.isFinite(destinationCoordinates?.lng)
	) {
		throw new ApiError(400, "Origin and destination coordinates are invalid");
	}

	const LOCATIONIQ_API_KEY = process.env.LOCATIONIQ_API_KEY;

	if (!LOCATIONIQ_API_KEY) {
		throw new ApiError(500, "LocationIQ API key is missing");
	}
	
	try {
		const coordinates = `${originCoordinates.lng},${originCoordinates.lat};${destinationCoordinates.lng},${destinationCoordinates.lat}`;

		const response = await axios.get(`https://us1.locationiq.com/v1/directions/driving/${coordinates}`, {
			params: {
				key: LOCATIONIQ_API_KEY,
				overview: "false",
			}
		});

		const data = response?.data;

		if (!data) {
			throw new ApiError(500, "Invalid directions response at data level");
		}

		let routes = [];

		if (Array.isArray(data?.routes)) {
			routes = data.routes;
		} else if (data?.routes) {
			routes = [data.routes];
		} else if (Array.isArray(data)) {
			routes = data;
		}

		if (routes.length === 0) {
			throw new ApiError(500, "Unable to retrieve distance and time - no routes found");
		}

		const route = routes[0];
		const distance = Number(route?.distance ?? route?.legs?.[0]?.distance);
		const duration = Number(route?.duration ?? route?.legs?.[0]?.duration);

		if (!Number.isFinite(distance) || !Number.isFinite(duration)) {
			throw new ApiError(500, "Invalid directions response - missing distance or duration");
		}

		const distanceInKm = Number((distance / 1000).toFixed(2));
		const durationInHours = Number((duration / 3600).toFixed(2));

		return {
			origin: originCoordinates,
			destination: destinationCoordinates,
			distance,
			duration,
			distanceInKm,
			durationInHours,
		};
	} catch (error) {
		const statusCode = error?.response?.status || 500;
		const providerMessage =
			error?.response?.data?.error ||
			error?.response?.data?.message ||
			error?.message ||
			"Failed to retrieve distance and time";

		throw new ApiError(statusCode, providerMessage);
	}
}

const getAddressSuggestions = async (input) => {

	if (!input || !input.trim()) {
		throw new ApiError(400, "Location is required");
	}

	const LOCATIONIQ_API_KEY = process.env.LOCATIONIQ_API_KEY;

	if (!LOCATIONIQ_API_KEY) {
		throw new ApiError(500, "LocationIQ API key is missing");
	}

	try {
		const response = await axios.get("https://us1.locationiq.com/v1/autocomplete", {
			params: {
				key: LOCATIONIQ_API_KEY,
				q: input,
				format: "json",
				limit: 4,
			},
		});

		const results = response?.data;

		if (!Array.isArray(results) || results.length === 0) {
			return [];
		}

		return results.map((item) => ({
			displayName: item.display_name,
			lat: Number(item.lat),
			lng: Number(item.lon),
		}));
	} catch (error) {
		const statusCode = error?.response?.status || 500;
		const providerMessage =
			error?.response?.data?.error ||
			error?.response?.data?.message ||
			error?.message ||
			"Failed to fetch address suggestions";

		throw new ApiError(statusCode, providerMessage);
	}
}

export {
	getAddressCordinates,
	getDistanceTime,
	getAddressSuggestions
}


