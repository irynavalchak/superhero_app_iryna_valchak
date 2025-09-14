import { fetchSuperheroes, deleteSuperhero } from "../../api/superheroes";
import Pagination from "../Pagination/Pagination";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ISuperhero } from "../../types";
import "./SuperheroList.scss";

const SuperheroList: React.FC = () => {
  const [superheroes, setSuperheroes] = useState<ISuperhero[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadHeroes = async () => {
    const data = await fetchSuperheroes(page);
    setSuperheroes(data.superheroes);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    loadHeroes();
  }, [page]);

  const handleDelete = async (id: string) => {
    await deleteSuperhero(id);
    loadHeroes();
  };

  return (
    <>
      <div className="superhero-list">
        {superheroes?.map((hero) => (
          <Link to={`/hero/${hero._id}`} className="superhero-list__item" key={hero._id}>
            <img
              src={`http://localhost:8000/${hero.images[0]}`}
              alt={hero.nickname}
              className="superhero-list__image"
            />
            <div className="superhero-list__info">
              <h2 className="superhero-list__nickname">{hero.nickname}</h2>
              <p className="superhero-list__powers">
                {hero.superpowers.join(", ")}
              </p>
            </div>
            <div className="superhero-list__buttons">
              <button
                className="superhero-list__delete"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete(hero._id)}
                }
              >
                Delete
              </button>
            </div>
          </Link>
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </>
  );
};

export default SuperheroList;
