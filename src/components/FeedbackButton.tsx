// src/components/FeedbackButton.tsx
import React, { useState } from 'react';
import { sendFeedback, FeedbackData } from '../utils/sendFeedback';
import styles from './Button.module.css';

interface FeedbackButtonProps {
  type: 'contextual' | 'general';
  pageContext?: string; // Ex: "Visite CDS - Saint-Malo"
  pageType?: 'visites' | 'etablissements' | 'ccam' | 'general';
  showAsFloating?: boolean; // Pour HomePage (icône flottante)
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  type,
  pageContext,
  pageType = 'general',
  showAsFloating = false,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenModal = () => {
    setShowModal(true);
    setComment('');
    setError(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setComment('');
    setError(null);
  };

  const handleSubmit = async () => {
    if (!comment.trim() && type === 'general') {
      setError('Veuillez saisir un commentaire');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const feedbackData: FeedbackData = {
        comment: comment.trim() || '(Aucun commentaire)',
        context: pageContext,
        pageType,
      };

      await sendFeedback(feedbackData);

      // Fermeture après succès
      handleCloseModal();

      // Message de confirmation
      alert('Merci pour votre feedback ! Votre client mail va s\'ouvrir.');
    } catch (err) {
      console.error('Erreur feedback:', err);
      setError('Erreur lors de l\'envoi du feedback. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Bouton flottant (HomePage)
  if (showAsFloating) {
    return (
      <>
        <button
          onClick={handleOpenModal}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            zIndex: 1000,
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          title="Envoyer un feedback"
        >
          💬
        </button>
        {showModal && renderModal()}
      </>
    );
  }

  // Bouton classique (pages de cotation)
  return (
    <>
      <button
        onClick={handleOpenModal}
        className={styles.button}
        style={{
          backgroundColor: '#ff9800',
          color: 'white',
          border: 'none',
          marginTop: '1rem',
        }}
      >
        💬 Signaler un problème
      </button>
      {showModal && renderModal()}
    </>
  );

  function renderModal() {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000,
          padding: '1rem',
        }}
        onClick={handleCloseModal}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>
            {type === 'contextual' ? '💬 Signaler un problème' : '💬 Feedback général'}
          </h2>

          {pageContext && (
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
              <strong>Contexte :</strong> {pageContext}
            </p>
          )}

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Décrivez le problème ou votre suggestion..."
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical',
            }}
            disabled={isLoading}
          />

          {error && (
            <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              {error}
            </p>
          )}

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1.5rem',
              justifyContent: 'flex-end',
            }}
          >
            <button
              onClick={handleCloseModal}
              className={styles.button}
              disabled={isLoading}
              style={{ backgroundColor: '#ccc', border: 'none' }}
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className={styles.button}
              disabled={isLoading}
              style={{
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
              }}
            >
              {isLoading ? 'Envoi...' : 'Envoyer'}
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default FeedbackButton;
