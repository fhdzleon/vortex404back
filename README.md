# vortex404back 🎮

API REST para una plataforma de juegos puzzle. 

Los usuarios podran registrarse, iniciar sesión y resolver acertijos servidos por la API.
___

## Stack 🧑‍💻

* Runtime: Node.js + Typescript
* Framework: Express
* ORM: Prisma
* Base de datos: SQLite (desarrollo) -> PostgreSQL (Producción)
* Auth: JWT + bcrypt
* Validación: Zod
* Documentación: Swagger UI

___

## Requisitos

* Node.js 18+
* npm

___

## Correr localmente

```bash
# Clonar el repositorio

git clone https://

# Instalar dependencias
npm install

# Configurar variables de entorno

cp .env.sample .env

# Correr migraciones
npx prisma migrate dev

# Generar cliente de Prisma
npx prisma generate

# Seed de datos iniciales
npm run seed

# Iniciar servidor en desarrollo
npm run dev

```

___

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto: 

```env
DATABASE_URL="file:.dev.db"
JWT_SECRET="tu_jwt_secret_aqui"
PORT=3000
```

Puedes generar un JWT_SECRET seguro de esta forma: 

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

___

## Endpoints

La documentacion interactiva esta disponible en: 

```
http://localhost:3000/api-docs
```


Esta API se encuentra en desarrollo por SkullDev81 con licencia MIT