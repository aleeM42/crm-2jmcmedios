// ==============================================
// model/contacto.model.js — Queries Prisma para CONTACTO
// ==============================================

import prisma from '../config/db.js';

export const findAll = async () => {
  return prisma.contacto.findMany({
    include: { cliente: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const findById = async (id) => {
  return prisma.contacto.findUnique({
    where: { id: Number(id) },
    include: { cliente: true },
  });
};

export const findByClienteId = async (clienteId) => {
  return prisma.contacto.findMany({
    where: { clienteId: Number(clienteId) },
    orderBy: { esPrincipal: 'desc' },
  });
};

export const create = async (data) => {
  return prisma.contacto.create({ data });
};

export const update = async (id, data) => {
  return prisma.contacto.update({
    where: { id: Number(id) },
    data,
  });
};

export const remove = async (id) => {
  return prisma.contacto.delete({
    where: { id: Number(id) },
  });
};
