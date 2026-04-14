# mongosh Commands (Screenshot Guide)

Run `mongosh`, then execute these steps in order and take a screenshot after each step.

## 01 - Use DB
```js
use contact
```

## 02 - Create collection
```js
db.createCollection("contactlist")
```

## 03 - Insert documents
```js
db.contactlist.insertMany([
  { lastName: "Ben", firstName: "Moris", email: "ben@gmail.com", age: 26 },
  { lastName: "Kefi", firstName: "Seif", email: "kefi@gmail.com", age: 15 },
  { lastName: "Emilie", firstName: "brouge", email: "emilie.b@gmail.com", age: 40 },
  { lastName: "Alex", firstName: "brown", age: 4 },
  { lastName: "Denzel", firstName: "Washington", age: 3 }
])
```

## 04 - Display all contacts
```js
db.contactlist.find()
```

## 05 - Display one contact by ID
Copy an `_id` from step 04 output, then run:
```js
db.contactlist.findOne({ _id: ObjectId("PASTE_ID_HERE") })
```

## 06 - Age > 18
```js
db.contactlist.find({ age: { $gt: 18 } })
```

## 07 - Age > 18 and name contains "ah"
(Searches in `firstName` or `lastName`.)
```js
db.contactlist.find({
  age: { $gt: 18 },
  $or: [{ firstName: /ah/i }, { lastName: /ah/i }]
})
```
Note: with the provided data, this query may return an empty result, which is OK.

## 08 - Update: "Kefi Seif" → "Kefi Anis"
```js
db.contactlist.updateOne(
  { lastName: "Kefi", firstName: "Seif" },
  { $set: { firstName: "Anis" } }
)
```

## 09 - Delete contacts age < 5
```js
db.contactlist.deleteMany({ age: { $lt: 5 } })
```

## 10 - Display all contacts (final)
```js
db.contactlist.find()
```
