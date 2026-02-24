# Bastyon/Pocketnet Architecture Documentation

## Table of Contents
1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Technology Stack](#technology-stack)
4. [Architecture Components](#architecture-components)
5. [Frontend Framework](#frontend-framework)
6. [Backend Architecture](#backend-architecture)
7. [Development Workflow](#development-workflow)
8. [Key Files and Their Purposes](#key-files-and-their-purposes)
9. [Build System](#build-system)

---

## Overview

**Bastyon** (formerly Pocketnet) is a decentralized blockchain-based social network that runs on a network of distributed nodes without central authority. The platform uses the **Pocketcoin (PKOIN)** cryptocurrency and provides censorship-resistant content publishing, encrypted chat, and video hosting.

### Core Principles
- **Decentralized**: No central servers or corporate control
- **Privacy-First**: No email/phone required, no tracking, no IP storage
- **Blockchain-Based**: All operations stored immutably on blockchain
- **Freedom of Speech**: Community-moderated content (high-reputation users act as moderators)
- **Multi-Platform**: Web, Desktop (Electron), Mobile (Cordova/Android/iOS)

---

## Project Structure

```
pocketnet/
├── main.js                    # Electron entry point
├── js/
│   ├── satolist.js           # Main platform code (26k+ lines, core logic)
│   ├── app.js                # Application initialization
│   ├── kit.js                # Utility functions
│   ├── functions.js          # Helper functions
│   ├── lib/
│   │   ├── client/           # Client-side blockchain/API
│   │   │   ├── api.js        # API layer for blockchain communication
│   │   │   ├── sdk.js        # SDK for platform features
│   │   │   ├── actions.js    # User actions
│   │   │   ├── monetization.js
│   │   │   └── system16.js   # System utilities
│   │   └── pocketnet/        # Blockchain crypto libraries
│   ├── electron/             # Electron-specific code
│   ├── transports/           # Network transport layers
│   └── vendor/               # Third-party libraries
├── components/               # UI Components (modular)
│   ├── home/
│   │   ├── index.js         # Component logic
│   │   ├── index.css        # Styles
│   │   ├── index.less       # LESS source
│   │   └── templates/       # HTML templates
│   │       └── index.html
│   ├── post/
│   ├── user/
│   └── ... (100+ components)
├── proxy16/                  # Backend Node.js proxy server
│   ├── proxy.js             # Main proxy server
│   ├── pocketnet.js         # Blockchain integration
│   ├── node/                # Blockchain node management
│   │   ├── control.js       # Node control
│   │   ├── manager.js       # Node manager
│   │   ├── rpc.js           # RPC calls to blockchain
│   │   └── wss.js           # WebSocket server
│   ├── server/
│   │   ├── https.js         # HTTPS server
│   │   ├── wss.js           # WebSocket server
│   │   ├── firebase.js      # Push notifications
│   │   └── miniapp.js       # Mini-app support
│   ├── wallet/              # Wallet functionality
│   ├── peertube/            # Video server integration
│   └── lib/                 # Bitcoin/crypto libraries
├── cordova/                 # Mobile app (Android/iOS)
├── chat/                    # Encrypted chat functionality
├── peertube/                # Video server client code
├── css/                     # Global stylesheets
├── localization/            # Multi-language support
├── tpls/                    # Build templates
└── build/                   # Build scripts and configs
```

---

## Technology Stack

### Frontend
- **Custom JavaScript Framework**: Module-based architecture (pre-dates React/Vue)
- **jQuery**: DOM manipulation and AJAX
- **Underscore.js**: Functional programming utilities
- **Isotope.js**: Grid layouts and filtering
- **Imagesloaded**: Image loading detection
- **EmojiOne**: Emoji support
- **Medium Editor**: Rich text editing
- **WebRTC**: Video calls and peer-to-peer communication

### Backend (proxy16)
- **Node.js**: Server runtime
- **Express.js**: Web framework
- **WebSocket (ws)**: Real-time communication
- **Bitcoin libraries**: Blockchain integration
- **Firebase Admin**: Push notifications
- **Winston**: Logging
- **Axios/Request**: HTTP client

### Desktop
- **Electron**: Cross-platform desktop app (Windows, macOS, Linux)
- **Auto-updater**: Automatic updates
- **Tor**: Privacy/anonymity support

### Mobile
- **Cordova**: Mobile app wrapper
- **Android SDK**: Native Android features
- **iOS SDK**: Native iOS features

### Blockchain
- **Bitcoin-based**: Custom blockchain (Pocketcoin/PKOIN)
- **BTC17.js**: Bitcoin library (modified)
- **Ed25519**: Cryptographic signatures

### Build Tools
- **Grunt**: Task runner
- **Uglify-JS**: JavaScript minification
- **UglifyCSS**: CSS minification
- **HTML Minifier**: HTML minification
- **Electron Builder**: Desktop app packaging
- **minimize.js**: Custom build script

---

## Architecture Components

### 1. **Multi-Layer Architecture**

```
┌─────────────────────────────────────────────┐
│          User Interfaces                     │
│  (Web Browser / Electron / Cordova)         │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│        Frontend Application Layer           │
│  (satolist.js, components, app.js)          │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│         API/SDK Layer (js/lib/client/)      │
│  (api.js, sdk.js, actions.js)               │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│      Transport Layer (WebSocket/HTTP)       │
│  (transports/, proxy16/)                    │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│         Proxy16 Server (Backend)            │
│  (proxy.js, node/, server/, wallet/)        │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│    Blockchain Node (Pocketcoin Core)       │
│  (External process, RPC communication)      │
└─────────────────────────────────────────────┘
```

### 2. **Component Architecture**

Each frontend component follows this pattern:

```javascript
var componentname = (function () {
  var self = new nModule(); // Module base
  var essenses = {};        // Instance storage

  var Essense = function (p) {
    var el, ed;             // DOM references
    var actions = {};       // User actions
    var events = {};        // Event handlers
    var renders = {};       // Render functions

    var init = function() {
      // Initialize component
    };

    return {
      init: init,
      destroy: destroy
    };
  };

  self.create = function(parameters) {
    // Create component instance
  };

  return self;
})();
```

**Key Concepts:**
- **nModule**: Base module class providing common functionality
- **Essense**: Component instance
- **el**: Element references (DOM)
- **ed**: Event data
- **actions**: User interaction handlers
- **events**: Event callbacks
- **renders**: Template rendering functions

---

## Frontend Framework

### Custom Module System
The project uses a **custom module-based framework** built before modern frameworks like React/Vue existed.

**Core Files:**
- `js/satolist.js` - Main platform code (26,792 lines)
- `js/app.js` - Application class and initialization
- `js/module.js` - Base module class
- `js/navn.js` - Navigation/routing system

### Key Platform Objects

#### `Platform` (satolist.js)
Main platform controller managing:
- SDK initialization
- User authentication
- Blockchain communication
- Node management
- Real-time updates
- Chat system

#### `Application` (app.js)
Application lifecycle manager:
- Component loading
- Navigation
- State management
- API communication
- Electron/Cordova integration
- UI rendering

### Navigation System
Custom routing without traditional URL-based routing:
- Hash-based navigation
- Deep linking support
- History management
- Dynamic component loading

### State Management
No Redux/Vuex - uses:
- Global `self.app` object
- Event broadcasting system
- Component-level state
- LocalStorage/IndexedDB persistence

---

## Backend Architecture

### Proxy16 Server

**Purpose:** Intermediate layer between frontend and blockchain node

**Key Responsibilities:**
1. **Blockchain Communication**: RPC calls to Pocketcoin node
2. **WebSocket Server**: Real-time updates to clients
3. **API Gateway**: REST API for client requests
4. **Wallet Management**: Key storage and transaction signing
5. **Video Server**: PeerTube integration
6. **Push Notifications**: Firebase integration
7. **Caching**: Performance optimization
8. **Rate Limiting**: Anti-spam protection
9. **Tor Integration**: Privacy features

### Key Modules

#### `proxy.js`
Main server orchestrator:
- Initializes all subsystems
- Manages connections
- Handles routing
- Coordinates services

#### `node/control.js`
Blockchain node management:
- Start/stop node
- Monitor node health
- Handle node updates
- RPC communication

#### `node/rpc.js`
Blockchain RPC calls:
- Get blocks
- Submit transactions
- Query blockchain data
- Subscribe to updates

#### `server/wss.js`
WebSocket server:
- Real-time updates
- Chat messages
- Notifications
- Live feeds

#### `wallet/wallet.js`
Wallet operations:
- Key management
- Transaction creation
- Address generation
- Balance tracking

---

## Development Workflow

### Setting Up Development Environment

```bash
# Install dependencies
npm install

# Backend (proxy16)
cd proxy16 && npm install && cd ..

# Build for development
npm run dev:bastyon

# Run Electron app in dev mode
npm start

# Run with inspector (debugging)
npm run startinspect
```

### Development Scripts

```bash
# Development builds
npm run dev:bastyon         # Standard dev build
npm run dev:bastyon:test    # Test environment build

# Production builds
npm run minimize:bastyon    # Web production build
npm run build              # Full build (proxy16 + frontend)

# Electron packaging
npm run pack               # Package without distributable
npm run dist               # Windows distributable
npm run distm              # macOS distributable
npm run distl              # Linux distributable

# Cordova/Mobile
npm run minimize:cordova   # Cordova build
```

### Build Process

The `minimize.js` script:
1. Processes templates from `tpls/`
2. Minifies JavaScript files
3. Minifies CSS/LESS files
4. Combines files
5. Generates production HTML
6. Creates platform-specific builds

---

## Key Files and Their Purposes

### Frontend Core

| File | Purpose |
|------|---------|
| `js/satolist.js` | Main platform code - SDK, blockchain interface, core logic (26k lines) |
| `js/app.js` | Application class - lifecycle, navigation, UI management |
| `js/kit.js` | Utility functions - helpers, formatters, validators |
| `js/functions.js` | Common functions - DOM manipulation, data processing |
| `js/lib/client/api.js` | API layer - HTTP/WebSocket communication with proxy |
| `js/lib/client/sdk.js` | SDK - High-level platform features |
| `js/lib/client/actions.js` | User actions - posts, comments, votes, transactions |
| `index.html` | Main HTML entry point |

### Backend Core

| File | Purpose |
|------|---------|
| `proxy16/proxy.js` | Main proxy server - orchestrates all backend services |
| `proxy16/pocketnet.js` | Blockchain integration - crypto, addresses, signatures |
| `proxy16/node/control.js` | Node control - start/stop/monitor blockchain node |
| `proxy16/node/rpc.js` | RPC communication - blockchain queries |
| `proxy16/server/https.js` | HTTPS server - REST API endpoints |
| `proxy16/server/wss.js` | WebSocket server - real-time communication |
| `proxy16/wallet/wallet.js` | Wallet - key management, transactions |

### Electron

| File | Purpose |
|------|---------|
| `main.js` | Electron main process - window management, IPC |
| `js/electron/ipcbridge.js` | IPC bridge - renderer ↔ main communication |
| `js/electron/transcoding2.js` | Video transcoding - FFmpeg integration |

### Configuration

| File | Purpose |
|------|---------|
| `package.json` | NPM dependencies and scripts |
| `proxy16/config.json` | Proxy server configuration |
| `tpls/*.tpl` | Build templates |

---

## Build System

### minimize.js

Custom build script that:
- Reads templates from `tpls/`
- Processes variables (version, paths, config)
- Minifies JS/CSS
- Generates output files
- Supports multiple build targets (web, electron, cordova)

**Key Options:**
- `-prodaction`: Production mode (minification)
- `-test`: Test environment
- `-project`: Project name (Pocketnet/Bastyon)
- `-path`: Base path
- `-vendor`: Vendor ID
- `-composetemplates`: Generate Cordova templates

### Grunt

Used in proxy16 for:
- File watching
- Build automation
- Task running

---

## Additional Architecture Notes

### Authentication
- **No username/password**: Uses private key (WIF format)
- **Key-based**: Private key is the only way to access account
- **No recovery**: Lost keys cannot be recovered
- **Blockchain-based**: Identity stored on blockchain

### Data Storage
- **Blockchain**: Posts, comments, votes, transactions
- **LocalStorage**: User preferences, cached data
- **IndexedDB**: Large datasets, offline support
- **Server cache**: Temporary performance optimization

### Real-time Updates
- **WebSocket**: Live feed updates
- **Polling**: Fallback for WebSocket
- **Push notifications**: Mobile via Firebase

### Content Moderation
- **Reputation-based**: High-reputation users = moderators
- **Community-driven**: Multiple reports hide content
- **Blockchain-enforced**: Cannot delete, only hide

### Video Hosting
- **PeerTube**: Decentralized video platform
- **Multiple servers**: Load distribution
- **Transcoding**: Video format conversion
- **P2P streaming**: WebTorrent support

### Monetization
- **PKOIN rewards**: Content creators earn cryptocurrency
- **Node rewards**: Node operators earn from staking
- **Paid subscriptions**: Optional premium content
- **Donations**: Direct support to creators

---

## Development Best Practices

### When Working with Components
1. **Follow the module pattern**: Use the established `var name = (function() { var self = new nModule(); ... })()`
2. **Component independence**: Each component should be self-contained
3. **Template separation**: Keep HTML in `templates/` directory
4. **Style isolation**: Use component-specific class prefixes

### When Working with Backend
1. **Proxy pattern**: Don't access blockchain directly from frontend
2. **WebSocket for real-time**: Use WSS for live updates
3. **Error handling**: Always handle node failures gracefully
4. **Rate limiting**: Respect API limits

### When Working with Blockchain
1. **Immutability**: Remember blockchain data cannot be deleted
2. **Gas fees**: Consider transaction costs
3. **Confirmation time**: Blockchain operations take time
4. **Private key security**: Never expose private keys

---

## Testing

### Frontend Testing
- Manual testing in browser/Electron
- Component-level testing
- Integration testing with proxy

### Backend Testing
```bash
cd proxy16
npm run serve:test
```

### Mobile Testing
- Cordova dev build
- Test on physical devices
- Use remote debugging

---

## Deployment

### Web Deployment
1. Build production: `npm run minimize:bastyon`
2. Deploy generated files to web server
3. Configure nginx (see `nginx.conf`)

### Desktop Deployment
1. Build: `npm run dist` (Windows), `npm run distm` (macOS), `npm run distl` (Linux)
2. Sign binaries (macOS notarization, Windows code signing)
3. Upload to GitHub releases

### Mobile Deployment
1. Build Cordova: `npm run minimize:cordova`
2. Build APK/AAB (Android) or IPA (iOS)
3. Submit to app stores

---

## Troubleshooting

### Common Issues
1. **Node not syncing**: Check proxy16 logs, verify blockchain node running
2. **WebSocket disconnects**: Check firewall, proxy configuration
3. **Build failures**: Clean `node_modules`, reinstall dependencies
4. **Electron crashes**: Check main process logs, verify IPC communication

### Debugging
- Frontend: Browser DevTools
- Backend: `npm run serveinspect` in proxy16
- Electron: `npm run startinspect`
- Mobile: Chrome remote debugging

---

## Resources

- **Website**: https://bastyon.com
- **Repository**: https://github.com/pocketnetteam/pocketnet.gui
- **Documentation**: https://bastyon.com/help
- **Whitepaper**: https://bastyon.com/docs/Pocketnet%20Whitepaper%20Draft%20v2.pdf
- **Support**: support@pocketnet.app

---

*Last Updated: January 2026*
