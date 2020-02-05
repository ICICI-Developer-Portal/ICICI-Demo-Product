FROM node:10.16.3
RUN mkdir -p /app
WORKDIR .
#COPY node_modules/ app/
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build
RUN ls
#COPY frontend/build /app
RUN yarn global add serve
#WORKDIR /build
EXPOSE 3001
CMD ["serve","-s","build","-p","3001"]
