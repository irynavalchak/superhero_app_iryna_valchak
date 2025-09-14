import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { fetchSuperhero } from '../api/superheroes';
import { ISuperhero } from '../types';
import SuperheroDetails from '../components/SuperheroDetails/SuperheroDetails';
import SuperheroForm from '../components/SuperheroForm';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    background: '#fff',
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '800px',
    width: '90%'
  },
};

const HeroDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hero, setHero] = useState<ISuperhero | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchHero = () => {
    if (id) {
      fetchSuperhero(id).then(setHero);
    }
  }

  useEffect(() => {
    fetchHero();
  }, [id]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleSave = () => {
    closeModal();
    fetchHero();
  }

  if (!hero) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <SuperheroDetails
        hero={hero}
        onClose={() => navigate('/')}
        onEdit={openModal}
      />
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <SuperheroForm
          existingHero={hero}
          onSave={handleSave}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

export default HeroDetailsPage;
