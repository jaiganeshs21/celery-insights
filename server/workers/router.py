import asyncio

from celery.app.control import Inspect
from fastapi import APIRouter, Depends
from fastapi_cache.decorator import cache

from events.consumer import state
from workers.dependencies import get_inspect
from workers.models import QueueInfo, Stats, Worker

workers_router = APIRouter(prefix="/api/workers", tags=["workers"])


@workers_router.get("")
def get_workers(alive: bool | None = None) -> list[Worker]:
    return [
        Worker.from_celery_worker(worker)
        for worker in state.workers.itervalues()
        if alive is None or worker.alive == alive

    ]


@workers_router.get("/workers/stats", description="Worker Statistics")
@cache(expire=30)
async def get_worker_stats(inspect: Inspect = Depends(get_inspect)) -> dict[str, Stats]:
    return await asyncio.to_thread(inspect.stats)


@workers_router.get("/workers/registered", description="Worker Registered Task Types")
@cache(expire=30)
async def get_worker_registered(inspect: Inspect = Depends(get_inspect)) -> dict[str, list[str]]:
    return await asyncio.to_thread(inspect.registered)


@workers_router.get("/workers/revoked", description="Worker Revoked Tasks list")
@cache(expire=30)
async def get_worker_revoked(inspect: Inspect = Depends(get_inspect)) -> dict[str, list[str]]:
    return await asyncio.to_thread(inspect.revoked)


@workers_router.get("/workers/scheduled", description="Worker Scheduled Tasks (eta / countdown)")
@cache(expire=30)
async def get_worker_scheduled(inspect: Inspect = Depends(get_inspect)) -> dict[str, list[str]]:
    return await asyncio.to_thread(inspect.scheduled)


@workers_router.get("/workers/reserved", description="Worker Prefetched Tasks")
@cache(expire=30)
async def get_worker_reserved(inspect: Inspect = Depends(get_inspect)) -> dict[str, list[str]]:
    return await asyncio.to_thread(inspect.reserved)


@workers_router.get("/workers/active", description="Worker currently executing tasks")
@cache(expire=30)
async def get_worker_active(inspect: Inspect = Depends(get_inspect)) -> dict[str, list[str]]:
    return await asyncio.to_thread(inspect.active)


@workers_router.get("/workers/queues", description="Worker active consumer queues")
@cache(expire=30)
async def get_worker_queues(inspect: Inspect = Depends(get_inspect)) -> dict[str, list[QueueInfo]]:
    return await asyncio.to_thread(inspect.active_queues)
