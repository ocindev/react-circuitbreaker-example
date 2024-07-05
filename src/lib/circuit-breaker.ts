export enum CircuitState {
  Closed = 'closed',
  Open = 'open',
  HalfOpen = 'half-open'
}

export type CircuitBreakerId = string;
export type FailureThreshold = number;
export type RetryTimePeriod = number;
export type LastFailureTime = number;
export type LastFailureCount = number;

export class CircuitBreakerError extends Error {
    constructor(message: string) {
        super(message);
    }
}


export class CircuitBreaker {
    private state: CircuitState = CircuitState.Closed;
    private failureCount: LastFailureCount = 0;
    private lastFailureTime: LastFailureTime = 0;

    constructor(
        private circuitBreakerId: CircuitBreakerId,
        private failureThreshold: FailureThreshold,
        private retryTimePeriod: RetryTimePeriod
    ) {}

    async call<T>(fn: () => Promise<T>) {
        if (this.state === CircuitState.Open) {
            const now = Date.now();
            if (now - this.lastFailureTime > this.retryTimePeriod) {
                this.state = CircuitState.HalfOpen;
            } else {
                throw new CircuitBreakerError(`Circuit ${this.circuitBreakerId} is open`);
            }
        }

        try {
            const response = await fn();
            this.state = CircuitState.Closed;
            this.failureCount = 0;
            return response;
        } catch (error) {
            this.failureCount++;
            if (this.failureCount >= this.failureThreshold) {
                this.state =  CircuitState.Open;
                this.lastFailureTime = Date.now();
            }
            throw error;
        }
    }
}