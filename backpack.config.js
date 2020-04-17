// backpack.config.js
module.exports = {
  webpack: (config, options) => {
    config.plugins.splice(1, 1) // remove the BannerPlugin
    return config
  }
}