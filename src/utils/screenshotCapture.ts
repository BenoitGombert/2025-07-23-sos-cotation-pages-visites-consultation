// src/utils/screenshotCapture.ts
import html2canvas from 'html2canvas';

/**
 * Capture un screenshot de la page actuelle
 * @returns Promise<string> - Image encodée en base64 (data URL)
 */
export const captureScreenshot = async (): Promise<string> => {
  try {
    // Options de configuration pour html2canvas
    const canvas = await html2canvas(document.body, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      scale: 2, // Meilleure qualité sur écrans haute résolution
      logging: false,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
    });

    // Convertir le canvas en data URL (base64 PNG)
    const imageData = canvas.toDataURL('image/png', 0.8);

    return imageData;
  } catch (error) {
    console.error('Erreur lors de la capture du screenshot:', error);
    throw new Error('Impossible de capturer le screenshot');
  }
};

/**
 * Convertit un data URL en Blob (utile pour attachement)
 * @param dataUrl - Data URL de l'image
 * @returns Blob de l'image
 */
export const dataUrlToBlob = (dataUrl: string): Blob => {
  const arr = dataUrl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};
