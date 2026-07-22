import { Router } from 'express';
import {
  registerMemberHandler,
  contactMessageHandler,
  getPublicDivisionsHandler,
  getPublicVaultModulesHandler,
  getPublicEventsHandler,
  getPublicShowcasesHandler,
  memberController,
  eventController,
  divisionController,
  showcaseController,
  contactController,
  vaultController
} from '../controllers';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// Health check
router.get('/health', asyncHandler((req: any, res: any) => {
  res.json({ status: 'ok', service: 'ComitUPB Backend API Server', timestamp: new Date().toISOString() });
}));

// Public Endpoints
router.post('/register', asyncHandler(registerMemberHandler));
router.post('/contact', asyncHandler(contactMessageHandler));
router.get('/public/divisions', asyncHandler(getPublicDivisionsHandler));
router.get('/public/vault-modules', asyncHandler(getPublicVaultModulesHandler));
router.get('/public/events', asyncHandler(getPublicEventsHandler));
router.get('/public/showcases', asyncHandler(getPublicShowcasesHandler));

// Admin - Members
router.get('/admin/members', asyncHandler(memberController.getAll));
router.post('/admin/members', asyncHandler(memberController.create));
router.put('/admin/members/:id', asyncHandler(memberController.update));
router.delete('/admin/members/:id', asyncHandler(memberController.delete));

// Admin - Events
router.get('/admin/events', asyncHandler(eventController.getAll));
router.post('/admin/events', asyncHandler(eventController.create));
router.put('/admin/events/:id', asyncHandler(eventController.update));
router.delete('/admin/events/:id', asyncHandler(eventController.delete));

// Admin - Divisions
router.get('/admin/divisions', asyncHandler(divisionController.getAll));
router.post('/admin/divisions', asyncHandler(divisionController.create));
router.put('/admin/divisions/:id', asyncHandler(divisionController.update));
router.delete('/admin/divisions/:id', asyncHandler(divisionController.delete));

// Admin - Showcases
router.get('/admin/showcases', asyncHandler(showcaseController.getAll));
router.post('/admin/showcases', asyncHandler(showcaseController.create));
router.put('/admin/showcases/:id', asyncHandler(showcaseController.update));
router.delete('/admin/showcases/:id', asyncHandler(showcaseController.delete));

// Admin - Messages
router.get('/admin/messages', asyncHandler(contactController.getAll));
router.put('/admin/messages/:id', asyncHandler(contactController.update));
router.delete('/admin/messages/:id', asyncHandler(contactController.delete));

// Admin - Vault Modules
router.get('/admin/vault', asyncHandler(vaultController.getAll));
router.post('/admin/vault', asyncHandler(vaultController.create));
router.put('/admin/vault/:id', asyncHandler(vaultController.update));
router.delete('/admin/vault/:id', asyncHandler(vaultController.delete));

export default router;
