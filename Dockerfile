FROM node:18-alpine

WORKDIR /react-docker-example/

COPY public/ /react-docker-example/public
COPY src/ /react-docker-example/src
COPY package.json /react-docker-example/

RUN npm install

CMD ["npm", "start"]

# docker image build -t <image_name>:<tag> <path>
# docker image build -t remmo1/currency-converter-react:latest .
