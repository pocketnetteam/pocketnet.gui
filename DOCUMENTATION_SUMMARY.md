# Documentation and Cursor Rules - Creation Summary

## Overview

Comprehensive documentation and Cursor rules have been created for the Bastyon/Pocketnet project to optimize AI agent interactions and provide clear guidance for development.

## Created Files

### 📄 Main Documentation

#### **ARCHITECTURE.md** (18 KB)
Comprehensive architecture documentation covering:
- Project overview and core principles
- Complete project structure breakdown
- Technology stack (Frontend, Backend, Desktop, Mobile, Blockchain)
- Architecture components and layers
- Frontend framework (custom module system)
- Backend architecture (proxy16 server)
- Development workflow
- Build system
- Key files and their purposes
- Best practices
- Troubleshooting guide

**Location:** `/Users/aleksandr/dev-server/pocketnet/ARCHITECTURE.md`

---

### 📋 Cursor Rules (.cursor/rules/)

All rules are in `.mdc` (Markdown with YAML frontmatter) format and will be automatically loaded by Cursor based on file patterns.

#### **1. project-overview.mdc** (4.7 KB)
**Always Applied:** ✅ Yes

Core project architecture and patterns:
- Legacy codebase facts (pre-React/Vue)
- Custom module pattern
- File organization
- DO/DON'T guidelines
- Common pitfalls
- Key references

**Why it's important:** Prevents agents from trying to modernize the legacy codebase.

---

#### **2. code-style.mdc** (8.2 KB)
**Always Applied:** ✅ Yes

Code style and formatting conventions:
- Use `var` not `const`/`let`
- Function expressions not arrow functions
- IIFE module pattern
- Callbacks vs Promises
- Naming conventions
- jQuery conventions
- Error handling patterns

**Why it's important:** Maintains consistency with 26k+ lines of existing legacy code.

---

#### **3. component-development.mdc** (8.6 KB)
**Applied When:** Working with `components/**/*.{js,html,css,less}`

Component development guidelines:
- Standard component pattern
- Module/Essense structure
- Template loading with `self.shell()`
- Event handling and cleanup
- Data access patterns
- Common patterns (pagination, forms, etc.)
- Best practices

**Why it's important:** Ensures all UI components follow the established pattern.

---

#### **4. backend-proxy16.mdc** (11 KB)
**Applied When:** Working with `proxy16/**/*.js`

Backend server development:
- Proxy server architecture
- RPC communication patterns
- WebSocket server
- Node control and management
- Wallet operations
- HTTP API patterns
- Error handling

**Why it's important:** Backend is critical for blockchain communication.

---

#### **5. blockchain-integration.mdc** (11 KB)
**Applied When:** Working with blockchain-related code

Blockchain integration patterns:
- Private key operations (WIF format)
- Signature creation and verification
- Transaction types (posts, comments, votes, transfers)
- Address validation
- RPC queries
- Security best practices
- Common issues

**Why it's important:** Blockchain operations must be secure and correct.

---

#### **6. build-deployment.mdc** (11 KB)
**Applied When:** Working with `minimize.js`, `gruntfile.js`, `package.json`, `tpls/**/*`

Build system and deployment:
- Custom `minimize.js` build script
- Template system
- Minification process
- Electron builder
- Cordova mobile builds
- Deployment workflows
- Version management

**Why it's important:** Build system is custom, not standard Webpack/Vite.

---

#### **README.md** (5.7 KB)
Guide to the Cursor rules:
- Purpose and overview of each rule
- When rules apply
- Quick reference guide
- Important warnings
- How to update rules
- Additional resources

**Why it's important:** Helps developers understand and maintain the rules.

---

## Total Documentation Size

- **ARCHITECTURE.md:** 18 KB
- **Cursor Rules:** 60 KB (7 files)
- **Total:** ~78 KB of documentation

## Key Benefits

### For AI Agents
1. **Context Awareness:** Understands this is a legacy codebase
2. **Pattern Recognition:** Knows the custom module pattern
3. **Best Practices:** Follows established conventions
4. **Security:** Understands blockchain security requirements
5. **Build System:** Knows the custom build process

### For Developers
1. **Onboarding:** Comprehensive architecture guide
2. **Conventions:** Clear code style guidelines
3. **Patterns:** Component development patterns
4. **Reference:** Quick lookup for common tasks
5. **Troubleshooting:** Common issues and solutions

## How Cursor Rules Work

### Always Applied (Every Conversation)
- `project-overview.mdc` - Core architecture facts
- `code-style.mdc` - Code style conventions

### Conditionally Applied (Based on File Patterns)
- `component-development.mdc` - When editing component files
- `backend-proxy16.mdc` - When editing proxy16 backend
- `blockchain-integration.mdc` - When working with blockchain code
- `build-deployment.mdc` - When modifying build system

## Quick Start Guide

### For New Developers
1. **Read First:** `ARCHITECTURE.md`
2. **Check Rules:** `.cursor/rules/README.md`
3. **Review Examples:** Existing components and code

### For AI Agents
1. **Always Applied Rules:** Loaded automatically
2. **File-Specific Rules:** Loaded when editing matching files
3. **Reference Documentation:** `ARCHITECTURE.md` for deep dives

## Important Warnings

### ⚠️ Legacy Codebase
- Do NOT try to modernize to React/Vue/Angular
- Do NOT use ES6 classes or modules
- Do NOT introduce modern build tools
- MAINTAIN consistency with existing patterns

### ⚠️ Large Files
- `js/satolist.js` is **26,792 lines** - modify with extreme caution
- Test thoroughly after any changes

### ⚠️ Multi-Platform
Changes affect:
- Web browser
- Electron desktop (Windows, macOS, Linux)
- Cordova mobile (Android, iOS)

## Maintenance

### When to Update Documentation

Update when:
- Architecture patterns change
- New conventions are established
- Common issues emerge
- Build process changes
- New features added

### How to Update

1. **ARCHITECTURE.md:** Edit directly with new information
2. **Cursor Rules:** Edit `.mdc` files and update `README.md`
3. **Test:** Verify rules load correctly in Cursor
4. **Document:** Update this summary if structure changes

## Verification Checklist

✅ **ARCHITECTURE.md** created (18 KB)
✅ **project-overview.mdc** created (4.7 KB, always applied)
✅ **code-style.mdc** created (8.2 KB, always applied)
✅ **component-development.mdc** created (8.6 KB, file-specific)
✅ **backend-proxy16.mdc** created (11 KB, file-specific)
✅ **blockchain-integration.mdc** created (11 KB, file-specific)
✅ **build-deployment.mdc** created (11 KB, file-specific)
✅ **.cursor/rules/README.md** created (5.7 KB)

## Next Steps

### Immediate
1. ✅ Documentation created
2. ✅ Cursor rules configured
3. 🔄 Test rules by editing different file types
4. 🔄 Verify Cursor loads rules correctly

### Future
- Add more specific rules as needed
- Update with new patterns and conventions
- Add examples and code snippets
- Create video tutorials (optional)
- Add diagrams to ARCHITECTURE.md (optional)

## Additional Resources

### Project Files
- `README.md` - Project overview
- `package.json` - Dependencies and scripts
- `js/satolist.js` - Main platform code
- `proxy16/proxy.js` - Backend server

### External Links
- **Website:** https://bastyon.com
- **Repository:** https://github.com/pocketnetteam/pocketnet.gui
- **Help:** https://bastyon.com/help
- **Whitepaper:** https://bastyon.com/docs/Pocketnet%20Whitepaper%20Draft%20v2.pdf

## Contact

For questions about this documentation:
- Review the documentation files
- Check existing code examples
- Ask the development team

---

**Created:** January 26, 2026
**Documentation Version:** 1.0
**Status:** ✅ Complete
