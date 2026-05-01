# Deployment Guide

This guide covers deploying the Auth System application to various platforms.

## Prerequisites

- Docker and Docker Compose (for containerized deployment)
- Node.js v14+ (for direct server deployment)
- MySQL server
- Git

## Option 1: Local Development Deployment

### Quick Start

```bash
# Clone repository
git clone <repository-url>
cd Core-api-auth-system

# Run setup script
chmod +x setup.sh
./setup.sh

# Update backend/.env with your credentials
# Then start services
cd backend
npm start  # Terminal 1

# In a new terminal
cd frontend
npm start  # Terminal 2
```

Access at: http://localhost:3000

## Option 2: Docker Compose Deployment

### Prerequisites

- Docker
- Docker Compose

### Setup

1. Create `docker-compose.yml` in root directory:

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8
    container_name: auth-mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: auth_system
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./backend/database.sql:/docker-entrypoint-initdb.d/schema.sql
    networks:
      - auth-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: auth-backend
    environment:
      PORT: 5000
      DB_HOST: mysql
      DB_USER: root
      DB_PASSWORD: root
      DB_NAME: auth_system
      JWT_SECRET: your_jwt_secret_key_here
      JWT_EXPIRE: 7d
    ports:
      - "5000:5000"
    depends_on:
      - mysql
    networks:
      - auth-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: auth-frontend
    environment:
      REACT_APP_API_URL: http://localhost:5000/api/v1
    ports:
      - "3000:3000"
    depends_on:
      - backend
    networks:
      - auth-network

volumes:
  mysql_data:

networks:
  auth-network:
    driver: bridge
```

2. Create backend `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

3. Create frontend `Dockerfile`:

```dockerfile
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
```

4. Deploy:

```bash
docker-compose up -d
```

Access at: http://localhost:3000
Backend API: http://localhost:5000

## Option 3: Heroku Deployment

### Backend

1. Create `Procfile` in backend directory:

```
web: npm start
```

2. Deploy:

```bash
cd backend
heroku login
heroku create auth-system-api
heroku addons:create cleardb:ignite
heroku config:set JWT_SECRET=your_secret_key
git push heroku main
```

### Frontend

1. Update API URL in `src/api.js`:

```javascript
const API_BASE_URL = 'https://your-heroku-app.herokuapp.com/api/v1';
```

2. Create `Procfile`:

```
web: npm run start
```

3. Deploy:

```bash
cd frontend
heroku create auth-system-frontend
git push heroku main
```

## Option 4: AWS Deployment

### Backend (EC2)

1. Launch EC2 instance (Ubuntu 20.04)

2. SSH into instance:

```bash
ssh -i key.pem ubuntu@your-instance-ip
```

3. Setup:

```bash
sudo apt update
sudo apt install -y nodejs npm mysql-server

git clone <repository-url>
cd Core-api-auth-system/backend

npm install
npm start
```

4. Setup systemd service:

```bash
sudo nano /etc/systemd/system/auth-api.service
```

```ini
[Unit]
Description=Auth System API
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/Core-api-auth-system/backend
ExecStart=/usr/bin/npm start
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

5. Enable service:

```bash
sudo systemctl enable auth-api
sudo systemctl start auth-api
```

### Frontend (S3 + CloudFront)

1. Build frontend:

```bash
cd frontend
npm run build
```

2. Upload to S3:

```bash
aws s3 sync build/ s3://your-bucket-name
```

3. Create CloudFront distribution pointing to S3

## Option 5: DigitalOcean Deployment

### Using App Platform

1. Connect GitHub repository
2. Create new App
3. Select backend directory
4. Set environment variables
5. Deploy

For production database:

```bash
doctl databases create auth-db --engine mysql --region nyc3
```

## Production Checklist

- [ ] Update `.env` with production values
- [ ] Set `JWT_SECRET` to strong random string
- [ ] Use strong database password
- [ ] Enable HTTPS
- [ ] Set CORS to allowed domains only
- [ ] Setup error logging
- [ ] Setup monitoring
- [ ] Setup backups
- [ ] Add rate limiting
- [ ] Add security headers
- [ ] Use environment variables for sensitive data
- [ ] Review API security
- [ ] Test thoroughly

## SSL/TLS Setup

### Using Let's Encrypt with nginx

```bash
sudo apt install nginx certbot python3-certbot-nginx

sudo certbot certonly --standalone -d your-domain.com

sudo nano /etc/nginx/sites-available/default
```

Add:

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
    }

    location /api/v1 {
        proxy_pass http://localhost:5000/api/v1;
    }
}
```

## Monitoring and Logging

### PM2 (Process Manager)

```bash
npm install -g pm2

pm2 start npm --name "auth-api" -- start
pm2 save
pm2 startup
```

### Error Logging

Add to backend `server.js`:

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

## Database Backups

### Manual Backup

```bash
mysqldump -u root -p auth_system > backup.sql
```

### Automated Backup (cron)

```bash
0 2 * * * mysqldump -u root -p password auth_system > /backups/auth_system_$(date +\%Y\%m\%d).sql
```

## Scaling Strategies

1. **Load Balancing**: Use Nginx or HAProxy
2. **Database Replication**: Setup master-slave MySQL replication
3. **Caching**: Add Redis for session and query caching
4. **CDN**: Use CloudFront or Cloudflare for static files
5. **Microservices**: Split monolith into separate services

## Troubleshooting

### Port already in use

```bash
lsof -i :5000
kill -9 <PID>
```

### Database connection refused

```bash
mysql -u root -p -e "SHOW DATABASES;"
```

### CORS errors

Update backend `server.js`:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
```

## Support

For deployment issues, check:
- Application logs
- Database connection
- Environment variables
- Firewall rules
- Port forwarding

---

**Need help?** Create an issue in the repository.
