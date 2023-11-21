# base node image
FROM node:lts-alpine as base

# Install all node_modules, including dev dependencies
FROM base as deps
RUN mkdir /app
WORKDIR /app
ADD package.json ./
RUN npm install

# Build the app
FROM base as build
ENV NODE_ENV=production
RUN mkdir /app
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base
ENV NODE_ENV=production
RUN mkdir /app
WORKDIR /app
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
ADD . .


# Start the server by default, this can be overwritten at runtime
EXPOSE 9202
CMD [ "npm", "run", "start" ]
