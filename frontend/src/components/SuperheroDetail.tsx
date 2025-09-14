import React, { useEffect, useState } from "react";
import { fetchSuperhero } from "../api/superheroes";

interface Superhero {
  _id: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: string[];
}

const SuperheroDetail: React.FC<{ id: string }> = ({ id }) => {
  const [hero, setHero] = useState<Superhero | null>(null);

  useEffect(() => {
    fetchSuperhero(id).then(setHero);
  }, [id]);

  if (!hero) return <div>Loading...</div>;

  return (
    <div>
      <h2>{hero.nickname}</h2>
      <p><b>Real Name:</b> {hero.real_name}</p>
      <p><b>Description:</b> {hero.origin_description}</p>
      <p><b>Superpowers:</b> {hero.superpowers.join(", ")}</p>
      <p><b>Catch Phrase:</b> {hero.catch_phrase}</p>
      <div>
        {hero.images.map((img, i) => (
          <img key={i} src={`http://localhost:5000/${img}`} alt={hero.nickname} width={100} />
        ))}
      </div>
    </div>
  );
};

export default SuperheroDetail;
