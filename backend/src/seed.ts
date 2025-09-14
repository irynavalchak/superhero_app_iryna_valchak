import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Superhero from './models/Superhero.js';

dotenv.config({ path: './.env' });

const seedSuperheroes = [
  {
    nickname: 'Superman',
    real_name: 'Clark Kent',
    origin_description: 'He was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, just before Krypton\'s destruction.',
    superpowers: ['Superhuman strength', 'flight', 'invulnerability', 'super speed', 'heat vision', 'freeze breath', 'x-ray vision', 'superhuman hearing'],
    catch_phrase: 'Up, up and away!',
    images: ['uploads/superman.jpg']
  },
  {
    nickname: 'Batman',
    real_name: 'Bruce Wayne',
    origin_description: 'After witnessing the murder of his parents as a child, he swore revenge on criminals, an oath tempered by a sense of justice. He trains himself physically and intellectually and crafts a bat-inspired persona to fight crime.',
    superpowers: ['Exceptional martial artist', 'combat strategy', 'inexhaustible wealth', 'brilliant deductive skill'],
    catch_phrase: "I'm Batman.",
    images: ['uploads/batman.jpg']
  },
  {
    nickname: 'Wonder Woman',
    real_name: 'Diana Prince',
    origin_description: 'She is the daughter of Hippolyta, Queen of the Amazons and Zeus, the mightiest of the Gods of Olympus. Diana was trained in the arts of combat and diplomacy.',
    superpowers: ['Superhuman strength', 'speed', 'durability', 'flight', 'healing factor'],
    catch_phrase: 'For the entire world!',
    images: ['uploads/wonderwoman.jpg']
  }
];

const seedDB = async () => {
  await connectDB();

  try {
    await Superhero.deleteMany({});
    console.log('Superheroes deleted.');

    await Superhero.insertMany(seedSuperheroes);
    console.log('Superheroes seeded.');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
