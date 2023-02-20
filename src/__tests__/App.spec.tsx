// @ts-nocheck
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { describe, it } from 'vitest'

/**
 * @vitest-environment happy-dom
 */

// // import '@testing-library/jest-dom'
import App from '@/App'

describe('App', () => {
  it('renders without crashing', () => {
    void render(<App />).findAllByText('Pay Tracker')
  })

  it('renders the title', () => {
    const app = render(<App />).getAllByText('Pay Tracker')

    expect(app).toBeInTheDocument()
  })
})

//   it('renders the title', () => {
//     const { getByText } = render(<App />)
//     console.log(getByText('Pay Tracker'))

//     expect(screen.getByText('Pay Tracker')).toBeInTheDocument()
//   })

// test('full app rendering/navigating', async () => {
//   render(<App />, { wrapper: BrowserRouter })
//   const user = userEvent.setup()

//   // verify page content for default route
//   expect(screen.getByText(/Pay Tracker/i)).toBeInTheDocument()

//   // verify page content for expected route after navigating
//   await user.click(screen.getByText(/about/i))
//   expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
// })

// test('landing on a bad page', () => {
//   const badRoute = '/some/bad/route'

//   // use <MemoryRouter> when you want to manually control the history
//   render(
//     <MemoryRouter initialEntries={[badRoute]}>
//       <App />
//     </MemoryRouter>
//   )

//   // verify navigation to "no match" route
//   expect(screen.getByText(/no match/i)).toBeInTheDocument()
// })

// test('rendering a component that uses useLocation', () => {
//   const route = '/some-route'

//   // use <MemoryRouter> when you want to manually control the history
//   render(
//     <MemoryRouter initialEntries={[route]}>
//       <LocationDisplay />
//     </MemoryRouter>
//   )

//   // verify location display is rendered
//   expect(screen.getByTestId('location-display')).toHaveTextContent(route)
// })
