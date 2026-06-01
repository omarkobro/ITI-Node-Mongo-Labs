FROM node:22-alpine

WORKDIR /app
COPY . .
RUN npm install

ENV MONGO_URI=mongodb://localhost:27017
ENV DB_NAME=iti-ism
ENV PORT=3000
ENV JWT_SECRET_KEY=JWT_SECRET_KEY


EXPOSE 3000

CMD ["npm","start"]