FROM 563629323304.dkr.ecr.eu-west-2.amazonaws.com/psycle-base-image-node:22 AS build

COPY package.json yarn.lock /srv/

RUN mkdir /srv/.psycle
COPY .psycle /srv/.psycle

RUN yarn config set network-timeout 600000 -g && cd /srv && yarn install

FROM 563629323304.dkr.ecr.eu-west-2.amazonaws.com/psycle-base-image-node:22 AS app

COPY --from=build /srv /srv
