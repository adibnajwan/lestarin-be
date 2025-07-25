module.exports = {
  apps: [
    {
      name: "lestarin-be",
      script: "src/app.js",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
}