import camelcaseKeys from 'camelcase-keys'
import {
  type FastifyReply,
  type FastifyRequest,
  type RouteHandlerMethod,
} from 'fastify'
import qs from 'qs'

import { type HttpController } from '@/core/presentation/controllers/http.controller'
import { InternalServerError } from '@/core/presentation/errors/internal-server.error'
import { StatusCode } from '@/core/presentation/helpers/http-response.helper'
import { resolvePaginationParams } from '@/core/shared/helpers/resolve-pagination-params.helper'

export type Filter = Record<string, unknown>

export interface Page {
  offset: string
  limit: string
}

export function fastifyRouterAdapter<
  HttpRequest extends { filter?: Filter; page?: Page },
  Data,
>(controller: HttpController<HttpRequest, Data>): RouteHandlerMethod {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { body, params, query } = request
    const stringfyQuery = qs.stringify(query, {
      arrayFormat: 'comma',
      encode: false,
    })
    const parsedQuery = qs.parse(stringfyQuery, {
      allowDots: false,
      parseArrays: true,
      comma: true,
      depth: 10,
    })
    const { offset, limit } = parsedQuery.page as unknown as Page
    let paginationParams = {
      offset: offset ? Number(offset) : undefined,
      limit: limit ? Number(limit) : undefined,
    }
    if (paginationParams) {
      paginationParams = resolvePaginationParams(paginationParams)
    }
    const { sort = undefined, ...restParsedQuery } = parsedQuery
    const normalizedQuery = camelcaseKeys(
      { ...restParsedQuery, page: { ...paginationParams }, sort },
      { deep: true },
    )
    const payload: HttpRequest = {
      ...(body as any),
      ...(params as any),
      ...normalizedQuery,
    }
    const { statusCode, data } = await controller.handle(payload)
    switch (statusCode) {
      case StatusCode.OK:
      case StatusCode.CREATED:
      case StatusCode.NO_CONTENT:
        return reply.status(statusCode).send(data)
      case StatusCode.BAD_REQUEST:
        'errors' in data
          ? reply.status(statusCode).send({ errors: data.errors })
          : reply.status(statusCode).send({ error: data.message })
        return
      case StatusCode.UNAUTHORIZED:
      case StatusCode.NOT_FOUND:
      case StatusCode.CONFLICT:
        return reply.status(statusCode).send({ error: data.message })
      default:
        return reply
          .status(statusCode)
          .send({ error: new InternalServerError().message })
    }
  }
}
