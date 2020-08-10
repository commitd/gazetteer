import React from 'react'
import { render, renderDark } from '../../utils/test'
import { Types } from '.'

it('renders without error', () => {
  const { asFragment } = render(
    <Types
      types={[
        {
          id: 'TEST',
          value: 'test',
          ignoreCase: true,
          ignoreOverlaps: false,
          onlyWholeWords: true,
          onlyWholeWordsWhiteSpaceSeparated: false,
        },
        {
          id: 'OTHER',
          value: 'other',
          ignoreCase: false,
          ignoreOverlaps: true,
          onlyWholeWords: false,
          onlyWholeWordsWhiteSpaceSeparated: true,
        },
      ]}
      onSelect={jest.fn()}
      onDelete={jest.fn()}
      onAdd={jest.fn()}
      onUpdate={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <Types
      types={[
        {
          id: 'TEST',
          value: 'test',
          ignoreCase: true,
          ignoreOverlaps: false,
          onlyWholeWords: true,
          onlyWholeWordsWhiteSpaceSeparated: false,
        },
        {
          id: 'OTHER',
          value: 'other',
          ignoreCase: false,
          ignoreOverlaps: true,
          onlyWholeWords: false,
          onlyWholeWordsWhiteSpaceSeparated: true,
        },
      ]}
      onSelect={jest.fn()}
      onDelete={jest.fn()}
      onAdd={jest.fn()}
      onUpdate={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders without types', () => {
  const { asFragment } = render(
    <Types
      types={[]}
      onSelect={jest.fn()}
      onDelete={jest.fn()}
      onAdd={jest.fn()}
      onUpdate={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})
