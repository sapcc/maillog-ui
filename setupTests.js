// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"

// _getCurrentToken returns a promise
// _getCurrentToken is a function that returns a promise
window._getCurrentToken = jest.fn(() => Promise.resolve("token"))
