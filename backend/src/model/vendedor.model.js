// ==============================================
// model/vendedor.model.js — Queries Prisma para VENDEDOR
// ==============================================

import prisma from '../config/db.js';

export const findAll = async () => {
  return prisma.vendedor.findMany({
    include: { clientes: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const findById = async (id) => {
  return prisma.vendedor.findUnique({
    where: { id: Number(id) },
    include: { clientes: true, visitas: true },
  });
};

export const create = async (data) => {
  return prisma.vendedor.create({ data });
};

export const update = async (id, data) => {
  return prisma.vendedor.update({
    where: { id: Number(id) },
    data,
  });
};

export const remove = async (id) => {
  return prisma.vendedor.update({
    where: { id: Number(id) },
    data: { activo: false },
  });
};
