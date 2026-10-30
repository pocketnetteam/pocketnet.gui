// OG preview tags rendered by php/og.php for link previews (Telegram, WhatsApp, VK, ...)
const { test, describe, before, after } = require('node:test')
const assert = require('node:assert/strict')
const { render, mockProxy } = require('./helpers')

const TELEGRAM = 'TelegramBot (like TwitterBot)'
const CHROME = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'

const DEFAULT_TITLE = 'Bastyon: First Fully Decentralized Social Network on Blockchain'

const AUTHOR = 'PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM'
const POST = 'a'.repeat(64)
const VIDEO = 'b'.repeat(64)
const NOCAPTION = 'c'.repeat(64)
const XSS = 'd'.repeat(64)
const LONGRU = 'e'.repeat(64)

const enc = encodeURIComponent

const shares = {
	[POST]: {
		txid: POST,
		address: AUTHOR,
		c: enc('Тестовый пост'),
		m: enc('Текст публикации'),
		i: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
		u: '',
	},
	[VIDEO]: {
		txid: VIDEO,
		address: AUTHOR,
		c: enc('Видео'),
		m: enc('Описание видео'),
		i: [],
		u: enc('peertube://peertube14.pocketnet.app/0a1b2c3d-video-uuid'),
	},
	[NOCAPTION]: {
		txid: NOCAPTION,
		address: AUTHOR,
		c: '',
		m: enc('Просто текст'),
		i: [],
		u: '',
	},
	[XSS]: {
		txid: XSS,
		address: AUTHOR,
		c: enc('"><script>alert(1)</script>'),
		m: enc('<img src=x onerror=alert(1)>'),
		i: [],
		u: '',
	},
	[LONGRU]: {
		txid: LONGRU,
		address: AUTHOR,
		c: enc('Длинный пост'),
		m: enc('Очень длинный русский текст. '.repeat(20)),
		i: [],
		u: '',
	},
}

const routes = {
	'rpc/getrawtransactionwithmessagebyid': (body) => {
		const share = shares[body.parameters[0][0]]

		return share ? [share] : undefined
	},
	'rpc/getuserprofile': (body) => {
		if (body.parameters[0][0] !== AUTHOR) return undefined

		return [{ address: AUTHOR, name: enc('Автор'), i: 'https://example.com/avatar.png', postcnt: 10, subscribers_count: 5, a: '' }]
	},
	'peertube/video': () => ({
		data: { from: 'peertube14.pocketnet.app', previewPath: '/lazy-static/previews/0a1b2c3d.jpg' },
	}),
}

