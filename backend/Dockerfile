# Start from the official Node 20 image (lightweight alpine variant)
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json first — Docker caches this layer
# If package.json hasn't changed, it skips npm install on rebuilds (faster)
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of our source code
COPY . .

# Tell Docker this container listens on port 3000
EXPOSE 3000

# Command to run when the container starts
CMD ["node", "server.js"]