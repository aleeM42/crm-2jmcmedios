// ==============================================
// model/cliente.model.js — Queries Prisma para CLIENTE
// Regla MVC: TODA la lógica de acceso a datos vive aquí
// ==============================================

import prisma from '../config/db.js';

/**
 * Obtener todos los clientes con sus relaciones
 */
export const findAll = async () => {
  return prisma.cliente.findMany({
    include: { vendedor: true, contactos: true },
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * Obtener un cliente por ID
 */
export const findById = async (id) => {
  return prisma.cliente.findUnique({
    where: { id: Number(id) },
    include: { vendedor: true, contactos: true, visitas: true },
  });
};

/**
 * Crear un nuevo cliente
 */
export const create = async (data) => {
  return prisma.cliente.create({ data });
};

/**
 * Actualizar un cliente existente
 */
export const update = async (id, data) => {
  return prisma.cliente.update({
    where: { id: Number(id) },
    data,
  });
};

/**
 * Eliminar un cliente (soft delete → activo = false)
 */
export const remove = async (id) => {
  return prisma.cliente.update({
    where: { id: Number(id) },
    data: { activo: false },
  });
};
