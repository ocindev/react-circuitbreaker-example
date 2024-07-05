import { CircuitBreaker } from "../lib/circuit-breaker";

const circuitBreaker = new CircuitBreaker('Test-API', 3, 10000);

export async function testApi() {
    const fetchApi = async () => {
        return await fetch('http://localhost:3000/api');
    }
    const response = await circuitBreaker.call(fetchApi)

    return response;
}