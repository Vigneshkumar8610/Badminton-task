FROM public.ecr.aws/docker/library/node:20.12.2
WORKDIR /app
COPY . /app
RUN apt update -y
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
