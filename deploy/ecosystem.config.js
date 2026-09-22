// PM2 Process Configuration for MTS Offshore Next.js on Hostinger VPS KVM 2
module.exports = {
  apps: [
    {
      name: 'mtsoffshore',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      cwd: '/var/www/mtsoffshore',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
