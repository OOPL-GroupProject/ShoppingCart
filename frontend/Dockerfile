# /frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies first (this caches them for faster future builds)
COPY package*.json ./
RUN npm install

# Copy the rest of your frontend code
COPY . .

# Expose the Next.js port
EXPOSE 3000

# Start the Next.js development server
CMD ["npm", "run", "dev"]