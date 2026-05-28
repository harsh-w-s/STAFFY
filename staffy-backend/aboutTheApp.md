### for each request-

Request starts → 
JWT filter runs →
CustomUserDetails created →
stored in SecurityContext →
controller/service uses it →
request finishes →
SecurityContext cleared

---

### Important detail

SecurityContextHolder internally uses: ThreadLocal

**Meaning**: auth data is attached to current request thread only

When request ends: thread cleaned
security context cleared

---

### So why is JWT stateless?

Because server does NOT persist login state.

It does NOT store: sessions
logged-in users
tokens in memory

**Every request is independently authenticated using: JWT token sent by client**

---

### Key distinction
**Stateful session auth**

Server stores: sessionId → user mapping in memory/database.

**JWT auth**

Server stores NOTHING.

Client sends proof every time: Bearer \<jwt>

Server verifies token again every request.

---

### Then what is SecurityContext?

It is: temporary per-request authentication state

* NOT persistent session storage.

---

### Very important distinction.

**Why this architecture is scalable**

Because any server can handle request independently.

Example:

Load balancer →
Server A handles request 1
Server B handles request 2

No shared session memory needed.

That’s why JWT became huge for distributed systems/microservices.

---