# Nest.js Performance Benchmark

## Overview

This project demonstrates the performance comparison between two different endpoints in a Nest.js application under high load conditions. The benchmark tests show how the server handles 10,000 requests with 100 concurrent connections for both a standard endpoint and a DTO-based endpoint. And in database was 1000 posts table data.(The README.md is AI generated :) )

## Benchmark Results

### Test 1: Standard Endpoint (`/normal`)
```bash
ab -n 10000 -c 100 http://localhost:3000/normal
```

### Test 2: DTO Endpoint (`/dto`)
```bash
ab -n 10000 -c 100 http://localhost:3000/dto
```

## Performance Comparison

| Metric | `/normal` Endpoint | `/dto` Endpoint | Difference |
|--------|-------------------|----------------|------------|
| Time taken for tests | 78.444 seconds | 125.272 seconds | +59.7% |
| Requests per second | 127.48 [#/sec] | 79.83 [#/sec] | -37.4% |
| Time per request | 784.440 ms | 1252.718 ms | +59.7% |
| Transfer rate | 69,510.69 KB/sec | 43,526.91 KB/sec | -37.4% |
| Failed requests | 0 | 0 | 0% |

## Detailed Results

### `/normal` Endpoint Performance

**Connection Times (ms)**
| Metric | Min | Mean | Std. Dev. | Median | Max |
|--------|-----|------|-----------|--------|-----|
| Connect | 0 | 0 | 0.2 | 0 | 3 |
| Processing | 22 | 780 | 45.2 | 785 | 871 |
| Waiting | 19 | 779 | 47.7 | 784 | 870 |
| Total | 22 | 780 | 45.1 | 785 | 871 |

**Percentile Distribution**
| Percentile | Response Time (ms) |
|------------|-------------------|
| 50% | 785 |
| 66% | 790 |
| 75% | 793 |
| 80% | 796 |
| 90% | 813 |
| 95% | 822 |
| 98% | 837 |
| 99% | 844 |
| 100% | 871 |

### `/dto` Endpoint Performance

**Connection Times (ms)**
| Metric | Min | Mean | Std. Dev. | Median | Max |
|--------|-----|------|-----------|--------|-----|
| Connect | 0 | 0 | 0.2 | 0 | 3 |
| Processing | 29 | 1246 | 69.1 | 1240 | 1374 |
| Waiting | 25 | 1245 | 71.7 | 1240 | 1374 |
| Total | 29 | 1246 | 69.0 | 1240 | 1374 |

**Percentile Distribution**
| Percentile | Response Time (ms) |
|------------|-------------------|
| 50% | 1240 |
| 66% | 1253 |
| 75% | 1263 |
| 80% | 1272 |
| 90% | 1297 |
| 95% | 1319 |
| 98% | 1340 |
| 99% | 1356 |
| 100% | 1374 |

## Analysis

The benchmark results reveal significant performance differences between the two endpoints:

1. **Performance Impact**: The DTO-based endpoint shows approximately 60% higher response times compared to the standard endpoint
2. **Throughput**: The standard endpoint handles 127 requests/second vs. 80 requests/second for the DTO endpoint
3. **Consistency**: Both endpoints maintain zero failed requests, demonstrating reliability under load
4. **Processing Overhead**: The DTO transformation adds noticeable processing time (∼466 ms average increase)

## Recommendations

1. Consider caching strategies for DTO transformations
2. Evaluate if DTO processing can be optimized or simplified
3. For high-traffic scenarios, use the standard endpoint where DTO features are not required
4. Implement monitoring to track performance impact of DTO usage in production

This performance profile helps understand the trade-offs between clean architecture with DTOs and raw performance in Nest.js applications.