package main

import (
	"fmt"
	"net"
	"os"
	"strconv"
	"time"
)

func main() {
	targetHost := os.Getenv("TEST_HOST")
	if targetHost == "" {
		fmt.Println("TEST_HOST is required to be set")
		os.Exit(40)
	}
	countDefault := 10
	count, err := strconv.Atoi(os.Getenv("TEST_LENGTH"))
	if err != nil {
		fmt.Println("A non-int was provided for TEST_LENGTH. Using default", countDefault)
		count = countDefault
	}
	if count <= 0 {
		for {
			dnslookup(targetHost)
			time.Sleep(time.Second)
		}
	} else {
		for count > 0 {
			dnslookup(targetHost)
			time.Sleep(time.Second)
			count--
		}
	}
}

func dnslookup(host string) {
	start := time.Now()
	addresses, err := net.LookupHost(host)
	finish := time.Now()
	timeDiff := finish.Sub(start).Nanoseconds() / 1000000
	if err != nil {
		fmt.Println("There was an issue resolving address of", host, ":", err)
	} else {
		fmt.Printf("%s resolved to %+v in %d ms\n", host, addresses, timeDiff)
	}
}
