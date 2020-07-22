import React from 'react'
import { Routes } from './Routes'
import { renderWithRouter } from './utils/test'

test('renders without error', () => {
  renderWithRouter(<Routes />)
})

// test('full app rendering/navigating', async () => {
//   // Just to check no requests are being made
//   const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(
//     async (...args): Promise<Response> => {
//       console.error(...args)
//       return Promise.resolve({} as Response)
//     }
//   )

//   try {
//     const {
//       getByTestId,
//       history: { navigate },
//     } = renderWithRouter(<Routes />)

//     expect(getByTestId('Home')).toBeDefined()
//     await act(
//       async () =>
//         // with reach-router we don't need to simulate a click event, we can just transition
//         // to the page using the navigate function returned from the history object.
//         await navigate('/')
//     )
//     expect(getByTestId('Home')).toBeDefined()
//   } finally {
//     fetchSpy.mockRestore()
//   }
// }, 30000)

test('landing on a bad page', () => {
  const { getByTestId } = renderWithRouter(
    <Routes />,
    '/something-that-does-not-match'
  )
  expect(getByTestId('NotFound')).toBeDefined()
})
