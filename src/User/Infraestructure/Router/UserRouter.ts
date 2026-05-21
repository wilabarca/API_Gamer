// Infrastructure/Routes/UserRoutes.ts
import { Router } from 'express';
import { UserController } from '../Controllers/UserControllers';

export function RegisterUserRoutes(
  router: Router,
  userController: UserController
): void {
  const userGroup = Router();

  userGroup.get('/', (req, res) =>
    userController.getAllUsers(req, res)
  );
  userGroup.get('/:id', (req, res) =>
    userController.getUserById(req, res)
  );
  userGroup.post('/', (req, res) =>
    userController.createUser(req, res)
  );
  userGroup.put('/:id', (req, res) =>
    userController.updateUser(req, res)
  );
  userGroup.delete('/:id', (req, res) =>
    userController.deleteUser(req, res)
  );

  router.use('/users', userGroup);
}