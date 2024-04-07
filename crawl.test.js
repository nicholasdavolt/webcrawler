const { test, expect } = require('@jest/globals')
const {normalizeURL, getURLsFromHTML } = require('./crawl.js')

test('https://blog.boot.dev/path/ becomes blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})

test('https://blog.boot.dev/path becomes blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})

test('http://blog.boot.dev/path/ becomes blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})


test('http://blog.boot.dev/path becomes blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})

test('http://blog.boot.dev/path becomes blog.boot.dev/path', () => {
    expect(normalizeURL('https://BLOG.boot.dev/path/')).toBe('blog.boot.dev/path')
})

test('getURLsFromHTML count test', () => {
    const htmlBody = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>'
    const baseUrl = 'https://blog.boot.dev'

    expect(getURLsFromHTML(htmlBody, baseUrl).length).toBe(3)
})

test('getURLsFromHTML relative test', () => {
    const htmlBody = '<html><body><a href="/testing/complete.html"><span>Go to Boot.dev</span></body></html>'
    const baseUrl = 'https://blog.boot.dev'

    expect(getURLsFromHTML(htmlBody, baseUrl)[0]).toBe('https://blog.boot.dev/testing/complete.html')
})

test('getURLsFromHTML absolute test', () => {
    const htmlBody = '<html><body><a href="https://blog.boot.dev/testing/complete.html"><span>Go to Boot.dev</span></body></html>'
    const baseUrl = 'https://blog.boot.dev'

    expect(getURLsFromHTML(htmlBody, baseUrl)[0]).toBe('https://blog.boot.dev/testing/complete.html')
})