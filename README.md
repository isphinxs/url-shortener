# URL Shortener Microservice (FCC)

This project is a URL shortener microservice API for the Free Code Camp Curriculum.  It returns a shortened URL that will redirect the user to the original link.  The service returns an error if the input doesn't follow the http(s)://(www.)example.com format.

## Getting Started

Launch with node using <code>node server.js</code>.

## Sample Input

    https://evening-taiga-49138.herokuapp.com/new/https://www.google.com
    https://evening-taiga-49138.herokuapp.com/1

## Sample Output

    { "original_url": "https://www.google.com", "short_url":"https://evening-taiga-49138.herokuapp.com/1" }

## Live Example

    https://evening-taiga-49138.herokuapp.com/
    