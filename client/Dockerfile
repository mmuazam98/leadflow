FROM node:22

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 5173

ENV VITE_REACT_APP_ENV=production

RUN yarn build

CMD ["yarn", "preview", "--host", "0.0.0.0"]
