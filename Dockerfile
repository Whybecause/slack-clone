# Étape 1: Build de l'application
FROM node:18 AS build

WORKDIR /app
COPY . .

RUN npm install

# Also makes convex automatically handle setting the ENV variable to the cloud
RUN npx convex deploy --cmd 'npm run build'

# Étape 2: Production
FROM node:18-slim

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app ./

RUN npm install --production

EXPOSE 3003
CMD ["npm", "start", "--", "-p", "3003"]
