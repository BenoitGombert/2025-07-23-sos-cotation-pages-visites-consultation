import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/FeedbackButton.tsx
import { useState } from 'react';
import { sendFeedback } from '../utils/sendFeedback';
import styles from './Button.module.css';
const FeedbackButton = ({ type, pageContext, pageType = 'general', showAsFloating = false, }) => {
    const [showModal, setShowModal] = useState(false);
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
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
            const feedbackData = {
                comment: comment.trim() || '(Aucun commentaire)',
                context: pageContext,
                pageType,
            };
            await sendFeedback(feedbackData);
            // Fermeture après succès
            handleCloseModal();
            // Message de confirmation
            alert('Merci pour votre feedback ! Votre client mail va s\'ouvrir.');
        }
        catch (err) {
            console.error('Erreur feedback:', err);
            setError('Erreur lors de l\'envoi du feedback. Veuillez réessayer.');
        }
        finally {
            setIsLoading(false);
        }
    };
    // Bouton flottant (HomePage)
    if (showAsFloating) {
        return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: handleOpenModal, style: {
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
                    }, onMouseEnter: (e) => (e.currentTarget.style.transform = 'scale(1.1)'), onMouseLeave: (e) => (e.currentTarget.style.transform = 'scale(1)'), title: "Envoyer un feedback", children: "\uD83D\uDCAC" }), showModal && renderModal()] }));
    }
    // Bouton classique (pages de cotation)
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: handleOpenModal, className: styles.button, style: {
                    backgroundColor: '#ff9800',
                    color: 'white',
                    border: 'none',
                    marginTop: '1rem',
                }, children: "\uD83D\uDCAC Signaler un probl\u00E8me" }), showModal && renderModal()] }));
    function renderModal() {
        return (_jsx("div", { style: {
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
            }, onClick: handleCloseModal, children: _jsxs("div", { style: {
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '2rem',
                    maxWidth: '500px',
                    width: '100%',
                    maxHeight: '80vh',
                    overflow: 'auto',
                }, onClick: (e) => e.stopPropagation(), children: [_jsx("h2", { style: { marginTop: 0, marginBottom: '1rem' }, children: type === 'contextual' ? '💬 Signaler un problème' : '💬 Feedback général' }), pageContext && (_jsxs("p", { style: { fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }, children: [_jsx("strong", { children: "Contexte :" }), " ", pageContext] })), _jsx("textarea", { value: comment, onChange: (e) => setComment(e.target.value), placeholder: "D\u00E9crivez le probl\u00E8me ou votre suggestion...", style: {
                            width: '100%',
                            minHeight: '120px',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                            fontFamily: 'inherit',
                            resize: 'vertical',
                        }, disabled: isLoading }), error && (_jsx("p", { style: { color: 'red', fontSize: '0.9rem', marginTop: '0.5rem' }, children: error })), _jsxs("div", { style: {
                            display: 'flex',
                            gap: '1rem',
                            marginTop: '1.5rem',
                            justifyContent: 'flex-end',
                        }, children: [_jsx("button", { onClick: handleCloseModal, className: styles.button, disabled: isLoading, style: { backgroundColor: '#ccc', border: 'none' }, children: "Annuler" }), _jsx("button", { onClick: handleSubmit, className: styles.button, disabled: isLoading, style: {
                                    backgroundColor: '#667eea',
                                    color: 'white',
                                    border: 'none',
                                }, children: isLoading ? 'Envoi...' : 'Envoyer' })] })] }) }));
    }
};
export default FeedbackButton;
