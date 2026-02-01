// proxy.js


import express from "express";
import cookieParser from "cookie-parser";
import { createProxyMiddleware } from "http-proxy-middleware";
import { rateLimiter} from './proxy_middleware/rateLimit.js'
import { proxyJwtAuth } from './proxy_middleware/proxyJwtAuth.js'
const app = express();
const PORT = 9000;


// 🔥 REQUIRED
app.use(cookieParser());

// 🔐 Rate limit FIRST
app.use(rateLimiter);

// 🔐 Protect only private routes
app.use("/dash", proxyJwtAuth);


// Allow localhost for dev
app.use((req, res, next) => {
  console.log("🛡 Incoming request:",
     req.method, req.url, "from", req.ip);
  next();
});

app.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:8000",
    changeOrigin: true,
    xfwd: true,
    headers: {
      "x-from-proxy": "true" // 🔥 FORCE HEADER
    }
  })
);

app.listen(PORT, () => {
  console.log(`🛡 Proxy running on port ${PORT}`);
});
