import jwt from "jsonwebtoken";

const secretKey = "jhdscukhfvehihuifvdhifvdhiuyifvdiuhvfdygugvfdyufvdg";

export const proxyJwtAuth = (req, res, next) => {
  const token = req.cookies?.accessToken;

  console.log("Proxy Access Token:", token);

  // 1️⃣ No token → block
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized (proxy): access token missing",
    });
  }

  try {
    // 2️⃣ Verify signature ONLY
    jwt.verify(token, secretKey);
    return next(); // ✅ forward to main server

  } catch (err) {

    // 3️⃣ Access token expired → forward anyway
    if (err.name === "TokenExpiredError") {
      console.log("Proxy: token expired → let main server refresh");
      return next(); // 🔁 main server will use refresh token
    }

    // 4️⃣ Invalid / tampered token → block
    return res.status(401).json({
      message: "Unauthorized (proxy): invalid token",
    });
  }
};



// 🔁 Flow Explanation (VERY IMPORTANT)
// Client
//   ↓ (cookies: accessToken + refreshToken)
// Proxy Server
//   ├─ accessToken valid → FORWARD
//   ├─ accessToken expired → FORWARD
//   └─ accessToken invalid → BLOCK ❌
// Main Server
//   ├─ accessToken valid → OK
//   ├─ accessToken expired → use refreshToken → issue new accessToken
//   └─ refreshToken invalid → logout
