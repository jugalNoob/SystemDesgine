| Layer / Concern                            | How to Prevent Breaches?              | Node.js Patterns / Tools                                    | Real-World Example / Notes                                                                             |
| ------------------------------------------ | ------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Authentication / Authorization**         | Unauthorized access                   | JWT, OAuth2, OpenID Connect, Passport.js, Keycloak          | Protect API endpoints; role-based access; token expiry & refresh.                                      |
| **Input Validation / Sanitization**        | Injection attacks (SQLi, NoSQLi, XSS) | Joi, Zod, express-validator, DOMPurify                      | Validate and sanitize user input → prevents malformed or malicious data from reaching DB or client.    |
| **Encryption / Data Protection**           | Data theft / leaks                    | TLS/HTTPS, bcrypt / argon2 (passwords), AES encryption, KMS | Encrypt data in transit (HTTPS) and at rest (DB, files). Password hashing for authentication.          |
| **Rate Limiting / Brute Force Protection** | Credential stuffing, DoS attacks      | Express-rate-limit, Nginx limits, Cloudflare WAF            | Prevent repeated login attempts or abusive requests.                                                   |
| **Logging / Auditing**                     | Undetected security events            | Winston / Pino + secure log storage, SIEM integration       | Record auth events, failed login attempts, sensitive operations for audit and forensic analysis.       |
| **Secrets Management**                     | Leaked API keys / DB credentials      | Vault, AWS Secrets Manager, environment variables           | Never hardcode secrets; rotate keys regularly.                                                         |
| **Content Security Policy / Headers**      | Client-side attacks                   | Helmet.js, CSP headers                                      | Prevent XSS, clickjacking, and other browser exploits.                                                 |
| **Dependency / Supply Chain Security**     | Vulnerable npm packages               | npm audit, Snyk, Dependabot                                 | Regularly scan and update dependencies; avoid unmaintained packages.                                   |
| **Session / Token Security**               | Hijacking / replay attacks            | Secure HTTP-only cookies, short-lived JWTs, refresh tokens  | Protect session cookies, use proper SameSite flags, rotate refresh tokens.                             |
| **Compliance / Governance**                | Legal / regulatory penalties          | GDPR / HIPAA awareness, logging, encryption policies        | Ensure personal data handling meets legal standards; encrypt sensitive data; maintain access controls. |



Key Security Notes for Node.js

Always validate + sanitize inputs at the edge.

Encrypt sensitive data in transit and at rest.

Use centralized authentication and short-lived tokens for APIs.

Regularly audit dependencies to avoid supply chain vulnerabilities.

Combine rate-limiting + monitoring to protect against automated attacks.