// Infrastructure/Routes/GamerRoutes.ts
import { Router } from 'express';
import { GamerController } from '../Controllers/GamerControllers';

export function RegisterGamerRoutes(
  router: Router,
  gamerController: GamerController
): void {
  const gamerGroup = Router();

  gamerGroup.get('/', (req, res) =>
    gamerController.getAllGamers(req, res)
  );
  gamerGroup.get('/:id', (req, res) =>
    gamerController.getGamerById(req, res)
  );
  gamerGroup.post('/', (req, res) =>
    gamerController.createGamer(req, res)
  );
  gamerGroup.put('/:id', (req, res) =>
    gamerController.updateGamer(req, res)
  );
  gamerGroup.delete('/:id', (req, res) =>
    gamerController.deleteGamer(req, res)
  );

  router.use('/gamers', gamerGroup);
}