# API — Documentación de Endpoints

Base URL local: `http://localhost:3000`

Todas las rutas protegidas requieren el header:

```
Authorization: Bearer <token>
```

## Usuarios (`/api/usuarios`)

### POST /api/usuarios/registro
Registra un usuario nuevo. La contraseña se valida contra una RegEx (mínimo 8 caracteres, 1 mayúscula, 1 número) y se hashea con bcrypt antes de guardarse. `rol` y `estado_id` se asignan por `DEFAULT` en la base de datos.

Body:
```json
{ "nombre": "Santiago Sosa", "email": "Sousa@gmail.com", "password": "Admin123" }
```

Respuestas: `201` creado · `400` contraseña débil · `500` error de servidor.

### POST /api/usuarios/login
Verifica email + password (bcrypt.compare) y devuelve un JWT firmado (expira en 2hs) con `{ id, rol }` en el payload.

Body:
```json
{ "email": "Sousa@gmail.com", "password": "Admin123" }
```

Respuestas: `200` con `{ token }` · `401` credenciales inválidas (mensaje genérico, no distingue si falló el email o el password).

### GET /api/usuarios/perfil (protegida)
Devuelve los datos del usuario logueado. El `id` se toma exclusivamente del token, nunca de la URL o del body — evita que un usuario vea el perfil de otro.

Respuestas: `200` con los datos del usuario (sin password) · `401` sin token o token inválido.

## Publicaciones (`/api/publicaciones`)

Todas las rutas de este recurso requieren token.

### POST /api/publicaciones
Crea una publicación. El `autor_id` se toma del token (`req.usuario.id`), nunca del body.

Body:
```json
{ "titulo": "Mi primer post", "contenido": "Contenido de prueba" }
```

### GET /api/publicaciones
Lista publicaciones con paginación y búsqueda opcional por título.

Query params: `search` (opcional), `page` (default 1), `limit` (default 10).

Ejemplo: `GET /api/publicaciones?search=curso&page=1&limit=10`

### PUT /api/publicaciones/:id
Actualiza una publicación. Solo el autor puede editarla — se compara `autor_id` contra `req.usuario.id`.

Respuestas: `200` actualizada · `403` no sos el dueño · `404` no existe.

### DELETE /api/publicaciones/:id
Elimina una publicación. Misma validación de propiedad que el PUT.

Respuestas: `200` eliminada · `403` no sos el dueño · `404` no existe.

## Tests

```
npm test
```

Corre la suite de Jest: validación de la RegEx de contraseñas (`tests/validadores.test.js`) y del middleware `verificarToken` (`tests/middleware.test.js`).