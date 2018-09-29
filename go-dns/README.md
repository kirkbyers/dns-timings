# golang dns timer

Built for golang:1.11.0 with go mod.

Use `GODEBUG=netdns=go` to force pure Go resolver.
Use `GODEBUG=netdns=cgo` to force cgo resolver.

`TEST_HOST=google.com go run main.go`