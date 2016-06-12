FROM anonmily/node:latest
MAINTAINER Michelle Liu <michelle@michelleliu.io>

COPY node_modules /src/node_modules

EXPOSE 3333

WORKDIR /src

ENV PATH /src/bin:$PATH
COPY bin /src/bin

COPY /dist Makefile /src/

CMD ["node","/src/index.js"]
