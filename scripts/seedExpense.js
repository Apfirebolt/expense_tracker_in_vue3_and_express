import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Expense from '../server/models/expense.js'; // Adjust path to your model

// Connect to your MongoDB instance
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/expense_track';

// Set your target User ID (Replace with a valid ObjectId from your db)
const TARGET_USER_ID = '6a7cab98cf534e567d4c1607'; 

const EXPENSE_CATEGORIES = [
  {
    type: 'Groceries',
    merchants: ['Trader Joe\'s', 'Whole Foods', 'Walmart', 'Local Supermarket', 'Costco'],
    min: 15,
    max: 220,
  },
  {
    type: 'Dining Out',
    merchants: ['Starbucks', 'Chipotle', 'Local Diner', 'Pizzeria', 'Sushi Bar', 'Noodle House'],
    min: 5,
    max: 95,
  },
  {
    type: 'Utilities',
    merchants: ['Electric Bill', 'Water Utility', 'Fiber Internet', 'Mobile Plan'],
    min: 35,
    max: 180,
  },
  {
    type: 'Transport',
    merchants: ['Gas Station', 'Uber Ride', 'Metro Pass', 'Parking Garage'],
    min: 10,
    max: 60,
  },
  {
    type: 'Entertainment',
    merchants: ['Cinema Tickets', 'Steam Store', 'Concert Pass', 'Bookstore', 'Bowling Alley'],
    min: 12,
    max: 140,
  },
  {
    type: 'Health & Wellness',
    merchants: ['CVS Pharmacy', 'Gym Membership', 'Dental Clinic', 'Walgreens'],
    min: 15,
    max: 150,
  },
];

async function seedData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB...');

    const expensesToInsert = [];
    const startDate = new Date('2026-05-01T00:00:00.000Z');
    const endDate = new Date(); // Present date

    for (let i = 0; i < 300; i++) {
      // Pick random category configuration
      const config = faker.helpers.arrayElement(EXPENSE_CATEGORIES);
      const merchant = faker.helpers.arrayElement(config.merchants);

      // Generate realistic price
      const amount = faker.number.float({
        min: config.min,
        max: config.max,
        fractionDigits: 2,
      });

      // Generate a random date between May 1, 2026 and Today
      const randomDate = faker.date.between({ from: startDate, to: endDate });

      expensesToInsert.push({
        amount,
        type: config.type,
        description: merchant,
        user: new mongoose.Types.ObjectId(TARGET_USER_ID),
        // Explicitly set timestamps to override default Date.now()
        createdAt: randomDate,
        updatedAt: randomDate,
      });
    }

    // Sort chronologically before inserting
    expensesToInsert.sort((a, b) => a.createdAt - b.createdAt);

    // Insert all records in a single bulk operation
    await Expense.insertMany(expensesToInsert);
    console.log(`Successfully seeded 300 expenses for user ${TARGET_USER_ID}!`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedData();