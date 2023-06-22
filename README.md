# PermitFlow Assessment

This is a blank Next.js application that you can use to submit your PermitFlow assessment. We've included:

- TypeScript
- Tailwind
- Prisma

## Containers

We've also included Postgres and Redis containers. To spin them up, use:

```
docker compose up -d
```

which will start a Postgres container on `localhost:5432` and a Redis container on `localhost:6379`.

## Starting the dev server

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

`app/page.tsx` is the entrypoint for the app.
