# Use the official Node.js 20 image as a parent image
FROM node:20-slim

# Install dependencies for Playwright and xvfb
# This includes dependencies for the browsers that Playwright controls,
# as well as xvfb for running those browsers in a virtual framebuffer
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    libgbm1 \
    libxshmfence1 \
    xvfb \
    # Additional dependencies for Playwright
    libxss1 \
    libxext6 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# If using Playwright's npm package to install browsers
# Uncomment the line below to install the default set of browsers
RUN npx playwright install

RUN npx playwright install-deps

# Cd into /app
WORKDIR /app

# Copy package.json into app folder
COPY package.json /app

# Install dependencies
RUN npm install
COPY . /app
RUN chmod a+x wrap.sh
RUN mkdir -p /var/boozang
RUN chmod a+rw /var/boozang

VOLUME /var/boozang

# Make Chrome downloads dir
RUN mkdir -p /root/Downloads/

# Include versioning file
ADD VERSION .

# Start server on port 3000∂
EXPOSE 3000:3001
ENV PORT=3001

# Creating Display
ENV DISPLAY :99

# Start script on Xvfb
ENTRYPOINT ["./wrap.sh"]
