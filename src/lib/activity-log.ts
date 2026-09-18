import { prisma } from './prisma'

export class ActivityLogService {
  static async log(action: string, entity: string, entityId?: string, userId?: string, details?: any) {
    try {
      await prisma.activityLog.create({
        data: {
          action,
          entity,
          entityId: entityId || null,
          userId: userId || null,
          details: details ? JSON.stringify(details) : null,
        },
      })
    } catch (error) {
      console.error('Failed to create activity log:', error)
    }
  }
}
