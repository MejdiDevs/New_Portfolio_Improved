import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param {string} html - The HTML string to sanitize
 * @returns {string} - Sanitized HTML string
 */
export const sanitizeHTML = (html) => {
    if (!html) return '';
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['br', 'p', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li'],
        ALLOWED_ATTR: ['href', 'target', 'rel']
    });
};

/**
 * Formats text with line breaks, safely converting \n to <br />
 * @param {string} text - The text to format
 * @returns {string} - Sanitized HTML with line breaks
 */
export const formatTextWithLineBreaks = (text) => {
    if (!text) return '';
    const html = text.replaceAll('\n', '<br />');
    return sanitizeHTML(html);
};

