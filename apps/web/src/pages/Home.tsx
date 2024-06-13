import React from "react";
import Tile from "../components/Tile";

const Home: React.FC = () => {
	const tiles = 10;
	return (
		<div className="w-screen min-h-dvh flex justify-center items-center">
			{Array(tiles)
				.fill(0)
				.map((_, idx) => (
					<div key={idx}>
						{Array(tiles)
							.fill(0)
							.map((_, idx) => (
								<Tile key={idx} />
							))}
					</div>
				))}
		</div>
	);
};

export default Home;

