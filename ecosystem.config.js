module.exports = {
  apps: [{
    name: "image-worker",
    script: "./convert-to-image.js",
    watch: ["./convert-to-image.js"],
    env: {
      "NODE_ENV": "development",
    },
    env_production: {
      "NODE_ENV": "production"
    }
  }, {
    name: "tesseract-worker",
    script: "./tesseract.js",
    watch: ["./tesseract.js"],
    env: {
      "NODE_ENV": "development",
    },
    env_production: {
      "NODE_ENV": "production"
    }
  }]
}
