# MongoDB Contact CRUD (Checkpoint)

This repo contains a small MongoDB CRUD exercise for a `contact` database and a `contactlist` collection.

## What you need
- MongoDB running locally (so `mongod` is up)
- One of:
  - `mongosh` (recommended for the checkpoint screenshots)
  - Node.js (only if you want to run the script)

## Option A (recommended): run in `mongosh` + take screenshots
Open `mongosh`, then follow the commands in `mongosh-commands.md` from step 01 -> 10.

Save your screenshots in `screenshots/` using these exact names:
- `screenshots/01-use-db.png`
- `screenshots/02-create-collection.png`
- `screenshots/03-insert.png`
- `screenshots/04-find-all.png`
- `screenshots/05-find-by-id.png`
- `screenshots/06-age-over-18.png`
- `screenshots/07-regex-query.png`
- `screenshots/08-update.png`
- `screenshots/09-delete.png`
- `screenshots/10-final.png`

Note: with the provided data, the "age > 18 and name contains ah" query can return an empty result. That's fine as long as the query is correct.

## Option B: run the Node.js script (same operations, printed to console)
In the project root:
```
npm install
node contact.js
```

If your MongoDB isn't on localhost, set `MONGODB_URI` first (example):
```
setx MONGODB_URI "mongodb://localhost:27017"
```

## Important
The PNG files currently in `screenshots/` are placeholders - replace them with your real screenshots before you submit.
