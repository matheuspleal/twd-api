import { type FastifyInstance } from 'fastify'

import { fastifyRouterAdapter } from '@/main/adapters/fastify-router.adapter'
import { makeFetchMoviesController } from '@/main/factories/movies/presentation/controllers/fetch-movies-controller.factory'
import {
  type FetchMoviesControllerRequest,
  type FetchMoviesControllerResponse,
} from '@/modules/movies/presentation/controllers/fetch-movies.controller'

const fetchMoviesPrefix = '/movies'

export default async function moviesRouter(app: FastifyInstance) {
  app.get(
    fetchMoviesPrefix,
    fastifyRouterAdapter<
      FetchMoviesControllerRequest,
      FetchMoviesControllerResponse
    >(makeFetchMoviesController()),
  )
}
