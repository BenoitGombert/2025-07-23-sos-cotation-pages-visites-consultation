// src/utils/sendFeedback.ts
import { FEEDBACK_EMAIL, FEEDBACK_SUBJECT_CONTEXTUAL, FEEDBACK_SUBJECT_GENERAL } from '../config/feedback';
/**
 * Envoie un feedback via le client mail natif (mailto:)
 * Version simplifiée sans screenshot pour compatibilité mobile
 *
 * @param data - Données du feedback
 * @returns Promise<boolean> - true si l'envoi a été initié
 */
export const sendFeedback = async (data) => {
    try {
        const { comment, context, pageType } = data;
        // Choix du sujet selon le type
        const subject = pageType === 'general'
            ? FEEDBACK_SUBJECT_GENERAL
            : FEEDBACK_SUBJECT_CONTEXTUAL;
        // Construction du corps de l'email
        let body = '';
        if (context) {
            body += `📍 Contexte: ${context}\n\n`;
        }
        body += `💬 Commentaire:\n${comment}\n\n`;
        body += `---\n`;
        body += `Envoyé depuis l'application SOS Cotation (Beta)\n`;
        body += `Date: ${new Date().toLocaleString('fr-FR')}\n`;
        // Encodage URL-safe
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
        // Construction de l'URL mailto
        const mailtoUrl = `mailto:${FEEDBACK_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
        // Ouverture du client mail natif
        window.location.href = mailtoUrl;
        return true;
    }
    catch (error) {
        console.error('Erreur lors de l\'envoi du feedback:', error);
        throw new Error('Impossible d\'envoyer le feedback');
    }
};