describe('og preview', () => {
	let proxy

	before(async () => {
		proxy = await mockProxy(routes)
	})

	after(() => proxy.close())

	test('post link: caption, text and first image', async () => {
		const { tags } = await render({ uri: '/index?s=' + POST, ua: TELEGRAM, proxypath: proxy.url })

		assert.equal(tags['og:is_bot'], 'true')
		assert.equal(tags['og:title'], 'Тестовый пост')
		assert.match(tags['og:description'], /^Текст публикации/)
		assert.equal(tags['og:image'], 'https://example.com/image1.jpg')
		assert.equal(tags['og:type'], 'article')
	})

	test('post link asks proxy for the right txid', async () => {
		proxy.requests.length = 0

		await render({ uri: '/index?s=' + POST, ua: TELEGRAM, proxypath: proxy.url })

		const share = proxy.requests.find((r) => r.route === 'rpc/getrawtransactionwithmessagebyid')

		assert.ok(share, 'share was not requested')
		assert.deepEqual(share.body.parameters, [[POST]])
	})

	test('num selects the image', async () => {
		const { tags } = await render({ uri: '/index?s=' + POST + '&num=1', ua: TELEGRAM, proxypath: proxy.url })

		assert.equal(tags['og:image'], 'https://example.com/image2.jpg')
	})

	test('video link (?v=&video=1) uses peertube preview and player', async () => {
		const { tags } = await render({ uri: '/index?v=' + VIDEO + '&video=1&ref=' + AUTHOR, ua: TELEGRAM, proxypath: proxy.url })

		assert.equal(tags['og:title'], 'Видео')
		assert.equal(tags['og:type'], 'video.other')
		assert.equal(tags['og:image'], 'https://peertube14.pocketnet.app/lazy-static/previews/0a1b2c3d.jpg')
		assert.match(tags['og:video:url'], new RegExp('openapi\\.html\\?action=lenta&id=' + VIDEO))
		assert.equal(tags['twitter:card'], 'player')
	})

	test('post without caption is titled by author', async () => {
		const { tags } = await render({ uri: '/index?s=' + NOCAPTION, ua: TELEGRAM, proxypath: proxy.url })

		assert.equal(tags['og:title'], 'Post by Автор')
		assert.equal(tags['og:image'], 'https://example.com/avatar.png')
	})

	test('long cyrillic text is cut without breaking utf-8', async () => {
		const { tags } = await render({ uri: '/index?s=' + LONGRU, ua: TELEGRAM, proxypath: proxy.url })

		assert.match(tags['og:description'], /^Очень длинный русский текст/)
		assert.ok(tags['og:description'].length <= 140, 'description is not shortened')
		assert.ok(!tags['og:description'].includes('�'), 'broken utf-8 in description')
	})

	test('user content is escaped', async () => {
		const { html, tags } = await render({ uri: '/index?s=' + XSS, ua: TELEGRAM, proxypath: proxy.url })

		assert.ok(!html.includes('<script'), 'raw <script> in output')
		assert.ok(!html.includes('<img'), 'raw <img> in output')
		assert.equal(tags['og:title'], '"><script>alert(1)</script>')
	})

	test('unknown post falls back to default tags', async () => {
		const { tags } = await render({ uri: '/index?s=' + 'f'.repeat(64), ua: TELEGRAM, proxypath: proxy.url })

		assert.equal(tags['og:title'], DEFAULT_TITLE)
	})

	test('browsers get default tags without proxy calls', async () => {
		proxy.requests.length = 0

		const { tags } = await render({ uri: '/index?s=' + POST, ua: CHROME, proxypath: proxy.url })

		assert.equal(tags['og:is_bot'], 'false')
		assert.equal(tags['og:title'], DEFAULT_TITLE)
		assert.equal(proxy.requests.length, 0)
	})

	const bots = {
		Telegram: TELEGRAM,
		Facebook: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
		Twitter: 'Twitterbot/1.0',
		WhatsApp: 'WhatsApp/2.23.20.0 A',
		VK: 'Mozilla/5.0 (compatible; vkShare; +http://vk.com/dev/Share)',
		Slack: 'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)',
		Discord: 'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)',
	}

	for (const [name, ua] of Object.entries(bots)) {
		test('bot detected: ' + name, async () => {
			const { tags } = await render({ uri: '/index?s=' + POST, ua, proxypath: proxy.url })

			assert.equal(tags['og:is_bot'], 'true')
			assert.equal(tags['og:title'], 'Тестовый пост')
		})
	}
})

describe('og preview with broken proxy', () => {
	test('unreachable proxy: default tags, fast', async () => {
		const { tags, ms } = await render({ uri: '/index?s=' + POST, ua: TELEGRAM, proxypath: 'http://127.0.0.1:1/' })

		assert.equal(tags['og:title'], DEFAULT_TITLE)
		assert.ok(ms < 10000, 'took ' + ms + 'ms')
	})

	test('hanging proxy does not hang the page', async () => {
		const proxy = await mockProxy({ 'rpc/getrawtransactionwithmessagebyid': 'hang' })

		try {
			const { tags, ms } = await render({ uri: '/index?s=' + POST, ua: TELEGRAM, proxypath: proxy.url })

			assert.equal(tags['og:title'], DEFAULT_TITLE)
			assert.ok(ms < 10000, 'took ' + ms + 'ms, bots will give up')
		} finally {
			await proxy.close()
		}
	})
})
