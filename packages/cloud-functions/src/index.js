import renderTemplate from '@firebase-app/render-template';

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'renderTemplate') {
  exports.renderTemplate = renderTemplate;
}
