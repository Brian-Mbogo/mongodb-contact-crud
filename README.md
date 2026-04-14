# MongoDB Contact CRUD (Checkpoint)

You’re doing a simple CRUD practice with MongoDB:

- Database: `contact`
- Collection: `contactlist`
- Documents: 5 contacts (given in the checkpoint)
- Then: find / filter / update / delete, and save screenshots as proof.

If you follow the steps below **one by one**, you’ll get all the required screenshots in order.

---

## 1) Start MongoDB

Make sure MongoDB is running first.

- If you installed MongoDB as a service on Windows, it may already be running.
- Otherwise, start it in a terminal:
  - `mongod`

Then open Mongo shell:
- `mongosh`

---

## 2) Run the commands + take screenshots (recommended)

After each step, take a screenshot and save it into `screenshots/` with the exact filename shown.

### 01 — Select the database
Command:
```js
use contact
```
Save screenshot as: `screenshots/01-use-db.png`

### 02 — Create the collection
Command:
```js
db.createCollection("contactlist")
```
Save screenshot as: `screenshots/02-create-collection.png`

### 03 — Insert the 5 documents
Command:
```js
db.contactlist.insertMany([
  { lastName: "Ben", firstName: "Moris", email: "ben@gmail.com", age: 26 },
  { lastName: "Kefi", firstName: "Seif", email: "kefi@gmail.com", age: 15 },
  { lastName: "Emilie", firstName: "brouge", email: "emilie.b@gmail.com", age: 40 },
  { lastName: "Alex", firstName: "brown", age: 4 },
  { lastName: "Denzel", firstName: "Washington", age: 3 }
])
```
Save screenshot as: `screenshots/03-insert.png`

### 04 — Display all contacts
Command:
```js
db.contactlist.find()
```
Save screenshot as: `screenshots/04-find-all.png`

### 05 — Display one person by ID
1) Copy an `_id` from step 04 output  
2) Run (replace the ID):
```js
db.contactlist.findOne({ _id: ObjectId("PASTE_ID_HERE") })
```
Save screenshot as: `screenshots/05-find-by-id.png`

### 06 — Display contacts with age > 18
Command:
```js
db.contactlist.find({ age: { $gt: 18 } })
```
Save screenshot as: `screenshots/06-age-over-18.png`

### 07 — Age > 18 AND name contains "ah"
Command (checks `firstName` OR `lastName`):
```js
db.contactlist.find({
  age: { $gt: 18 },
  $or: [{ firstName: /ah/i }, { lastName: /ah/i }]
})
```
Save screenshot as: `screenshots/07-regex-query.png`

Note: with the provided data, this query can return an empty result. That’s OK — the goal is to show the correct query.

### 08 — Update: change "Kefi Seif" to "Kefi Anis"
Command:
```js
db.contactlist.updateOne(
  { lastName: "Kefi", firstName: "Seif" },
  { $set: { firstName: "Anis" } }
)
```
Save screenshot as: `screenshots/08-update.png`

### 09 — Delete contacts where age < 5
Command:
```js
db.contactlist.deleteMany({ age: { $lt: 5 } })
```
Save screenshot as: `screenshots/09-delete.png`

### 10 — Display all contacts again (final state)
Command:
```js
db.contactlist.find()
```
Save screenshot as: `screenshots/10-final.png`

---

## 3) Replace placeholders (important)

The PNGs currently inside `screenshots/` were placeholders so the folder existed in GitHub.
You must overwrite them with your real screenshots.

Quick check: real screenshots should be **much larger** than ~68 bytes.

---

## 4) Push your real screenshots to GitHub

After you replace the images:
```
git add screenshots/*.png
git commit -m "Add CRUD screenshots"
git push
```

---

## Optional: run the Node script

This repo also includes `contact.js` which runs the same operations and prints results in the terminal:
```
npm install
node contact.js
```

If your MongoDB URI is different, set `MONGODB_URI` first.
