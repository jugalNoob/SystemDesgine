| Pagination Type                                   | How It Works                                               | When to Use                                      | Pros                                  | Cons                                                          |
| ------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------ | ------------------------------------- | ------------------------------------------------------------- |
| **Skip & Limit**                                  | Skip N documents, then limit to page size                  | Small-medium collections, few pages              | Simple, easy to implement             | Slow for large skips, performance degrades with huge datasets |
| **Range-Based (ID or Date)**                      | Use a field (like `_id` or `createdAt`) to fetch next page | Large collections, infinite scroll, high traffic | Very fast, scalable, avoids skip      | Requires indexed field, can be tricky for random access       |
| **Aggregation + $facet**                          | Aggregate data + skip & limit + total count in one query   | Dashboards, reporting, need total pages          | Gives total count + data in one query | Slightly complex, heavier query                               |
| **Cursor-Based / Keyset Pagination**              | Fetch next page using last item’s key as starting point    | Infinite scroll, APIs with high concurrency      | Fast, reliable, avoids skip           | Can’t jump to arbitrary page, needs unique ordering key       |
| **Server-Side Pagination with Materialized View** | Precomputed pages stored in another collection             | Very high traffic, analytics dashboards          | Instant response, minimal DB load     | Extra storage, needs refresh mechanism                        |
| **Client-Side Pagination**                        | Fetch all data once, paginate in frontend                  | Very small datasets                              | Simple, no extra DB query             | Not suitable for large datasets, memory-heavy                 |



🔹 Simple Rules (remember for interviews)

Skip & Limit → small datasets, simple APIs

Range / Cursor / Keyset → large datasets, high performance

Aggregation + $facet → need total count with data

Materialized View → dashboards / precomputed pages

Client-Side → tiny datasets only