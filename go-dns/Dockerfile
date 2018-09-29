FROM golang:1.11.0

WORKDIR /go/src/app
COPY . .

ENV GO111MODULE=on
RUN go get -d -v ./...

CMD ["go", "run", "main.go"]