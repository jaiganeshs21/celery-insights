/* istanbul ignore file */
import type {BaseHttpRequest} from "../core/BaseHttpRequest"

import type {CancelablePromise} from "../core/CancelablePromise"
/* tslint:disable */
/* eslint-disable */
import type {QueueInfo} from "../models/QueueInfo"
import type {Stats} from "../models/Stats"
import type {Worker} from "../models/Worker"

export class WorkersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Workers
     * @param alive
     * @returns Worker Successful Response
     * @throws ApiError
     */
    public getWorkers(alive?: boolean): CancelablePromise<Array<Worker>> {
        return this.httpRequest.request({
            method: "GET",
            url: "/api/workers",
            query: {
                alive: alive,
            },
            errors: {
                422: `Validation Error`,
            },
        })
    }

    /**
     * Get Worker Stats
     * Worker Statistics
     * @param timeout
     * @param worker
     * @returns Stats Successful Response
     * @throws ApiError
     */
    public getWorkerStats(timeout: number = 10, worker?: string): CancelablePromise<Record<string, Stats>> {
        return this.httpRequest.request({
            method: "GET",
            url: "/api/workers/workers/stats",
            query: {
                timeout: timeout,
                worker: worker,
            },
            errors: {
                422: `Validation Error`,
            },
        })
    }

    /**
     * Get Worker Registered
     * Worker Registered Task Types
     * @param timeout
     * @param worker
     * @returns string Successful Response
     * @throws ApiError
     */
    public getWorkerRegistered(
        timeout: number = 10,
        worker?: string
    ): CancelablePromise<Record<string, Array<string>>> {
        return this.httpRequest.request({
            method: "GET",
            url: "/api/workers/workers/registered",
            query: {
                timeout: timeout,
                worker: worker,
            },
            errors: {
                422: `Validation Error`,
            },
        })
    }

    /**
     * Get Worker Revoked
     * Worker Revoked Tasks list
     * @param timeout
     * @param worker
     * @returns string Successful Response
     * @throws ApiError
     */
    public getWorkerRevoked(timeout: number = 10, worker?: string): CancelablePromise<Record<string, Array<string>>> {
        return this.httpRequest.request({
            method: "GET",
            url: "/api/workers/workers/revoked",
            query: {
                timeout: timeout,
                worker: worker,
            },
            errors: {
                422: `Validation Error`,
            },
        })
    }

    /**
     * Get Worker Scheduled
     * Worker Scheduled Tasks (eta / countdown)
     * @param timeout
     * @param worker
     * @returns string Successful Response
     * @throws ApiError
     */
    public getWorkerScheduled(timeout: number = 10, worker?: string): CancelablePromise<Record<string, Array<string>>> {
        return this.httpRequest.request({
            method: "GET",
            url: "/api/workers/workers/scheduled",
            query: {
                timeout: timeout,
                worker: worker,
            },
            errors: {
                422: `Validation Error`,
            },
        })
    }

    /**
     * Get Worker Reserved
     * Worker Prefetched Tasks
     * @param timeout
     * @param worker
     * @returns string Successful Response
     * @throws ApiError
     */
    public getWorkerReserved(timeout: number = 10, worker?: string): CancelablePromise<Record<string, Array<string>>> {
        return this.httpRequest.request({
            method: "GET",
            url: "/api/workers/workers/reserved",
            query: {
                timeout: timeout,
                worker: worker,
            },
            errors: {
                422: `Validation Error`,
            },
        })
    }

    /**
     * Get Worker Active
     * Worker currently executing tasks
     * @param timeout
     * @param worker
     * @returns string Successful Response
     * @throws ApiError
     */
    public getWorkerActive(timeout: number = 10, worker?: string): CancelablePromise<Record<string, Array<string>>> {
        return this.httpRequest.request({
            method: "GET",
            url: "/api/workers/workers/active",
            query: {
                timeout: timeout,
                worker: worker,
            },
            errors: {
                422: `Validation Error`,
            },
        })
    }

    /**
     * Get Worker Queues
     * Worker active consumer queues
     * @param timeout
     * @param worker
     * @returns QueueInfo Successful Response
     * @throws ApiError
     */
    public getWorkerQueues(timeout: number = 10, worker?: string): CancelablePromise<Record<string, Array<QueueInfo>>> {
        return this.httpRequest.request({
            method: "GET",
            url: "/api/workers/workers/queues",
            query: {
                timeout: timeout,
                worker: worker,
            },
            errors: {
                422: `Validation Error`,
            },
        })
    }
}