package adc.chat.web.dto;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

public class MongoDBJDBC {

	private Datastore datastore;
	private MongoClient mongoClient;
	private String dbName;
	// private MongoDatabase db;

	private static MongoDBJDBC instance;

	public static MongoDBJDBC getInstance() {
		if (instance == null) {
			instance = new MongoDBJDBC();
		}
		return instance;
	}

	private MongoDBJDBC() {
		initDataSource();
	}

	private void initDataSource() {
		try {
			mongoClient = new MongoClient("localhost", 27017);
			dbName = "chat";
			// db = mongoClient.getDatabase("chat");
			System.out.println("Connected to database successfully");

			// boolean auth = db.authenticate(myUserName, myPassword);
			// System.out.println("Authentication: " + auth);

			// Force creation of the collection
			// String collectionName = "messages";
			// db.createCollection(collectionName);

			final Morphia morphia = new Morphia();

			// Tell Morphia where to find your classes
			// can be called multiple times with different packages or classes
			morphia.mapPackage("adc.chat.web.dto");

			// create the Datastore connecting to the default port on the local
			// host
			datastore = morphia.createDatastore(mongoClient, dbName);
			datastore.ensureIndexes();
		} catch (Exception e) {
			System.err.println(e.getClass().getName() + ": " + e.getMessage());
		}
	}

	public Datastore getDataSource() {
		return datastore;
	}
}