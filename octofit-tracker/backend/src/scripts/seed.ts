import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'maya.chen',
        email: 'maya.chen@mergington.edu',
        profile: { firstName: 'Maya', grade: 10, goal: 'Build running endurance' },
      },
      {
        username: 'jordan.lee',
        email: 'jordan.lee@mergington.edu',
        profile: { firstName: 'Jordan', grade: 11, goal: 'Improve strength' },
      },
      {
        username: 'sam.rivera',
        email: 'sam.rivera@mergington.edu',
        profile: { firstName: 'Sam', grade: 9, goal: 'Stay active every day' },
      },
    ]);

    await Team.insertMany([
      {
        name: 'Morning Movers',
        description: 'A friendly team for before-school workouts.',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Strength Squad',
        description: 'Progressive strength and conditioning goals.',
        members: [users[1]._id],
      },
    ]);

    await Activity.insertMany([
      { userId: users[0]._id, type: 'running', durationMinutes: 32, points: 64, performedAt: new Date('2026-08-29') },
      { userId: users[1]._id, type: 'strength training', durationMinutes: 45, points: 90, performedAt: new Date('2026-08-30') },
      { userId: users[2]._id, type: 'walking', durationMinutes: 38, points: 38, performedAt: new Date('2026-08-31') },
    ]);

    await Leaderboard.insertMany([
      { userId: users[1]._id, points: 420, rank: 1 },
      { userId: users[0]._id, points: 385, rank: 2 },
      { userId: users[2]._id, points: 310, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        title: 'Cardio Starter',
        description: 'A low-impact workout to build a consistent cardio habit.',
        difficulty: 'beginner',
        exercises: [
          { name: 'Brisk walk', durationMinutes: 10 },
          { name: 'Bodyweight squats', repetitions: 12, sets: 2 },
          { name: 'Cool down', durationMinutes: 5 },
        ],
      },
      {
        title: 'Full Body Circuit',
        description: 'A balanced circuit for strength and conditioning.',
        difficulty: 'intermediate',
        exercises: [
          { name: 'Push-ups', repetitions: 10, sets: 3 },
          { name: 'Reverse lunges', repetitions: 12, sets: 3 },
          { name: 'Plank', durationSeconds: 45, sets: 3 },
        ],
      },
    ]);

    const counts = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Activity.countDocuments(),
      Leaderboard.countDocuments(),
      Workout.countDocuments(),
    ]);

    console.log('Database seeding complete', {
      users: counts[0],
      teams: counts[1],
      activities: counts[2],
      leaderboard: counts[3],
      workouts: counts[4],
    });
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
