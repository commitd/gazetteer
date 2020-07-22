import React from 'react'
import useSWR from 'swr'
import { Await } from '../Await'
import { Keywords } from '.'

interface KeywordData {
  [keyword: string]: number
}

const fetcher = async (url: string): Promise<KeywordData> =>
  fetch(url).then((r) => (r.json() as unknown) as KeywordData)

export interface KeywordsContainerProps {
  type: string
  navigate: undefined | ((path: string) => void)
}

export const KeywordsContainer: React.FC<KeywordsContainerProps> = ({
  type,
}: KeywordsContainerProps) => {
  const { data: keywords, error, mutate } = useSWR<KeywordData, Error>(
    `/api/v1/keywords/${type}`,
    fetcher
  )

  const handleDelete = async (toDelete: string[]): Promise<void> => {
    if (keywords === undefined) {
      return
    }
    await fetch(`/api/v1/keywords/${type}`, {
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

  const handleAdd = async (type: string, toAdd: string): Promise<void> => {
    if (keywords === undefined) {
      return
    }
    const parsed = toAdd.split('\n').map((keyword) => keyword.trim())
    await fetch(`/api/v1/keywords/${type}`, {
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
    <Await condition={keywords !== undefined} error={error}>
      <Keywords
        type={type}
        keywords={keywords ?? {}}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
    </Await>
  )
}
