FROM alpine:latest
#Padrão mas pode ser modificado quando configurado via docker...
ENV arguments="-Xms1024M -Xmx1024M" 
#Coloca os repositorios(Edge e v3.20,v3.21)
#Apenas uma seta para trocar que estava antes
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.21/main" > /etc/apk/repositories 
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.21/community" >> /etc/apk/repositories
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.20/community" >> /etc/apk/repositories
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.20/main" >> /etc/apk/repositories
RUN echo "https://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
#Atualizar o alpine...
RUN apk update
RUN apk upgrade

RUN apk add openjdk21-jre wget curl fish
COPY start.sh /bin/start
RUN addgroup paper
RUN adduser -HD -G paper -u 1002 paper
RUN chmod +x /bin/start
CMD ["/usr/bin/fish", "-c", "./bin/start"]