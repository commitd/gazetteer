import React from 'react'
import useSWR from 'swr'
import { Await } from '../Await'
import { Keywords } from '.'
import { Type } from '../../types/server-types'

interface KeywordData {
  [keyword: string]: number
}

export interface KeywordsContainerProps {
  typeId: string
  navigate: undefined | ((path: string) => void)
}

export const KeywordsContainer: React.FC<KeywordsContainerProps> = ({
  typeId,
}: KeywordsContainerProps) => {
  const { data: type, error: typeError } = useSWR<Type, Error>(
    `/api/v1/types/${typeId}`
  )
  const { data: keywords, error: keywordError, mutate } = useSWR<
    KeywordData,
    Error
  >(`/api/v1/types/${typeId}/keywords`)

  const handleDelete = async (toDelete: string[]): Promise<void> => {
    if (keywords === undefined) {
      return
    }
    await fetch(`/api/v1/types/${typeId}/keywords`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toDelete),
    })

    const newValue = Object.assign({}, keywords)

    toDelete.forEach((k) => delete newValue[`${k}`])
    await mutate(newValue, true)
  }

  const handleAdd = async (toAdd: string): Promise<void> => {
    if (keywords === undefined) {
      return
    }
    const parsed = toAdd
      .split('\n')
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0)
    await fetch(`/api/v1/types/${typeId}/keywords`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsed),
    })

    const newValue = Object.assign({}, keywords)

    parsed.forEach((k) => (newValue[`${k}`] = 0))
    await mutate(newValue, true)
  }

  return (
    <Await
      condition={type !== undefined && keywords !== undefined}
      error={typeError ?? keywordError}
    >
      <Keywords
        type={type}
        keywords={keywords ?? {}}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
    </Await>
  )
}
