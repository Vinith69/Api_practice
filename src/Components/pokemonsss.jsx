import React, { useState, useEffect, useReducer } from "react";
import reducer, { initialState } from "./reducerComponent";
import AsyncSelect from "react-select/async";

function PokemonComponent() {
	const [pokemonName, setPokemonName] = useState("ditto");
	const [name, setName] = useState("");
	const [notFound, setNotFound] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [state, dispatch] = useReducer(reducer, initialState);
	const [pokeResults, setPokeResults] = useState([]);

	const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

	useEffect(() => {
		const fetchData = async () => {
			if (pokemonName === "") return;
			setIsLoading(true);
			const res = await fetch(url).catch(e => console.warn(e));

			if (res.status !== 200 || res.ok !== true) {
				setNotFound(true);
			} else {
				const data = await res.json();
				dispatch({
					type: "results",
					payload: data,
					sprites: data.sprites,
					stats: data.stats,
				});
				setNotFound(false);
				// console.log(data);
			}
			// console.log(res);
			setIsLoading(false);
		};

		fetchData();
	}, [url, pokemonName]);

	const handleEvent = e => {
		if (e.charCode === 13) {
			setPokemonName(e.target.value);
		}
	};

	// Extra
	useEffect(() => {
		const fetchNames = async () => {
			const res = await fetch(
				`https://pokeapi.co/api/v2/pokemon/?limit=1117`
			);
			const data = await res.json();
			console.log("pokemon Names:", data);
			setPokeResults(data.results);
			console.log(data.results);
		};
		fetchNames();
	}, [setPokeResults]);

	const filterPokemon = name => {
		return pokeResults.filter(
			i => i.name.toLowerCase().includes(name.toLowerCase())
			// i.label.toLowerCase().includes(name.toLowerCase())
		);
	};

	const loadOptions = (name, callback) => {
		setTimeout(() => {
			callback(filterPokemon(name));
		}, 1000);
	};
	// if typed
	const handleInputChange = e => {
		setName(e);
	};
	// If selected
	const handleChange = e => {
		setName(e);
	};

	const customStyles = {
		option: (provided, state) => ({
			...provided,
			// borderBottom: "1px dotted pink",
			// color: state.isSelected ? "red" : "blue",
			color: "black",

			padding: 20,
		}),
	};

	return (
		<div>
			{isLoading ? (
				<h1>Loading</h1>
			) : (
				<React.Fragment>
					{/* <input
						type="text"
						placeholder="Enter a pokemon"
						autoFocus
						// onChange={e => setPokemonName(e.target.value)}
						onKeyPress={e => handleEvent(e)}
					/> */}
					<br />
					<AsyncSelect
						placeholder="Enter a Pokemon"
						styles={customStyles}
						getOptionLabel={e => e.name}
						getOptionValue={e => e.url}
						value={name}
						cacheOptions
						loadOptions={loadOptions}
						defaultOptions
						onInputChange={handleInputChange}
						onChange={handleChange}
					/>
					{notFound ? (
						<h3>Not Found, Enter Valid pokemon</h3>
					) : (
						<>
							<p>Front View:</p>
							<img src={state.sprites.front_default} alt="pic" />
							<br />
							{state.sprites.back_default && (
								<>
									<p>Back View:</p>
									<img
										src={state.sprites.back_default}
										alt="BackImage"
									/>
								</>
							)}
							{state.stats.map(stats => (
								<p key={stats.stat.name}>
									{stats.stat.name[0].toUpperCase() +
										stats.stat.name.slice(1)}
									: {stats.base_stat}
								</p>
							))}
						</>
					)}
					{/* {pokeResults.map((i, e) => i.name)} */}
				</React.Fragment>
			)}
		</div>
	);
}

export default PokemonComponent;
