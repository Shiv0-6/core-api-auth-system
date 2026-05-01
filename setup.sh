#!/bin/bash

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}Auth System Setup Script${NC}"
echo -e "${BLUE}================================${NC}\n"

# Check if MySQL is running
echo -e "${BLUE}Checking MySQL connection...${NC}"
mysql -u root -e "SELECT 1" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: MySQL is not running. Please start MySQL and try again.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ MySQL is running${NC}\n"

# Setup Backend
echo -e "${BLUE}Setting up Backend...${NC}"
cd backend

# Install dependencies
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓ Backend dependencies already installed${NC}"
else
    echo -e "${BLUE}Installing backend dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
fi

# Create database
echo -e "${BLUE}Creating database...${NC}"
mysql -u root < database.sql
echo -e "${GREEN}✓ Database created${NC}"

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo -e "${BLUE}Creating .env file...${NC}"
    cp .env.example .env 2>/dev/null || cat > .env << 'EOF'
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=auth_system
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
EOF
    echo -e "${GREEN}✓ .env file created (please update with your credentials)${NC}"
fi

cd ../

# Setup Frontend
echo -e "\n${BLUE}Setting up Frontend...${NC}"
cd frontend

# Install dependencies
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓ Frontend dependencies already installed${NC}"
else
    echo -e "${BLUE}Installing frontend dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
fi

cd ../

echo -e "\n${GREEN}================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${GREEN}================================${NC}\n"

echo -e "${BLUE}Next steps:${NC}"
echo -e "1. Update backend/.env with your MySQL credentials"
echo -e "2. Start backend: cd backend && npm start"
echo -e "3. Start frontend: cd frontend && npm start"
echo -e "4. Access frontend: http://localhost:3000"
echo -e "5. View API docs: http://localhost:5000/api/v1/docs\n"
