# Cursor Rules for Bastyon/Pocketnet

This directory contains Cursor rules (`.mdc` files) that provide context and guidance to AI agents working with this codebase.

## Purpose

These rules help AI assistants understand:
- The legacy architecture and patterns
- Component development conventions
- Backend/blockchain integration
- Build and deployment processes
- Code style requirements

## Rules Overview

### 1. **project-overview.mdc** (Always Applied)
**When it applies:** Every conversation

Core architecture facts and patterns:
- Hybrid approach: Legacy + Modern JavaScript
- Custom module pattern
- File organization
- Development commands
- Common pitfalls

**Key takeaway:** Match the style of the file you're editing - modern syntax allowed in new files!

### 2. **code-style.mdc** (Always Applied, Updated)
**When it applies:** Every conversation

Code style conventions (hybrid approach):
- **Legacy files:** Use `var`, function expressions, IIFE pattern
- **New files:** Can use `const`/`let`, arrow functions, classes
- **Golden rule:** Match the file you're editing
- Naming conventions and best practices

**Key takeaway:** Balances legacy consistency with modern development!

### 3. **component-development.mdc**
**When it applies:** Working with files in `components/**/*.{js,html,css,less}`

Component development guidelines:
- Standard component pattern
- Template loading with `self.shell()`
- Event handling and cleanup
- Data access via SDK
- Best practices

**Key takeaway:** Follow the established module/essense pattern strictly.

### 4. **backend-proxy16.mdc**
**When it applies:** Working with files in `proxy16/**/*.js`

Backend server development:
- Proxy server architecture
- RPC communication with blockchain
- WebSocket server patterns
- Node control and management
- API endpoints

**Key takeaway:** Backend acts as intermediary between frontend and blockchain.

### 5. **blockchain-integration.mdc**
**When it applies:** Working with blockchain-related code

Blockchain integration patterns:
- Private key operations (WIF format)
- Signature creation and verification
- Transaction types (posts, votes, comments)
- Address validation
- Security best practices

**Key takeaway:** Never expose private keys, always verify signatures.

### 6. **build-deployment.mdc**
**When it applies:** Working with `minimize.js`, `gruntfile.js`, `package.json`, or `tpls/**/*`

Build system and deployment:
- Custom `minimize.js` build script
- Template system
- Electron builder
- Cordova mobile builds
- Deployment workflow

**Key takeaway:** Custom build system, not Webpack/Vite.

---

### 7. **modern-javascript.mdc** (NEW!)
**When it applies:** Working with `js/lib/**/*.js`, `js/utils/**/*.js`, `proxy16/**/*.js`

Modern JavaScript (ES6+) patterns:
- Const/let, arrow functions, classes
- Async/await and promises
- Destructuring and spread operators
- Template literals
- Modern array methods
- When to use modern vs legacy syntax

**Key takeaway:** Comprehensive guide for writing modern JavaScript in appropriate files!

## How Rules Work

### Always Apply Rules
These rules are included in **every** conversation:
- `project-overview.mdc` - Core architecture and patterns
- `code-style.mdc` - Legacy and modern style guidelines

### File-Specific Rules
These rules are included when working with matching files:
- `component-development.mdc` - For `components/**/*` files
- `backend-proxy16.mdc` - For `proxy16/**/*` files
- `blockchain-integration.mdc` - For blockchain-related code
- `build-deployment.mdc` - For build system files
- `modern-javascript.mdc` - For new utilities and backend code

## Quick Reference

### New to the Project?
1. Read `ARCHITECTURE.md` in project root
2. Review `project-overview.mdc`
3. Check relevant file-specific rules

### Working on Frontend?
1. Read `component-development.mdc`
2. Check existing components for patterns
3. Follow `code-style.mdc`

### Working on Backend?
1. Read `backend-proxy16.mdc`
2. Review `blockchain-integration.mdc`
3. Check `proxy16/proxy.js` for examples

### Building/Deploying?
1. Read `build-deployment.mdc`
2. Review `minimize.js`
3. Check `package.json` scripts

## Important Warnings

### ⚠️ Hybrid Approach
This codebase uses **both legacy and modern** patterns:

**Legacy code (preserve):**
- Component files use IIFE pattern
- Core files (`js/satolist.js`, `js/app.js`) use `var`
- Maintain consistency in existing files

**Modern code (allowed):**
- New utility files can use ES6+
- Backend (proxy16) can use modern Node.js features
- Isolated modules can use classes, async/await

**Don't introduce:**
- Modern frameworks (React, Vue, etc.)
- ES6 modules without bundling
- Modern build tools (Webpack, Vite, etc.)

**Golden Rule:** Match the file you're editing!

### ⚠️ Large Codebase
Some files are **very large**:
- `js/satolist.js` - **26,792 lines**
- Modify with extreme caution
- Test thoroughly after changes

### ⚠️ Multi-Platform
Changes affect multiple platforms:
- Web browser
- Electron desktop (Windows, macOS, Linux)
- Cordova mobile (Android, iOS)

**Always test** on relevant platforms.

## Updating Rules

### When to Update Rules

Update rules when:
- Architecture patterns change
- New conventions are established
- Common issues need documentation
- Build process changes

### How to Update Rules

1. **Edit the `.mdc` file** - Use Markdown format
2. **Update frontmatter** - Adjust `description` and `globs` if needed
3. **Test the rule** - Create a test file matching the glob pattern
4. **Verify** - Check that Cursor loads the rule correctly

### Rule Format

```markdown
---
description: Brief description of what this rule does
globs: pattern/**/*.js
alwaysApply: false
---

# Rule Title

Rule content in Markdown...
```

## Additional Resources

### Project Documentation
- `ARCHITECTURE.md` - Comprehensive architecture guide
- `README.md` - Project overview and setup
- `SECURITY.md` - Security guidelines

### Key Files to Reference
- `js/satolist.js` - Platform core (26k lines)
- `js/app.js` - Application lifecycle
- `proxy16/proxy.js` - Backend server
- `components/home/index.js` - Example component

### External Resources
- Bastyon Website: https://bastyon.com
- GitHub Repository: https://github.com/pocketnetteam/pocketnet.gui
- Help Center: https://bastyon.com/help
- Whitepaper: https://bastyon.com/docs/Pocketnet%20Whitepaper%20Draft%20v2.pdf

## Questions?

If rules are unclear or missing information:
1. Check `ARCHITECTURE.md` for detailed documentation
2. Search existing codebase for examples
3. Ask the project team
4. Update rules with new insights

---

**Last Updated:** January 2026

**Maintained by:** Bastyon/Pocketnet development team
