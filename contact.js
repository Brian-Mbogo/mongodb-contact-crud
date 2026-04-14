const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('01 - Using database: contact');

    const db = client.db('contact');
    const collectionName = 'contactlist';

    // 02 - Create collection (MongoDB auto-creates on insert, but we do it explicitly)
    const existingCollections = await db
      .listCollections({ name: collectionName }, { nameOnly: true })
      .toArray();
    if (existingCollections.length === 0) {
      await db.createCollection(collectionName);
      console.log(`02 - Created collection: ${collectionName}`);
    } else {
      console.log(`02 - Collection already exists: ${collectionName}`);
    }

    const collection = db.collection(collectionName);

    // Clear existing data for demo
    await collection.deleteMany({});
    console.log('Cleared existing data in contact.contactlist.');

    // 03 - Insert required contacts
    const contactsToInsert = [
      { lastName: 'Ben', firstName: 'Moris', email: 'ben@gmail.com', age: 26 },
      { lastName: 'Kefi', firstName: 'Seif', email: 'kefi@gmail.com', age: 15 },
      { lastName: 'Emilie', firstName: 'brouge', email: 'emilie.b@gmail.com', age: 40 },
      { lastName: 'Alex', firstName: 'brown', age: 4 },
      { lastName: 'Denzel', firstName: 'Washington', age: 3 }
    ];
    const insertResult = await collection.insertMany(contactsToInsert);
    console.log('03 - Inserted contacts:', JSON.stringify(contactsToInsert, null, 2));

    // 04 - Find all
    const allContacts = await collection.find({}).toArray();
    console.log('04 - Find all contacts:', JSON.stringify(allContacts, null, 2));

    // 05 - Find by ID (pick "Kefi Seif" if present, otherwise first inserted)
    const kefiId = insertResult.insertedIds[1] || allContacts[0]?._id;
    const contactById = kefiId ? await collection.findOne({ _id: kefiId }) : null;
    console.log('05 - Find by ID:', JSON.stringify(contactById, null, 2));

    // 06 - Age over 18
    const adults = await collection.find({ age: { $gt: 18 } }).toArray();
    console.log('06 - Contacts age > 18:', JSON.stringify(adults, null, 2));

    // 07 - Age > 18 and name containing "ah" (matches firstName or lastName)
    const adultsWithAh = await collection
      .find({
        age: { $gt: 18 },
        $or: [{ firstName: { $regex: 'ah', $options: 'i' } }, { lastName: { $regex: 'ah', $options: 'i' } }]
      })
      .toArray();
    console.log('07 - Contacts age > 18 and name contains "ah":', JSON.stringify(adultsWithAh, null, 2));

    // 08 - Update: Change first name from "Kefi Seif" to "Kefi Anis"
    await collection.updateOne({ lastName: 'Kefi', firstName: 'Seif' }, { $set: { firstName: 'Anis' } });
    const updatedKefi = await collection.findOne({ lastName: 'Kefi' });
    console.log('08 - Updated contact:', JSON.stringify(updatedKefi, null, 2));

    // 09 - Delete contacts aged under < 5
    const deleteResult = await collection.deleteMany({ age: { $lt: 5 } });
    console.log(`09 - Deleted contacts age < 5: ${deleteResult.deletedCount}`);

    // 10 - Display all contacts again
    const finalContacts = await collection.find({}).toArray();
    console.log('10 - Final contacts after operations:', JSON.stringify(finalContacts, null, 2));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB.');
  }
}

main().catch(console.dir);

