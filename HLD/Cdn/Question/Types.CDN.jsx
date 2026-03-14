Types of Content Delivery Network (CDN)

There are mainly 3 types of CDN architectures.

1️⃣ Push CDN 📤

In Push CDN, the website owner uploads content to the CDN server manually.

How it works

Origin Server  --->  CDN Server  --->  User
   (push files)


Example
You upload images/videos to the CDN, and users download them from CDN.

✅ Advantage

Faster delivery

❌ Disadvantage

Need to manually upload content

Example providers:

Amazon Web Services (CloudFront)

KeyCDN

2️⃣ Pull CDN 📥

In Pull CDN, the CDN automatically fetches content from the origin server when a user requests it.

How it works

User → CDN → Origin Server → CDN Cache → User


Steps:

User requests file

CDN checks cache

If not found → CDN pulls from origin server

CDN stores it for future requests

Example provider:

Cloudflare

✅ Advantage

Automatic caching

Easy to manage

3️⃣ Peer-to-Peer CDN (P2P CDN) 🔗

In this CDN type, users share content with other users instead of only using servers.

Example
Streaming platforms sometimes use this method.

Example company:

BitTorrent

Quick Interview Table


| Type             | Meaning                               |
| ---------------- | ------------------------------------- |
| Push CDN         | Content manually pushed to CDN        |
| Pull CDN         | CDN automatically fetches from origin |
| Peer-to-Peer CDN | Users share content with each other   |


✅ Short Interview Answer

The main types of CDN are Push CDN, Pull CDN, and Peer-to-Peer 
CDN, based on how content is stored and delivered from the origin
 server to users.
