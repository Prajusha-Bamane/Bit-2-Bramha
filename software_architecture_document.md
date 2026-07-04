# Human Resource Management System (HRMS)
## Software Architecture Document (SAD) / Architecture Decision Document (ADD)
**Document Version:** 1.0.0  
**Phase:** Phase 1 (Architectural Blueprint)  
**Author:** Principal Software Architect & Technical Lead  
**Target Audience:** Engineering Team (Developers A, B, C, D)  

---

## Table of Contents
1. [System Overview](#section-1-system-overview)
2. [System Architecture](#section-2-system-architecture)
3. [Project Directory Structure](#section-3-project-directory-structure)
4. [Module Architecture](#section-4-module-architecture)
5. [Routing Strategy](#section-5-routing-strategy)
6. [Authentication Architecture](#section-6-authentication-architecture)
7. [Database Strategy](#section-7-database-strategy)
8. [API Design Standard](#section-8-api-design-standard)
9. [Frontend Design Principles](#section-9-frontend-design-principles)
10. [Backend Design Principles](#section-10-backend-design-principles)
11. [Design System](#section-11-design-system)
12. [Coding Standards](#section-12-coding-standards)
13. [Security Guidelines](#section-13-security-guidelines)
14. [Team Development Strategy](#section-14-team-development-strategy)
15. [Future Scalability](#section-15-future-scalability)

---

<a name="section-1-system-overview"></a>
## SECTION 1: SYSTEM OVERVIEW

### 1.1 Purpose of the System
The Human Resource Management System (HRMS) is designed as an enterprise-grade, software-as-a-service (SaaS) platform to centralize and automate core human resource operations. It serves as the primary system of record for all employee lifecycle events, daily attendance tracking, leave requests, payroll processing, and organizational analytics.

### 1.2 High-Level Objectives
- **Centralize Employee Data:** Maintain a single, consistent source of truth for all personal, professional, and financial employee records.
- **Automate Core Processes:** Reduce manual administrative overhead in payroll calculation, attendance verification, and leave approvals.
- **Enable Self-Service:** Empower employees to manage their profiles, request leaves, and view payslips independently.
- **Provide Actionable Insights:** Furnish management with real-time dashboards on attendance patterns, resource availability, and payroll expenditures.

### 1.3 Business Goals
- **Productivity Gains:** Minimize time spent by HR administrators on repetitive tasks by at least 40% through automation.
- **Compliance Safeguarding:** Ensure payroll calculations and leave tracking strictly adhere to local labor laws and tax regulations.
- **Data Fidelity:** Maintain 100% auditability of payroll transactions and access logs.

### 1.4 Architectural Quality Attributes (Non-Functional Requirements)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       ARCHITECTURAL QUALITY ATTRIBUTES                  │
├───────────────────┬───────────────────┬───────────────────┬─────────────┤
│    SCALABILITY    │  MAINTAINABILITY  │     SECURITY      │ PERFORMANCE │
│ Horizontal Spans  │ Modular Isolation │ RBAC & Encryption │  < 200ms API│
└───────────────────┴───────────────────┴───────────────────┴─────────────┘
```

#### Scalability Goals
- **Horizontal Scaling:** The backend Express application must remain stateless to support load balancer distribution across multiple container instances (e.g., Docker containers on AWS ECS).
- **Database Scalability:** The database strategy must support read/write replication, permitting intensive reporting queries to run against read replicas without degrading transaction performance on the primary instance.
- **Connection Pooling:** Implement optimized connection pooling on the MySQL driver to handle up to 500 concurrent connections per node efficiently.

#### Maintainability Goals
- **Modular Isolation:** Modules (Authentication, Attendance, Leave, Payroll) must be decoupled such that changes to one module do not break another. Cross-module operations must go through clean interface layers.
- **Low Merge Conflict Design:** The code structure must isolate developers into distinct folder boundaries, ensuring Developer A (Auth), Developer B (Attendance), Developer C (Leave), and Developer D (Payroll) can commit code concurrently without blocking one another.
- **High Testability:** Business logic must reside strictly inside service layers, decoupled from the HTTP routing wrapper, to allow 100% unit test coverage.

#### Security Goals
- **Principle of Least Privilege:** Access control must be enforced at both the client route level and the database/API controller levels via Role-Based Access Control (RBAC).
- **Data Protection:** Hashing of sensitive fields (e.g., passwords via bcrypt) and encryption of personal data (PII) at rest.
- **Secure Transport:** All network communications must occur over HTTPS, using secure, HTTP-only cookies for session management to defend against Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF).

#### Performance Goals
- **API Latency:** Read requests must respond in $<200\text{ms}$ under normal load conditions. Write requests (excluding external processing) must respond in $<300\text{ms}$.
- **Optimized UI Rendering:** Client-side bundles must use code-splitting (lazy loading) to maintain initial bundle loads under $250\text{KB}$ (gzip).
- **Database Performance:** Ensure index coverage for all foreign keys and frequently queried fields (e.g., `employee_id` in attendance, `status` in leave requests).

### 1.5 Future Extensibility
The architecture must anticipate future additions such as push notifications, automated reports, advanced HR analytics, and mobile companion applications. Decoupled, contract-driven REST APIs and structured database models ensure these modules can be integrated seamlessly in later phases.

---

<a name="section-2-system-architecture"></a>
## SECTION 2: SYSTEM ARCHITECTURE

The HRMS utilizes a **Layered Architecture (N-Tier)** pattern, emphasizing strict separation of concerns. The layers are structured as follows:

```
+-----------------------------------------------------------------------+
|                           FRONTEND LAYER                              |
|   +---------------------------------------------------------------+   |
|   │                       React Router DOM                        │   │
|   +-------------------------------+-------------------------------+   |
|                                   │ Routing                           |
|                                   v                                   |
|   +-------------------------------+-------------------------------+   |
|   │                             Pages                             │   │
|   +-------------------------------+-------------------------------+   |
|                                   │ Composition                       |
|                                   v                                   |
|   +-------------------------------+-------------------------------+   |
|   │                     Reusable Components                       │   │
|   +-------------------------------+-------------------------------+   |
|                                   │ User Events                       |
|                                   v                                   |
|   +-------------------------------+-------------------------------+   |
|   │                         Axios Service                         │   │
|   +-------------------------------+-------------------------------+   |
+-----------------------------------|-----------------------------------+
                                    │ HTTP Requests (JSON)
                                    v
+-----------------------------------|-----------------------------------+
|                           BACKEND LAYER                               |
|   +-------------------------------+-------------------------------+   |
|   │                         REST API (V1)                         │   │
|   +-------------------------------+-------------------------------+   |
|                                   │ Route Definition                  |
|                                   v                                   |
|   +-------------------------------+-------------------------------+   |
|   │                        Express Routes                         │   │
|   +-------------------------------+-------------------------------+   |
|                                   │ Parsed Requests                   |
|                                   v                                   |
|   +-------------------------------+-------------------------------+   |
|   │                          Controllers                          │   │
|   +-------------------------------+-------------------------------+   |
|                                   │ Validated DTOs                    |
|                                   v                                   |
|   +-------------------------------+-------------------------------+   |
|   │                           Services                            │   │
|   +-------------------------------+-------------------------------+   |
|                                   │ Business Data Models              |
|                                   v                                   |
|   +-------------------------------+-------------------------------+   |
|   │                     Database Layer (Queries)                  │   │
|   +-------------------------------+-------------------------------+   |
+-----------------------------------|-----------------------------------+
                                    │ Connection Pool (SQL)
                                    v
+-----------------------------------|-----------------------------------+
|                          DATABASE LAYER                               |
|   +-------------------------------+-------------------------------+   |
|   │                            MySQL 8                            │   │
|   +---------------------------------------------------------------+   |
+-----------------------------------------------------------------------+
```

### 2.1 Layer Responsibilities

#### 1. React Router DOM
- **Responsibility:** Manages client-side routing, query parameter processing, and lazy loading.
- **Enforcement:** Controls access to application routes using route-guard wrappers (e.g., `<ProtectedRoute>` and `<RoleGuard>`).

#### 2. Pages
- **Responsibility:** Acts as "smart" components representing screen layouts.
- **Enforcement:** Coordinates data fetching, manages page-level states, and feeds data downward into child components. They contain minimal styling and zero direct SQL/API definitions.

#### 3. Reusable Components
- **Responsibility:** "Dumb" UI elements (buttons, inputs, cards, tables) built on top of shadcn/ui and styled via Tailwind CSS.
- **Enforcement:** Stateless and highly configurable via React props. They do not initiate API requests or depend directly on global state managers.

#### 4. Axios Service
- **Responsibility:** API communication interface.
- **Enforcement:** Implements pre-configured instances, request interceptors (to inject bearer JWTs), response interceptors (to handle token expiration and global error states), and payload serialization.

#### 5. REST API
- **Responsibility:** The HTTP protocol boundary exposed by the Express backend.
- **Enforcement:** Adheres to standard REST principles using HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) and JSON request/response formats.

#### 6. Express Routes
- **Responsibility:** Maps incoming URLs and methods to specific controller functions.
- **Enforcement:** Chains system middleware layers (authentication checks, role validation, rate limiting, and Zod input validation schemas) prior to hitting the controller.

#### 7. Controllers
- **Responsibility:** Resolves HTTP concerns.
- **Enforcement:** Parses request parameters (`req.params`, `req.query`, `req.body`), invokes the appropriate business logic services, catches exceptions, and formats the output into standardized HTTP response structures with status codes. No business logic or database queries may reside here.

#### 8. Services
- **Responsibility:** Core transactional engine containing business domain logic.
- **Enforcement:** Executes data calculations, orchestrates interactions between different modules, verifies business invariants, and coordinates transactional blocks. Decoupled from Express `req` and `res` contexts to remain entirely unit testable.

#### 9. Database Layer
- **Responsibility:** Intermediary layer executing database calls.
- **Enforcement:** Uses prepared statements via the `mysql2` driver pool. Isolates raw SQL strings or query builder templates from business services, ensuring changes to schema layout only require updates in the data access objects (DAOs/Models).

#### 10. MySQL 8 Database
- **Responsibility:** Relational storage and data persistence.
- **Enforcement:** Enforces relational integrity, indexes for query performance, constraints, and relational joins.

---

<a name="section-3-project-directory-structure"></a>
## SECTION 3: PROJECT DIRECTORY STRUCTURE

To facilitate independent, simultaneous work for the 4 developers and isolate modules, a strict, standardized project layout is defined.

```
hrms-workspace/
├── .github/                       # GitHub actions, workflows, and PR templates
├── assets/                        # Shared static assets (logos, branding, etc.)
├── config/                        # Global environment and configuration files
│   ├── default.json               # Default configuration settings
│   └── database.js                # Database connection pooling configs
├── database/                      # Database version control files
│   ├── migrations/                # Schema migration history files
│   └── seeds/                     # Database seed data files
├── documentation/                 # Architectural docs, specifications, API guides
├── frontend/                      # React SPA Client (Vite-based)
│   ├── public/                    # Uncompiled static assets
│   ├── src/
│   │   ├── assets/                # CSS, fonts, and images specific to frontend
│   │   │   └── index.css          # Main Tailwind injection file
│   │   ├── components/            # Reusable UI components
│   │   │   ├── ui/                # Core shadcn primitives (button, dialog, input)
│   │   │   └── shared/            # Shared complex components (Sidebar, Topbar)
│   │   ├── context/               # Global state contexts (AuthContext, ThemeContext)
│   │   ├── hooks/                 # Custom React hooks (useAuth, useDebounce)
│   │   ├── layouts/               # Layout components (DashboardLayout, AuthLayout)
│   │   ├── modules/               # Isolated developer feature modules
│   │   │   ├── auth/              # Developer A: components, hooks, api helpers
│   │   │   ├── employee/          # Shared/Developer A: components, hooks, pages
│   │   │   ├── attendance/        # Developer B: components, hooks, pages
│   │   │   ├── leave/             # Developer C: components, hooks, pages
│   │   │   └── payroll/           # Developer D: components, hooks, pages
│   │   ├── routes/                # Client route configuration
│   │   │   ├── AppRoutes.jsx      # Router mapping and Route guards
│   │   │   └── routes.config.js   # Decoupled route path declarations
│   │   ├── services/              # API Client wrappers
│   │   │   ├── api.client.js      # Global Axios configuration & interceptors
│   │   │   └── api.endpoints.js   # Standard REST endpoint path variables
│   │   ├── utils/                 # Frontend helpers (formatting, dates, helpers)
│   │   ├── App.jsx                # Application root component
│   │   └── main.jsx               # Entrypoint file loading React DOM
│   ├── package.json
│   ├── tailwind.config.js         # Styling variables mapping Tailwind
│   └── vite.config.js             # Vite compiler rules
├── backend/                       # Express REST API Server
│   ├── src/
│   │   ├── config/                # Environment validations and configuration objects
│   │   ├── database/              # Client connector setup and transaction wrappers
│   │   ├── middleware/            # Express route hooks (auth, validation, errors)
│   │   │   ├── auth.middleware.js # JWT verification
│   │   │   ├── role.middleware.js # RBAC validation
│   │   │   ├── error.middleware.js# Global HTTP error formatter
│   │   │   └── validation.middleware.js # Zod route payload validator
│   │   ├── modules/               # Decoupled backend feature modules
│   │   │   ├── auth/              # Developer A: routes, controllers, services
│   │   │   ├── employee/          # Shared/Developer A: routes, controllers, services
│   │   │   ├── attendance/        # Developer B: routes, controllers, services
│   │   │   ├── leave/             # Developer C: routes, controllers, services
│   │   │   └── payroll/           # Developer D: routes, controllers, services
│   │   ├── utils/                 # Utility helpers (jwt, bcrypt helpers, logger)
│   │   │   └── logger.js          # Winston setup
│   │   ├── app.js                 # Express app initialization
│   │   └── server.js              # Server bootstrapper & listener
│   ├── uploads/                   # Local staging folder for files (ignored in Git)
│   └── package.json
└── README.md                      # Workspace documentation for onboarding
```

### 3.1 Folder Mapping & Architectural Decoupling
1. **`frontend/src/modules/` & `backend/src/modules/`:** Standardize module isolation. Developer B edits only `attendance/` directories, preventing code leakage into `leave/` or `payroll/` files.
2. **`frontend/src/components/ui/`:** Controlled strictly. Once initialized with shadcn, these are considered read-only style blocks. Modifications require review by the Technical Lead.
3. **`backend/uploads/`:** Local upload staging directory. Must have a `.gitignore` entry to prevent binary images or PDF files from polluting git commits.

---

<a name="section-4-module-architecture"></a>
## SECTION 4: MODULE ARCHITECTURE

To ensure high cohesion, low coupling, and minimal merge conflicts, the HRMS divides features into isolated logical modules.

```
                        ┌────────────────────────┐
                        │      Employee Core     │
                        └──────────┬───┬─────────┘
                                   │   │
                  ┌────────────────┘   └────────────────┐
                  v                                     v
       ┌─────────────────────┐               ┌─────────────────────┐
       │  Attendance Module  │               │    Leave Module     │
       │    (Developer B)    │               │    (Developer C)    │
       └─────────────────────┘               └─────────────────────┘
                  │                                     │
                  └────────────────┐   ┌────────────────┘
                                   v   v
                        ┌─────────────────────┐
                        │   Payroll Module    │
                        │    (Developer D)    │
                        └─────────────────────┘
```

### 4.1 Module Domain Definitions
1. **Authentication:** Manages session initialization, credential verification, registration, token refresh cycles, and password reset procedures.
2. **Employee Core:** Central directory storing basic employee identifiers, reporting structures, active statuses, and department mapping. This serves as the system anchor.
3. **Employee Profile:** Handles comprehensive personal profile data, emergency contacts, identity documents, and certification details.
4. **Attendance:** Tracks daily clock-in/out records, calculations of work hours, late check-ins, and overtime logs.
5. **Leave Management:** Processes leave requests, balance calculations, review policies, and approval workflows.
6. **Payroll:** Computes gross salaries, tax deductions, bonuses, statutory contributions, and issues monthly payslips.
7. **Dashboard:** Aggregates operational stats for employees (clock-in statuses, pending leaves) and management (overall attendance, active budgets).

### 4.2 Module Intercommunication & Dependencies
Direct cross-module database querying is strictly prohibited. Modifying another developer’s module code directly is disallowed. Communication between modules must follow these architectural paths:

- **Service-to-Service References:** If the Leave module requires data from the Employee module (e.g., verifying if an employee is active), the `LeaveService` must query the `EmployeeService` class via defined public interface functions. It must not query the database model of the employee table directly.
- **Shared DB Integrity:** Relational integrity is enforced using foreign keys pointing to the central `employees` table. However, queries executed within the `attendance` module directory must only interact directly with the attendance-related tables.
- **Event Dispatching:** For async or decoupled actions (e.g., generating a payroll run whenever an employee leaves the company or is marked terminated), a publisher-subscriber model or an internal service event broker is utilized in the service layer to prevent tight circular dependencies.

---

<a name="section-5-routing-strategy"></a>
## SECTION 5: ROUTING STRATEGY

The client routing relies on a declarations-based route map handled by React Router DOM (v6+), separating paths from wrapper implementations to enable future nested structures.

### 5.1 Route Categories
- **Public Routes:** Accessible by any client. Routing will bypass auth checks (e.g., Login Page, Forgot Password).
- **Protected Routes:** Requires a valid, non-expired access token. Redirects unauthenticated users to `/login` with a reference path parameter (`?redirect=/target`).
- **Role-Based Routes:** Restricts paths based on user clearance codes (`Admin`, `Manager`, `Employee`). Assessed via client checks and backed by strict API middleware verification.
- **Unauthorized Handling:** Users attempting to access a route without proper permissions are redirected to a dedicated `/unauthorized` component (HTTP 403 fallback).
- **404 Routing:** Unmapped endpoints display a clean, enterprise-branded "Page Not Found" layout.

### 5.2 Client Route Configurations Matrix

| Path | Access Type | Role Clearance | Component Target | Module Owner |
| :--- | :--- | :--- | :--- | :--- |
| `/login` | Public | Unauthenticated | `Login.jsx` | Auth (A) |
| `/unauthorized` | Protected | Authenticated | `Unauthorized.jsx` | Shared (A) |
| `/dashboard` | Protected | Employee \| Manager \| Admin | `Dashboard.jsx` | Shared (A) |
| `/employees` | Protected | Manager \| Admin | `EmployeeList.jsx` | Employee (A) |
| `/attendance` | Protected | Employee \| Manager \| Admin | `AttendanceDashboard.jsx`| Attendance (B) |
| `/attendance/history`| Protected | Employee | `AttendanceHistory.jsx`| Attendance (B) |
| `/leaves` | Protected | Employee \| Manager \| Admin | `LeaveDashboard.jsx` | Leave (C) |
| `/payroll` | Protected | Admin | `PayrollDashboard.jsx` | Payroll (D) |
| `*` | Public | Any | `NotFound.jsx` | Shared (A) |

### 5.3 Route Definition Structure
Client route patterns must be registered in the route configuration file. This isolates route definitions from UI implementation files, allowing changes to layout hierarchies with minimal impact on underlying pages:

```javascript
// frontend/src/routes/routes.config.js
export const ROUTES = {
  PUBLIC: {
    LOGIN: '/login',
  },
  PROTECTED: {
    DASHBOARD: '/dashboard',
    ATTENDANCE: '/attendance',
    LEAVES: '/leaves',
    PAYROLL: '/payroll',
    UNAUTHORIZED: '/unauthorized',
  }
};
```

---

<a name="section-6-authentication-architecture"></a>
## SECTION 6: AUTHENTICATION ARCHITECTURE

The HRMS secures transactions using a robust token-based scheme based on JSON Web Tokens (JWT).

```
CLIENT                              BACKEND
  │                                    │
  │─── POST /api/v1/auth/login ───────>│ Verify credentials
  │                                    │ Create Access Token (Payload) &
  │                                    │ Refresh Token (HttpOnly Cookie)
  │<── Send Access Token & Set Cookie ─│
  │                                    │
  │─── GET /api/v1/attendance ────────>│ Authorization Middleware:
  │    (Auth Header: Bearer JWT)       │ Verify Access Token Signature
  │                                    │ Check expiry & user roles
  │<── Return Data ────────────────────│ Execute route logic
  │                                    │
  │─── POST /api/v1/auth/refresh ─────>│ Read Refresh Cookie
  │    (Bypasses access header)        │ Validate token in DB
  │                                    │ Issue new Access Token
  │<── New Access Token ───────────────│
```

### 6.1 Authentication Mechanics
- **Token Pairing:** Uses a two-token setup.
  1. **Access Token:** Short-lived JWT ($15\text{ minutes}$). Transmitted in-memory within client state (never in localStorage/sessionStorage) and attached to requests via the `Authorization: Bearer <token>` header.
  2. **Refresh Token:** Long-lived token ($7\text{ days}$). Placed in an HTTP-Only, Secure, SameSite=Strict cookie. Refreshes the access token silently via an API endpoint.
- **JWT Signature Verification:** The backend verifies JWT signatures using a cryptographically strong symmetric secret string (`JWT_SECRET`) loaded from environment parameters.
- **Session Revocation:** Active refresh tokens are tracked in a `refresh_tokens` database table. During logout or security actions, the server invalidates the refresh token record, instantly revoking subsequent access-token generation requests.

### 6.2 Password Security standards
- **Algorithm:** Passwords must be hashed using `bcrypt` with a minimum configuration of **$12$ salt rounds** to prevent brute-force attacks.
- **Validation Constraints:** Zod rules on user creation enforce structural requirements: minimum 10 characters, including at least one uppercase letter, one lowercase letter, one numeric digit, and one special character.
- **Plaintext Rules:** Plaintext passwords must never be stored in database fields, printed in server system logs, or returned in API response bodies.

---

<a name="section-7-database-strategy"></a>
## SECTION 7: DATABASE STRATEGY

The platform utilizes MySQL 8.0 as its primary relational engine. Enterprise-grade database structures are enforced through strict schema rules and isolation boundaries.

### 7.1 Schema Naming Conventions
- **Tables:** Named in lowercase using plural snake_case format (e.g., `employees`, `attendance_records`, `leave_requests`).
- **Columns:** Named in lowercase using singular snake_case format (e.g., `first_name`, `clock_in_time`, `daily_rate`).
- **Foreign Keys:** Prefixed with the target singular table identifier, followed by `_id` (e.g., `employee_id`, `leave_request_id`).
- **Indexes:** Prefixed with `idx_` followed by table name and targeted columns (e.g., `idx_attendance_emp_date`).

### 7.2 Key Strategy
- **Primary Keys:** UUID v4 is chosen as the standard primary key format (stored as `VARCHAR(36)` or `BINARY(16)` for performance tuning). UUIDs prevent sequential resource discovery (enumeration attacks) and facilitate future distributed migrations.
- **Foreign Keys:** Enforced natively with referential constraints. Cascades are forbidden on critical business data:
  - On employee deletions, dependent records in financial or attendance tables must block execution (`ON DELETE RESTRICT`) to preserve audit trails. Soft deletes must be used instead.

### 7.3 Soft Delete Strategy
- **Mechanism:** Structural tables (e.g., `employees`, `leave_requests`) must include a nullable `deleted_at` timestamp.
- **Query Resolution:** The repository layer must filter records where `deleted_at IS NULL` for standard operation queries.
- **Hard Deletes:** Reserved solely for non-transactional temporary operational logs or setup buffers.

### 7.4 Migration & Seed Workflow
- **Migrations:** Schema modifications must be performed programmatically via code migration scripts (e.g., using Knex or Umzug). Direct manual ALTER schema executions are strictly prohibited.
- **Seeding:** Seed data is divided into:
  - **System Seeds:** Reference data required for operations (system roles, departments, configurations).
  - **Dev Seeds:** Standardized mock user databases for developers to test edge conditions.

---

<a name="section-8-API DESIGN STANDARD"></a>
## SECTION 8: API DESIGN STANDARD

The backend routes conform to a strict RESTful contract. All endpoints must output a predictable JSON envelope.

### 8.1 API Versioning
- All endpoints must be version-prefixed under `/api/v1/` to ensure backwards compatibility when future APIs (e.g. `/api/v2/`) are developed.

### 8.2 Standard HTTP Methods Usage
- `GET`: Read resource collections or specific records. Must be idempotent.
- `POST`: Create new entities.
- `PUT`: Complete update of an existing entity.
- `PATCH`: Selective update of partial fields in an existing entity.
- `DELETE`: Apply soft deletes to a resource.

### 8.3 JSON Envelope Format

#### Success Envelopes
```json
{
  "status": "success",
  "data": {
    "id": "e304b162-bbbe-4dfd-b4a1-f76ea17eb108",
    "email": "employee@enterprise.com",
    "role": "Employee"
  },
  "meta": {
    "timestamp": "2026-07-04T11:32:00Z"
  }
}
```

#### Paginated Collections Envelopes
```json
{
  "status": "success",
  "data": [
    { "id": "e304...", "name": "Jane Doe" }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalRecords": 45,
      "totalPages": 5
    },
    "timestamp": "2026-07-04T11:32:00Z"
  }
}
```

#### Error Envelopes
```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request body failed structural constraints.",
    "details": [
      {
        "field": "email",
        "message": "Invalid email address format."
      }
    ]
  },
  "meta": {
    "timestamp": "2026-07-04T11:32:00Z"
  }
}
```

### 8.4 REST Endpoint Naming Specifications

| Feature Area | Method | Endpoint Path | Payload | Responsibility |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/v1/auth/login` | `{ email, password }` | Authenticate credentials, set cookie |
| **Auth** | `POST` | `/api/v1/auth/refresh` | *None (Cookie)* | Issue new access token |
| **Auth** | `POST` | `/api/v1/auth/logout` | *None* | Clear tokens in client & server |
| **Auth** | `GET` | `/api/v1/auth/me` | *None* | Return logged-in user profile info |
| **Attendance**| `GET` | `/api/v1/attendance` | *None (Query filters)*| Fetch employee attendance records |
| **Attendance**| `POST` | `/api/v1/attendance/clock-in` | `{ latitude, longitude }`| Create attendance record with timestamp |
| **Leaves** | `POST` | `/api/v1/leaves` | `{ startDate, endDate, type }`| Submit leave request |
| **Payroll** | `GET` | `/api/v1/payroll/payslips` | *None (Query filters)*| Retrieve employee payslip history |

---

<a name="section-9-frontend-design-principles"></a>
## SECTION 9: FRONTEND DESIGN PRINCIPLES

The React client utilizes a highly decoupled, component-based structure built on Vite.

### 9.1 Component Hierarchy Patterns
- **Primitives (`components/ui/`):** Purely visual, context-free controls derived from shadcn/ui.
- **Custom Modules (`modules/[module_name]/components/`):** Feature-specific controls owned by individual developers (e.g., `ClockInButton.jsx`, `PayslipList.jsx`).
- **Composite Layouts (`layouts/`):** Standard structural wraps containing header structures, sidebars, and main content viewports.

### 9.2 State Management Rules
- **Server Cache State:** Managed via React custom hooks wrapping Axios fetching logic. Cache synchronization, invalidation, and queries must not bypass these hooks.
- **Client UI State:** Handled locally within pages or components via `useState` and `useReducer` to minimize global store overhead.
- **Global Contexts:** Restructured exclusively for cross-cutting variables that change rarely, such as `AuthContext` (session payload status) and `ThemeContext` (color schemes).

### 9.3 Client Service Decoupling
- **Isolation:** Page files must not call Axios directly. All API communication must be abstracted into service helper classes inside the module folders.
- **Format:** Services return standard promises resolving to payload objects. Component files are responsible for rendering these objects on the screen.

---

<a name="section-10-backend-design-principles"></a>
## SECTION 10: BACKEND DESIGN PRINCIPLES

The backend is built on Node.js using Express.js. It follows a clean Controller-Service-Repository architecture pattern.

```
       ┌────────────────────────────────────────────────────────┐
       │                     HTTP Request                       │
       └──────────────────────────┬─────────────────────────────┘
                                  v
       ┌────────────────────────────────────────────────────────┐
       │                Validation Middleware                   │
       │           Checks Zod structural schemas                │
       └──────────────────────────┬─────────────────────────────┘
                                  v
       ┌────────────────────────────────────────────────────────┐
       │                      Controller                        │
       │   Extracts body & query params; handles HTTP response  │
       └──────────────────────────┬─────────────────────────────┘
                                  v
       ┌────────────────────────────────────────────────────────┐
       │                       Service                          │
       │    Contains business logic; executes transactions     │
       └──────────────────────────┬─────────────────────────────┘
                                  v
       ┌────────────────────────────────────────────────────────┐
       │                     Repository                         │
       │           Executes raw queries on MySQL                │
       └──────────────────────────┬─────────────────────────────┘
                                  v
       ┌────────────────────────────────────────────────────────┐
       │                        Database                        │
       └────────────────────────────────────────────────────────┘
```

### 10.1 Layer Isolation Policies
- **Controllers:** Controllers must never run SQL queries. They act as input/output adapter buffers. Their only job is parsing incoming request parameters, passing them to the services, and formatting HTTP response envelopes.
- **Services:** Services are the core of the system. They perform computations, enforce business rules, and run database transactions. They must remain independent of the Express request/response objects to simplify automated unit testing.
- **Repositories (Models):** Handled via database models/repository classes. They isolate SQL table structures from the service logic, exposing only clean method names (e.g., `findByEmail`, `createAttendanceRecord`).

### 10.2 Global Logging Strategy
- **Engine:** Built using `winston` and `morgan`.
- **Leveling:**
  - `info`: Standard process steps, server startup confirmations.
  - `warn`: Validation drops, bad logins, expired token queries.
  - `error`: Database failures, unhandled runtime code exceptions.
- **Target Routing:** Info and warnings write to standard output (`stdout`). Errors are output to `stderr` and written to daily rotating local log files (`logs/error-%DATE%.log`) for production auditing.

---

<a name="section-11-design-system"></a>
## SECTION 11: DESIGN SYSTEM

The HRMS user interface will be developed as a premium, enterprise-grade application with a clean, professional aesthetic. Styling values must be configured within the [tailwind.config.js](file:///d:/odoo%20Hackethon/frontend/tailwind.config.js) configuration file to ensure visual consistency.

### 11.1 Color Tokens (Light & Dark Theme Specs)
The color palette uses balanced Slate neutrals paired with deep Indigo as the primary brand color to deliver a modern, premium enterprise design.

| Palette Variable | Light Value | Dark Value | Purpose |
| :--- | :--- | :--- | :--- |
| `background` | `#FFFFFF` | `#0B0F19` | Application backdrop surface |
| `card` | `#F8FAFC` | `#111827` | Box containers, user cards, widgets |
| `border` | `#E2E8F0` | `#1F2937` | Grid splits, borders, divider lines |
| `primary` | `#6366F1` | `#818CF8` | Indigo: Buttons, focus outlines, main branding |
| `success` | `#10B981` | `#34D399` | Emerald: Positive status tags, clocks |
| `warning` | `#F59E0B` | `#FBBF24` | Amber: Pending status badges |
| `error` | `#EF4444` | `#F87171` | Rose: Validation fails, alerts, errors |

### 11.2 Typography & Spacing
- **Primary Font:** Inter, Outfit, or Roboto (imported via Google Fonts). Fallbacks: System-UI, Sans-serif.
- **Hierarchy:**
  - `h1`: 2.25rem (36px) | Bold | Tracking Tight
  - `h2`: 1.5rem (24px) | Semi-Bold
  - `h3`: 1.25rem (20px) | Medium
  - `body`: 0.875rem (14px) | Regular | Leading Normal
- **Spacing:** Built entirely on standard Tailwinds factors ($4\text{px}$ base grids, e.g. `p-4` = $16\text{px}$, `gap-6` = $24\text{px}$).

### 11.3 Interactive Components & Accessibility (A11y)
- **Form Fields:** Interactive fields must display clear focus outlines (`focus-visible:ring-2 focus-visible:ring-indigo-500`) to support keyboard navigation.
- **Contrast Ratios:** Text styles must maintain a minimum contrast ratio of 4.5:1 against their backgrounds (WCAG 2.1 AA Compliance).
- **Semantics:** Screen elements must include correct ARIA attributes (e.g. `aria-invalid`, `aria-required`) and appropriate HTML5 semantic structures (`<main>`, `<nav>`, `<aside>`).

---

<a name="section-12-coding-standards"></a>
## SECTION 12: CODING STANDARDS

Strict coding guidelines ensure codebase consistency across all four developers.

### 12.1 Naming Conventions

#### File & Directory Naming
- **Components:** PascalCase (e.g., `EmployeeCard.jsx`, `ClockInButton.jsx`).
- **Services, Utilities, Hooks, Contexts:** camelCase (e.g., `useAuth.js`, `apiClient.js`, `dateFormatter.js`).
- **Directories:** lowercase, kebab-case (e.g., `shared-components/`, `attendance/`).
- **API Endpoints:** lowercase, kebab-case (e.g., `/api/v1/attendance-records`).

#### Code Symbol Naming
- **React Components:** PascalCase (e.g., `function PayrollDashboard()`).
- **Functions & Variables:** camelCase (e.g., `const getPayslipDetails = () => {}`).
- **Database Tables & Columns:** snake_case (e.g., `employee_id`, `created_at`).
- **Global Constants:** UPPER_CASE (e.g., `const MAX_LEAVE_LIMIT = 30`).

### 12.2 Import Ordering Rule
Imports must be structured systematically in the following order, separated by a single blank line:
1. React core libraries and built-in hooks (`react`, `react-router-dom`).
2. Third-party packages and NPM libraries (`axios`, `zod`, `lucide-react`).
3. App configuration folders (`@/config`, `@/services`).
4. Custom contexts, hooks, utilities, and components (`@/hooks`, `@/components`).
5. Asset files and CSS imports (`@/assets/index.css`).

```javascript
// Example Import Order
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { User } from 'lucide-react';

import { ROUTES } from '@/routes/routes.config';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

import '@/assets/index.css';
```

---

<a name="section-13-security-guidelines"></a>
## SECTION 13: SECURITY GUIDELINES

Security must be implemented at every layer of the architecture, rather than as an afterthought.

### 13.1 SQL Injection Prevention
- All database queries must run through **parameterized queries** or structured query builders using placeholders (e.g., `SELECT * FROM employees WHERE id = ?`).
- String concatenation must never be used to construct SQL queries.

### 13.2 Cross-Site Scripting (XSS) Prevention
- **React Templating:** React natively escapes variables rendered in the DOM, helping prevent basic XSS injection. Avoid using `dangerouslySetInnerHTML` unless explicitly reviewed by the Technical Lead.
- **Helmet Middleware:** Enforce Express security headers via `helmet()` on the backend, configuring CSP rules, Frame Options, and X-Content-Type-Options.

### 13.3 CSRF and Cookie Protection
- Refresh tokens must be stored in cookies configured with:
  - `HttpOnly`: Block access by client-side JavaScript.
  - `Secure`: Ensure transmission occurs only over encrypted HTTPS links.
  - `SameSite=Strict`: Prevent transmission during cross-site navigations.

### 13.4 Strict Environment Variables Checks
- **Validation:** Define a backend bootstrapper file `src/config/env.js` that validates the existence of essential environment variables (e.g., `DATABASE_URL`, `JWT_SECRET`, `PORT`) using Zod.
- **Fail Fast:** If any required environment variable is missing on start, the application process must terminate immediately with an error log:

```javascript
// Conceptual setup logic (no runtime code execution)
const envSchema = zod.object({
  PORT: zod.string(),
  JWT_SECRET: zod.string(),
  DATABASE_URL: zod.string()
});
```

---

<a name="section-14-team-development-strategy"></a>
## SECTION 14: TEAM DEVELOPMENT STRATEGY

To minimize development bottlenecks, the four developers (A, B, C, D) must coordinate through strict folder ownership, API contracts, and an established Git branch workflow.

### 14.1 Developer Scope Allocations
- **Developer A (Core & Auth):** Configures security layers, global routes, layout wrappers, and the basic Employee directory structures.
- **Developer B (Attendance):** Responsible for attendance checkins, calculations, maps integration, and history sheets.
- **Developer C (Leaves):** Manages leave requests, approval flows, balance logic, and policy rules.
- **Developer D (Payroll):** Implements tax calculators, payslip generators, and payroll calculations.

### 14.2 Shared vs Private Directories
To prevent merge conflicts, team members must adhere to strict folder ownership:

- **Strict Module Ownership:** 
  - Developer B works exclusively inside `frontend/src/modules/attendance/` and `backend/src/modules/attendance/`.
  - Developer C works exclusively inside `frontend/src/modules/leave/` and `backend/src/modules/leave/`.
  - Developer D works exclusively inside `frontend/src/modules/payroll/` and `backend/src/modules/payroll/`.
- **Shared Folders (Controlled Access):** Shared folders (e.g., `frontend/src/components/ui/`, `frontend/src/routes/AppRoutes.jsx`, `backend/src/app.js`) are managed by Developer A.
  - If Developer B, C, or D needs a new routing path or shared utility, they must coordinate with Developer A or create a pull request targeting the shared configuration files specifically.

### 14.3 Git Branch Workflow (Git Flow)

```
main        ───────────────────────────[Release]
                     ▲
                     │
develop     ─────────┴─────┬──┬──┬──┬──[Stage]
                           │  │  │  │
feature/dev-a ─────────────┘  │  │  │ (Auth / Shared)
feature/dev-b ────────────────┘  │  │ (Attendance)
feature/dev-c ───────────────────┘  │ (Leave)
feature/dev-d ──────────────────────┘ (Payroll)
```

- **Branch Structure:**
  - `main`: Production release branch. Only updated by the Technical Lead.
  - `develop`: Shared integration branch for active staging.
  - `feature/dev-[dev_id]-[feature_name]`: Dev-specific branches (e.g., `feature/dev-b-clock-in-api`).
- **Merge Strategy:** 
  - Developers merge branches into `develop` using Pull Requests.
  - At least one code review and approval from another developer or Technical Lead is required.
  - Enable squash-and-merge on PR approvals to keep the git history clean and readable.

---

<a name="section-15-future-scalability"></a>
## SECTION 15: FUTURE SCALABILITY

The architectural decisions made in Phase 1 establish a foundation that supports future development phases and scaling requirements.

### 15.1 Future Module Integration
- **Notifications:** The backend's decoupled architecture supports integration with event-driven notifications (e.g., Socket.io or Firebase Cloud Messaging). The service layer can publish events (such as `LEAVE_REQUEST_SUBMITTED`) to a shared event emitter, triggering notifications asynchronously.
- **Reports & Analytics:** Database read replicas can handle reporting queries separately from transaction workloads. Heavy calculations can be moved to background worker queues (like BullMQ) to avoid blocking primary process loops.
- **Admin Panel:** Standard RBAC middleware supports administrative routes and operations out of the box, without requiring changes to core schemas or route layouts.

### 15.2 Deployment and Mobile Alignment
- **Dockerization:** The stateless design of the Express application enables containerization using Docker.
- **Mobile Client Integration:** Because the Express backend serves as a stateless REST API returning standard JSON payloads, the same API endpoints can support future iOS/Android client apps.
