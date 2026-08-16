#DockerFile tells Docker how to build the image
#DockerImage is like a packaged environment
#DockerContainer is an instance of a DockerImage

#node version 20
#alpine linux is a very small linux distribution
FROM node:20-alpine

#work inside /app
WORKDIR /app

#copy the package json files into the container
COPY package*.json ./

#runs during image building
RUN npm install

#copy everything from directory into the current directory inside the container
COPY . .

#my application expects to listen on port 8000
EXPOSE 8000

#when a container is started from this image , run node server.js
CMD ["node" , "server.js"]