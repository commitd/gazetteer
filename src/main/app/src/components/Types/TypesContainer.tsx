import React from 'react'
import useSWR from 'swr'
import { Await } from '../Await'
import { Types } from '.'

const fetcher = async (url: string): Promise<string[]> =>
  fetch(url).then((r): string[] => (r.json() as unknown) as string[])

export interface TypesProps {
  navigate: undefined | ((path: string) => void)
}

/**
 * Types container
 */
export const TypesContainer: React.FC<TypesProps> = ({
  navigate,
}: TypesProps) => {
  const { data: types, error, mutate } = useSWR<string[], Error>(
    '/api/v1/types',
    fetcher
  )

  const handleDelete = async (type: string): Promise<void> => {
    if (types === undefined) {
      return
    }
    await fetch(`/api/v1/keywords/${type}`, {
      method: 'DELETE',
    })
    await mutate(
      types.filter((t) => t === type),
      true
    )
  }

  const handleAdd = async (type: string, keywords: string): Promise<void> => {
    if (types === undefined) {
      return
    }
    await fetch(`/api/v1/keywords/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        keywords.split('\n').map((keyword) => keyword.trim())
      ),
    })
    await mutate([...types, type], true)
  }

  const handleSelect = (type: string): void => {
    navigate !== undefined && navigate(`/types/${type}`)
  }

  return (
    <Await condition={types !== undefined} error={error}>
      <Types
        types={types ?? []}
        onSelect={handleSelect}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
    </Await>
  )
}
