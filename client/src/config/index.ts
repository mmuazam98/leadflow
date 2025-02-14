interface Config {
  environment: string;
  api_endpoint: string;
}

const config: Config = {
  environment: import.meta.env.VITE_REACT_APP_ENV,
  api_endpoint: import.meta.env.VITE_API_ENDPOINT,
};

export default config;
