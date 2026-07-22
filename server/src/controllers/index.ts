import { Request, Response } from 'express';
import {
  MemberService,
  ContactService,
  DivisionService,
  EventService,
  ShowcaseService,
  VaultService
} from '../services';
import { BadRequestError, NotFoundError } from '../utils/errors';

const getIdParam = (req: Request): string => {
  const { id } = req.params;
  const param = Array.isArray(id) ? id[0] : id;
  if (!param) throw new BadRequestError('ID parameter wajib disertakan.');
  return param;
};

// Public Handlers
export const registerMemberHandler = async (req: Request, res: Response) => {
  const { name, email, phone_number, major, divisionInterest, reason } = req.body;
  if (!name || !name.trim()) {
    throw new BadRequestError('Nama lengkap wajib diisi.');
  }
  if (!email || !email.includes('@')) {
    throw new BadRequestError('Alamat email tidak valid.');
  }

  const data = await MemberService.register({ name, email, phone_number, major, divisionInterest, reason });
  res.status(201).json({
    success: true,
    message: 'Pendaftaran berhasil! Data kamu sudah tersimpan dan menunggu verifikasi pengurus ComitUPB.',
    data
  });
};

export const contactMessageHandler = async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    throw new BadRequestError('Semua field pesan wajib diisi.');
  }

  const data = await ContactService.sendMessage({ name, email, subject, message });
  res.json({
    success: true,
    message: 'Pesan Anda berhasil terkirim! Tim ComitUPB akan segera merespons.',
    data
  });
};

export const getPublicDivisionsHandler = async (req: Request, res: Response) => {
  const data = await DivisionService.getAll();
  res.json({ success: true, data });
};

export const getPublicVaultModulesHandler = async (req: Request, res: Response) => {
  const data = await VaultService.getPublished();
  res.json({ success: true, data });
};

export const getPublicEventsHandler = async (req: Request, res: Response) => {
  const data = await EventService.getAll();
  res.json({ success: true, data });
};

export const getPublicShowcasesHandler = async (req: Request, res: Response) => {
  const data = await ShowcaseService.getAll();
  res.json({ success: true, data });
};

// Admin Controllers
export const memberController = {
  getAll: async (req: Request, res: Response) => {
    const data = await MemberService.getAll();
    res.json({ success: true, data });
  },
  create: async (req: Request, res: Response) => {
    const data = await MemberService.create(req.body);
    res.status(201).json({ success: true, data });
  },
  update: async (req: Request, res: Response) => {
    const data = await MemberService.update(getIdParam(req), req.body);
    if (!data) throw new NotFoundError('Data member tidak ditemukan.');
    res.json({ success: true, data });
  },
  delete: async (req: Request, res: Response) => {
    await MemberService.delete(getIdParam(req));
    res.json({ success: true, message: 'Member deleted' });
  }
};

export const eventController = {
  getAll: async (req: Request, res: Response) => {
    const data = await EventService.getAll();
    res.json({ success: true, data });
  },
  create: async (req: Request, res: Response) => {
    const data = await EventService.create(req.body);
    res.status(201).json({ success: true, data });
  },
  update: async (req: Request, res: Response) => {
    const data = await EventService.update(getIdParam(req), req.body);
    if (!data) throw new NotFoundError('Data event tidak ditemukan.');
    res.json({ success: true, data });
  },
  delete: async (req: Request, res: Response) => {
    await EventService.delete(getIdParam(req));
    res.json({ success: true, message: 'Event deleted' });
  }
};

export const divisionController = {
  getAll: async (req: Request, res: Response) => {
    const data = await DivisionService.getAll();
    res.json({ success: true, data });
  },
  create: async (req: Request, res: Response) => {
    const data = await DivisionService.create(req.body);
    res.status(201).json({ success: true, data });
  },
  update: async (req: Request, res: Response) => {
    const data = await DivisionService.update(getIdParam(req), req.body);
    if (!data) throw new NotFoundError('Data divisi tidak ditemukan.');
    res.json({ success: true, data });
  },
  delete: async (req: Request, res: Response) => {
    await DivisionService.delete(getIdParam(req));
    res.json({ success: true, message: 'Division deleted' });
  }
};

export const showcaseController = {
  getAll: async (req: Request, res: Response) => {
    const data = await ShowcaseService.getAll();
    res.json({ success: true, data });
  },
  create: async (req: Request, res: Response) => {
    const data = await ShowcaseService.create(req.body);
    res.status(201).json({ success: true, data });
  },
  update: async (req: Request, res: Response) => {
    const data = await ShowcaseService.update(getIdParam(req), req.body);
    if (!data) throw new NotFoundError('Data showcase tidak ditemukan.');
    res.json({ success: true, data });
  },
  delete: async (req: Request, res: Response) => {
    await ShowcaseService.delete(getIdParam(req));
    res.json({ success: true, message: 'Showcase deleted' });
  }
};

export const contactController = {
  getAll: async (req: Request, res: Response) => {
    const data = await ContactService.getAll();
    res.json({ success: true, data });
  },
  update: async (req: Request, res: Response) => {
    const data = await ContactService.update(getIdParam(req), req.body);
    if (!data) throw new NotFoundError('Data pesan tidak ditemukan.');
    res.json({ success: true, data });
  },
  delete: async (req: Request, res: Response) => {
    await ContactService.delete(getIdParam(req));
    res.json({ success: true, message: 'Message deleted' });
  }
};

export const vaultController = {
  getAll: async (req: Request, res: Response) => {
    const data = await VaultService.getAll();
    res.json({ success: true, data });
  },
  create: async (req: Request, res: Response) => {
    const data = await VaultService.create(req.body);
    res.status(201).json({ success: true, data });
  },
  update: async (req: Request, res: Response) => {
    const data = await VaultService.update(getIdParam(req), req.body);
    if (!data) throw new NotFoundError('Modul vault tidak ditemukan.');
    res.json({ success: true, data });
  },
  delete: async (req: Request, res: Response) => {
    await VaultService.delete(getIdParam(req));
    res.json({ success: true, message: 'Vault module deleted' });
  }
};
