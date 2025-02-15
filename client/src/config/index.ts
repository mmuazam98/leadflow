interface Config {
  environment: string;
  api_endpoint: string;
}

const config: Config = {
  environment: import.meta.env.VITE_REACT_APP_ENV,
  api_endpoint:
    import.meta.env.VITE_REACT_APP_ENV === "production"
      ? "https://leadflow-ma8v.onrender.com"
      : "http://localhost:8000",
};

export default config;
