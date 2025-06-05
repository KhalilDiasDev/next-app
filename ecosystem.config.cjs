module.exports = {
  apps: [
    {
      name: "qap-canvas-frontend",
      script: "node_modules/.bin/next",
      args: "start",
      exec_mode: "cluster",
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
    },
  ],
};
