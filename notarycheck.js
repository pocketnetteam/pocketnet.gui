function isNotaryToolAvailable() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield spawn_1.spawn('xcrun', ['--find', 'notarytool']);
        return result.code === 0;
    });
}

(async () => {
    console.log('NOTARY_TOOL', await isNotaryToolAvailable());
})();
