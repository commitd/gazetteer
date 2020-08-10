import React from 'react'
import useSWR from 'swr'
import { Types } from '.'
import { Type, TypeConfig } from '../../types/server-types'
import { Await } from '../Await'

export interface TypesProps {
  navigate: undefined | ((path: string) => void)
}

/**
 * Types container
 */
export const TypesContainer: React.FC<TypesProps> = ({
  navigate,
}: TypesProps) => {
  const { data: types, error, mutate } = useSWR<Type[], Error>('/api/v1/types')

  const handleDelete = async (type: Type): Promise<void> => {
    if (types === undefined) {
      return
    }
    await fetch(`/api/v1/types/${type.id}`, {
      method: 'DELETE',
    })
    await mutate(
      types.filter((t) => t.id === type.id),
      true
    )
  }

  const handleAdd = async (config: TypeConfig): Promise<void> => {
    if (types === undefined) {
      return
    }
    const response: Response = await fetch(`/api/v1/types`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    })

    if (response.ok) {
      const newType = {
        id: (response.body as unknown) as string,
        value: '',
        ignoreOverlaps: true,
        onlyWholeWords: true,
        onlyWholeWordsWhiteSpaceSeparated: false,
        ignoreCase: false,
        ...config,
      }
      await mutate([...types, newType], true)
    }
  }

  const handleUpdate = async (
    type: Type,
    config: TypeConfig
  ): Promise<void> => {
    if (types === undefined) {
      return
    }
    const response: Response = await fetch(`/api/v1/types/${type.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    })

    if (response.ok) {
      await mutate(
        [...types.filter((t) => t.id !== type.id), { ...type, ...config }],
        true
      )
    }
  }

  const handleSelect = (type: Type): void => {
    navigate !== undefined && navigate(`/types/${type.id}`)
  }

  return (
    <Await condition={types !== undefined} error={error}>
      <Types
        types={types ?? []}
        onSelect={handleSelect}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
      />
    </Await>
  )
}
