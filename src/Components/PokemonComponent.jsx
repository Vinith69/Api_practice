import React, { useState, useEffect } from "react";

function PokemonComponent() {
	const [pokemonName, setPokemonName] = useState("ditto");
	const [notFound, setNotFound] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [results, setResults] = useState({});
	const [sprites, setSprites] = useState({});
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
				setResults(results);
				setSprites(data.sprites);
				setNotFound(false);
				console.log(data);
			}
			// console.log(res);
			setIsLoading(false);
		};

		fetchData();
	}, [url]);

	const handleEvent = e => {
		if (e.charCode === 13) {
			setPokemonName(e.target.value);
		}
	};

	return (
		<div>
			{isLoading ? (
				<h1>Loading</h1>
			) : (
				<React.Fragment>
					<input
						type="text"
						placeholder="Enter a pokemon"
						autoFocus
						// onChange={e => setPokemonName(e.target.value)}
						onKeyPress={e => handleEvent(e)}
					/>
					<br />
					{notFound ? (
						<h3>Not Found, Enter Valid pokemon</h3>
					) : (
						<>
							<p>Front Image:</p>
							<img src={sprites.front_default} alt="pic" />
							<br />
							<p>Back Image:</p>
							<img src={sprites.back_default} alt="pic" />
						</>
					)}
				</React.Fragment>
			)}
		</div>
	);
}

export default PokemonComponent;
