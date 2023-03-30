require('dotenv').config();
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const { ObjectId, MongoClient } = require('mongodb');

const salt = 10;

async function seedDB() {
    // Connection URL
    const uri = process.env.MONGODB_URL;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log('Connected to server');

        const userModel = client.db('course_db').collection('users');
        const classModel = client.db('course_db').collection('classes');
        const quizModel = client.db('course_db').collection('quizzes');
        const quizResultModel = client
            .db('course_db')
            .collection('quiz_results');

        const listCollection = (await client.db('course_db').collections()).map(
            (item) => item.collectionName,
        );

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.

        for (let i = 0; i < listCollection.length; i++) {
            if (listCollection.indexOf(listCollection[i]) !== -1) {
                await client
                    .db('course_db')
                    .dropCollection(listCollection[i])
                    .then(() => {
                        console.log('Database deleted');
                    })
                    .catch((e) => {
                        console.log('Database undeleted', e);
                    });
            }
        }

        /**
         * insert to collection classes
         */
        let userRole = [];
        let userMenteeRole = [];
        let userMentorRole = [];

        for (let i = 0; i < 1; i++) {
            const fullname = faker.name.fullName();
            const email =
                faker.helpers.slugify(fullname.toLocaleLowerCase()) +
                '@gmail.com';
            let password = 'UserRole01';
            password = await bcrypt.hash(password, salt);
            const data = {
                fullname,
                email,
                password,
                role: 'mentor',
            };
            userMentorRole.push(data);
        }

        for (let i = 0; i < 10; i++) {
            const fullname = faker.name.fullName();
            const email =
                faker.helpers.slugify(fullname.toLocaleLowerCase()) +
                '@gmail.com';
            let password = 'UserRole02';
            password = await bcrypt.hash(password, salt);
            const data = {
                fullname,
                email,
                password,
                role: 'mentee',
            };
            userMenteeRole.push(data);
        }

        for (let i = 0; i < 5; i++) {
            const fullname = faker.name.fullName();
            const email =
                faker.helpers.slugify(fullname.toLocaleLowerCase()) +
                '@gmail.com';
            let password = 'UserRole03';
            password = await bcrypt.hash(password, salt);
            const data = {
                fullname,
                email,
                password,
                role: 'user',
            };
            userRole.push(data);
        }

        const mentorsRole = await userModel.insertMany(userMentorRole);
        const menteesRole = await userModel.insertMany(userMenteeRole);
        await userModel.insertMany(userRole);

        /**
         * insert to collection classes
         */

        const dataClass = {
            name: 'Basic Coding',
            mentor: mentorsRole.insertedIds['0'],
            mentee: Object.values(menteesRole.insertedIds),
        };

        let addClass = await classModel.insertOne(dataClass);

        /**
         * insert to collection quiz
         */

        const dataQuiz = {
            title: 'Basic Coding',
            question: 'Jelaskan definisi dari HTML !',
            class: new ObjectId(addClass.insertedId.toHexString()),
        };

        const addQuiz = await quizModel.insertOne(dataQuiz);

        await classModel.updateOne(
            {
                _id: new ObjectId(addClass.insertedId.toHexString()),
            },
            {
                $set: {
                    quiz: 'satu',
                },
            },
        );

        await classModel.updateOne(
            {
                _id: new ObjectId(addClass.insertedId.toHexString()),
            },
            {
                $set: {
                    quiz: [new ObjectId(addQuiz.insertedId.toHexString())],
                },
            },
            {
                upsert: true,
            },
        );

        /**
         * insert to collection quiz result
         */

        let dataQuizResult = [];

        for (
            let i = 0;
            i < Object.values(menteesRole.insertedIds).length;
            i++
        ) {
            const mentee = Object.values(menteesRole.insertedIds);
            let score = 100;
            const element = mentee[i];

            const data = {
                quiz: new ObjectId(addQuiz.insertedId.toHexString()),
                mentee: element,
                score: score - i * 10,
            };

            dataQuizResult.push(data);
        }

        await quizResultModel.insertMany(dataQuizResult);

        console.log('Database seeded! :)');
        await client.close();
    } catch (err) {
        console.log(err?.stack ?? err);
    }
}

seedDB();
