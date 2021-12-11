## Getting Started

First, run the development server:

```bash
yarn dev
```

Start database server in docker.

```bash
yarn db:setup # only first
yarn db:start
```

## DB

NOTE:

You need add privileges to mysql user by below command in setup this project (need root user).

```
mysql> grant all on *.* to example;
```

`yarn db:*` is Database commands.

- `db:setup`: setup docker volume for mysql.
- `db:start`: start mysql server by docker.
- `db:connect`: connect to mysql server.
- `db:stop`: stop db.
- `db:clean`: remove docker volume for mysql.
