import { type UserPersistence } from '@/modules/users/application/repositories/persistence/user.contract'
import { UserMapper } from '@/modules/users/application/use-cases/mappers/user.mapper'
import { type UserEntity } from '@/modules/users/domain/entities/user.entity'

import {
  makeUserEntityStub,
  makeUserEntityCollectionStub,
} from '#/modules/users/domain/@mocks/user-entity.stub'
import {
  makeUserCollectionPersistenceStub,
  makeUserPersistenceStub,
} from '#/modules/users/infra/@mocks/user-persistence.stub'

describe('UserMapper', () => {
  let length: number
  let userEntity: UserEntity
  let userCollectionEntity: UserEntity[]
  let userPersistence: UserPersistence
  let userCollectionPersistence: UserPersistence[]

  beforeAll(() => {
    length = 20
    userEntity = makeUserEntityStub()
    userCollectionEntity = makeUserEntityCollectionStub({ length })
    userPersistence = makeUserPersistenceStub()
    userCollectionPersistence = makeUserCollectionPersistenceStub({
      length,
    })
  })

  it('should be able to map UserEntity instance to a UserDTO object', () => {
    const entityToDTO = UserMapper.toDTO(userEntity)

    expect(entityToDTO).toEqual({
      id: userEntity.id.toString(),
      fullName: userEntity.fullName,
      birthdate: userEntity.birthdate.toValue(),
      email: userEntity.email.toString(),
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    })
  })

  it('should be able to map a collection of UserEntity instances to a collection of UserDTO objects', () => {
    const entityCollectionToDTOCollection =
      UserMapper.toCollectionDTO(userCollectionEntity)

    entityCollectionToDTOCollection.forEach((item, index) => {
      expect(item).toEqual({
        id: userCollectionEntity[index].id.toString(),
        fullName: userCollectionEntity[index].fullName,
        birthdate: userCollectionEntity[index].birthdate.toValue(),
        email: userCollectionEntity[index].email.toString(),
        createdAt: userCollectionEntity[index].createdAt,
        updatedAt: userCollectionEntity[index].updatedAt,
      })
    })
  })

  it('should be able to map UserEntity instance to a UserPersistence object', () => {
    const entityToPersistence = UserMapper.toPersistence(userEntity)

    expect(entityToPersistence).toEqual({
      id: userEntity.id.toString(),
      fullName: userEntity.fullName,
      birthdate: userEntity.birthdate.toValue(),
      email: userEntity.email.toString(),
      password: userEntity.password,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    })
  })

  it('should be able to map a collection of UserEntity instances to a collection of UserPersistence objects', () => {
    const entityCollectionToPersistenceCollection =
      UserMapper.toCollectionPersistence(userCollectionEntity)

    entityCollectionToPersistenceCollection.forEach((item, index) => {
      expect(item).toEqual({
        id: userCollectionEntity[index].id.toString(),
        fullName: userCollectionEntity[index].fullName,
        birthdate: userCollectionEntity[index].birthdate.toValue(),
        email: userCollectionEntity[index].email.toString(),
        password: userCollectionEntity[index].password,
        createdAt: userCollectionEntity[index].createdAt,
        updatedAt: userCollectionEntity[index].updatedAt,
      })
    })
  })

  it('should be able to map UserPersistence object to UserEntity instance', () => {
    const persistenceToEntity = UserMapper.toDomain(userPersistence)

    const birthdate = userPersistence.birthdate
    birthdate.setUTCHours(0, 0, 0, 0)

    expect(persistenceToEntity.id.toValue()).toEqual(userPersistence.id)
    expect(persistenceToEntity.fullName).toEqual(userPersistence.fullName)
    expect(persistenceToEntity.birthdate.toValue()).toEqual(birthdate)
    expect(persistenceToEntity.email.toValue()).toEqual(userPersistence.email)
    expect(persistenceToEntity.createdAt).toEqual(userPersistence.createdAt)
    expect(persistenceToEntity.updatedAt).toEqual(userPersistence.updatedAt)
  })

  it('should be able to map a userPersistence objects to collection of UserEntity instances', () => {
    const persistenceCollectionToEntityCollection =
      UserMapper.toCollectionDomain(userCollectionPersistence)

    const birthdate = userPersistence.birthdate
    birthdate.setUTCHours(0, 0, 0, 0)

    persistenceCollectionToEntityCollection.forEach((item, index) => {
      const birthdate = userCollectionPersistence[index].birthdate
      birthdate.setUTCHours(0, 0, 0, 0)

      expect(item.id.toValue()).toEqual(userCollectionPersistence[index].id)
      expect(item.fullName).toEqual(userCollectionPersistence[index].fullName)
      expect(item.birthdate.toValue()).toEqual(birthdate)
      expect(item.email.toValue()).toEqual(
        userCollectionPersistence[index].email,
      )
      expect(item.createdAt).toEqual(userCollectionPersistence[index].createdAt)
      expect(item.updatedAt).toEqual(userCollectionPersistence[index].updatedAt)
    })
  })
})
