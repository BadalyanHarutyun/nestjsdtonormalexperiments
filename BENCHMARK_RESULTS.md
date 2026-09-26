# Benchmark: /normal vs /dto vs /dto-worker

Tool: `ab -n 10000 -c 100` (10,000 requests, 100 concurrent connections)
Data: 1,000 rows in `posts` table
Raw output: `benchmarkwithnormal.txt`, `benchmarkwithdto.txt`, `benchmarkwithdtoworker.txt`

## Summary

| Metric                  | /normal        | /dto            | /dto-worker     |
|--------------------------|----------------|------------------|------------------|
| Time taken for tests    | 102.382 s      | 155.263 s        | 140.067 s        |
| Requests per second     | 97.67 #/sec    | 64.41 #/sec      | 71.39 #/sec      |
| Time per request (mean) | 1023.815 ms    | 1552.629 ms      | 1400.667 ms      |
| Transfer rate           | 103,860.83 KB/s| 68,486.58 KB/s   | 75,916.86 KB/s   |
| Failed requests         | 0              | 0                | 0                |

## Analysis

- **`/normal`** (raw entity, no `class-validator`) is the fastest: no per-row DTO instantiation or `validate()` calls.
- **`/dto`** (main-thread DTO mapping + `validate()` per row, on 1,000 rows) is the slowest — roughly **+52%** request time vs `/normal`. All validation work blocks the event loop.
- **`/dto-worker`** (same DTO mapping/validation, offloaded to a Piscina worker thread) sits in between — about **+37%** vs `/normal`, but **~10% faster** than doing it on the main thread. Moving validation off the event loop helps, but cross-thread messaging/serialization overhead (Piscina) still costs more than doing nothing at all.

## Takeaways

1. Validating every row on every request is expensive — consider validating once at write-time (on insert/update) rather than on every read.
2. If DTO validation on read is required, offloading to a worker thread measurably helps throughput/latency over doing it inline, at the cost of IPC overhead.
3. For hot read paths where the DTO shape doesn't change, skip `class-validator` entirely and rely on TypeORM's typed entity (`/normal`), or validate only in development.
