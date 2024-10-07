
# Use a Node.js base image
FROM node:20.12.2

# Set the working directory inside the container
WORKDIR /src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Start the application (you may change this based on how you want to serve your built application)
# For example, if you're using a static file server or serving through Vite, update accordingly
EXPOSE 3000
CMD npm run dev

