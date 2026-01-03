-- Auth RPCs for PostgREST
-- IMPORTANT: You must install the 'pgjwt' extension for this to work, OR use Supabase which has it built-in.
-- https://github.com/michelp/pgjwt

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Login Function
-- Returns a JWT token if email/password match
CREATE OR REPLACE FUNCTION login(email text, password text)
RETURNS json AS $$
DECLARE
  _user usuarios;
  _token text;
  _jwt_secret text;
BEGIN
  -- Select user by email
  SELECT * INTO _user FROM usuarios WHERE usuarios.email = login.email;

  IF _user IS NULL THEN
    RAISE EXCEPTION 'Invalid email or password';
  END IF;

  -- Verify password (using MD5 to match legacy system, upgrade to crypt() recommended)
  IF _user.password = md5(login.password) THEN
    
    -- DEFINE YOUR JWT SECRET HERE (OR GET FROM CONFIG)
    -- In Supabase, this is handled automatically. 
    -- For separate PostgREST, you need the extension.
    -- This is a placeholder for the logic:
    
    /* 
    _token := sign(
        json_build_object(
            'role', 'web_user',
            'sub', _user.id_usuario,
            'email', _user.email,
            'exp', extract(epoch from now())::integer + 60*60*2 -- 2 hours
        ), 
        'your_super_secret_jwt_key'
    );
    */
    
    -- Logic for manual JWT generation if extension is missing (Simulated)
    -- Ideally, you call an auth service or enable pgjwt
    
    RETURN json_build_object(
      'token', 'JWT_GENERATION_REQUIRES_PGJWT_EXTENSION_OR_SUPABASE', 
      'user', json_build_object(
        'id', _user.id_usuario,
        'nombre', _user.nombre,
        'email', _user.email
      )
    );
    
  ELSE
    RAISE EXCEPTION 'Invalid email or password';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Register Function
CREATE OR REPLACE FUNCTION register(
  nombre text, 
  email text, 
  password text, 
  fecha_nacimiento date, 
  genero text, 
  pais text
)
RETURNS json AS $$
DECLARE
  _new_id integer;
BEGIN
  -- Check if email exists
  IF EXISTS (SELECT 1 FROM usuarios u WHERE u.email = register.email) THEN
    RAISE EXCEPTION 'Email already registered';
  END IF;

  INSERT INTO usuarios (nombre, email, password, fecha_nacimiento, genero, pais)
  VALUES (nombre, email, md5(password), fecha_nacimiento, genero, pais)
  RETURNING id_usuario INTO _new_id;

  RETURN json_build_object(
    'message', 'Usuario creado correctamente',
    'id', _new_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
