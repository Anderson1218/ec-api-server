const collectionRef = require("../models/Collections");

const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

exports.getAllCollections = async (req, res) => {
  try {
    const snapshot = await collectionRef.get();
    const collections = convertCollectionsSnapshotToMap(snapshot);
    res.json(collections);
  } catch (err) {
    res.status(422).send(err);
  }
};

exports.getCollectionById = async (req, res) => {
  try {
    const id = req.params.id;
    const snapshot = await collectionRef.get();
    const collections = convertCollectionsSnapshotToMap(snapshot);
    res.json(collections[id]);
  } catch (err) {
    res.status(422).send(err);
  }
};
