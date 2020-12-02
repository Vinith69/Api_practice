export const initialState = {
	results: {},
	sprites: {},
	stats: [],
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case "results":
			return {
				...state,
				results: action.payload,
				sprites: action.sprites,
				stats: action.stats,
			};

		default:
			return state;
	}
}
