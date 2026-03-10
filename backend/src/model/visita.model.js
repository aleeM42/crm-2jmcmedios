// ==============================================
// model/visita.model.js — Queries Prisma para VISITA
// ==============================================

import prisma from '../config/db.js';

export const findAll = async () => {
  return prisma.visita.findMany({
    include: { cliente: true, vendedor: true },
    orderBy: { fecha: 'desc' },
  });
};

export const findById = async (id) => {
  return prisma.visita.findUnique({
    where: { id: Number(id) },
    include: { cliente: true, vendedor: true },
  });
};

export const findByVendedorId = async (vendedorId) => {
  return prisma.visita.findMany({
    where: { vendedorId: Number(vendedorId) },
    include: { cliente: true },
    orderBy: { fecha: 'desc' },
  });
};

export const findByClienteId = async (clienteId) => {
  return prisma.visita.findMany({
    where: { clienteId: Number(clienteId) },
    include: { vendedor: true },
    orderBy: { fecha: 'desc' },
  });
};

export const create = async (data) => {
  return prisma.visita.create({ data });
};

export const update = async (id, data) => {
  return prisma.visita.update({
    where: { id: Number(id) },
    data,
  });
};

export const remove = async (id) => {
  return prisma.visita.delete({
    where: { id: Number(id) },
  });
};
