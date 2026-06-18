/**
 * App-wide configuration.
 *
 * IMPORTANT: replace `newsApiKey` with your own free key from
 * https://newsapi.org/register before running the app. The NewsAPI free
 * tier only accepts requests sent from `localhost`, which is exactly the
 * case while developing with `ng serve` - perfect for this assignment.
 */
export const environment = {
  production: false,
  newsApiKey: 'COLOQUE_SUA_CHAVE_DA_NEWSAPI_AQUI', // API Key
  newsApiBaseUrl: 'https://newsapi.org/v2',
};
