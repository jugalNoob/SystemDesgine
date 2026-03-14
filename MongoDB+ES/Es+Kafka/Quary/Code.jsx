Here are 10 important queries in Elasticsearch that backend developers should know.
Since you already know MongoDB queries, these will feel familiar.

1️⃣ match_all (Get All Documents)
GET products/_search
{
  "query": {
    "match_all": {}
  }
}

Meaning: return all documents.

2️⃣ match (Full Text Search)
GET products/_search
{
  "query": {
    "match": {
      "name": "iphone"
    }
  }
}

Meaning: search documents where name contains iphone.

3️⃣ term (Exact Match)
GET products/_search
{
  "query": {
    "term": {
      "category": "mobile"
    }
  }
}

Meaning: category must be exactly mobile.

4️⃣ range (Number / Date Filter)
GET products/_search
{
  "query": {
    "range": {
      "price": {
        "gte": 500,
        "lte": 1000
      }
    }
  }
}

Meaning:
price >= 500
price <= 1000


5️⃣ bool query (Multiple Conditions)
Like AND / OR conditions.
GET products/_search
{
 "query": {
   "bool": {
     "must": [
       {"match": {"name": "iphone"}},
       {"term": {"category": "mobile"}}
     ]
   }
 }
}

Meaning:
name contains iphone
AND category = mobile


6️⃣ prefix search
Search words starting with a prefix.
GET products/_search
{
 "query": {
   "prefix": {
     "name": "iph"
   }
 }
}

Matches:
iphone
iphone 15
iphone pro


7️⃣ wildcard search
Like SQL LIKE.
GET products/_search
{
 "query": {
   "wildcard": {
     "name": "*phone*"
   }
 }
}

Matches:
iphone
smartphone
headphone


8️⃣ fuzzy search (typo tolerance)
Very useful for search systems.
GET products/_search
{
 "query": {
   "fuzzy": {
     "name": "iphne"
   }
 }
}

User typed:
iphne

Elasticsearch finds:
iphone


9️⃣ sort results
Sort search results.
GET products/_search
{
 "query": {
   "match": { "name": "iphone" }
 },
 "sort": [
   { "price": "asc" }
 ]
}

Meaning:
Sort by price ascending


🔟 aggregation (group by)
Like MongoDB $group.
GET products/_search
{
 "size": 0,
 "aggs": {
   "category_count": {
     "terms": {
       "field": "category"
     }
   }
 }
}

Meaning:
count products per category

Example result:
mobile: 50
laptop: 20
tablet: 10

