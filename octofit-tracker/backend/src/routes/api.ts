import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const router = Router();

type Model = typeof User;

function registerCrudRoutes(path: string, model: Model) {
  router.get(path, async (_request, response, next) => {
    try {
      response.json(await model.find().lean());
    } catch (error) {
      next(error);
    }
  });

  router.post(path, async (request, response, next) => {
    try {
      const document = await model.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      next(error);
    }
  });

  router.get(`${path}:id`, async (request, response, next) => {
    try {
      const document = await model.findById(request.params.id).lean();
      if (!document) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.json(document);
    } catch (error) {
      next(error);
    }
  });

  router.patch(`${path}:id`, async (request, response, next) => {
    try {
      const document = await model.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true,
      }).lean();
      if (!document) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.json(document);
    } catch (error) {
      next(error);
    }
  });

  router.delete(`${path}:id`, async (request, response, next) => {
    try {
      const document = await model.findByIdAndDelete(request.params.id).lean();
      if (!document) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  });
}

registerCrudRoutes('/users/', User);
registerCrudRoutes('/teams/', Team);
registerCrudRoutes('/activities/', Activity);
registerCrudRoutes('/workouts/', Workout);

router.get('/leaderboard/', async (_request, response, next) => {
  try {
    const entries = await Leaderboard.find().sort({ points: -1 }).populate('userId', 'username email').lean();
    response.json(entries.map((entry, index) => ({ ...entry, rank: index + 1 })));
  } catch (error) {
    next(error);
  }
});

registerCrudRoutes('/leaderboard/', Leaderboard);

export default router;
