const config = {
    apiUrl: 'http://localhost:5000' || window.location.origin,
    projectName: 'Project name'
  };
  
  if (process.env.NODE_ENV === "production") {
    config.apiUrl = "";
  }
  
  export default config;
  