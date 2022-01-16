module.exports = {

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false, 
        crypto: false, 
        timers: false, 
        stream: false, 
        zlib: false,
        querystring: false, 
        cardinal: false, 
      }
    }
    return config
  },

  reactStrictMode: true,
}

