# Migration to PostgREST

This folder contains the SQL scripts necessary to migrate your Node.js backend to a PostgREST-compatible database schema.

## Files

1.  **`00_init_schema.sql`**: Creates the tables (`usuarios`, `categorias`, `transacciones`, etc.) mirroring your current Node models.
2.  **`01_views_functions.sql`**: Creates Views and Functions to replace your complex Dashboard and Controller logic (e.g., `getIngresosMesActual`, `budget_status`).
3.  **`02_security.sql`**: Enables Row Level Security (RLS) policies. This ensures that users can **only** see their own data when querying the API.
4.  **`03_auth_rpc.sql`**: Contains `login` and `register` Stored Procedures. *Note: JWT generation inside SQL requires the `pgjwt` extension or a platform like Supabase.*

## How to Apply

1.  **PostgreSQL Database**: Ensure you have a Postgres database running.
2.  **Run Scripts**: Execute the SQL files in order:
    ```bash
    psql -d balanzen -f 00_init_schema.sql
    psql -d balanzen -f 01_views_functions.sql
    psql -d balanzen -f 02_security.sql
    psql -d balanzen -f 03_auth_rpc.sql
    ```
3.  **Start PostgREST**: Point your PostgREST configuration to this database.
    *   Ensure the `db-schema` is set to `public`.
    *   Set `db-anon-role` to a role that has usage on `public` but NO permissions on tables (except maybe `login`).
    *   Set `jwt-secret` to verify tokens.

## Important Notes on Authentication

*   **Passwords**: The scripts use `MD5` to match your current system. It is highly recommended to switch to `bcrypt` (using `pgcrypto`'s `crypt` function) for better security.
*   **JWTs**: PostgREST relies on JWTs. The `login` function in `03_auth_rpc.sql` is a template. If you are using **Supabase**, this is handled automatically. If self-hosting, you need to install `pgjwt` to sign tokens within SQL.

## Dashboard Data

Instead of calling `/dashboard/income`, you will now query the View:
`GET /dashboard_stats`

Instead of calculating Budget status in Node, query:
`GET /budget_status`
