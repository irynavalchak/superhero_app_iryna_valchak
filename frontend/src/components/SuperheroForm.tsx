import React, { useState, useEffect } from "react";
import { createSuperhero, updateSuperhero } from "../api/superheroes";
import { ISuperhero } from "../types";
import "./SuperheroForm.scss";

interface Props {
  existingHero?: ISuperhero | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function SuperheroForm({ existingHero, onSave, onCancel }: Props) {
  const [nickname, setNickname] = useState("");
  const [real_name, setRealName] = useState("");
  const [origin_description, setOriginDescription] = useState("");
  const [superpowers, setSuperpowers] = useState("");
  const [catch_phrase, setCatchPhrase] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (existingHero) {
      setNickname(existingHero.nickname || "");
      setRealName(existingHero.real_name || "");
      setOriginDescription(existingHero.origin_description || "");
      setSuperpowers(existingHero.superpowers?.join(", ") || "");
      setCatchPhrase(existingHero.catch_phrase || "");
      setExistingImages(existingHero.images || []);
      setImages([]);
      setImagesToRemove([]);
    } else {
      resetForm();
    }
  }, [existingHero]);

  const resetForm = () => {
    setNickname("");
    setRealName("");
    setOriginDescription("");
    setSuperpowers("");
    setCatchPhrase("");
    setImages([]);
    setExistingImages([]);
    setImagesToRemove([]);
  };

  const handleRemoveImage = (image: string) => {
    setExistingImages(existingImages.filter(i => i !== image));
    setImagesToRemove([...imagesToRemove, image]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("real_name", real_name);
    formData.append("origin_description", origin_description);
    formData.append("catch_phrase", catch_phrase);
    formData.append("imagesToRemove", JSON.stringify(imagesToRemove));

    superpowers
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean)
      .forEach((power: string) => formData.append("superpowers", power));

    images.forEach(img => formData.append("images", img));

    try {
      if (existingHero) {
        await updateSuperhero(existingHero._id, formData);
      } else {
        await createSuperhero(formData);
      }

      resetForm();
      onSave();
    } catch (err) {
      console.error(err);
      // optionally show user-friendly error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="superhero-form">
      <h2 className="superhero-form__title">{existingHero ? 'Edit Superhero' : 'Create Superhero'}</h2>

      <div className="superhero-form__group">
        <label className="superhero-form__label">Nickname *</label>
        <input
          className="superhero-form__input"
          placeholder="Nickname"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          required
        />
      </div>

      <div className="superhero-form__group">
        <label className="superhero-form__label">Real Name *</label>
        <input
          className="superhero-form__input"
          placeholder="Real Name"
          value={real_name}
          onChange={e => setRealName(e.target.value)}
          required
        />
      </div>

      <div className="superhero-form__group">
        <label className="superhero-form__label">Origin Description *</label>
        <textarea
          className="superhero-form__textarea"
          placeholder="Origin Description"
          value={origin_description}
          onChange={e => setOriginDescription(e.target.value)}
          required
        />
      </div>

      <div className="superhero-form__group">
        <label className="superhero-form__label">Superpowers</label>
        <input
          className="superhero-form__input"
          placeholder="e.g. Flight, Invisibility"
          value={superpowers}
          onChange={e => setSuperpowers(e.target.value)}
        />
        <span className="superhero-form__help-text">Separate with commas</span>
      </div>

      <div className="superhero-form__group">
        <label className="superhero-form__label">Catch Phrase</label>
        <input
          className="superhero-form__input"
          placeholder="Catch Phrase"
          value={catch_phrase}
          onChange={e => setCatchPhrase(e.target.value)}
        />
      </div>

      <div className="superhero-form__group">
        <label className="superhero-form__label">Images</label>
        <div className="superhero-form__image-previews">
          {existingImages.map((image, idx) => (
            <div key={idx} className="superhero-form__image-preview">
              <img src={`http://localhost:8000/${image}`} alt="existing" className="superhero-form__existing-image"/>
              <button type="button" onClick={() => handleRemoveImage(image)} className="superhero-form__remove-image">X</button>
            </div>
          ))}
        </div>
        <div className="superhero-form__file-input">
          <label className="superhero-form__file-label">
            <input
              type="file"
              multiple
              className="superhero-form__file"
              onChange={e => setImages(Array.from(e.target.files || []))}
            />
            <span>Choose files</span>
          </label>
          <span className="superhero-form__file-text">{images.length ? `${images.length} file(s) selected` : 'No files selected'}</span>
        </div>
        <div className="superhero-form__image-previews">
          {images.map((file, idx) => (
            <div key={idx} className="superhero-form__image-preview">
              {file.name}
            </div>
          ))}
        </div>
      </div>

      <div className="superhero-form__buttons">
        {existingHero ? (
          <button
            type="button"
            onClick={() => {
              onCancel();
              resetForm();
            }}
            className="superhero-form__button superhero-form__button--cancel"
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            onClick={resetForm}
            className="superhero-form__button superhero-form__button--reset"
          >
            Reset
          </button>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="superhero-form__button superhero-form__button--submit"
        >
          {submitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}
