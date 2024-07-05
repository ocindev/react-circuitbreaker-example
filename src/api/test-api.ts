import { CircuitBreaker } from "../lib/circuit-breaker";

const circuitBreaker = new CircuitBreaker('Test-API', 3, 10000);

export async function testApi() {
    const fetchApi = async () => {
        const response = await fetch('http://localhost:3000/api');
        console.log(response.status);
        return 'hello world';
    }
    const response = await circuitBreaker.call(fetchApi)

    return response;
}