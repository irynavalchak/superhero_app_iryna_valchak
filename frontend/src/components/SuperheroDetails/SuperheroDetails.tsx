import React from 'react';
import { ISuperhero } from '../../types';
import './SuperheroDetails.scss';

interface Props {
  hero: ISuperhero;
  onClose: () => void;
  onEdit: () => void;
}

const SuperheroDetails: React.FC<Props> = ({ hero, onClose, onEdit }) => {
  return (
    <div className="superhero-details">
      <div className="superhero-details__header">
        <h2 className="superhero-details__nickname">{hero.nickname}</h2>
        <button className="superhero-details__close" onClick={onClose}>X</button>
      </div>
      <div className="superhero-details__content">
        <div className="superhero-details__images">
          {hero.images && hero.images.map((image: string, index: number) => (
            <img key={index} src={`http://localhost:5000/${image}`} alt={`${hero.nickname} ${index + 1}`} />
          ))}
        </div>
        <div className="superhero-details__info">
          <p><strong>Real Name:</strong> {hero.real_name}</p>
          <p><strong>Catch Phrase:</strong> {hero.catch_phrase}</p>
          <p><strong>Superpowers:</strong> {hero.superpowers && hero.superpowers.join(', ')}</p>
          <p><strong>Origin:</strong> {hero.origin_description}</p>
        </div>
      </div>
      <div className="superhero-details__buttons">
        <button className="superhero-details__edit" onClick={onEdit}>Edit</button>
      </div>
    </div>
  );
};

export default SuperheroDetails;
