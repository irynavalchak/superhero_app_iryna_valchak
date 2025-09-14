import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import SuperheroList from "../components/SuperheroList/SuperheroList";
import SuperheroForm from "../components/SuperheroForm/SuperheroForm";
import { ISuperhero } from "../types";

const customStyles: Modal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'relative',
    inset: 'auto',
    border: 'none',
    background: '#e0e5ec',
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '800px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
};

const MainPage: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const [formModalIsOpen, setFormModalIsOpen] = useState(false);

  const openFormModal = () => setFormModalIsOpen(true);
  const closeFormModal = () => {
    setFormModalIsOpen(false);
  };

  const handleSave = () => {
    setRefresh(prev => !prev);
    closeFormModal();
  };

  return (
    <div className="app-container">
      <header className="main-header">
        <h1 className="main-title">Superhero Database</h1>
        <button className="add-button" onClick={openFormModal}>Add Superhero</button>
      </header>
      <Modal isOpen={formModalIsOpen} onRequestClose={closeFormModal} style={customStyles}>
        <SuperheroForm
          onSave={handleSave}
          onCancel={closeFormModal}
        />
      </Modal>
      <SuperheroList
        key={refresh ? 1 : 0}
      />
    </div>
  );
};

export default MainPage;
