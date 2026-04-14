# MongoDB Contact CRUD (Checkpoint)

Goal (exact):
- Database name: `contact`
- Collection name: `contactlist`
- Insert 5 documents, then run the required CRUD queries
- Save 10 screenshots in `screenshots/` with the exact filenames

Follow these steps exactly, in order.

---

## Step 1 — Start MongoDB + open `mongosh`

Open two terminals:

Terminal 1 (keeps MongoDB running):
```
mongod
```

Terminal 2 (Mongo shell):
```
mongosh
```

---

## Step 2 — Run commands and save screenshots (01 -> 10)

After every command, take a screenshot and save it into `screenshots/` with the exact filename shown.

Windows screenshot shortcut: `Win + Shift + S` (then save the image with the required name).

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

With the provided data, this query returns an empty result (`[]`). That is correct for this dataset.

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

The PNGs currently inside `screenshots/` are placeholders. Overwrite them with your real screenshots.

Quick check (real screenshots are much larger than ~68 bytes):
```
dir screenshots\*.png
```

---

## 4) Push your real screenshots to GitHub

After you replace the images, run:
```
git add screenshots/*.png
git commit -m "Add CRUD screenshots"
git push
```

---

## Run the Node script (optional)

This repo includes `contact.js` which runs the same operations and prints results in the terminal:
```
npm install
node contact.js
```

If your MongoDB URI is different, set `MONGODB_URI` first.
