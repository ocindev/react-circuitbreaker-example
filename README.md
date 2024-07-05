# React Circuitbreaker Example




## Install dependencies
`npm install`

## Start dev server
`npm run dev`

## Install mock server dependencies
`cd mock-server & npm install`

## Start mock server
`npm run mock`


## The circuitbreaker

The `App.tsx` runs the async api call in a `setInterval` that is triggered every 5 seconds. It will fetch the `/api` route of the mock-server that will respond with a `503 Service unavailable` error. After 3 failed requests the circuitbreaker for the `test-api.ts` will open and for 10 seconds every subsequent api call will be skipped. As long as the circuitbreaker is in `CircuitState.Open`, any new api call will produce a CircuitBreakerError. After the timeout of 10 seconds the first new request will be executed again. If it suceeds, the circuitbreaker switches to the `CircuitState.Closed` and the fetching will resume. Otherwise the circuitbreaker will stay in `CircuitState.Open` and wait again 10 seconds to try again.