import { type PrismaClient } from '@prisma/client'

import { PrismaConnectionManager } from '@/core/infra/repositories/prisma/prisma-connection-manager.setup'

export abstract class BaseGenericPrismaRepository {
  protected prisma: PrismaClient

  constructor() {
    this.prisma = PrismaConnectionManager.getInstance()
  }
}
