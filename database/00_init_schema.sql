-- Enable UUID extension if we want to use UUIDs, though the current app uses INTs (implied by auto-increment usages usually found in Node/MySQL legacy).
-- We will stick to SERIAL/INTEGER to match existing logic unless we see explicit UUID usage.

-- 1. Users Table
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Currently storing MD5 hashes
    fecha_nacimiento DATE,
    genero VARCHAR(50),
    pais VARCHAR(100),
    fecha_creacion TIMESTAMP DEFAULT NOW()
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) CHECK (tipo IN ('ingreso', 'gasto', 'both')), -- 'both' appeared in some issues, adding it to be safe
    id_usuario INTEGER REFERENCES usuarios(id_usuario) ON DELETE CASCADE, -- Nullable for default categories? Or 0? Code says (id_usuario = ? OR es_predeterminada = 1). If predeterminada, maybe id_usuario is NULL.
    color VARCHAR(50),
    icon VARCHAR(100),
    es_predeterminada BOOLEAN DEFAULT FALSE
);

-- 3. Transactions Table
CREATE TABLE IF NOT EXISTS transacciones (
    id_transaccion SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_categoria INTEGER REFERENCES categorias(id_categoria) ON DELETE SET NULL,
    nombre_transaccion VARCHAR(255),
    monto DECIMAL(10, 2) NOT NULL,
    fecha TIMESTAMP DEFAULT NOW(),
    descripcion TEXT
);

-- 4. Budgets (Presupuestos) Table
CREATE TABLE IF NOT EXISTS presupuestos (
    id_presupuesto SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_categoria INTEGER REFERENCES categorias(id_categoria) ON DELETE CASCADE,
    monto_limite DECIMAL(10, 2) NOT NULL,
    fecha_inicio TIMESTAMP DEFAULT NOW(),
    fecha_final TIMESTAMP NOT NULL,
    alerta BOOLEAN DEFAULT TRUE
);

-- 5. Savings Goals (Meta Ahorro) Table
CREATE TABLE IF NOT EXISTS meta_ahorro (
    id_meta SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    nombre_meta VARCHAR(255) NOT NULL,
    descripcion_meta TEXT,
    fecha_limite DATE,
    monto_objetivo DECIMAL(10, 2),
    monto_actual DECIMAL(10, 2) DEFAULT 0,
    fecha_creacion TIMESTAMP DEFAULT NOW()
);

-- 6. Contributions (Contribuciones) Table
-- Note: Conflicting models found (contribuciones vs contribucion_meta). Creating both to be safe or assuming contribucion_meta is the main one linked to meta_ahorro.
CREATE TABLE IF NOT EXISTS contribucion_meta (
    id_contribucion SERIAL PRIMARY KEY,
    id_meta INTEGER REFERENCES meta_ahorro(id_meta) ON DELETE CASCADE,
    id_usuario INTEGER REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    monto DECIMAL(10, 2) NOT NULL,
    fecha TIMESTAMP DEFAULT NOW()
);

-- 7. Alerts Table
CREATE TABLE IF NOT EXISTS alertas (
    id_alerta SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_presupuesto INTEGER REFERENCES presupuestos(id_presupuesto) ON DELETE CASCADE,
    tipo_alerta VARCHAR(50),
    fecha_alerta TIMESTAMP DEFAULT NOW()
);

-- 8. Chatbot History Table
CREATE TABLE IF NOT EXISTS historial_chatbot (
    id_historial SERIAL PRIMARY KEY, -- Renamed from implicit id to explicit if needed, currently code implies auto-id
    id_chat VARCHAR(255), -- Appears to be a session ID
    id_usuario INTEGER REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    pregunta TEXT,
    respuesta TEXT,
    fecha_hora TIMESTAMP DEFAULT NOW()
);
