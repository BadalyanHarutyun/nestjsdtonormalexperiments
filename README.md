# Nest.js Performance Benchmark

## Overview

This project demonstrates the performance comparison between two different endpoints in a Nest.js application under high load conditions. The benchmark tests show how the server handles 10,000 requests with 100 concurrent connections for both a standard endpoint and a DTO-based endpoint. And in database was 1000 posts table data.(The README.md file is AI generated :) )

## Benchmark Results

### Test 1: Standard Endpoint (`/normal`)
```bash
ab -n 10000 -c 100 http://localhost:3000/normal
```

### Test 2: DTO Endpoint (`/dto`)
```bash
ab -n 10000 -c 100 http://localhost:3000/dto
```
### Test 3: DTO Endpoint with worker (`/dto-worker`)
```bash
ab -n 10000 -c 100 http://localhost:3000/dto-worker
```
## Performance Comparison

see in BENCHMARK_RESULTS.md
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