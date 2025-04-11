var electron = null,
    fs, url, path, https;

window.project_config || (window.project_config = {})

if (typeof _OpenApi == 'undefined') _OpenApi = false;

if (typeof _Electron != 'undefined') {
    electron = require('electron');

    fetchRetranslator = require('./js/transports2/fetch/retranslator').init('ExtendedFetch', electron.ipcRenderer);

    fsFetchFactory = require('./js/transports/fs-fetch').fsFetchFactory;
    peertubeTransport = require('./js/transports/peertube-transport').peertubeTransport;
    TranscoderClient = require('./js/electron/transcoding2').Client;

    fs = require('fs');
    url = require('url');
    https = require('https');
    path = require('path');

    $('html').addClass('electron')
}


Platform = function (app, listofnodes) {

    var self = this;

    self.app = app;

    self.lastblocktime = null
    self.lasttimecheck = null

    self.bwdictionary = _.map(["masturbation", "ussalovo", "usralovo", "porevo", "naebalovo", "podralovo", "B_HECO3HAHKE", "B_HE3HAHKE", "XEPOTA", "XEPOBOE", "ebanat", "uyebanets", "XEPOBOE", "XYEBOE", "pizdabol", "HOC_B_KAKEHE", "s_pekla_na_huy", "XEP_TE_B_HOC", "KAKAXA", "KAKA_HA_XEPE", "XEP_B_KAKE", "HOCOM_B_XEP", "HOCOM_B_KAKEH", "razblyadko", "puki_puki", "zablyadko", "eblanko", "perdelko", "ohuelko", "zalupko", "XYEET_B_XYETE", "pizdelko", "OXYETb", "uyeban", "ueban", "OXYETb_OHO", "XYETE", "XYEET", "XMbIPb", "XAPKOTA", "PEDRILLO", "MPA3b", "PIZDOTA", "XMbIPbKA", "MPA3OTA", "PIZDLO", "TBAPb", "POTOM_HACOC", "UKRAM_PIZDA", "UKROPETS", "PIZDLO", "PEDRILLO", "SSUKA", "3ABOHbKA", "3ABOHbKO", "3ACCAHbKO", "3ACCATKA", "3ACCATKO", "3ACEPbKA", "PIZDUK", "3ACCAHbKA", "3ACEPbKO", "3ACEPEH_MO3K", "3ACPATKO", "BOHbKO", "BOHbKA", "CCAHbKA", "CCAKA", "CCAKOTKA", "CCAHbKO", "CCAKOTKO", "CCbIKOTKA", "CKBEPHA", "CPAKOBMA3", "CPAKA", "CPAKATbIKA", "CPAKATbIKAH", "CPAKATbIKAHA", "CPAKOBMA3KO", "CPAKOTbIK", "CPAMEH", "CPAMOTA", "CPAKOCPAM", "CPAMHOMA3", "KPbICA", "PAKOM_CTAHb", "KAKAXOMA3KA", "PAKOMBCTAHb", "KAKAXOMA3", "PAKOMBCTAHbKA", "PBAHbE", "PBOTA", "PBOTHA_BOHbKA", "TbIX_DbIPA", "PIDOR", "PIDARAS", "PEDRILLON", "PEDRILKA", "PEDRILLION", "PEDRILKO", "PIDOROK", "PIDORKA", "PIDOR", "PIDORKO", "PIDARASKA", "PIDARASKO", "PIDERASKO", "PIDER", "PIDARASKO", "PERDUCCIO", "PERDILLO", "PERDILLION", "PERDILLIAN", "PERDILION", "PERDILO", "PERDILIAN", "PERDAK", "ELDAK", "PERDOLO", "PERDOLLO", "PERDOLLION", "PERDOLLIAN", "PERDOLIAN", "PERDOLION", "PERDULO", "PERDULLO", "PERDULLION", "PERDULLIAN", "PERDULKO", "PERDULION", "PERDULINA", "PERDULINO", "ZAPERDULINO", "PERDULIN", "ZAPERDULIN", "ZAPERDELANO", "ZAPERDELENO", "ZAPERDOLINO", "ELDACHINA", "MUDILLION", "MUDILA", "MUDILLO", "3ACPATKA", "PERDULIAN", "DURAK", "EUROUKR", "BCPATb", "3AMECbI", "CPATb", "BKAKATb", "3ACPATb", "BbICPATb", "HACPATb", "KAKATb", "BbIKAKATb", "HAKAKATb", "XYETb", "3AKAKATb", "XYEBOTEBO", "DEBILKA", "DEBILKO", "DEBILOK", "AXYEBATb", "XYEBOM", "XYEBOTEBO", "XYEBOTHOE", "XYEBOM", "XYETE", "zalupo", "zalupe", "zalupin", "zalupa", "zalupn", "PA3OCPATKA", "XYEK", "3ATbIKE", "KYKAPEKY", "poyebotevo", "KY_KA_PE_KY", "KYKAPEKOBO", "ebanadel", "ebanadelnyj", "B_POT_TE_CCbI", "B_POT_TE_CEPb", "chpok_chpok", "chpoki_chpoki", "PIZDOTOCHKA", "PIZDYONKA", "PIZDATOCHKA", "PIZDOTKA", "PIZDA", "MOXHATKA", "PILOTKA", "EBUCHKA", "TbIX_TbIXTbIX", "ZLOEBUCHKA", "ZLAJA_PIZDA", "PIZDISCHA", "PIZDENN", "UKROPIZDA", "3ABOHbKA", "CCbIKOTKA", "_3ABOHbKA", "3ACCAHbKO", "3ACEPbKA", "3ACPATKA", "POLONIZED", "BOHbKO", "3ACEPEH_MO3K", "EUROUKR", "MPA3b", "HUYLO", "EBLAN", "CPAKOTbIK", "CPAKOBMA3", "COCET", "OTCOC", "OTCOCAC", "OTCAC", "COCATb", "O4KO", "B_POT", "XYI", "O4KE", "O4KYET", "CYHYTb"], (s) => {
        return s.toLowerCase()
    })

    var urlreg = /(([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,5}\b)|(bastyon:\/))(\/[-a-zA-Z0-9@:%|_\+.~#/?&//=]*)?/gi

    self.real = {
        'PWCgoqiexbA2kP3pubQVX1sctE3vTzchUH': true,
        'PKLxDhsyQNsSSzmLZDTwLL8GXz8zKM6PNy': true,
        'PF4eMjha9MFs4F3CaiHG1CJjDJGS7w8tvF': true,
        'PLpzAiA6H8isp33WeVx2UEuXLfc3SyqkzK': true,
        'P9igzkJ57DYXyXMjCyTLvHmJJTjwDBB8Ug': true,
        'PHPrCVNBHMJCD2fVUFXLw92rZnAMJ1UFF6': true,
        'PEXsbgKmfxxMGhaqELM7FdhgexhhvtrirY': true,
        'PHLz9EhgvPDZx9Erer3romhcNSGRw2FUmu': true,
        'PXasvRAZmYYvX7bxCXoSD6xskKsXFAt3jg': true,
        'PUcbjUHfSTSYxLwqmndEzWVyxwTCiGjkTL': true,
        'PSDZb5TAtxhRx2Kw4d6mATJrsR6yaYgzhC': true,
        'PWUH5h7fyoCMffBjABk8vtnDRqUZ1BmFWG': true,
        'PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd': true,
        'PLJvEixJkj85C4jHM3mt5u1ATwZE9zgFaA': true,
        'PRTugzBefzB1AA2Rw8VTBKf3BBPDjQND8y': true,
        'PCVt7H4vgjBDxifLz3uokbc1tD3MZwWwQh': true,
        'PJ3nv2jGyW2onqZVDKJf9TmfuLGpmkSK2X': true,
        'PLH8biT5rMdvE1zXFhsvNkzphVRK6cNM7p': true,
        'P92gc46iqLhCswPsbLxH7wjTfh9rhhNSux': true,
        'PXUYsENSv6QkQZEdiJTsfJmu3XxZvVmVfQ': true,
        'PXXaSczoZcuJEwxYKhaC9pV1JBvwi6UjSw': true,
        'PFV4UT9fhHsqkmCGsWsSCr55Pr1SMX6NL2': true,
        'PTcArXMkhsKMUrzQKn2SXmaVZv4Q7sEpBt': true,
        'PL9U1q1JmJezPh8GQb5dj5h5GavuCGcjYk': true,
        'PS4pYW4tpu6fwviz63CHLMxPA37fJ3GLvn': true,
        'PHmvLy9b5m2b7fvU7MSTw4mAkdshhdY4Nt': true,
        'PVpSK2qQXmG1SjAMJVMAMRLUkrzMjsJouL': true,
        'P8boyun9yF6QYn1fjGC1WABt4BQUL4STeh': true,
        'PA6biduJbWcQ97n5jz2jUqWHtenLpWTH7s': true,
        'P9EkPPJPPRYxmK541WJkmH8yBM4GuWDn2m': true,
        'PUYo1a6LxjnnBVi6uBjHUsZQS4FnbUwdAN': true,
        'PLFtS8H7ATooK53xRTw7YHsuK7jsn5tHgi': true,
        'PVJDtKPnxcaRDoQhqQj7FMNu46ZwB4nXVa': true,
        'PVjvMwapTA29biRTsksXUBuVVf2HVwY7ps': true,
        'PKSV2KXCdEtTtYb8rF3xMMgiiKe1oDstXR': true,
        'PUqq6vksrmoMPRrRjZxCVQefqGLpuaqWii': true,
        'PMtmtctmBD9nHJFzmfXJR1G2busp8CjASs': true,
        'PNUMTC5CTH3F5LfQpkmj3MXcDnGNKTU4ov': true,
        'PSWR1jHNocGVVVFE3aoxFh8G85SQK3G9Ta': true,
        'PJuW8LKT7LZY88fP7WM35NJURh3rAaeU3o': true,
        'PGCTymXHcEydV8SSmoABTB8YEchJbDoRJn': true,
        'PDXGoy43t5RSqJY1UJBgswBu6phtW8Knwa': true,
        'PHqNLuNEwrw8nzj71ELVGp7w1eEp8p2pKA': true,
        'PR3BcnBziYoDgckdyaARgFayiZUiA7agSx': true,
        'PEbSS6Fu9fCSEzFcrW5a3ztjx5ekoYvpjx': true,
        'PKZNLmxpsiW9H77beXt7pNWK7rTbG6Qu5h': true,
        'PNoR5LNLAZP3VGiNcK2wn4xxAFT6yQAMqj': true,
        'PL1wziiaQj7FLnoktuQQ1MKweYYbdcekRB': true,
        'PMVvs8kvbskq6eVV8Q3oyjotbox9tBfvnp': true,
        'PQ3hdiozrxtTf1UhuVfhUb9bcvrUzbzwRJ': true,
        'PCSxAFQCRZphi9W6nrV4tSQXKFfsxdxERA': true,
        'PGFKA1DieVsg9pQK4aBaEp5wpvaXpWtuVJ': true,
        'PFbq1BkrrVsmEAevMqQ2PV6aFf7QWQP9sB': true,
        'PXgYFdVs5W831WpksVLA5hNtXa7XSqUzLB': true,
        'PSBePd5Tx5KG9vxwAzbaDTfjzDbq1GUTYw': true,
        'PDgbAvsrS4VGKkW5rivcJaiCp7fnBoZRgM': true,
        'PQt1eggTZKCCbjVsHx6rcMcBMU2p2PNQmt': true,
        'PPY1UbumjHJaoxsfL7DVTPNLM4g697zdDe': true,
        'P9nFzh2sSyeTFd1F7fFGByhB6cD886jJi5': true,
        'PMf2RiHZiZTtQZftkxhRYbN5CgBH6dNh5A': true,
        'PDz71dsW1cPwNewGHVUteFgQx3ZmBf4gaf': true,
        'PFjWEfsm3jX81MctFU2VSJ17LGVKDc99oH': true,
        'PBo7zu6xguzzftFE8c3Urgz4D6YVnj8oux': true,
        'P9KXb7sS2JDjV5jnXu4t2WwwbvzYeu6yds': true,
        'PUYEkLb6szwxjw3cq6FvLxDPmedbyd3foq': true,
        'PU6LDxDqNBDipG4usCqhebgJWeA4fQR5R4': true,
        'P8rnj1gSaAQJ1YkAAthSgmLKiDfspb98GP': true,
        'PUXG7rfX19Xoco1FXjXBW8qt6NEZpp8maL': true,
        'PSanUFKb1vd5ua4U3BXMmsSZ2zm3sN2nyj': true,
        'PERF5kDM32ebkq8SeSj8ZaLqfCoqz8FRgh': true,
        'PApFYMrbm3kXMV7kjrEG1v6ULv6ZFDHb9j': true,
        'PUBRMTAUhy51gkbuP1tRJLMMAzEDt9C2X6': true,
        'P9i55BxFWpjMyqgHyCKtazDN1HDiZxTSzJ': true,
        'PLLDTFuBhb4FRPt811bTPjgaYgqoj16hVV': true,
        'PXmw1tQnengAAy9ML8Depr2kANupmadZ7j': true,
        'PCkbxDvFQbFvEzPWnnrraey1QCUro2kMLU': true,
        'PBKPEWcsZZHH7LQ7GQCNSMSSEteiJMfoFx': true,
        'PEWQWe1DQM3uh19vRqtFDkUrPreyM5uJnS': true,
        'PQ2wxGv2YNbie2BP66aac72Y3UU1uSzxCX': true,
        'PE6VLUqsPYLJnX2W7qhHX6yb2zLN3H2x25': true,
        'PEiNYu3dNM4oZDRYvSrsfy51xz7CokPYNV': true,
        'PQk66yNJS3agLJ2k6A1AN5FmM2TNUwEgbP': true,
        'PFpBmqET9NyQA2EHp8BPEjjKZobXUBBjjn': true, //a
        'PB1EShZbvkTSQgU8NLxEH8MN5UiKw1CBHb': true,
        'PCeyj5aXETKtCYbXJxmDv3bXGawda1KEHQ': true,
        'PWAAzRuHNi5iNxQDaJ8ZVpqEJSoPWFFiRN': true,
        'P9XuLKA5iCiZT6epTuVWzLU23c2gedSDkc': true,
        'PTNtirNwbe5GfgNod7rwMWLLGhYWhGyLJx': true,
        'PUaDSBBveSUG9yieuDSYCpgsyE2djYU9N5': true,
        'P9eLPo3gXUqBr7wgxDSSLNfyNMyeDua7cn': true,
        'PF57cm7HGsc5djwK556uZ7AZbqk59wXxF2': true,
        'PQ2W4ispScj349r3Gsqr1PchSVDvU59Ssf': true,
        'PUBkQATBYhGiCvvdtHCX7GM7fdx23wdaJb': true,
        'PJzhMENFrkp6Bopfzsf4VR46E3Znd2aoGj': true,
        'PKp1bjJByqY76XNZNzDFkTAhyfPq4bah5V': true,
        'PPEWFN5ETvdjc7TKqjxDPEWmZRUyPUYr8z': true,
        'PH1yzW1qvyeq3thaFhUwv3pTA2VazhtZDT': true,
        'PCjhy4t6B2b5xeqVoJcN51XkhUqAXBuaq4': true,
        'PJTNch4or4Zr8cDnF3KA4eAXTqWCxYLSzu': true,
        'PKS5Hy6FV3ytgUDmcAVa8y8qxPYKg3CdMH': true,
        'PVyHHKFuZrH2mh8Y5ZokvZnDfG1iTURpM7': true,
        'PTPVArrxr4wZuget8phZ1eSNFsGmdSXXck': true,
        'PQUj7dS2QpamP9vapARCYaJaSqjXpcZk8p': true,
        'PP7Sz6pjbgv4XdnnCRnRm4avfxD2TEoMoC': true,
        'PN9is9RTq2MW6yHw7ggz77vyeKX1a4XJQt': true,
        'PLAj8RmQg2ehTVEx8pSWnd2QeFvjHnYtRZ': true,
        'PXupozgNg1Ee6Nrbapj8DEfMGCVgWi4GB1': true,
        'PD4pWxVke4Yz2y5UnNWnSsVHd45Vy6izCr': true,
        'PW3tfEkGLKv4LFREpJYYpWxenKHSizB8rQ': true,
        'PSm8oVmMYCKnn35i4BABE6kw59WvTckagc': true,
        'PEWcDgFAD6t7SmCmsnixbmhTFkZr6hYVUb': true,
        'PQi77s3JtrUkavxN9t6Hy5sT3CNnHokNrK': true,
        'PTBHcYYBL5NU1okBYXYUTcFY6PE9p2o7gz': true,
        'PFrbFN4W2kwHj9jbHwLjt3vAkTM7ThgGBk': true,
        'PGCqT8bhkWHLEyQG1xgVhrzojCN1VjDLaP': true,
        'PWeAQ1Mb3Xb7anjikyNogR3UqiZgnNbRiZ': true,
        'PCkkR6TPP273vv5AQgJTWhBHawjzakkU1A': true,
        'PT2kwKs93LYgRFhohRAkLuU9oynRDrfXto': true,
        'PGNUAB5kNKVGTQ9CbE198sesKKYXnmX8HU': true,
        'PBGqJGSrdsBrEsLmiAaeH22bxGg8irX3gC': true,
        'PQ2hAPwkey8aACP548DtgLscQTk9PkAKnP': true,
        'PFGMWt1cQFm6QEbcqH6YJxfabj4L5rHfLM': true,
        'PUq5SNWQCdU1dwuQUNRCKaxgzw52rD6Uez': true,
        'PTft97ycE3N6ZKgvixdpbYj8qPxzCe2CxG': true,
        'P9W6f4HJoimwsjJwmnAWKG6HQKcUHz1vaP': true,
        'PAVjp9nsNtgzUNF1VkUd74YzLaQHpv4g7v': true,
        'PKB7GXh1qcY7Q7gs3hafgpzndHLKTx4isM': true,
        'PQ8PDzWy7hDV8gfgSgoP2BCU2CXngMPCvt': true,
        'PHMjVgWj6HMiLeAhiR8eDLzVrXp8nyF2ji': true,
        'PR54hSnPDbhPePLNQZCP4CU77TRFoMxYqg': true,
        'PARV591XENALBB5ApkR7WcQPhEZtLHfi2A': true,
        'PVgktx9ZmPnSXW83HmSF6MX76SV4u5a2hJ': true,
        'PSbwbtsVfALgykAUsCYofkPFTu9Chd6RUo': true,
        'PP3QYWu7ZRRm7NTAkXD7u3NbCKNGJhbEeL': true,
        'PP8AJb4X4uHxJw89UEGcNEom5RZy2RRxBY': true,
        'PRhLYR1TJegWzuzFa7FwT1iCCpNSeJrpjn': true,
        'PXb9rpCDax5NpU6m4tt2gdXyTp4urbTdS8': true,
        'PRDXZpyF7rm9cJw3y6DX2nFvK1AYgjpXdF': true,
        'P9D3ntMdwy4HGjBhg1uQDuQD99MXYZTqg3': true,
        'PWGhooqyrq1qL7NPgg2an8M69sHfJrDM8Y': true,
        'PUuNT7icKad8fm7ATPRn1s8gd19HXYKDqS': true,
        'PWkQMUTG6pKVA9bAbjLmLewB5eVgEnVk6f': true,
        'PUAQeTYUB9H5qjeSSXzeeAd6NKXAz8fzpP': true,
        'PQ4X2NQJD1ZA5Hy58ZU9eHcjpRco7ZMgTz': true,
        'PTMFZXMXYFjiN1UuSV4ZckepyEFVWMm6Zy': true,
        'PKwa3jVZXHpaVgG89WvnM8vBfpp745GGNN': true,
        'PHsHq6i4RKm9gCqFGhAr3yvF34yDocc5S7': true,
        'PNsx3cC4wDyfowrhvBgjf7VfeXHeFdRgX1': true,
        'PHEDVg12YtcHjHYNsmxzV8iexWyw81cQge': true,
        'PRKdjSJkqk15YFncjq1FUUXpHo1XWPbB9x': true,
        'PBw3aSQe6HCzX75xDy5X2SXx9y9JaUP9ke': true,
        'PCxXVA4quzXVjUM356t3FE2nvWmDVY47J7': true,
        'PVATJhZqKdYXLp1nmPdrssRhygJApmAALR': true,
        'PJtnXwKNPDdEpJhaKH2fbPEyLrcS77oj46': true,
        'PSoCtc8FbPaagG6spsqbS2HJjRM8oPG16b': true,
        'PPxDNqCB2oWp3JffCiRXwJTzxRQuRjb5Bc': true,
        'PVRWuvwCNfZWUUD5gQzDsqabnTcMXoqgbV': true,
        'P8sSu2qFnVPGEtnSTKYRMUzuG3xBHsj3ms': true,
        'PUF8bsAYyHZQCtaMbrTwyRDcC3wMLKhFFX': true,
        'PSFpsP19aHs7ZfGPnnt19yQC258y1HFYKD': true,
        'PGecwCERTkoFd82E3e471SvxSxnJpC4cWk': true,
        'PRZEXQXTmz1jW6YmH1e83nkRRiDUqkE6fw': true,
        'PCM3fmcUikLbSNCeqtQ7MEk4yQbn6qQRJt': true,
        'PKXSw8Q4Kdy244Gb1R7GYPvTwiM22JssTf': true,
        'P8gfyLfXyeHzyAvq4Yqw6EW39ifCyVJ9f6': true,
        'PSKLx4k7ehAtvipwpo2ohBeCYzpf4SiKHj': true,
        'PK8dRanrBFxfSo3qw1P4gm6veaQQssZXxB': true,
        'PAqPD7P3iFtz7e2epSP4V8FMPXrJKASeqD': true,
        'PUopiRZvD6BAjF9CcWtMfpeJtxp411dxKM': true,
        'PQkNpRfXbCGXJ2o1mRfsJMvMtsvq3uvZU9': true,
        'PSBhEi8AUasemizUHyJ64t6xXonsxwp73y': true,
        'PKYwaiikhUoPWmpWmYec4Xf3TPWwJQCqUt': true,
        'PST4P2KEweDQJ2RAtG3scUmXAgPJJ5JJRL': true,
        'PCfvhqHEYG3zdWXvLJrjPPDVK2H8qwwXn5': true,
        'PLZsQmsRUDMJGc61pGMLdDQ58UuqQ8kU5Z': true,
        'PMC3pwutfiYpGWUMHhiB1NRjiHL7iWHiyi': true,
        'PMTrhcppMJpaRz4Xnv7CogJPHPMKtcg6bA': true,
        'PCYeapWncohMda9vfrFe26EDEiFa89kDZ1': true,
        'PQEYtpgvtfETFVfhk467SyuGRhwtMcvKUd': true,
        'PGnshbCvNGRiBYGxUpVNqLkaM8Ku1xvbaw': true,
        'PF3oocNVVz5gfdFJGQF4J4xf2bCaxRxYTh': true,
        'PSGSnF7Diww2yJdQefuy3ZvuZEoBw8TGTV': true,
        'PUhvX53ueD2Sxa3q7av83vNcEHuS8M7kRS': true,
        'PGegspsgRqvMiZCP8PGufKMYBk3yekDaEE': true,
        'PB8wu7hQwo5xMsVG4F4HshrW39t2Y4eN37': true,
        'PT4fvQ7jMicg6McC52BmFFkL2M6AEWc7vo': true,
        'PCkX8n2e6aD6Ji37hSpHCJpqvaaJjVWt1m': true,
        'PGD5jUBQ7qNnHDuW85RRBxY1msywEdCm7r': true,
        'PPdfqTLnz2S6F1ng5N7rzMUh19H4e3pfZe': true,
        'PVjhQyjrLur2ZGD5CspSu18ee7R2qsCjo6': true,
        'PNQ8drkeMEtZ44g7VyhxPPwPYubBsT6ekt': true,
        'PCx1LKWdV1pc6TmKwYU8vqEn3CpAeTexDr': true,
        'PLZATQyqYzM6NLbH8M3LPicSU3cTAqW3SA': true,
        'PKWM3oo6YTFFn5U2HLaBueqA3fcLd7BP8m': true,
        'PHnvqSQzg5D3yKo5KgCiXqtFP84bsYyF7G': true,
        'PPw4k3Zra7tYRM643QVm3V4UFrcZZb9H6H': true,
        'PUFZvqrgdnaGXxaFmwPuUPf5NhGg7tpBe9': true,
        'PDhQL18skFG4g7bEJoYhgvjqo6JNpkN533': true,
        'PP1bBz11vicydAcw7QKJezYQdQMpYGEMiV': true,
        'PSFPrHstL1wawZ2eXLdLEpFEjhG8a27EYb': true,
        'PWKzt9TG45VUmAjuoFQQ4bGfZpjaUhxnhH': true,
        'PJ5HX1eCHedY2Zjt4JTUanL1ZLi3NQdy3Q': true,
        'PXkJiHrAwPNk2uKNrN1odK4SDeEdHNGw9j': true,
        'PXpnB4BNmynDf6AuCU8eyB9patuQTbHAgS': true,
        'PGjGt6AGH4UQyVQ62rsyovEFUW2H9nRU4w': true,
        'PLb2C3Gs7r3YqCMamVeaztqnm6mfM2HDjR': true,
        'P95itUBNbBsH28SVYsyk5qUhXWdSb23dbx': true,
        'PUZZnLHg9qPoF1NrwFPvGse96DiNQ1uF5g': true,
        'PJ13w4ap16wZ9xmnLViEt4csZRSDrbCsmF': true,
        'PDkzixpA4TmkTqEKBJrmX6xFDu15qJ39ut': true,
        'PGPqNyxuSSsAkt3m6eb5hyckoDhyy19dW9': true,
        'PRUJpbgfqrDayD5eRi1DmDw7S8857Jhw4e': true,
        'PWbYmgG6PzqhrNDtuFmWrSaLHTDMwZWc26': true,
        'PLbv7r1CkNmPMetvpkTssS14WYuuMXNhDF': true,
        'PDSkBPfxgX25RTde3VzoZ1Wz8yTeUaYAvM': true,
        'PFkCWH4zuAYtVJSQn6rvgEiSsMjHvN8dwE': true,
        'PLYPuTA1HUD8iXBsqTmLUwNhySbJgYja55': true,
        'PXZGt2EaVyRDrXCWMTiH2Tvh5eP7RZhhxF': true,
        'PCtDTH7XznLBCTHhKFeeg8ezSa7WJtYiMJ': true,
        'PUK1GND45D8yVx5WoJKvCMHLfNLNih5MYH': true,
        'PAGt5jHaFFdhNtgUN9zHygCcmpmooWiLPK': true,
        'PCxNa9zJ1pA6o6cb4Dqt8cr1GJtkvsRFnh': true,
        'PHtxzCKFqNEfn8N8FDAUYhUhqSL2qJJZxY': true,
        'PEuEe97X6xceWJQqQWFo8oQ4z1V2sEVZis': true,
        'PGUPmTDchdynQRyEiaHx8K91TqLpm71L4b': true,
        'PVe2vhDZiQryRVxmVuzF1wyFfww54ii4We': true,
        'PVuLw21vLpcBvAfzeBi5PAM3L1CPB1GnYc': true,
        'PVcMixqr6FkarzUjskvLL8MXuExAbEmRHT': true,
        'PCf2FqtB4p6APE3c5Avkrg3yk8dBq9ijRN': true,
        'PW5TQSyz3jWEx9k2S7icQXwKJLEBGRUtho': true,
        'PHVjfPM6bxy84AmWqw7hjBWYk7KVjpdsD2': true,
        'PLTjskW3xi3oaLnyqTAwZQa1iAeQ3PzTuF': true,
        'PRjux87PZdqHNdHcNMTjaVBVxfbWfDos32': true,
        'PXYhCbTwPaUHrP6spJM5NY84TBpLQJtZi5': true,
        'PGPhDGiUY6p78aRFAuPNK621jt21LEg1P8': true,
        'PRFJ8aSwj2xD9t3b4Fxk87hihn5CJXQshp': true,
        'PD7K7Q9S8ruYQ4MRjufwuMF1oMFS2MnJ2L': true,
        'PBcY2VspKfH74aB7SfZbEXd2ZK5Hke2evZ': true,
        'PC5vmVN43qcxWgsmWnCxZK2ARf8uTSyGmX': true,
        'PAwRaCFVQojmJbZoXVikc2DjRHUPCPxya7': true,
        'P9urQoouv7PjfbLdsjU2WNd5a3ARcqmoWq': true,
        'PFaeJhU5V4Jvww6Uu7sXshveTJK9E5Ba1y': true,
        'PNoBxRYhNuAzs5jtwaWhcgETwFkw7dagq5': true,
        'PQDfbq9MetJYpVkTRzRmDcLgm5ZkDnDEwt': true,
        'PNoBxRYhNuAzs5jtwaWhcgETwFkw7dagq5': true,
        'PSs2u1WfWjmbUW6hF3sj3unHya4Ke4rF9Z': true,
        'P9sathm4yQJEH6SMvgC2CCLEXSqVWxSHtj': true,
        'PMH5ohh5bGXiYX7Z37TPyDP5dtCe5Domp4': true,
        'PWXqxFeZdmYT4CoFq6bQr9yiwvRYRdFC2w': true,
        'PTv5T49uhB4VGtwDUT2iwCCBWyGrErRGQJ': true,
        'PK2ETYEuDHiWf2ncGuq3TjGfpXEUdGxuYE': true,
        'PDVFC7FgKSFvcZcEpAVNQsUEGZ4ngcovoU': true,
        'PB9vK57cbgMjqmkrKQqqMyBkky3kzhQCAT': true,
        'PXVp4QeaaomcREBJXuzH34GWiiinNby6HA': true,
        'PXupozgNg1Ee6Nrbapj8DEfMGCVgWi4GB1': true,
        'PLm44qx3ArWbd46dKybCc43dwr2WFn8dT6': true,
        'PLpjFQ67uxgvvk1GdKFrdXacWj6jr9wHSm': true,
        'PBrE3RbATwd6bS3Qq9jR4rr66fesEaZiNA': true,
        'PGiSpH8yYE2XTQeXMzWNaxZhVLnqjkDdvK': true,
        'PWaZra9H38zZUsc7A7bcKq7p5namyaVRAw': true,
        'PDtdKLksh2q5Gq831bcFd4VjvGJAYtNa3Q': true,
        'PCsZ9ADzGgyaK99QpRdaFPFCY6qiRTAYoa': true,
        'PReDbVPWKujZxBDnzhckPJKfjq95tqNKdE': true,
        'PBGxQwMic8X6bpP9sP2EFhkoZpH1Latvcf': true,
        'PSNZVbxpt5isi5VDEsYPiWT9cxqLjMTdPv': true,
        'PWo7o1nY77PK9CWiFoAJwzAeDFfnFwNxpu': true,
        'PX7pM9CG9MhMCqJQD52ahLyqSssNK2WxEv': true,
        'PNYB5PRW8GCjJz1qTDkffrooLdnbMeRQdn': true,
        'PDCYW1fyBk2NvckLzPpxruzTWHXJM8gj9y': true,
        'PTJH7TnDF9kYfdwF2bhrXqHwcm2QtQqyVh': true,
        'PS7Ki2SnrkHh4Wtt7fQewM2TdgHTCZbDYF': true,
        'PEDpvHfW68rHHLbPwVgHy1zej6Bzrhsy11': true,
        'PMSvfdcTdMnXxicqjB8XA64rkhPpXoznB5': true,
        'PVfeMAEsRt5rkaeZVxGFu6yTPBpsy9M1kP': true,
        'PSd47DchqhKK3JtNAbKU4FqR7u1S5yHxau': true,
        'PFDduS88TXG6ZaYu4r9h52h7BDnv6uiYWg': true,
        'PUVj2MyBV7aQUSBKc8DNivghtHcAuY66gT': true,
        'PV72Tzp1N7JhTvisstwpAfmVNJnnMsm3zP': true,
        'PJVukT6jQYrovaWnfEr7Y5US4vu4gXN2Wh': true,
        'PCperKU7icDBQmMBUWceWwWPbqL4ZVe32S': true,
        'PGjYxSEzYKVUmg8T4jXtmJuue6psPqaqz6': true,
        'PMxxG7ivzLxi7qRBDtoZ6qXy173RRUjnvk': true,
        'P8nCpDWuBj6G31P1qP5M29efL7thPQuDyV': true,
        'PWibgcduckVSdeHJURrQYHVUcGknxJBj2T': true,
        'PVwYGmp5V7SfBhTFLYYuPoVXdDcKcWPVA4': true,
        'PJRAwFaXuyYbUgbghWykpApQYYGUNQMNJ9': true,
        'PSp72PK7zKXepZ6PDF6DsiX8knyeRnFbvW': true,
        'PUzgekqrsTtCxmB17HyXe74ofjKowXXYXy': true,
        'PQxpMbfovvgsdKZnHqesS8xvxcozHCGNik': true,
        'PLQ49oTdSwgUjaiouj8A68psJFbxJXHt82': true,
        'PTECfiwYFFCCDMYq9RSrj9HLSJdyN9T1X8': true,
        'PFidbKvmi6JhV4fUx6XzRfD38xHNzh1y7r': true,
        'PQDWJwXAEEp9dpRZKuKp5iDi4bGzn5zEop': true,
        'PSv1yz9wmWQsKnRGJAdwLdyeQyYV3Wdgto': true,
        'PQT1m6M8U81XVanuKre7avRUuKysRQuyZY': true,
        'PS82eAkDWg9LBn4keH3kxXCU4pLbG7Z7uR': true,
        'PNAez3KW8mcQdaVJDzTdv5WSGddcoDwBH2': true,
        'PN8zovq9i8ytAnM3vZERCvrKcJjDZersjG': true,
        'PWUb3x7RxMUEwVxWhU6eA9jzJMZsid4u8s': true,
        'PRYXTN9A3JF53fvgdk7f9AJDafGnCvTTNv': true,
        'PLYWB4GzSWKjJQoqHyEgR3CEDnCHFySB21': true,
        'PENkgaxRLSCEA4snqJVJ3SypWYzngZgSkJ': true,
        'PCS1ciq3zhUojiBdbE2uNzfh8Tb9Ae6wZN': true,
        'PV8nA6h5DRznTypDVDVxoHwLHqueh35gpp': true,
        'PKBx48sYjn7DyQrAKBLsHSugZAZXiGKR1u': true,
        'PDHWFCLJcpcmmSsaeMs2jMY1jVuC48rjcX': true,
        'PMuCPQ8ssu3VYuiRAjoNLnZu3LaVpeoWBq': true,
        'PWwBQjybmwzDsxN3vYiJ56nS1DZRWsopRJ': true,
        'PX42tD2b1j8rrtBnMmtL8ZViht5kFi4iVF': true,
        'PKbYu8Sib6hAB56xeM1r6qWvqbhNFbrTJX': true,
        'PQuQNJExGz9hdQFSaQw36CHSXHVTAivVUx': true,
        'PFhnjDAk3yNCXhgVaaT3kHYzShNF6C9zff': true,
        'PVa3Cp2RERR7NxvMkxzK3mhnihPWXqW9P7': true,
        'PNH7KN8yr5LL8acuMWWkV8J8HMwKyK9NFB': true,
        'PXNi5TLGn56q1M1v7Ab9dbQQmShjHecy2p': true,
        'PPrFUMzLohoC7cufa58Rw1HVzvc26Zcktf': true,
        'PE1tqFMfLZsw2Q2uYJThX59ZtPTDM1YpoX': true,
        'PHYUDXnDVRPERwkKkQrDC71ZFbyTonv7h9': true,
        'PT4PaaFXTuYD7Tws23PQZ2YLCCwdwu7tUH': true,
        'PXFbuZhiME6j7yjmiSAUt9pguXbr8tmo5F': true,
        'PMtPowJsJtHtXR4tW4PSKgfp8TVAMBAA5e': true,
        'PVCZ5fs6nyPpRjiXgM2naBBujzjTM3B1z4': true,
        'PJWmitSptX35i95ZWHzCJdop3XczrVnQNk': true,
        'PJCazxTPm2thAWqmwqHsWghK59FjZvZ9ZM': true,
        'PExrUqBAyXfdgmegm4uQDj64ukyuiL2XrC': true,
        'PCGpniQGTmabMQKAWiE1nCTaFFdHatzNyS': true,
        'PPxrS15N1tKoQcc29FcPrBqfmHpyURny5B': true,
        'PGEBZf7Q8vNFsS9PfrqvDxaPRXk9Yve9cK': true,
        'PXFbuZhiME6j7yjmiSAUt9pguXbr8tmo5F': true,
        'PHZReox7mFtCW3otDDfZ3pZMgkuRS2MJsS': true,
        'PAzs51m8yNxK3y5Km6mmmGtGDcXGB8kCz4': true,
        'P9QksuZXdA9bhxhNEeXgjtEJrQR3LWi9V7': true,
        'PRtwPBwazZM7U9BZQKFvF9N1uK3Tro5gAC': true,
        'PGuPFzGiuuEg5ERzW1dF47raA6vefftP3u': true,
        'PC5ZyNr9uMG5ytpTvrCXxgp5Pb6JexqkJ7': true,
        'PLLpzbNshW1pRoZe6KbZRuKLhm3mgzCHEn': true,
        'PNzUT7RSRMQfXxuxwL8XRXQcmnu1mA4kbY': true,
        'PVKBpAURkwhZhnSQktndTHQJhnkuNfq2bY': true,
        'PDb83yK1KMq9putBFaGuBCfpksUVVDVZcc': true,
        'PGmCWzgCW1CNLkgGSHmgCMKDbuZJia1Bpp': true,
        'PDtHcn5AM7kkx1h7nKZ818vBgxMqojjxup': true,
        'PCQoRv4b4JTF7sCgC2HVXnmpuLNFy8W2D7': true,
        'PAz2RKZhrWpkv1JCFwCnn2aGApHu4n44Uo': true,
        'P9QeLfYqEkQdR9eMZ6D789XDGx2sWJHxSw': true,
        'PUksA2zZFHk1YZgNu9pjPq8ZVr4UVY9CsS': true,
        'PM3aeLBaB6RBAW6mWE6f54BAXgrpRgBzQP': true,
        'PFTKDpTWF6m5Uss6dceQqQji9WgcqazV6J': true,
        'PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM': true,
        'PJw76ZEdMHgp8NfLuvacjF2cP2sGrAGGoe': true,
        'PLYPuTA1HUD8iXBsqTmLUwNhySbJgYja55': true,
        'PKwc6u5ZFZVJWwZyLPh5bTgbpvADaH74g7': true,
        'PKXtnTBkpvo9U5atc5PTSxbdXpoiaYYUKj': true,
        'PXen74Rrke5MQ3FrcFYKq8xxGm6y1zSrXF': true,
        'PE7AZNAxSpKnnLkXXdQB6a7ZyYoqfRBLT3': true,
        'PSsUbLchKSeAEDVESwa1tEYG5eF3hnX5rM': true,
        'PALP9o5GPtyKrD6D9m3NCUUkTZxAcm64ue': true,
        'PDCpUaxYzFCWuHjuvPju6ad51vtDT6JwXQ': true,
        'PJYv6vUb8mZu7Y2Qt6d41v8iS4jL3k6dCe': true,
        'PDyTM57JnknqsCkmuaT1p77ivtfCtkPRya': true,
        'PVAaKHgPB3FmU6XEuvwMAWugTMjKoRo73t': true,
        'PJBt5eXpeep6WK8wCHcECBnPm689zSkCtf': true,
        'PMABcFZc7fcgPZzstJrHeYoWXJGoP3pd7X': true,
        'PSbFTgRftgSCsTzTdYFWY6SYkPD72Pdqfx': true,
        'PMqBXWqWn4SEM6ZM5fWrXxsFpbtW31886J': true,
        'PT7pwrGFNGLmSxUqU1akFr2PzhcTozEH5B': true,
        'PJehpQqXpregZF2aiDyPfwceer2kG71mCy': true,
        'PThktEkvkgNeL9G6EDAESNwneUGz9DeugR': true,
        'PSdjmyvT9qQZxbYMB7jfmsgKokQtP6KkiX': true,
        'P9K1uMNAkhHJGfbMFJXyxs4nBdmowL9rvp': true,
        'PU3PEYF6EJRjm6HC2cXJpC5R6vFCU3Vkao': true,
        'PAqtmQ4pExvpf3cctWDTYyRGmLCsZY24yy': true,
        'PPCHQtVQ6hQna3V6E5Snaht9v9NCJJLYTM': true,
        'PN1iicsiSVHvo52LREkJvVtSxcq2153gnz': true,
        'PRH3aKqRb6UWcJE5EnwVvhmHAVGbT5D6nE': true,
        'PFRhNJJcAVTf8XkghJt3Gu8NJJhAA4BZ68': true,
        'PUXPS6R697STByf1FZH1a121jDPr6fmKe8': true,
        'PWoQb1iiZ7xtzLLPDoJCGcPkug3adGKhbv': true,
        'PUom3RVtdmeohTbM2TepAeCH7E8hmAcg9e': true,
        'PARMbP2sdVuAtxqJE1Xi64hpnYgdyTSBUe': true,
        'PF14hD23JaDEpNNRittHptzZMKkvd1bhtY': true,
        'PDbM95VjNxRrR8t75NcUc3zxy8EWaVvQfk': true,
        'PR8zYNzx7tvxmdDzzs5Fzm6Ak1FhdcwPdS': true,
        'PTY4jFADbYei6BF5tXSme6dFy1aWe87bqZ': true,
        'PNPqF9MoJfdABB9VNBxgxiAxXJVaP9Ujdg': true,
        'PX3v9h7TFEnqFriBQTBPHNz4dZyjb9Wtfz': true,
        'PMWvUDHLULhzkNtr4pdMpMFkBsq4knuDxo': true,
        'PMxtwpDJxX1Wmky5mfg1CrNCVqqtdF1sGt': true,
        'PLNievYvwzGmr1Vp2TcuJMPZscFDp7R9ed': true,
        'PQtqVJ7QnkGtJthY2KEFuMxKuDAAnUeChT': true,
        'PPi3APdPebC5EkqmGio23QQKgBJr1CwFeX': true,
        'PS7uZBtymwr3J2tgXmLEQxC2vQrCfzdx7V': true,
        'PNcYjTjjVfgsHXS8ppREBAos2JhTrZ4EQm': true,
        'PAEfhDBmbyBLzgWknSQKC8ufGoZH3SSF9t': true,
        'PLaWxupK8wAVVCLy8Rv6b8XDCqATU4kGGN': true,
        'PD8xcteF7CZVvjLM1ec2jd6h2QH25J5bP5': true,
        'PRsfNvi3XDyxYpVzAu1nXkGJWdRYYQ8wPR': true,
        'PWSLgrE2UHin8Jbtbnmft7X7MnwNFrdpYi': true,
        'PBKw17wrG66sT5jTZpqDvyBmHaDmbomMUD': true,
        'PT8aDYBurU7b4BPnc4QKmRKhQ4iJkAGPF5': true,
        'PVz4usHgrGeWzuJA1TRbnLqbULfjkyaorW': true,
        'PVcXQqD8JB6p4sGram8j2EivexTj2MrN4w': true,
        'PPZwZcoqm3KYTwyD8KD3Xqdx5iFGurUyU2': true,
        'P9QRW8rWPhPeW2iQs74eKBbtgvmQBk9iEM': true,
        'PNhZXx4nNH75CLhh7Gsaho3JyAg9VBhi4y': true,
        'PXP4ZqvpnfUShULfEMd2DQ6KeNfZkXhvVn': true,
        'PEXwT2KPZExkfmhFkPHGnPNM3X8BMts3WQ': true,
        'PV8dMspgwMzHgaDQhdYp5vbJn2zCYJ8ETE': true,
        'PERp8vWf5unpQNt5ujudv8Z5oeDJbEF87d': true,
        'PNwiPqCQ1RZHjMedbPSzJSPwGEDs3s3hvt': true,
        'PFPUjAhCAdPJN8PbxK3pvHX8pv969RJ198': true,
        'PCja68KWVefRuX8ZKVstkK9HtVCirhLAj4': true,
        'P9HKxUQ9TKn9kEc1sivMPeggxMsssS92FK': true,
        'PWRx3VnQmMrLbjP4Aqc2wS71gfLVDdanvz': true,
        'PLEF1tkHHzXs9eTsCBVEWGghHNp2WnKCAz': true,
        'PJbeXQMgvFzkBXEDqUzjS42dDqbGsX6dsh': true,
        'PMNvtzYjYZYmz99wA8QsuZxMP7FV461P2c': true,
        'PGwSefeA5e9G766TF14F2R4tcMD3GG5fMW': true,
        'PARGWiFEf7pTqvZNE4iTy9AHEQWPhSnY95': true,
        'PHTD9tGhXScCFk9LEHDUVHKgac3z7mXBmt': true,
        'PUsuz1f3edKc4t1sVrvMySvJosfKS5rEYG': true,
        'PUBxem8UZ17SJWjJ2rP6TDAshGr5hNZ4Kj': true,
        'P99D5sk16h7wkksCuynVad65jKF2nFmF8Z': true,
        'P9k99NNoPBAf6UjVe7zFJ4iBECtdeeTeHR': true,
        'PAEyWuijzv7yMHofRBi4i8tL3pk2iAntXX': true,
        'PHewj72LB2vUvqhWiCCe7kxrrBGfsgUyPe': true,
        'PPrv7fY1a4f4opsMaCjwX9qPjw7sXi1Ff2': true,
        'PBmDEeHA7xKT5FnJwV9yRXcfWaF8DSSh9n': true,
        'PTdpmuCY645A2XQK5H24axiJSpNanHHWMP': true,
        'PRXCtW5apMV2JM4CjNnqZ5ijdQc8xcfEJP': true,
        'P8tNMA6QtBooqxw8EieKcL5uP1cTpt9vi9': true,
        'PFCSYXEc5fmVKNoPEtEg1NFezh4bym6e12': true,
        'PUH33LTfznPMgAWuyT1KqinYE8f9B4sRk9': true,
        'PGrXFgpLYXVBgBPrhAeGRLnSpYE6Jwpt5Z': true,
        'PLwWXrGBvVxWfujrDxgGHa7oCVtyw9F3Du': true,
        'PBsnRLRRafnjDEHVaTyreFS1SRKavVFXHZ': true,
        'PWMSN4XByB3sKXrsBnmP9LPYFFBo2PUQ1R': true,
        'PDdwKn4ZNSMyeSyQ6F9zf4ttVd6jC1arvn': true
    }

    self.bch = {
        'PK4qABXW7cGS4YTwHbKX99MsgMznYgGxBL': true
    }

    self.bchl = {
        'PJTPfBQ6Q174s7WWcW41DwTdGrkGYQx5sJ': true
    }

    self.nvadr = {
        'PUy71ntJeRaF1NNNnFGrmC8NzkY6ruEHGK': true,
        'PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd': true,
        'PJ3nv2jGyW2onqZVDKJf9TmfuLGpmkSK2X': true,
        'PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM': true,
        'PU7D6X5bNUdEiuUGWGLp8C6TjSsB2hzHxL': true,
        'PQxuDLBaetWEq9Wcx33VjhRfqtof1o8hDz': true
    }

    self.deletedtest = {}

    self.testaddresses = [
        'PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82',
        'PUy71ntJeRaF1NNNnFGrmC8NzkY6ruEHGK',
        'PU7D6X5bNUdEiuUGWGLp8C6TjSsB2hzHxL',
        'PP6bNhVaXy7YK19UbLHXbQPKa7oV4yx1rr',
        'TSisNge5kisi7cwGRwmUBuZQWZFD8cRoG8',
        'TQEGz5cQQtRad8wo2c1KapvFek9rnuprkD',
        'PKU652wwKYC52WGBJ8EHkA1Mtud8iHWChC',
        'PD4us1zniwrJv64xhPyhT2mgNrTvPur9YN',
        'PHiNjAhHbxVb6D8oaVVBe8DGigKuN4QFP6',
        'PANkQ994YKvCMiH8pHR8vtKvGqH9DQt8Bc',
        'PGvRUM7jXqHdUn7Let2QyTi1t2LHq7RgX7',
        'P9EkPPJPPRYxmK541WJkmH8yBM4GuWDn2m',
        'PReLEpaGEGTCeWKiqnK85eXrqmmTxYQ9Tw',
        'TAqR1ncH95eq9XKSDRR18DtpXqktxh74UU',
        'PUGBtfmivvcg1afnEt9vqVi3yZ7v6S9BcC',
        'PDtuJDVXaq82HH7fafgwBmcoxbqqWdJ9u9',
        'PDCNrwP1i8BJQWh2bctuJyAaXxozgMcRYT',
        'PVJ1rRdS9y9sUpaBJc8quiSTJGrC3xW8EH',
        'PAF1BvWEH7pA24QbbEvCEasViC2Pw9BVj3',
        'PSADH5AY5M9RaWrDVdaMrR2C2s6dCGfNK4',
        'PMyjUzHtzsmbejB87ATbrcQNatiGsT4NzG',
        'PHdW4pwWbFdoofVhSEfPSHgradmrvZdbE5',
        'PDJpNY6Hm9WuA4MGSRefAGcTiDtfWKRKQD',
        'PUJjhGLa7KesEa3Ee8K9pi49u1mW9xqQZB',
        'PFWx4RKpggTjeDNq6oyWJfejP5z8oiKGE5',
        'PFr6sDvtJq3wJejQce5RJ5L8u1oYKgjW9o',
        'PLcjUPjznx5AmBwkLYcrKmLNEwuprSexb3',
        'PURejSeNEoJyn8i1147cKfjHweV6rQJRLX',
        
    ];

    self.whiteList = [
        'PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd',
        'PJ3nv2jGyW2onqZVDKJf9TmfuLGpmkSK2X',
        'TAqR1ncH95eq9XKSDRR18DtpXqktxh74UU',
        'TFkhfcxXSWX5SsLcjhdiSDHEepWUcb7yi3',
    ];

    self.testchataddresses = ['P9EkPPJPPRYxmK541WJkmH8yBM4GuWDn2m', 'PFnN8SExxLsUjMKzs2avdvBdcA3ZKXPPkF', 'PVgqi72Qba4aQETKNURS8Ro7gHUdJvju78', 'P9tRnx73Sw1Ms9XteoxYyYjvqR88Qdb8MK', 'PQxuDLBaetWEq9Wcx33VjhRfqtof1o8hDz', 'PEHrffuK9Qiqs5ksqeFKHgkk9kwQN2NeuS', 'PP582V47P8vCvXjdV3inwYNgxScZCuTWsq', 'PQxuDLBaetWEq9Wcx33VjhRfqtof1o8hDz', 'PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM', 'PK6Kydq5prNj13nm5uLqNXNLFuePFGVvzf', 'PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82', 'PCAyKXa52WTBhBaRWZKau9xfn93XrUMW2s', 'PCBpHhZpAUnPNnWsRKxfreumSqG6pn9RPc', 'PEkKrb7WJgfU3rCkkU9JYT8jbGiQsw8Qy8', 'PBHvKTH5TGQYDbRHgQHTTvaBf7tuww6ho7', 'PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd']

    //self.archivedServers = window.project_config.archivedPeertubeServers || []

    if (window.IpcBridge) self.ipcbridge = new window.IpcBridge().listen()

    self.focus = true;
    self.currentBlock = 0 //1165858;
    self.online = undefined;
    self.avblocktime = 45;
    self.repost = true;
    self.videoenabled = true;

    var paidsubscriptionCache = {}

    self.ischristmastime = function () {
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth() + 1;
        var currentDay = currentDate.getDate();

        if (currentMonth === 12 && currentDay >= 15) {
            return true;
        } else if (currentMonth === 1 && currentDay <= 15) {
            return true;
        } else {
            return false;
        }
    }();

    var bastyonhelperOpened = false
    self.uicamerapreview = null
    self.uimobilesearch = null

    var onlinetnterval;

    var smulti = 100000000

    self.sm = new nModule();
    self.sm.ajax = app.ajax;
    self.sm.app = app;
    self.sm.user = app.user;
    self.sm.map.id = 'platformmodule'
    self.sm.componentsPath = 'components/'

    self.released = {
        vidgets: {
            staking: true
        }
    }

    self.actions = app.Actions
    self.psdk = app.psdk

    self.actionListeners = {}

    self.actions.on('change', ({
        account
    }) => {
        if (account.address == app.user.address.value) {

        }
    })

    self.actions.on('actionFiltered', ({
        action,
        address,
        status
    }) => {

        var listener = listeners[action.object.type]

        if (!listener) return

        if (address == app.user.address.value) {

            var alias = action.get()

            listener(alias, status)

            window.rifticker.add(() => {
                _.each(self.actionListeners, (c, i) => {
                    if (c)
                        c({
                            type: action.object.type,
                            alias,
                            status
                        })
                })
            })

        }

    })





    var listeners = {
        share: function (alias, status) {

            if (status == 'sent') {
                if (alias.itisvideo()) {
                    self.sdk.videos.unposted.remove(alias.url)
                }
            }

        },
        upvoteShare: function (alias, status) {

            var share = self.psdk.share.get(alias.share.v)
            var value = alias.value.v

            if (alias.actor != app.user.address.value) return
            if (!share) return

            if (status == 'completed') {

            }


            if (status == 'relay') {

                self.sdk.memtags.add(share.tags, 'l_' + share.txid, (value - 3) / 2)

                if (value > 4) self.sdk.recommendations.successRecommendation(share)

            }

        },

        cScore: function (alias, status) {},

        comment: function (alias, status) {},
        subscribe: function (alias, status) {},
        subscribePrivate: function (alias, status) {},
        unsubscribe: function (alias, status) {},
        blocking: function (alias, status) {},
        unblocking: function (alias, status) {},
        userInfo: function (alias, status) {},
        contentDelete: function (alias, status) {},
        accSet: function () {},
        accDel: function () {},
        transaction: function () {}
    }





    self.mp = {
        dollars: function (value, p) {
            if (!p) p = {};

            if (typeof p.precision == 'undefined')
                p.precision = 2;

            p.allowNegative = false;

            if (typeof p.prefix == 'undefined')
                p.prefix = "$&nbsp;";

            p.value = Number(value).toFixed(p.precision);

            return maskValue(p)
        },

        coin: function (value, p) {
            if (!p) p = {};

            if (typeof p.precision == 'undefined') {

                p.precision = 2;

                if (value >= 1) {
                    p.precision = 2;
                }

                if (value > 1000000) {
                    p.precision = 0;
                }

                if (value < 0.1) {
                    p.precision = 4;
                }

                if (value < 0.0005) {
                    p.precision = 8;
                }

                if (value <= 0) {
                    p.precision = 2;
                }
            }

            p.allowNegative = false;

            p.value = Number(value).toFixed(p.precision);

            return maskValue(p)
        },

        acoin: function (value, p) {
            if (!p) p = {};

            if (typeof p.precision == 'undefined') {

                p.precision = 2;

                if (value >= 1) {
                    p.precision = 2;
                }

                if (value < 0.001) {
                    p.precision = 8;
                }

                if (value > 1000000) {
                    p.precision = 0;
                }
            }

            p.allowNegative = false;

            p.value = Number(value).toFixed(p.precision);

            return maskValue(p)
        },

        coinwithsmall: function (value, p) {

            if (!p) p = {}

            if (typeof p.precision == 'undefined')
                p.precision = 2;

            if (typeof p.dprecision == 'undefined')
                p.dprecision = 6;

            if (typeof p.suffix == 'undefined')
                p.suffix = "PKOIN";

            var suffix = p.suffix;

            delete p.suffix

            value = Number(Number(value).toFixed(p.dprecision));

            var s = Math.pow(10, p.precision)

            p.allowNegative = false;

            p.value = ((Math.floor(value * s)) / s).toFixed(p.precision);


            value = (value - p.value).toFixed(p.dprecision).substr(2 + p.precision);

            var fp = maskValue(p)

            var html = '<div class="table coinwithsmall"><div class="bignum">' + clearStringXss(fp) +
                '</div><div class="svlwr"><div><div div class="smallvalue">' + clearStringXss(value) + '</div><div class="suffix">' + suffix + '</div></div></div></div>'

            return html;
        }
    }

    self.istest = function () {
        var addresses = self.testaddresses;

        if (addresses.indexOf(self.app.user.address.value) > -1) {

            return true
        }
    }


    self.values = {
        alph: [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'a', 'b', 'c', 'd', 'e', 'f', 'g',
            'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u',
            'v', 'w', 'x', 'y', 'z'
        ],
    }

    //var sm = {};


    self.__applications = function () {
        const ghAppLatest = 'https://api.github.com/repos/pocketnetapp/pocketnet.gui/releases/latest';
        const ghCoreLatest = 'https://api.github.com/repos/pocketnetapp/pocketnet.core/releases/latest';
        const readmeDownloadsLink = 'https://github.com/pocketnetteam/pocketnet.gui/blob/master/README.md#download-bastyon-on-your-devices';

        var configmeta = ((window.project_config || {}).applications) || {}

        var meta = {

            ui: {
                android: {
                    appname: app.meta.fullname,
                    id: "android",
                    text: {
                        name: "Android",
                        download: self.app.localization.e('e132221'),
                        label: self.app.localization.e('e132233')
                    },
                    icon: '<i class="fab fa-android"></i>',
                    modile: true,
                    image: 'applications_android.png',
                    hreflabel: 'downloadplaystore',
                    githublabel: 'downloadgithub'
                },

                ios: {
                    appname: app.meta.fullname,
                    id: "ios",
                    text: {
                        name: "Ios",
                        download: self.app.localization.e('e132221'),
                        label: self.app.localization.e('e132233ios')
                    },
                    icon: '<i class="fab fa-apple"></i>',
                    modile: true,
                    image: 'applications_ios.jpg',
                    hreflabel: 'installpwa',
                },

                windows: {

                    appname: app.meta.fullname,
                    id: "windows",
                    text: {
                        name: "Windows",
                        download: self.app.localization.e('e13222'),
                        label: self.app.localization.e('e13223')
                    },

                    icon: '<i class="fab fa-windows"></i>',
                    image: 'applications_windows.png',
                    node: true
                },

                macos: {
                    appname: app.meta.fullname,
                    id: 'macos',
                    text: {
                        name: "macOS",
                        download: self.app.localization.e('e13222'),
                        label: self.app.localization.e('e132232')
                    },

                    icon: '<i class="fab fa-apple"></i>',
                    image: 'applications_macos.png'
                },

                linux: {
                    appname: app.meta.fullname,
                    id: "linux",
                    text: {
                        name: "Linux",
                        download: self.app.localization.e('e13222'),
                        label: self.app.localization.e('e13224')
                    },

                    image: 'applications_linux.png',
                    icon: '<i class="fab fa-linux"></i>',
                    node: true
                }
            },

            node: {
                windows: {
                    appname: self.app.localization.e('e13225'),
                    text: {
                        name: "Windows",
                        download: self.app.localization.e('e13226'),
                        label: self.app.localization.e('e13227')
                    },

                    icon: '<i class="fab fa-windows"></i>',
                },

                linux: {
                    appname: self.app.localization.e('e13225'),

                    text: {
                        name: "Linux",
                        download: self.app.localization.e('e13226'),
                        label: self.app.localization.e('e13228')
                    },

                    icon: '<i class="fab fa-linux"></i>'
                }
            }
        }

        _.each(meta, (o, i) => {
            _.each(o, (a, j) => {
                meta[i][j] = {
                    ...a,
                    ...configmeta[i][j] || {}
                }
            })
        })

        return meta
    }

    self.__getSettingsMeta = function () {

            var tgv = ""

            try {
                tgv = (JSON.parse(localStorage.getItem('telegrambot')) && JSON.parse(localStorage.getItem('telegrambot')).token) || ""

            } catch (e) {

            }

            var st = {

                preview: {
                    name: self.app.localization.e('disablePreview'),
                    id: 'preview',
                    type: "BOOLEAN",
                    value: false
                },

                sound: {
                    name: self.app.localization.e('sound'),
                    id: 'sound',
                    type: "BOOLEAN",
                    value: true
                },

                win: {
                    name: self.app.localization.e('e13268'),
                    id: 'win',
                    type: "BOOLEAN",
                    value: true
                },

                transactions: {
                    name: self.app.localization.e('e13269'),
                    id: 'transactions',
                    type: "BOOLEAN",
                    value: true
                },

                upvotes: {
                    name: self.app.localization.e('e13270'),
                    id: 'upvotes',
                    type: "BOOLEAN",
                    value: true
                },

                downvotes: {
                    name: self.app.localization.e('e13270d'),
                    id: 'downvotes',
                    type: "BOOLEAN",
                    value: false
                },

                comments: {
                    name: self.app.localization.e('e13271'),
                    id: 'comments',
                    type: "BOOLEAN",
                    value: true
                },

                answers: {
                    name: self.app.localization.e('e13272'),
                    id: 'answers',
                    type: "BOOLEAN",
                    value: true
                },

                followers: {
                    name: self.app.localization.e('e13273'),
                    id: 'followers',
                    type: "BOOLEAN",
                    value: true
                },

                /*rescued: {
                    name: self.app.localization.e('e13274'),
                    id: 'rescued',
                    type: "BOOLEAN",
                    value: true
                },*/

                commentScore: {
                    name: self.app.localization.e('e13275'),
                    id: 'commentScore',
                    type: "BOOLEAN",
                    value: true
                },

                embedvideo: {
                    name: self.app.localization.e('e13276'),
                    id: 'embedvideo',
                    type: "BOOLEAN",
                    value: true
                },

                videoautoplay2: {
                    name: self.app.localization.e('e13277'),
                    id: 'videoautoplay2',
                    type: "BOOLEAN",
                    value: false
                },

                videop2p: {
                    name: self.app.localization.e('videop2psettings'),
                    id: 'videop2p',
                    type: "BOOLEAN",
                    value: true
                },

                videoTranscoding: {
                    name: self.app.localization.e('settingsTranscoding'),
                    id: 'transcoding',
                    type: "BOOLEAN",
                    value: true
                },

                autostart: {
                    name: self.app.localization.e('e13278'),
                    id: 'autostart',
                    type: "BOOLEAN",
                    value: undefined
                },

                vidgetchat: {
                    name: self.app.localization.e('e13279'),
                    id: 'vidgetchat',
                    type: "BOOLEAN",
                    value: true
                },

                vidgettags: {
                    name: self.app.localization.e('e13280'),
                    id: 'vidgettags',
                    type: "BOOLEAN",
                    value: true
                },

                vidgetlastcomments: {
                    name: self.app.localization.e('e13281'),
                    id: 'vidgetlastcomments',
                    type: "BOOLEAN",
                    value: true
                },

                vidgetstaking: {
                    name: 'Staking Pocketcoin vidget',
                    id: 'vidgetstaking',
                    type: "BOOLEAN",
                    value: true
                },

                interfacemobilelayoutmenu: {
                    name: self.app.localization.e('interfacemobilelayoutmenu'),
                    id: 'interfacemobilelayoutmenu',
                    type: "BOOLEAN",
                    value: false
                },

                commentsOrder: {
                    type: "VALUES",
                    name: self.app.localization.e('commentsOrder'),
                    id: 'commentsOrder',
                    placeholder: self.app.localization.e('commentsOrderPlaceholder'),
                    defaultValue: self.app.localization.e('comments_interesting'),
                    value: "",
                    possibleValues: ['interesting', 'timeup', 'time'],
                    possibleValuesLabels: [
                        self.app.localization.e('comments_interesting'),
                        self.app.localization.e('comments_timeup'),
                        self.app.localization.e('comments_time')
                    ]
                },


                enablePeertube: {
                    name: 'Use PeerTube for uploading videos',
                    id: 'enablePeertube',
                    type: "BOOLEAN",
                    value: false,
                },

                hierarchicalShares: {
                    name: 'Hierarchical Post Feed',
                    id: 'hierarchicalShares',
                    type: "BOOLEAN",
                    value: false,
                },

                historicalShares: {
                    name: 'Historical Post Feed',
                    id: 'historicalShares',
                    type: "BOOLEAN",
                    value: false,
                },

                openlinksinelectron: {
                    name: self.app.localization.e('openlinkssettings'),
                    id: 'openlinksinelectron',
                    type: "BOOLEAN",
                    value: false,
                },

                sendUserStatistics: {
                    name: self.app.localization.e('sendUserStatistics'),
                    id: 'sendUserStatistics',
                    type: "BOOLEAN",
                    value: true,
                },

                canuseip: {
                    name: self.app.localization.e('canuseipsetting'),
                    id: 'canuseip',
                    type: "BOOLEAN",
                    value: false
                },

                useanimations: {
                    name: self.app.localization.e('useanimations'),
                    id: 'useanimations',
                    type: "BOOLEAN",
                    value: true
                },

            }



            return st
        },

        self.errorHandler = function (key, action, akey) {

            var er = null

            if (_.isObject(key)) {
                er = key
                key = er.code
            }

            var eobj = self.errors[key] || self.errors['network'];

            if (!eobj) {
                return false;
            } else {
                var m = eobj.message;

                if (m) {
                    if (typeof m == 'function') m = m(akey, er);

                    if (!m) return

                    sitemessage(m)
                }

                var a = eobj.action

                if (action && a) {
                    a(key, action, akey)
                }

                return (eobj.text || function () {
                    return ''
                })()
            }



        }

    self.errors = {

        'money': {

            /////

            action: function (key, action, akey) {

                var adr = self.app.user.address.value;

                topPreloader(10);

                self.sdk.node.transactions.get.balance(function (a, d, e) {
                    topPreloader(30);

                    if (e) {

                        self.errorHandler(e, action, akey)

                        return
                    }

                    if (a > 0) {

                        self.sdk.node.transactions.get.canSpend([adr], function (cs) {

                            topPreloader(100);

                            if (!cs) {
                                new dialog({
                                    html: self.app.localization.e('canSpendError'),
                                    btn1text: self.app.localization.e('daccept'),

                                    class: 'zindex one'
                                })
                            } else {
                                sitemessage(self.errors["network"].message())
                            }

                        })

                    } else {
                        if (!self.app.user.validate()) {

                            self.app.platform.sdk.ustate.me(function (_mestate) {

                                topPreloader(40);


                                if (_mestate) {
                                    self.app.platform.sdk.users.checkFreeMoney(adr, function (res) {

                                        topPreloader(100);

                                        if (res) {
                                            self.errors["1"].action()
                                        } else {
                                            new dialog({
                                                html: self.app.localization.e('noMoneyError'),
                                                btn1text: self.app.localization.e('daccept'),

                                                class: 'zindex one'
                                            })
                                        }
                                    })
                                } else {
                                    topPreloader(100);
                                    sitemessage(self.errors["network"].message())
                                }



                            })

                        } else {
                            topPreloader(100);

                            console.error("TODO_REF_ACTIONS")


                            /*self.app.platform.sdk.user.waitActions(function (r) {

                                if (!r) {
                                    new dialog({
                                        html: self.app.localization.e('noMoneyError'),
                                        btn1text: self.app.localization.e('daccept'),

                                        class: 'zindex one'
                                    })
                                }
                                else {
                                    new dialog({
                                        html: self.app.localization.e('waitConf'),
                                        btn1text: self.app.localization.e('daccept'),

                                        class: 'zindex one'
                                    })
                                }

                            })*/


                        }
                    }

                }, adr, true)

            },

            relay: true
        },

        'privatekey': {
            message: function () {
                return self.app.localization.e('e13229')
            },

            relay: true
        },
        'network': {
            message: function (a) {
                return self.app.localization.e('e13230') + (a ? ': ' + a : "")
            },

            relay: true
        },

        'proxy': {
            message: function () {
                return self.app.localization.e('e13231') + " / 1"
            },

            relay: true
        },

        'proxymain': {
            message: function () {
                return self.app.localization.e('e13231') + " / 2"
            },

            relay: true
        },

        'node': {
            message: function () {
                return self.app.localization.e('e13232')
            },

            relay: true
        },

        'offline': {
            message: function () {
                return self.app.localization.e('e13231')
            },

            relay: true
        },

        "actions_noinputs_wallet": {
            message: function () {
                return self.app.localization.e('actions_noinputs_wallet')
            }
        },
        "actions_noinputs": {
            message: function () {
                return self.app.localization.e('actions_noinputs')
            }
        },
        "actions_noinputs_on_address": {
            message: function () {
                return self.app.localization.e('actions_noinputs_on_address')
            }
        },
        "actions_noinputs_wait": {
            message: function () {
                return self.app.localization.e('actions_noinputs_wait')
            }
        },

        "actions_noinputs_wait_comment": {
            message: function () {
                return self.app.localization.e('actions_noinputs_wait_comment')
            }
        },
        "actions_totalAmountZero": {
            message: function () {
                return self.app.localization.e('actions_totalAmountZero')
            }
        },

        "actions_totalAmountSmaller_amount": {
            message: function () {
                return self.app.localization.e('actions_totalAmountSmaller_amount')
            }
        },

        "actions_totalAmountSmaller_amount_wait": {
            message: function () {
                return self.app.localization.e('actions_totalAmountSmaller_amount_wait')
            }
        },

        "actions_totalAmountSmaller_amount_fee": {
            message: function () {
                return self.app.localization.e('actions_totalAmountSmaller_amount_fee')
            }
        },

        "actions_totalAmountSmaller_amount_fee_wait": {
            message: function () {
                return self.app.localization.e('actions_totalAmountSmaller_amount_fee_wait')
            }
        },
        "actions_rejected": {
            message: function () {
                return self.app.localization.e('actions_rejected')
            }
        },
        "actions_rejectedFromNodes": {
            message: function () {
                return self.app.localization.e('actions_rejectedFromNodes')
            }
        },
        "actions_waitConfirmation": {
            message: function () {
                return self.app.localization.e('actions_waitConfirmation')
            }
        },
        "actions_completed": {
            message: function () {
                return self.app.localization.e('actions_completed')
            }
        },
        "actions_alreadyCheckConfirmation": {
            message: function () {
                return self.app.localization.e('actions_alreadyCheckConfirmation')
            }
        },

        "actions_alreadySent": {
            message: function () {
                return self.app.localization.e('actions_alreadySent')
            }
        },
        "actions_alreadySending": {
            message: function () {
                return self.app.localization.e('actions_alreadySending')
            }
        },
        "actions_waitUserStatus": {
            message: function () {
                return self.app.localization.e('actions_waitUserStatus')
            }
        },
        "actions_rejectedByTime": {
            message: function () {
                return self.app.localization.e('actions_rejectedByTime')
            }
        },
        "actions_resourses": {
            message: function () {
                return self.app.localization.e('actions_resourses')
            }
        },
        "actions_alreadyCheck": {
            message: function () {
                return self.app.localization.e('actions_alreadyCheck')
            }
        },
        "actions_checkFail": {
            message: function () {
                return self.app.localization.e('actions_checkFail')
            }
        },

        "actions_collision": {
            message: function () {
                return self.app.localization.e('actions_collision')
            }
        },
        "actions_actionId": {
            message: function () {
                return self.app.localization.e('actions_actionId')
            }
        },
        "actions_address": {
            message: function () {
                return self.app.localization.e('actions_address')
            }
        },
        "actions_noAddress": {
            message: function () {
                return self.app.localization.e('actions_noAddress')
            }
        },

        "313": {
            message: function () {
                return self.app.localization.e('lockedaccount')
            }
        },

        "408": {
            message: function () {
                return self.app.localization.e('error408')
            }
        },

        ///// NODE
        "66": {
            message: function () {
                return self.app.localization.e('e13257')
            }
        },

        "65": {
            message: function () {
                return self.app.localization.e('e13258')
            }
        },

        "64": {
            message: function () {
                return self.app.localization.e('e13259')
            }
        },


        "62": {
            message: function () {
                return self.app.localization.e('e13260')
            }
        },

        "61": {
            message: function () {
                return self.app.localization.e('e13248')
            }
        },

        "60": {
            message: function () {
                return self.app.localization.e('e13257_1')
            }
        },

        "49": {
            message: function () {
                return self.app.localization.e('saveSettingsLimit')
            }
        },

        "48": {
            message: function () {
                return self.app.localization.e('canSpendError')
            }
        },

        "47": {
            message: function () {
                return self.app.localization.e('err47')
            }
        },

        "42": {
            message: function () {
                return self.app.localization.e('e13233')
            }
        },

        "41": {
            message: function () {
                return self.app.localization.e('e13234')
            },

            relay: true
        },

        "40": {
            message: function () {
                return self.app.localization.e('e13235')
            }
        },

        "39": {
            message: function () {
                return self.app.localization.e('e13236')
            }
        },

        "38": {
            message: function () {
                return self.app.localization.e('e13237')
            }
        },

        "37": {
            message: function () {
                return self.app.localization.e('e13238')
            }
        },

        "35": {
            message: function () {
                return self.app.localization.e('e13239')
            }
        },

        "34": {
            message: function () {
                return self.app.localization.e('e13240')
            }
        },

        "33": {
            message: function () {
                return self.app.localization.e('e13241')
            }
        },

        "32": {
            message: function () {
                return self.app.localization.e('e13242')
            }
        },

        "31": {
            message: function () {
                return self.app.localization.e('e13243')
            }
        },

        "30": {
            message: function () {
                return self.app.localization.e('e13244')
            }
        },

        "29": {
            message: function () {
                return self.app.localization.e('e13245')
            }
        },

        "28": {
            message: function () {
                return self.app.localization.e('e28error')
            }
        },

        "27": {
            message: function () {
                return self.app.localization.e('e13246')
            }
        },
        "26": {
            message: function () {
                return self.app.localization.e('e13247')
            }
        },

        "25": {
            message: function () {
                return self.app.localization.e('e13248')
            }
        },
        "24": {
            message: function () {
                return self.app.localization.e('e13249')
            }
        },
        "23": {
            message: function () {
                return self.app.localization.e('e13250')
            }
        },
        "22": {
            message: function () {
                return self.app.localization.e('e13251')
            }
        },
        "21": {
            message: function () {
                return self.app.localization.e('e13252')
            }
        },
        "20": {
            message: function () {
                return self.app.localization.e('e13253')
            }
        },

        "19": {
            message: function () {
                return self.app.localization.e('e13254')
            }
        },

        "18": {
            message: function () {
                return self.app.localization.e('e13255')
            }
        },

        "17": {
            message: function () {
                return self.app.localization.e('e13256')
            }
        },

        "16": {
            message: function () {
                return self.app.localization.e('e13257')
            }
        },

        "15": {
            message: function () {
                return self.app.localization.e('e13258')
            }
        },

        "14": {
            message: function () {
                return self.app.localization.e('e13259')
            }
        },

        "13": {
            message: function () {
                return self.app.localization.e('e13260')
            }
        },

        "12": {
            message: function () {
                return self.app.localization.e('unexperror12')
            }
        },

        "11": {
            message: function () {
                return self.app.localization.e('dataenteredincorrectly')
            }
        },

        "10": {
            message: function () {
                return self.app.localization.e('unexperror10')
            }
        },

        "9": {
            message: function () {
                return self.app.localization.e('SelfSubscribeError')
            }
        },

        "8": {
            message: function () {
                return self.app.localization.e('DoubleSubscribeError')
            }
        },

        "7": {
            message: function () {
                return self.app.localization.e('InvalideSubscribeError')
            }
        },

        "6": {
            message: function () {
                return self.app.localization.e('ChangeInfoLimitError')
            }
        },

        "5": {
            message: function () {
                return self.app.localization.e('SelfScoreError')
            }
        },

        "4": {
            message: function () {
                return self.app.localization.e('doubleLimitLight')
            }
        },

        "3": {
            message: function () {
                var us = self.psdk.userState.getmy() || {}

                return self.app.localization.e('scoreLimitLight', (us.score_unspent || 0) + (us.score_spent || 0))
            }
        },

        "2": {
            text: function () {

                var us = self.psdk.userState.getmy() || {}

                return self.app.localization.e('postLimitLight', (us.post_unspent || 0) + (us.post_spent || 0))

            }
        },

        "1": {
            text: function () {
                return self.app.localization.e('checkScoreErrorLight')
            },
            action: function () {

                globalpreloader(true)
                console.error("TODO_REF_ACTIONS")




            },

            relay: true

        },


        "2000": {
            message: function () {
                return self.app.localization.e('e2000')
            }
        },

        "-1": {
            message: function () {
                return self.app.localization.e('e2000')
            }
        },

        "-26": {
            message: function (v, er) {

                var loc = deep(er, 'error.message') || ''

                return self.app.localization.e(loc || 'Error code: -26')
            },

            relay: true
        },

        "tosmallamount": {

            message: function () {

                return 'Too small amount'

            },


        },

        "imageerror": {

            message: function () {

                return 'An error occurred while loading images. Please try again'

            },


        }
    }

    self.parseUrl = function (url) {


        url = url.replace("http:", "https:").replace("http//", "https://")


        var meta = parseVideo(url);

        var _url = null;

        if (meta.type) {

            _url = url;

            if (meta.type == 'peertube') {
                //_url = `https://${meta.host_name}/videos/embed/${meta.id}`

                _url = `peertube://${meta.host_name}/${meta.id}`
            }

            if (meta.type == 'youtube') {

                if (url.indexOf('@') == -1) {

                    if (url.indexOf("watch") > -1) {

                        var s = url.split("?");

                        if (s[1]) {


                            var v = parameters(s[1]);

                            if (v.v) {
                                _url = 'https://youtu.be/' + v.v

                                meta.id = v.v
                            }

                        }
                    }

                    if (url.indexOf("youtu.be") > -1) {
                        //_url = 'https://youtu.be/' + v.v
                    }

                }


            }

            if (meta.type == 'vimeo' && url.indexOf("player") == -1) {

                var s = url.split("/");

                s = s[s.length - 1];

                if (/[0-9]+/.test(s)) {

                    _url = 'https://player.vimeo.com/video/' + s + '?portrait=0';

                    meta.id = s
                }

            }

            if (meta.type == 'bitchute' && url.indexOf("player") == -1) {

                var _url = url;

                if (_url.endsWith('/'))
                    _url = _url.substr(0, _url.length - 1)

                var s = _url.split("/");

                s = s[s.length - 1];

                if (s[1] && url.indexOf('?') == -1) {

                    _url = `https://www.bitchute.com/video/${s}/`;

                    meta.id = s
                }

            }

            if (meta.type == 'brighteon' && url.indexOf("player") == -1) {

                if (url.indexOf('embed') == -1) {

                    _url = 'https://www.brighteon.com/embed/' + meta.id;

                } else {

                    _url = url;

                }

            }

            if (meta.type == 'stream.brighteon' && url.indexOf("player") == -1) {

                if (url.indexOf('embed') == -1) {

                    _url = 'https://stream.brighteon.com/embed/' + meta.id;

                } else {

                    _url = url;

                }

            }

            meta.url = _url;
        } else {

        }

        return meta;
    }

    self.objects = {
        graph: function (p) {

            var graph = this;

            graph.el = p.el;

            graph.series = [];

            graph.id = makeid();

            graph.options = p.chart || {};

            graph.shell = p.shell;

            graph.stock = p.stock;


            graph.unit = p.unit || 'number';

            var helpers = {
                minMax: function (series) {

                    var max = null;
                    var min = null;

                    _.each(series, function (serie) {
                        _.each(serie.data, function (point) {

                            if (max === null || max < point.y) max = point.y

                            if (min === null || min > point.y) min = point.y


                        })
                    })

                    return {
                        min: min,
                        max: max
                    }
                }
            }

            var defaulOptions = function (p) {

                if (!p) p = {};

                p.sizeRatio || (p.sizeRatio = 1)

                var options = {
                    colors: [

                    ],
                    chart: {
                        style: {
                            fontFamily: "'Segoe UI', SegoeUI, 'Helvetica Neue', Helvetica, Arial, sans-serif"
                        },
                        backgroundColor: 'transparent',
                        spacing: [8 * p.sizeRatio, 8 * p.sizeRatio, 8 * p.sizeRatio, 8 * p.sizeRatio],
                        type: 'spline'
                        //
                    },

                    rangeSelector: {
                        inputEnabled: false,
                        selected: 3 // all
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: ''
                    },
                    exporting: {
                        enabled: false
                    },
                    xAxis: {
                        crosshair: true,
                        labels: {
                            enabled: true,
                            distance: 15 * p.sizeRatio,
                            padding: 5 * p.sizeRatio,
                            //step : 1 * p.sizeRatio,
                            style: {
                                'fontSize': 11 * p.sizeRatio + 'px',
                                'color': "#27a9e6"
                            }
                        },
                        lineWidth: 0,
                        minorGridLineColor: 'transparent',
                        minorGridLineWidth: 0,
                        gridLineColor: "rgb(228, 221, 222)",
                        gridLineWidth: 0,
                        minorTickLength: 2 * p.sizeRatio,
                        tickWidth: 1 * p.sizeRatio,
                        tickColor: 'transparent',
                        title: {
                            enabled: false,
                            text: 'Date',
                            y: 10 * p.sizeRatio,
                            style: {

                                'fontSize': 10 * p.sizeRatio + 'px',
                                "color": "rgb(30, 35, 40)"
                            }
                        },
                        minPadding: 0.04,
                        maxPadding: 0.04,
                        offset: 20 * p.sizeRatio,
                        tickPixelInterval: 100 * p.sizeRatio,

                    },
                    yAxis: [{
                        minPadding: 0,
                        maxPadding: 0,
                        offset: 10,
                        //floor: true,
                        title: {
                            enabled: false,
                            text: '',
                            style: {
                                'fontSize': 10 * p.sizeRatio + 'px',
                                "color": "rgb(30, 35, 40)"
                            }
                        },
                        startOfWeek: 0,
                        lineWidth: 0,
                        lineColor: 'transparent',
                        minorTickLength: 0,
                        minorGridLineWidth: 1,
                        gridLineColor: "rgb(228, 221, 222)",
                        gridLineWidth: 1,
                        //tickInterval: 5,
                        tickLength: 0,
                        tickPixelInterval: 100 * p.sizeRatio,
                        opposite: true,

                        labels: {
                            enabled: true,
                            style: {
                                'fontSize': 11 * p.sizeRatio + 'px',
                                'color': "#27a9e6"
                            },

                            padding: 5 * p.sizeRatio,
                            distance: -25 * p.sizeRatio,
                            y: 3 * p.sizeRatio,

                        },

                        tickColor: 'rgb(228, 221, 222)',
                    }],

                    tooltip: {
                        backgroundColor: "rgba(247,247,247,1)",
                        crosshairs: true,
                        formatter: function (c) {

                            var convertX = function (x) {

                                if (graph.options.xtype == 'datetime')

                                    return convertDate(dateToStr(x));

                                else
                                    return x;
                            }

                            var suffix = deep(c.chart, 'xAxis.0.userOptions.title.text') || deep(this, 'points.0.series.name');

                            var s;

                            if (suffix) {
                                s = convertX(this.x) + ' - <b>' + suffix + '</b><br/>';
                            } else {
                                s = '<b>' + convertX(this.x) + '</b><br/>';
                            }

                            var series = c.chart.series;

                            var x = this.x;

                            var points = _.clone(this.points) || [];

                            /*_.each(series, function(s){

                                if(s.name.indexOf("Navigator") > -1) return;

                                var p = _.find(s.data || s, function(p){

                                    if (p)

                                        if(convertX(p.x) === convertX(x)) return true;
                                })

                                if (p)

                                    points.push(p);

                            })*/

                            _.each(points, function (p) {

                                var sname = p.series.name;

                                var y = p.y;


                                var view = deep(p, 'point.__view') || graph.unit || 'number'

                                if (view == 'dollars') {
                                    y = Number(p.y).toFixed(0);

                                    y = self.mp.dollars(y, {
                                        precision: 0
                                    })

                                }

                                if (view == 'percent') {
                                    y = Number(p.y).toFixed(2);

                                    y = y + " %"
                                }

                                if (view == 'number') {
                                    y = Number(y).toFixed(2);
                                }

                                var objSuffix = '';

                                if (graph.options.displayType == 'points') {

                                    if (p.to_objectGl)
                                        objSuffix = p.to_objectGl.name

                                } else {
                                    if (p.to_object)
                                        objSuffix = '(' + p.to_object.Ticker + ')';
                                }



                                s += '<span style="color:' + p.series.color + '">\u25CF</span> ' + sname + ' ' + objSuffix + ': <b>' + y + '</b><br/>';
                            });


                            return s;
                        },
                        shared: true,
                        useHTML: true,
                        style: {
                            "zIndex": '500',
                        }
                    },
                    legend: {

                        enabled: true,

                        itemStyle: {
                            'fontSize': 10 * p.sizeRatio + 'px',
                            'font-weight': '500',
                            "padding": 10 * p.sizeRatio

                        },
                        symbolHeight: 14 * p.sizeRatio,
                        symbolWidth: 14 * p.sizeRatio,
                        padding: 8 * p.sizeRatio,
                        lineHeight: 16 * p.sizeRatio,
                        margin: 24 * p.sizeRatio,
                        symbolPadding: 2 * p.sizeRatio,
                        itemDistance: 50 * p.sizeRatio,
                        align: 'center',
                        labelFormatter: function () {

                            return this.name;

                        }
                        //enabled : false,
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            },
                            pointPadding: 0.1,
                            groupPadding: 0.1,
                            animation: false,

                            borderColor: "rgba(52, 100, 166, 0.8)",
                            color: "rgba(52, 100, 166, 0.3)",
                        },
                        pie: {
                            size: '65%',
                            dataLabels: {
                                connectorWidth: 1 * p.sizeRatio,
                                distance: 30 * p.sizeRatio,
                                connectorPadding: 5 * p.sizeRatio,
                                padding: 5 * p.sizeRatio,
                                style: {
                                    fontSize: 16 * p.sizeRatio + 'px'
                                }
                            }
                        },
                        column: {
                            animation: false,
                        },
                        bubble: {
                            animation: false,
                            lineWidth: 0,
                            minSize: '4%',
                            maxSize: '10%',
                            //softThreshold : true
                        },
                        columnrange: {
                            animation: false,
                            color: 'rgba(33,33,33, 0.3)',
                            borderColor: 'transparent'
                        },
                        spline: {
                            animation: false,
                            lineWidth: 1 * p.sizeRatio,
                            marker: {
                                enabled: true,
                                lineColor: 'transparent',
                                radius: 2 * p.sizeRatio,
                                //symbol: "circle",
                                states: {
                                    hover: {
                                        lineWidthPlus: 0
                                    }
                                }
                            },
                            states: {
                                hover: {
                                    lineWidth: 1 * p.sizeRatio,

                                    lineWidthPlus: 0,
                                    marker: {
                                        fillColor: "#000",
                                        lineColor: "#000"
                                    },
                                    halo: {
                                        opacity: 0
                                    }
                                },

                            }
                        },
                        areaspline: {
                            animation: false,
                            lineWidth: 1 * p.sizeRatio,
                            fillOpacity: 0.2,
                            marker: {
                                enabled: false,
                                lineColor: 'transparent',
                                radius: 4 * p.sizeRatio,
                                symbol: "circle",
                                states: {
                                    hover: {
                                        lineWidthPlus: 0
                                    }
                                }
                            },
                            states: {
                                hover: {
                                    lineWidth: 1 * p.sizeRatio,

                                    lineWidthPlus: 0,
                                    marker: {
                                        fillColor: "#000",
                                        lineColor: "#000"
                                    },
                                    halo: {
                                        opacity: 0
                                    }
                                },
                            }
                        },
                        areasplinerange: {
                            animation: false,
                            fillOpacity: 0.2,
                            dashStyle: 'dot'

                        }

                    },
                    labels: {
                        style: {
                            fontSize: 8 * p.sizeRatio + 'px'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                }

                if (!p.pdf) {
                    /*    options.xAxis.title.style['font-weight'] = "700";
                        options.yAxis[0].title.style['font-weight'] = "700";
                        options.legend.itemStyle['font-weight'] = "700";*/
                } else {
                    options.plotOptions.pie.size = '85%';
                    options.legend.enabled = true;
                    options.chart.backgroundColor = "#fff";
                }

                return options;
            }

            graph.chartOptions = function (p) {
                var options = defaulOptions(p);

                options.series = graph.series;

                if (typeof graph.options.xAxis != 'undefined') {
                    options.xAxis.labels.enabled = graph.options.xAxis
                }

                if (graph.options.bubbleSize)
                    options.plotOptions.bubble.maxSize = graph.options.bubbleSize;

                if (graph.options.plotOptionsSeries)
                    options.plotOptions.series = graph.options.plotOptionsSeries

                if (graph.options.xAxisOpposite)
                    options.xAxis.opposite = true;

                if (graph.options.yAxis) {
                    options.yAxis = options.yAxis.concat(graph.options.yAxis)
                }

                if (graph.options.secondYAxis) {

                    options.yAxis.push({
                        minPadding: 0,
                        maxPadding: 0,
                        offset: 10,
                        //floor: true,
                        title: {
                            enabled: false,
                            text: '',
                            style: {
                                'fontSize': 10 * p.sizeRatio + 'px',
                                "color": "rgb(30, 35, 40)"
                            }
                        },
                        startOfWeek: 0,
                        lineWidth: 0,
                        lineColor: 'transparent',
                        minorTickLength: 0,
                        minorGridLineWidth: 1,
                        gridLineColor: "rgb(228, 221, 222)",
                        gridLineWidth: 1,
                        //tickInterval: 5,
                        tickLength: 0,
                        tickPixelInterval: 100 * p.sizeRatio,

                        labels: {
                            enabled: true,
                            style: {
                                'fontSize': 11 * p.sizeRatio + 'px',
                                'color': "#27a9e6"
                            },

                            padding: 5 * p.sizeRatio,
                            distance: -25 * p.sizeRatio,
                            y: 3 * p.sizeRatio,

                        },

                        tickColor: 'rgb(228, 221, 222)',
                    })
                }

                _.each(options.yAxis, function (yAxis) {


                    if (typeof graph.options.ypadding != 'undefined') {
                        yAxis.minPadding = graph.options.ypadding;
                        yAxis.maxPadding = graph.options.ypadding;
                    }

                    if (typeof graph.options.ytickAmount != 'undefined') {
                        yAxis.tickAmount = graph.options.ytickAmount;
                    }

                })


                if (typeof graph.options.xtype != 'undefined') {
                    options.xAxis.type = graph.options.xtype
                }


                if (typeof graph.options.categories != 'undefined') {
                    options.xAxis.categories = graph.options.categories();

                }

                if (typeof graph.options.reversed != 'undefined') {
                    options.xAxis.reversed = graph.options.reversed;
                }

                if (typeof graph.options.disableXLabels != 'undefined') {
                    options.xAxis.labels.enabled = false;
                }

                if (typeof graph.options.disableYLabels != 'undefined') {
                    options.yAxis[0].labels.enabled = false;
                    options.yAxis[0].offset = 0
                }

                if (typeof graph.options.yGridLineWidth != 'undefined') {
                    options.yAxis[0].gridLineWidth = graph.options.yGridLineWidth;
                }

                if (typeof graph.options.disableTooltip != 'undefined') {
                    options.tooltip.enabled = false;
                }



                if (typeof graph.options.xtitle != 'undefined') {

                    options.xAxis.title.enabled = true;
                    options.xAxis.title.text = graph.options.xtitle;
                }

                if (typeof graph.options.ytitle != 'undefined') {
                    options.yAxis[0].title.enabled = true;
                    options.yAxis[0].title.text = graph.options.ytitle;
                }


                if (graph.options.defaultTooltip) {
                    delete options.tooltip.formatter
                }

                if (graph.options.addLegend) {
                    options.legend.enabled = true;
                }

                if (graph.options.removeLegend) {
                    options.legend.enabled = false;
                }

                if (graph.options.tooltipFormatter) {

                    options.tooltip.formatter = graph.options.tooltipFormatter
                }

                options.chart.type = graph.options.type;
                options.chart.height = graph.options.height || 400;

                if (graph.options.width)
                    options.chart.width = graph.options.width;

                options.yAxis[0].floor = graph.options.floor;


                _.each(options.yAxis, function (yAxis, index) {



                    yAxis.labels.formatter = function () {

                        var view = graph.unit || 'number';

                        if (graph.options.views && graph.options.views[yAxis.index]) {
                            view = graph.options.views[yAxis.index].v
                        }

                        var value = this.value;

                        var label = this.axis.defaultLabelFormatter.call(this);


                        if (view == 'number' || view == 'dollars') {
                            value = compressedNumber(value, 2)
                            label = value
                        }

                        if (view == 'number') {
                            return label
                        }

                        if (view == 'percent') {
                            return label + " %"
                        }

                        if (view == 'dollars') {
                            return "$ " + label
                        }
                    }

                })



                if (typeof graph.options.ymax != 'undefined')
                    options.yAxis[0].max = graph.options.ymax;

                if (typeof graph.options.ymin != 'undefined')
                    options.yAxis[0].min = graph.options.ymin;



                return options;
            }

            graph.rarefied = function (series, count) {
                _.each(series, function (serie) {

                    var l = serie.data.length;

                    if (l > count * 3) {

                        var c = l / count;
                        var newData = [serie.data[0]];

                        for (var i = 1; i < l - 1; i++) {

                            if (i % Number(c.toFixed(0))) {

                            } else {
                                newData.push(serie.data[i])
                            }
                        }

                        newData.push(serie.data[l - 1]);

                        serie.data = newData;
                    }

                })

                return series;
            }

            graph.exportToPdf = function (p, clbk, _p) {

                if (!_p) _p = {};

                p.el.html("<div class='chart'></div>");

                p.pdf = true;

                var options = graph.chartOptions(p);

                if (_p.prepareOptions) {
                    _p.prepareOptions(options)
                }

                if (!options) {
                    if (clbk)
                        clbk(null);
                } else {
                    if (p.maxPointsCount) {
                        graph.rarefied(options.series, p.maxPointsCount)
                    }


                    var height = (deep(options, "chart.height") || 400) * p.sizeRatio;
                    var width = (deep(options, "chart.width") || 700) * p.sizeRatio;

                    var to = p.el.find('.chart');

                    to.height(height);
                    to.width(width);

                    options.chart.height = height;
                    options.chart.width = width;

                    options.chart.renderTo = to[0];

                    var chart = {};

                    chart.chart = new Highcharts.Chart(options);
                    chart.ratio = width / height;
                    chart.series = options.series;
                    chart.caption = graph.options.caption;

                    var canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;

                    var svg = chart.chart.getSVG()

                    var img = new Image();

                    img.onload = function () {
                        canvas.getContext("2d").drawImage(img, 0, 0, width, height);

                        try {
                            chart.img = canvas.toDataURL('image/jpeg');

                        } catch (e) {

                            var vgcanvas = document.createElement('canvas');
                            vgcanvas.width = width;
                            vgcanvas.height = height;


                            canvg(vgcanvas, svg, {
                                ignoreDimensions: true,
                                ignoreMouse: true,
                                ignoreAnimation: true,
                                scaleWidth: vgcanvas.width,
                                scaleHeight: vgcanvas.height
                            });

                            chart.img = vgcanvas.toDataURL('image/png');

                            $(vgcanvas).remove();

                        }



                        $(canvas).remove();

                        clbk(chart);
                    }

                    img.src = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svg)));


                }
            }

            graph.render = function (p, clbk) {

                if (!p) p = {};

                var _el = p.el || graph.el;

                if (_el) {

                    var options = graph.chartOptions(p);

                    if (p.prepareOptions) {
                        p.prepareOptions(options)
                    }

                    if (!options) {
                        if (clbk)
                            clbk(null);
                    } else {
                        if (p.maxPointsCount) {
                            graph.rarefied(options.series, p.maxPointsCount)
                        }

                        graph.shell({
                            name: "graph",
                            el: _el,
                            animation: 'fadeIn',
                            data: {
                                me: graph,
                                id: graph.id,
                                options: graph.options,
                                ini: p
                            }
                        }, function (_p) {

                            options.chart.renderTo = _p.el.find('.chart[id="' + graph.id + '"]')[0];

                            if (graph.stock)

                                graph.chart = new Highcharts.stockChart(options);

                            else

                                graph.chart = new Highcharts.Chart(options);

                            if (clbk)
                                clbk(_p.el);

                        })
                    }



                }
            }

            graph.destroy = function () {

                if (graph.chart)
                    graph.chart.destroy();

                if (graph.el) {
                    graph.el.remove()
                }


                graph.el = null;

                graph.series = [];

                delete graph.shell;

                delete graph.stock;
            }

            return graph;
        }
    }

    self.clbks = {

        online: {

            _app: function () {
                self.app.options.successHandler({
                    online: true
                })
            }

        },
        offline: {},

        _focus: {},
        _unfocus: {},


        focus: function (time) {

            app.user.isState(function (state) {

                if (state) {

                    self.update();

                    _.each(self.clbks._focus, function (f) {
                        f(time)
                    })

                }

            })

        },

        unfocus: function () {
            _.each(self.clbks._unfocus, function (f) {
                f()
            })
        },

        api: {
            actions: {
                anysubscribe: {},
                subscribe: {},
                unsubscribe: {},
                subscribePrivate: {},

                blocking: {},
                unblocking: {}
            }
        },
    }


    self.papi = {

        horizontalSearchUsers: function (el, clbk, p) {

            if (!p) p = {}

            p.horizontal = true

            var tpl = `<div class="horizontalSearchUsersWrapper"><div class="horizontalSearchUserscaption"><span>` + (p.caption || '') + `</span><div class="controlhors"><div class="controlleft controlhor" dir="left"><i class="fas fa-arrow-left"></i></div><div class="controlright controlhor"><i class="fas fa-arrow-right"></i></div></div></div><div class="showmorebywrapper"><div class="showmoreby"></div></div>
            </div>`

            window.rifticker.add(() => {

                el.html(tpl)

                p.hcnt = el.find('.horizontalSearchUsersWrapper')

                p.window = el.find('.showmorebywrapper')

                var _el = el.find('.showmoreby')

                var id = p.id || makeid()

                app.nav.api.load({

                    open: true,
                    id: 'searchusers',
                    el: _el,
                    eid: id,
                    mid: id,
                    animation: false,
                    essenseData: {

                        window: p.window,
                        horizontal: p.horizontal,
                        value: p.value,
                        loaded: function (shares) {

                            if (p.hcnt) {
                                setTimeout(function () {
                                    p.hcnt.addClass('hasitems')
                                }, 300)

                            }

                            if (p.loaded) p.loaded(shares)
                        },
                        count: p.count
                    },

                    clbk: clbk
                })

                el.find('.controlhor').on('click', function () {
                    var dir = $(this).attr('dir') || 'right'

                    var curscroll = p.window.scrollLeft()
                    var width = p.window.width()

                    var to = width * 0.9

                    if (dir == 'left') to = -to

                    to = curscroll + to

                    p.window.animate({
                        scrollLeft: to
                    }, 100);
                })

            })
        },

        horizontalLenta: function (el, clbk, p) {

            if (!p) p = {}

            p.horizontal = true

            var tpl = `<div class="horizontalLentaWrapper"><div class="horizontalLentacaption"><span>` + (p.caption || '') + `</span><div class="controlhors"><div class="controlleft controlhor" dir="left"><i class="fas fa-arrow-left"></i></div><div class="controlright controlhor"><i class="fas fa-arrow-right"></i></div></div></div><div class="showmorebywrapper"><div class="showmoreby"></div></div>
            </div>`

            window.rifticker.add(() => {

                el.html(tpl)

                p.hcnt = el.find('.horizontalLentaWrapper')

                p.window = el.find('.showmorebywrapper')

                var _el = el.find('.showmoreby')

                self.papi.clenta(_el, clbk, p)

                el.find('.controlhor').on('click', function () {
                    var dir = $(this).attr('dir') || 'right'

                    var curscroll = p.window.scrollLeft()
                    var width = p.window.width()

                    var to = width * 0.9

                    if (dir == 'left') to = -to

                    to = curscroll + to

                    p.window.animate({
                        scrollLeft: to
                    }, 100);
                })

            })
        },

        clenta: function (el, clbk, p) {
            if (!p) p = {}

            var id = p.id || makeid()

            app.nav.api.load({

                open: true,
                id: 'lenta',
                el: el,
                eid: id,
                mid: id,
                animation: false,
                essenseData: {
                    author: p.author,
                    video: p.video,
                    comments: p.comments,
                    enterFullScreenVideo: p.fullscreenvideo,
                    openapi: p.openapi,
                    renderclbk: p.renderclbk,
                    ready: p.ready,
                    window: p.window,
                    horizontal: p.horizontal,
                    second: true,
                    loaderkey: p.loaderkey,
                    openPostInWindowMobile: p.openPostInWindowMobile,
                    hasshares: function (shares) {

                        if (p.hcnt) {
                            setTimeout(function () {
                                p.hcnt.addClass('hasitems')
                            }, 300)

                        }

                        if (p.hasshares) p.hasshares(shares)
                    },
                    opensvi: p.opensvi,
                    from: p.from,
                    compact: p.compact,
                    r: p.r,
                    shuffle: p.shuffle,
                    filterTopAuthors : p.filterTopAuthors,
                    page: p.page,
                    tags: p.tags,
                    lang: p.lang,
                    period: p.period,
                    filter: p.filter,
                    ended: p.ended,
                    afterload: p.afterload,
                    count: p.count,
                    playingClbk: p.playingClbk
                },

                clbk: clbk
            })
        },

        lenta: function (ids, el, clbk, p) {

            if (!p) p = {}
            var id = makeid()

            if (!_.isArray(ids)) ids = [ids]

            app.nav.api.load({

                open: true,
                id: 'lenta',
                el: el,
                eid: id,
                mid: id,
                animation: false,
                essenseData: {

                    notscrollloading: true,
                    txids: ids,
                    comments: p.comments,
                    enterFullScreenVideo: p.fullscreenvideo,
                    openapi: p.openapi,
                    renderclbk: p.renderclbk,
                    ready: p.ready,
                    second: true,
                    allowblocked: true,
                    playingClbk: p.playingClbk
                },

                clbk: clbk
            })
        },

        editImage: function (src, p, clbk) {

            if (!p) p = {}

            var images = [{
                original: src,
                index: 0
            }]

            return new Promise((resolve, reject) => {

                app.nav.api.load({
                    open: true,
                    id: 'imageGalleryEdit',
                    inWnd: true,

                    essenseData: {
                        edit: true,
                        initialValue: 0,
                        images: images,
                        apply: p.apply,
                        crop: {
                            aspectRatio: p.aspectRatio || null,
                            style: 'apply',
                            autoCropArea: p.autoCropArea || 1,
                        },

                        success: function (i, editclbk) {

                            resize(images[0].original, p.w || 1920, p.h || 1080, function (resized) {
                                var r = resized.split(',');

                                if (r[1]) {

                                    editclbk()

                                    resolve(resized)

                                } else {
                                    reject("error")
                                }

                            })


                        }
                    }

                })
            })
        },

        post: function (id, el, clbk, p) {


            if (!p) p = {}

            self.sdk.node.shares.getbyid(id, function (shares) {

                self.sdk.node.shares.users(shares, function () {

                    app.nav.api.load({
                        open: true,
                        href: 'post',
                        el: el,
                        eid: id + (p.eid || ""),
                        clbk: clbk,

                        essenseData: {
                            hr: p.hr,
                            share: id,
                            removemargin: true,
                            repost: p.repost,
                            level: p.level,
                            fromempty: p.fromempty,
                            nocommentcaption: p.nocommentcaption,
                            eid: id + (p.eid || ""),
                            comments : p.comments,
                            video : p.video,
                            autoplay : p.autoplay,
                            opensvi : p.opensvi,
                            minimize : p.minimize,
                            postclass : p.postclass,
                            showrecommendations : p.showrecommendations,
                            openapi : typeof p.openapi == 'undefined' ? true : p.openapi,
                            playingClbk : p.playingClbk,
                            jury : p.jury
                        }
                    })

                }, true)
            })

        },

        postpreview: function (share, el, clbk, p) {

            if (!p) p = {}

            app.nav.api.load({
                open: true,
                href: 'post',
                inWnd: !el && p.inWnd,
                history: !el && p.inWnd,
                el: el,
                eid: 'postpreview',
                clbk: clbk,

                essenseData: {
                    shareobj: share,
                    nocommentcaption: true,
                    eid: 'postpreview',
                    comments: 'no',
                    video: false,
                    autoplay: false,
                    preview: true,

                }
            })


        },

        connect: function (id, el, clbk, p) {
            self.sdk.users.get(id, function () {

                app.nav.api.load({
                    open: true,
                    href: 'channel',
                    el: el,
                    eid: id + (p.eid || ""),
                    clbk: clbk,

                    essenseData: {
                        id: id,
                        connect: true
                    }
                })

            })
        },

        route: function (href, el, clbk, p = {}, a = {}) {

            if (a.url && a.url.indexOf('ext=') > -1) {

                var type = 'undefined'


                try {
                    var type = self.sdk.external.type(parameters(a.url, true).ext)

                    var icon = ''

                    if (type == 'pay') icon = '<i class="fas fa-wallet"></i>'
                    if (type == 'auth') icon = '<i class="fas fa-user"></i>'

                    el.html('<div class="internalpocketnetlink"><b>' + icon + ' ' + app.localization.e(type + 'Link') + '</b></div>')
                } catch (e) {
                    console.error('e', e)
                    el.html('<div class="internalpocketnetlink"><b>' + app.localization.e('undefinedLink') + '</b></div>')
                }


            } else {
                el.html('<div class="internalpocketnetlink"><a elementsid="https://' + app.options.url + '/' + href + '" href="https://' + app.options.url + '/' + href + '"><i class="fas fa-link"></i> https://' + app.options.url + '/' + href + '</a></div>')
            }


            app.nav.api.links(null, el);

            if (clbk) clbk()
        },

        channel : function(id, el, clbk, p = {}, a){


            var r = false

            id = id.replace(/[^a-zA-Z_0-9]/g, '')

            try {
                r = bitcoin.address.fromBase58Check(id);
            } catch (e) {}

            var c = function () {
                self.sdk.users.get(id, function () {

                    app.nav.api.load({
                        open: true,
                        href: 'channel',
                        el: el,
                        eid: id + (p.eid || ""),
                        clbk: clbk,

                        essenseData: {
                            id : id,
                            openapi : true,
                            jury : p.jury
                        }
                    })

                })
            }


            if (r) {
                c()
            } else {

                var f = _.find(__map, function (m, i) {
                    return m.href && (m.href.toLowerCase() == id.toLowerCase())
                })

                if (f) {
                    self.papi.route(f.href, el, clbk, p, a)
                } else {

                    self.sdk.users.addressByName(id, function (_id) {
                        id = _id
                        c()
                    })
                }


            }




        },

        transaction: function (txid, el, clbk, p, additional = {}) {
            app.nav.api.load({
                open: true,
                href: 'transactionview',
                el: el,
                eid: makeid(),
                clbk: clbk,

                essenseData: {
                    txid: txid,
                    node: additional.node,
                    verify: additional.verify
                }
            })
        },

        comment: function (id, el, clbk, p, additional) {

            if(!additional) additional = {}
            if(!p) p = {}

            var ps = additional.commentPs || p.commentPs || {}

            app.nav.api.load({
                open: true,
                id: 'comments',
                el: el,
                eid: id + 'post_' + (ps.commentid || ''),

                essenseData : {
                    txid : id,
                    showall : true,
                    init : true,
                    preview : false,
                    fromtop : true,
                    commentPs : ps,
                    openapi : p.openapi,
                    jury : p.jury

                },

                clbk: clbk
            })
        },


    }

    self.ui = {

        goback : function(def){

            var chain = self.app.nav.backManager.chain

            if (chain.length > 2) {

                self.app.nav.api.go({
                    href : chain[1].href,
                    history : true,
                    open : true
                })
                
            }
            else{

                var k = ''
                var indexkey = 'index'
                var link = indexkey

                if(!def){
    
                    try{
                        k = localStorage['lentakey'] || ''
                    }catch(e){
    
                    }
    
                    if(k != indexkey){
                        if (k == 'video'){
                            link = indexkey + '?video=1'
                        }
                        else{
                            if (k == 'read'){
                                link = indexkey + '?read=1'
                            }
                            else if (k == 'audio'){
                                link = indexkey + '?audio=1'
                            }else{
                                if(k){
                                    link = indexkey + '?r=' + k
                                }
                            }
                        }
                    }
                }

                else{
                    link = def
                }

                self.app.nav.api.go({
                    href : link,
                    history : true,
                    open : true
                })

            }
        },

        support : function(template, parameters){
 
            app.nav.api.load({
                open: true,
                id: 'support',
                inWnd: true,

                essenseData: {
                    template,
                    parameters
                }
            })
        },

        requestPermission: function (parameters, settings) {
            return new Promise((resolve, reject) => {
                app.nav.api.load({
                    open: true,
                    id: 'requestpermission',
                    inWnd: true,

                    essenseData: {
                        ...parameters,
                        ...settings,
                        success: (state) => {
                            resolve(state)
                        },

                        fail: function (state) {

                            if (state == 'closed') state = 'cancel'

                            reject(state)
                        },
                    }
                })
            })
        },

        sendTransactionAgainQuestion: function (reason, clbk) {
            return new Promise((resolve, reject) => {

            })
        },

        edituserinfo: function (reason, clbk) {
            return new Promise((resolve, reject) => {
                app.nav.api.load({
                    open: true,
                    id: 'test',
                    inWnd: true,

                    essenseData: {
                        reason,
                        success: (action) => {
                            resolve(action)
                        },

                        fail: function () {
                            reject('close')
                        },
                    },


                    clbk: function (s, p) {
                        if (clbk) clbk(p)
                    }
                })
            })
        },

        captcha: function (reason, clbk, proxyOptions = {}) {

            if (!proxyOptions.proxy) return Promise.reject('noproxy')

            var proxy = self.app.api.get.byid(proxyOptions.proxy)

            if (!proxy) return Promise.reject('noproxy')


            var getcapcha = function (refresh) {

                globalpreloader(true)

                return new Promise((resolve, reject) => {

                    self.sdk.captcha[proxy.hasHexCaptcha() ? 'getHex' : 'get'](function (captcha, error) {

                        if (error) {

                            reject('network')

                            return
                        }

                        resolve({
                            captcha
                        })

                    }, refresh || false, proxyOptions)

                }).finally(() => {
                    globalpreloader(false)
                })
            }

            return self.app.user.isStatePromise().then((state) => {

                if (!state) return Promise.reject('state')

                return getcapcha()

            }).then(({
                captcha
            }) => {

                return new Promise((resolve, reject) => {

                    if (captcha.done) {

                        resolve(captcha)

                    } else {

                        app.nav.api.load({
                            open: true,
                            id: 'captcha',
                            inWnd: true,

                            essenseData: {
                                captcha,
                                proxyOptions,
                                reason,
                                getcapcha: () => getcapcha(true),
                                success: (data) => {
                                    resolve(data)
                                },

                                fail: function () {
                                    reject('close')
                                },
                            },


                            clbk: function (s, p) {
                                if (clbk) clbk(p)
                            }
                        })

                    }

                })

            })





        },

        mobilesearch: function (p) {

            app.nav.api.load({
                open: true,
                id: 'mobilesearch',
                inWnd: true,
                essenseData: p,

                clbk: function (s, p) {
                    self.uimobilesearch = p
                }
            })

        },

        uploadImage: function (p) {

            app.nav.api.load({
                open: true,
                id: 'camerapreview',
                el: app.el.camera,
                essenseData: p,

                clbk: function (s, p) {
                    self.uicamerapreview = p
                }
            })

        },

        pipvideo: function (txid, clbk, d) {

            if (!d) d = {}

            var p = {
                href: 'post?s=' + txid,
                clbk: clbk,

                essenseData: {
                    share: txid,
                    video: true,
                    autoplay: true,
                    pip: true,
                    startTime: d.startTime || 0
                },

                expand: function (d) {

                    if (!d) d = {}


                    setTimeout(function () {
                        self.app.nav.api.load({
                            open: true,
                            href: 'post?s=' + txid,
                            inWnd: true,
                            history: true,
                            essenseData: {
                                share: txid,
                                video: true,
                                autoplay: true,
                                startTime: d.startTime || 0
                            }
                        })
                    }, 100)



                }
            }

            self.app.actions.playingvideo(null)
            self.app.actions.pipwindow(p)
            //self.matrixchat.backtoapp()
        },

        popup: function (key, always, data) {

            var showed = localStorage['popup_' + key] || false;

            if (!showed || always) {

                app.nav.api.load({
                    open: true,
                    id: 'popup',
                    key: key,
                    inWnd: true,

                    essenseData: {
                        key: key,
                        always: always,
                        data: data
                    }
                })
            }

        },

        articledecoration: function (wr, share, extend, clbk) {
            var caption = wr.find('.shareBgCaption')
            var capiontextclass = 'caption_small'
            var edjs = new edjsHTML(null, app)

            var images = edjs.getallimages(share.message)


            if (share.caption.length > 10) capiontextclass = 'caption_medium'
            if (share.caption.length > 60) capiontextclass = 'caption_long'

            var opengallery = function (src) {


                self.app.platform.ui.images(images, src)

            }

            caption.addClass(capiontextclass)

            if (extend) {
                wr.find('.article_carousel').each(function () {

                    var _el = $(this)

                    _el.find(".img").imagesLoadedPN({
                        imageAttr: true
                    }, function (image) {

                        _.each(image.images, function (img, n) {
                            var _img = img.img;

                            var el = $(image.elements[n])

                            var aspectRatio = _img.naturalHeight / _img.naturalWidth

                            if (aspectRatio > 1.99) aspectRatio = 1.99

                            image.elements[n].style['aspect-ratio'] = 1 / aspectRatio

                            //el.css('aspectRatio', aspectRatio)
                        })


                        new carousel(_el, '.img', '.article_carousel_container')

                    })

                    _el.find(".img").on('click', function () {
                        var src = $(this).attr('i')

                        if (src) {
                            opengallery(src)
                        }
                    })

                    //self.app.platform.ui.carousel($(this))
                })

                wr.find('.article_this_embed').each(function () {
                    try {
                        self.app.platform.ui.embeding($(this))
                    } catch (e) {

                    }

                })

                wr.find('.article_image img').on('click', function () {

                    var src = $(this).attr('src')

                    if (src) {
                        opengallery(src)
                    }

                })
            }

            var cover = share.images[0]


            if (!cover) {

                caption.addClass('withoutimage')

                setTimeout(function () {
                    wr.addClass('ready')
                    if (clbk) clbk()
                }, 150)



            } else {

                var rea = false

                setTimeout(function () {
                    if (rea) return

                    rea = true

                    caption.addClass('withoutimage')

                    setTimeout(function () {
                        wr.addClass('ready')
                        if (clbk) clbk()
                    }, 150)

                }, 3500)

                wr.find('.articleCover').imagesLoadedPN({
                    imageAttr: true
                }, function (image) {

                    if (rea) return

                    rea = true

                    var aspectRatio = 0.6
                    var small = false

                    _.each(image.images, function (img) {

                        var _img = img.img;
                        aspectRatio = _img.naturalHeight / _img.naturalWidth

                        if (_img.naturalHeight < 200 || _img.naturalWidth < 300) {
                            small = true
                        }

                    })



                    if (small) {
                        caption.addClass('smallimage')
                    }

                    if (aspectRatio > 1 && !small) {
                        caption.addClass('verticalcover')
                    }

                    setTimeout(function () {
                        wr.addClass('ready')
                        if (clbk) clbk()
                    }, 150)


                }, self.app)
            }


        },

        changeloc: function (_clbk) {
            var items = []

            _.each(self.app.localization.available, function (a) {
                items.push({
                    text: a.name,
                    action: function (clbk) {

                        var na = app.localization.findByName(a.name);

                        if (na && na.key != self.app.localization.key) {

                            self.app.localization.set(na.key);
                        }

                        clbk()

                        if (_clbk) _clbk()

                    }
                })
            })

            menuDialog({
                items: items
            })
        },

        embeding: function (el) {

            var h = el.attr('href')
            var w = new window.PNWIDGETS()

            w.makefromurl(el[0], h, true)

        },

        showCommentBanner: function (contextElem, clbk, address, block) {

            if (!app.platform.sdk.user.me()?.regdate) {
                return
            }

            let bannerCommentComponent = null;

            if (!contextElem) {
                return;
            }

            const createComponent = (address) => {
                self.app.Logger.info({
                    actionId: 'COMMENT_BANNER_ALLOWED',
                    value: true,
                });

                const bannerComment = contextElem.find('.bannerComment');


                app.nav.api.load({
                    open: true,
                    id: 'commentBanner',
                    el: bannerComment,
                    essenseData: {
                        address: address,
                        block: block
                    },

                    clbk: function (e, p) {
                        bannerCommentComponent = p;

                        if (clbk) {
                            clbk(p)
                        }

                        if (p.el[0].constructor.name === 'HTMLDivElement') {
                            self.app.Logger.info({
                                actionId: 'COMMENT_BANNER_SHOWED',
                                value: p.el[0].constructor.name,
                            });
                        }


                    }
                });
            };

            const unixTimeNow = Math.floor(Date.now() / 1000);
            const oneDayInSeconds = 86400;

            var commentBanner = {}

            try {
                commentBanner = JSON.parse(localStorage.commentBanner || '{}');

            } catch (e) {

            }

            let {
                next,
                count
            } = commentBanner;

            if (!count) count = 0;
            if (!next) next = 0;

            const isBannerDisabled = count == -1;


            const regDate = app.platform.sdk.user.me().regdate;
            const regUnixTime = (regDate.getTime());
            const registeredTime = Date.now() - regUnixTime;

            const isOneDayOld = (registeredTime >= oneDayInSeconds * 1000);

            if (block) {


                try {
                    const blockBanner = JSON.parse(localStorage.blockBanner || '[]');
                    if (blockBanner.indexOf(address) === -1) {
                        createComponent(address);
                    }

                } catch (e) {

                }

                return;

            }

            if (isBannerDisabled) {
                return isBannerDisabled;

            }


            if (!isOneDayOld) {
                createComponent();
                return;
                //return bannerCommentComponent;t
            }

            var me = self.psdk.userInfo.getmy()

            ///deep(app, 'platform.sdk.users.storage.' + self.app.user.address.value.toString('hex'));

            if (me && me.relation(address, 'subscribes')) {
                return;
            }

            count++;

            if (unixTimeNow - oneDayInSeconds > next) {
                count = 1;
                next = Date.now() / 1000;

            }

            const timeToShowBanner = count <= 4;

            if (timeToShowBanner) {

                if (count <= 2) {

                    createComponent();

                } else if (count <= 4) {

                    createComponent(address);

                }

                try {
                    localStorage.setItem('commentBanner', JSON.stringify({
                        count,
                        next
                    }));

                } catch (e) {

                }


            }



        },

        carousel: function (el, clbk) {
            throw 'use new carousel()'


        },

        usertype : function(address){
            return self.sdk.user.type(address)
        },
        markUser : function(address){

            var t = self.sdk.user.type(address)

            if (t == 'dev') return this.markDev();
            if (t == 'real') return this.markReal();
            if (t == 'shark') return this.markShark();
            if (t == 'moderator') return this.markModerator();

            return ''

        },
        markShark : function(){

            return `<div class="realperson">
                <span class="fa-stack fa-2x shark">
                    <i class="fas fa-certificate fa-stack-2x"></i>
                    <i class="fas fa-flag fa-stack-1x"></i>
                </span>
            </div>`
        },
        markModerator : function(){

            return `<div class="realperson">
                <span class="fa-stack fa-2x moderator">
                    <i class="fas fa-certificate fa-stack-2x"></i>
                    <i class="fas fa-crown fa-stack-1x"></i>
                </span>
            </div>`
        },
        

        markReal: function () {

            return `<div class="realperson">
                <span class="fa-stack fa-2x real">
                    <i class="fas fa-certificate fa-stack-2x"></i>
                    <i class="fas fa-check fa-stack-1x"></i>
                </span>
            </div>`
        },

        markDev: function () {

            return `<div class="realperson">
                    <span class="fa-stack fa-2x dev">
                        <i class="fas fa-certificate fa-stack-2x"></i>
                        <i class="fas fa-code fa-stack-1x"></i>
                    </span>
                </div>`

        },

        recommendations: function (el, share, ed, clbk) {

            var basecount = ed.basecount || 20

            var idf = share.txid.replace(/[^0-9]/, '') || '49'

            var oddtxid = (Number(idf[idf.length - 2] + '' + idf[idf.length - 1])).toFixed(0)

            self.app.nav.api.load({
                open: true,
                href: 'recommendations',
                el: el,

                essenseData: {

                    container: ed.el,

                    caption: 'othervideos',
                    loader: 'getrecomendedcontents',
                    startload: ed.startload,

                    loaders: [{
                        loader: 'getrecomendedcontents',
                        parameters: {

                            contentAddress: share.address,
                            type: 'video',
                            depth: 10000,
                            count: basecount,
                            lang: share.language
                        },
                    }, {
                        loader: 'gettopfeed',
                        parameters: {

                            type: 'video',
                            depth: 10000,
                            count: basecount * 1.5,
                            lang: share.language,
                            tagsfilter: share.tags
                        },

                    }],

                    sorting: function (recommendations) {

                        if (recommendations.length <= 1) return recommendations

                        return _.sortBy(recommendations, function (r, i) {
                            return (i + oddtxid) % (recommendations.length - 1)
                        })
                    },

                    filter: function (recommendations) {


                        recommendations = _.filter(recommendations, (_share) => {

                            return _share.txid != share.txid && (!self.app.user.address.value || _share.address != self.app.user.address.value)
                        })

                        recommendations = _.first(recommendations, basecount)

                        return recommendations

                    },

                    points: function (_share, p) {
                        if (_share.address == share.address) {
                            p = p * 3
                        }

                        var i = _.intersection(_share.tags, share.tags)

                        p = p + p * i.length

                        return p
                    },

                    open: function (txid) {

                        var timeout = 300

                        if (ed.beforeopen) {
                            timeout = ed.beforeopen(txid) || 300
                        }

                        if (ed.opensvi) {
                            ed.opensvi(txid)
                        } else

                        if (ed.next) {

                            self.sdk.node.shares.getbyid([txid], function () {

                                var share = self.psdk.share.get(txid)


                                ed.next(txid, share)

                            })

                        } else {

                            setTimeout(function () {
                                if (isMobile()) {

                                    self.app.nav.api.load({
                                        open: true,
                                        href: 'post?s=' + txid,
                                        history: true,
                                    })

                                } else {
                                    self.app.nav.api.go({
                                        href: 'index?video=1&v=' + txid,
                                        history: true,
                                        open: true,
                                    })
                                }
                            }, timeout)




                        }
                    }

                },

                clbk: clbk
            })
        },

        images: function (allimages, initialValue, clbk, p) {

            if (!_.isArray(allimages)) allimages = [allimages]

            if (!initialValue) initialValue = allimages[0]

            if (!initialValue) return false

            var gid = 'uiimages'

            var images = _.map(allimages, function (i) {
                return {
                    src: i
                }
            })

            self.app.nav.api.load({
                open: true,
                href: 'imagegallery',
                inWnd: true,
                history: true,

                essenseData: {
                    initialValue: initialValue,
                    idName: 'src',
                    images: images,
                    gid: gid,
                    ...p
                },

                clbk: function (p) {
                    if (clbk)
                        clbk(p)
                }
            })


            return true

        },

        socialshare: function (url, p) {
            if (!p) p = {}

            if (url) {
                url = 'https://' + app.options.url + '/' + url
            }


            app.nav.api.load({
                open: true,
                href: 'socialshare2',
                history: true,
                inWnd: true,

                essenseData : {
                    url : url || p.url,
                    caption : app.localization.e('e13133'),
                    sharing : p.sharing || null,
                    embedding : p.embedding || null,
                    notincludedRef : true,
                    canmakepost : p.canmakepost
                }
            })
        },

        share: function (p) {
            if (!p) p = {}

            globalpreloader(true, true)

            const {
                name,
                description,
                tags,
                url
            } = p;


            setTimeout(function () {
                app.nav.api.load({
                    open: true,
                    id: 'share',
                    inWnd: true,
                    eid: 'postin',
                    mid: 'postin',

                    clbk: function (e, p) {
                        globalpreloader(false)
                    },

                    essenseData: {
                        close: function () {},
                        post: function () {
                            if (p.onPost) p.onPost();
                        },
                        absolute: true,
                        repost: p.repost,
                        videoLink: p.videoLink,
                        name,
                        description,
                        tags,
                        url,
                        dontsave: (p.repost || p.videoLink || p.dontsave) ? true : false
                    }
                })
            }, 50)
        },

        showmykeyfast: function (p) {

            if (!p) p = {}

            app.nav.api.load({

                open: true,
                inWnd: true,
                href: 'pkview',

                essenseData: {
                    dumpkey: true,
                    showsavelabel: p.showsavelabel,
                },

                clbk: function (p, s) {

                }
            })
        },

        showmykey: function (p) {

            if (!p) p = {};

            new dialog({
                html: p.text || self.app.localization.e('e13188'),
                btn1text: p.successLabel || self.app.localization.e('e13261'),
                btn2text: p.faillabel || self.app.localization.e('e13262'),

                class: 'zindex accepting accepting2 ',

                success: function () {


                    app.nav.api.load({

                        open: true,
                        inWnd: true,
                        history: true,
                        href: 'pkview',

                        essenseData: {
                            dumpkey: true,
                            showsavelabel: p.showsavelabel,
                            afterregistration: p.afterregistration
                        },

                        clbk: function (p, s) {

                        }
                    })

                },

                fail: function () {
                    if (p.fail) p.fail()
                }
            })



            /*var interactive = new Interactive({
                app : app,
                platfrom : self
            })*/

        },

        showkeyafterregistration: function (clbk) {

            self.app.user.isState(function (state) {
                if (state) {

                    var needshowkey = false

                    try {
                        needshowkey = JSON.parse(localStorage['needshowkey_' + self.app.user.address.value] || 'false')

                        //localStorage['needshowkey_' + self.app.user.address.value] = false

                    } catch (e) {}


                    if (needshowkey) {
                        if (isMobile()) {
                            self.ui.showmykey({
                                showsavelabel: true
                            })
                        } else {
                            self.ui.showmykeyfast({
                                showsavelabel: true
                            })
                        }
                    }


                }
            })

            if (clbk) clbk()

        },

        wallet: {

            donate: function (p) {

                return new Promise((resolve, reject) => {

                    var receiver = p.receiver

                    var sender = self.sdk.address.pnet().address;

                    if (sender === receiver) {
                        sitemessage(self.app.localization.e('donateself'));

                        reject('donateself')
                    } else {
                        app.nav.api.load({
                            open: true,
                            id: 'donate',
                            inWnd: true,

                            essenseData: {
                                type: 'donate',
                                sender: sender,
                                receiver: receiver,
                                send: p.send ?? true,
                                donatemode: p.donatemode,
                                value: 1,
                                min: 0.5,
                                clbk: function (value, action, txid, _p = {}) {


                                    if ((p.share ?? true) && p.roomid && txid) {

                                        var node = typeof txidnodestorage != 'undefined' ? txidnodestorage[txid] || null : null

                                        var link = app.meta.protocol + '://i?stx=' + txid

                                        if (node) link += '&node=' + node

                                        self.matrixchat.shareInChat.url(p.roomid, link) /// change protocol
                                    }

                                    p.value = value;
                                    p.send = _p.send
                                    p.txid = txid

                                    resolve(p)
                                }
                            },

                            clbk: function (s, p) {

                            }
                        })
                    }
                })

            },

            send: function (p, clbk, el) {

                if (!p) p = {}

                var id = 'papiwalletsend'

                globalpreloader(true, true)

                p.action = p.htls ? 'htls' : 'send'
                p.class = 'api'
                p.api = true


                var es = null

                return new Promise((resolve, reject) => {

                    p.sendclbk = function (d) {

                        if ((p.share ?? true) && p.roomid && d.txid) {
                            self.matrixchat.shareInChat.url(p.roomid, app.meta.protocol + '://i?stx=' + d.txid) /// change protocol
                        }

                        resolve(d)

                        if (es && es.container) es.container.close()
                    }

                    app.nav.api.load({
                        open: true,
                        id: 'wallet',
                        inWnd: el ? false : true,
                        el: el ? el : null,
                        eid: id,

                        mid: id,
                        animation: false,
                        essenseData: p,
                        clbk: function (e, _p) {

                            es = _p

                            globalpreloader(false)

                            if (clbk) clbk(e, _p)
                        }
                    })

                })



            },

            buy: function (p, clbk, el) {

                if (!p) p = {}

                var id = 'papiwalletbuy'

                globalpreloader(true, true)

                p.action = p.htls ? 'htls' : 'buy'
                p.class = 'api'
                p.api = true


                var es = null

                return new Promise((resolve, reject) => {

                    p.sendclbk = function (d) {

                        if (p.roomid && d.txid) {
                            self.matrixchat.shareInChat.url(p.roomid, app.meta.protocol + '://i?stx=' + d.txid) /// change protocol
                        }

                        resolve(d)

                        if (es && es.container) es.container.close()
                    }

                    app.nav.api.load({
                        open: true,
                        id: 'wallet',
                        inWnd: el ? false : true,
                        el: el ? el : null,
                        eid: id,
                        mid: id,
                        history: true,
                        animation: false,
                        essenseData: p,
                        clbk: function (e, _p) {

                            es = _p

                            globalpreloader(false)

                            if (clbk) clbk(e, _p)
                        }
                    })

                })



            }
        },

        saveShare: function (share, clbk, _p) {

            if (!_p) _p = {}

            var error = function (e) {
                if (e != 'paused') {
                    sitemessage(e)

                    topPreloader2(100)

                    clbk()
                }
            }

            var save = function (p) {

                if (!p) p = {}

                p.progress = function (key, percent) {
                    topPreloader2(percent, self.app.localization.e('downloadingVideo'))
                }

                p = _.extend(p, _p)

                self.sdk.localshares.saveShare(share, p).then(r => {

                    sitemessage(self.app.localization.e('successdownloaded'), null, 5000, {
                        action: {
                            text: self.app.localization.e('gotosaved'),
                            do: function () {

                                app.nav.api.load({
                                    open: true,
                                    href: 'index?r=saved',
                                    history: true,
                                    handler: true
                                })

                            }
                        }
                    })


                    topPreloader2(100)

                    if (clbk) clbk()

                }).catch(error)
            }

            if (self.sdk.localshares.saving[share.txid]) return

            // If download has been paused, resume it
            if (self.sdk.localshares.paused[share.txid]) {

                save({
                    resolutionId: self.sdk.localshares.paused[share.txid]
                })

                return;
            }

            if (self.sdk.localshares.storage[share.txid]) {

                menuDialog({
                    items: [{
                        text: self.app.localization.e('deleteVideoDialog'),
                        action: function (_clbk) {

                            self.sdk.localshares.deleteShare(share.txid).then(r => {

                                if (clbk) clbk(share.txid, true)

                            }).catch(error)

                            _clbk()

                        }
                    }]
                })

                return
            }



            var info = share.url ? (app.platform.sdk.videos.storage[share.url] || {}).data || null : null


            if (info) {

                var items = _.map(deep(info, 'original.streamingPlaylists.0.files') || [], function (file) {
                    return {
                        text: file.resolution.label,
                        action: function (clbk) {

                            save({
                                resolutionId: file.resolution.id
                            })

                            clbk()

                        }
                    }
                })

                if (info && info.original && info.original.isLive) {

                    new dialog({
                        html: "Please wait, you will be able to download the video when the broadcast recording appears",
                        btn1text: self.app.localization.e('daccept'),
                        class: 'one',
                        success: function () {

                        }
                    })

                    return
                }

                if (!items.length) {

                    new dialog({
                        html: "Please wait, the video hasn't been transcoded yet",
                        btn1text: self.app.localization.e('daccept'),
                        class: 'one',
                        success: function () {

                        }
                    })

                    return

                }

                menuDialog({
                    header: self.app.localization.e('selectQuality'),
                    items: items
                })

            } else {
                error('Error, cannot find data for this video')
            }



        },

        external: function (ps) {

            self.app.platform.sdk.user.stateAction(() => {

                if (ps.action == 'share') {

                    self.app.platform.ui.share({
                        tags: ps.tags,
                        description: ps.description,
                        url: ps.url,
                        dontsave: true
                    })

                } else {
                    self.app.nav.api.load({
                        open: true,
                        href: 'external',
                        inWnd: true,
                        essenseData: {
                            action: ps.action,
                            parameters: ps
                        }
                    })
                }



            }, {
                text: 'external_' + ps.action + 'link_reg',
                success: 'rcontinue',
                cancel: 'dcancel'
            })
        },



        externalFromCurrentUrl: function () {
            var p = parameters()

            if (p.ext) {

                try {

                    var ps = self.sdk.external.getFromHash(p.ext)

                    self.ui.external(ps)

                    return true
                } catch (e) {
                    console.error(e)

                    sitemessage(e)
                }



            }
        }

    }


    self.effects = {
        manager: null,
        animation: false,

        effectinternal: function (el, name, parameters, clbk) {



            if (!self.sdk.usersettings.meta.useanimations.value) return

            var e = function () {
                window.rifticker.add(() => {
                    self.effects.manager.effect(el, name, parameters, clbk)
                })
            }

            if (!self.effects.manager) {
                self.effects.manager = new FX_Manager(app)
                self.effects.manager.prepare(e)
            } else {
                e()
            }
        },

        lib: {
            stars: function (el, parameters, clbk) {

                if (!parameters) parameters = {}

                parameters.opacity = 0.8
                parameters.scatter = 20
                parameters.duration = 900
                parameters.color || (parameters.color = '#ffa000')

                self.effects.effectinternal(el, 'stars', parameters, clbk)
            },

            hearts: function (el, parameters, clbk) {

                if (!parameters) parameters = {}

                parameters.opacity = 0.9
                parameters.scatter = 150
                parameters.duration = 1800
                parameters.size = 20

                if (self.app.mobileview) {
                    parameters.duration = 1400
                }

                parameters.color || (parameters.color = '#a10000')

                self.effects.effectinternal(el, 'hearts', parameters, clbk)
            },

            fire: function (el, parameters, clbk) {

                if (!parameters) parameters = {}

                parameters.opacity = 0.9
                parameters.scatter = 150
                parameters.duration = 1800
                parameters.size = 20

                if (self.app.mobileview) {
                    parameters.duration = 1400
                }

                parameters.symbol = '🔥'

                parameters.color || (parameters.color = '#a10000')

                self.effects.effectinternal(el, 'fire', parameters, clbk)
            },
        },

        container: function (place) {

            var container = $("<div/>", {
                "class": "effect",
                "style": "pointer-events: none; z-index: 10000; position : absolute; left : " + place.left + "px; top : " + place.top + "px; width : " + place.width + "px; height : " + place.height + "px;"
            })

            container.appendTo(self.app.el.app)

            return container
        },

        make: function (place, name, parameters, clbk) {

            //if (typeof _Electron != 'undefined') return

            var container = self.effects.container(place)

            self.effects.lib[name](container, parameters, function () {
                container.remove()

                container = null

                if (clbk) clbk()
            })
        },

        breakeffect: function (el, clbk) {
            if (!el || self.effects.animation) {
                if (clbk) clbk()
                return true
            }
        },

        templates: {
            commentstars: function (el, value, clbk) {

                if (self.effects.breakeffect(el, clbk)) {
                    return
                }

                self.effects.animation = true

                var stars = el.find('.starswr')

                var parameters = {}

                if (value < 2) parameters.color = '#FF0022'
                if (value == 2) parameters.color = '#ff2400'
                if (value == 3) parameters.color = '#CCCCCC'

                var top = stars.offset().top + 15
                var left = stars.offset().left
                var height = 300
                var width = 200
                var swidth = stars.width() * (value - 1) / 5

                left += swidth

                self.effects.make({
                    top: top - height,
                    left,
                    width,
                    height
                }, 'stars', parameters, function () {
                    self.effects.animation = false

                    if (clbk) clbk()
                })
            },

            paidsubscription: function (el, clbk) {
                if (self.effects.breakeffect(el, clbk)) {
                    return
                }

                self.effects.animation = true

                var parameters = {}

                parameters.color = '#FF3B00'

                if (self.app.mobileview) {
                    parameters.from = {
                        x: 'center',
                        y: 'top'
                    }
                    parameters.to = {
                        x: 'right',
                        y: 'bottom'
                    }
                } else {
                    parameters.from = {
                        x: 'left',
                        y: 'bottom'
                    }
                    parameters.to = {
                        x: 'center',
                        y: 'center'
                    }
                }

                self.effects.make({
                    top: 0,
                    left: 0,
                    width: self.app.width,
                    height: self.app.height
                }, 'fire', parameters, function () {

                    self.effects.animation = false

                    if (clbk) clbk()
                })


            },

            donatehearts: function (el, clbk) {
                if (self.effects.breakeffect(el, clbk)) {
                    return
                }

                self.effects.animation = true

                var parameters = {}

                parameters.color = '#ed1f1f'

                if (self.app.mobileview) {
                    parameters.from = {
                        x: 'center',
                        y: 'top'
                    }
                    parameters.to = {
                        x: 'right',
                        y: 'bottom'
                    }
                } else {
                    parameters.from = {
                        x: 'left',
                        y: 'bottom'
                    }
                    parameters.to = {
                        x: 'center',
                        y: 'center'
                    }
                }

                self.effects.make({
                    top: 0,
                    left: 0,
                    width: self.app.width,
                    height: self.app.height
                }, 'hearts', parameters, function () {

                    self.effects.animation = false

                    if (clbk) clbk()
                })


            }
        }
    }

    self.api = {


        keypair: function (m) {
            let keyPair;

            if (bitcoin.bip39.validateMnemonic(m)) {
                const seed = bitcoin.bip39.mnemonicToSeedSync(m);

                keyPair = self.sdk.address.dumpKeys(0, seed);
            } else {

                try {
                    keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(m, 'hex'));
                } catch (e) {
                    try {
                        keyPair = bitcoin.ECPair.fromWIF(m);
                    } catch (e) {
                        // TODO: Do something...
                    }
                }

            }

            return keyPair
        },

        clearname: function (n, t) {
            var fb = ((n || "").replace ? (n || "").replace(/[^a-zA-Z0-9_. *]/g, "") : n)

            if (t) return self.sdk.user.maskNotAllowedName(fb)

            return fb
        },

        name: function (address) {

            return self.psdk.userInfo.getShortForm(address).name
        },

        authorlink: function (address, namelink) {

            var name = self.psdk.userInfo.getShortForm(address).clname

            if (name) return encodeURIComponent(name.toLowerCase());

            else return 'authorn?address=' + address
        },

        authororexplorerlink: function (address) {

            return app.meta.blockexplorer + 'address/' + address

        },

        upbutton: function (el, p) {


            if (typeof window == 'undefined') return;

            if (!p) p = {};

            var self = this;
            var w = app.el.window;
            var up = null;

            var id = makeid()

            var currentmode = null;

            var render = function () {
                var h = '';

                h += '<div class="upbutton ' + (p.class || "") + '">'

                h += '<div class="full">'

                h += '<div class="fulltable table">'
                h += '<div class="fullcell icon">'
                h += (p.icon || '<i class="fas fa-chevron-up"></i>')
                h += '</div>'

                h += '<div class="fullcell label">'
                h += (p.text || app.localization.e('tothetop'))
                h += '</div>'

                h += '<div class="fullcell label likeicon">'
                h += '</div>'

                h += '</div>'

                h += '</div>'

                h += '<div class="mini">'
                h += (p.icon || '<i class="fas fa-chevron-up"></i>')
                h += '</div>'

                h += '</div>'

                el.html(h)
                up = el.find('.upbutton')
            }

            var getmode = function () {
                if (w.width() > 1280) {
                    return 'full'
                } else {
                    return 'mini'
                }
            }

            var actions = {
                clear: function () {
                    up.css('right', '')
                    up.css('top', '')
                    up.css('bottom', '')
                    up.css('width', '')
                }
            }

            var events = {
                resize: function () {

                    setTimeout(function () {
                        var mode = getmode();

                        if (mode != currentmode) {
                            actions.clear();
                        }

                        currentmode = mode

                        if (mode == 'full') {

                            if (p.top) {
                                up.css('top', p.top())
                            }

                        } else {

                        }
                    }, 200)


                },
                scroll: function () {

                    /*window.rifticker.add(() => {

                    })*/
                    if (app.lastScrollTop >= (typeof p.scrollTop == 'undefined' ? 250 : p.scrollTop)) {
                        up.addClass('active')
                    } else {
                        up.removeClass('active')
                    }

                },

                click: function () {

                    if (p.click) {
                        p.click(up.hasClass('active'))
                    } else {
                        app.actions.scroll(0)
                        //_scrollTop(0)
                    }


                }
            }

            var initEvents = function () {

                app.events.scroll[id] = events.scroll
                app.events.resize[id] = events.resize

                /**window.addEventListener('scroll', events.scroll)
                 window.addEventListener('resize', events.resize)*/

                up.on('click', events.click)


            }

            var removeEvents = function () {
                delete app.events.scroll[id]
                delete app.events.resize[id]

                if (up)
                    up.off('click', events.click)
                /*window.removeEventListener('scroll', events.scroll)
                window.removeEventListener('resize', events.resize)*/
            }

            self.init = function () {
                currentmode = getmode()

                render();

                initEvents();

                events.resize();
                events.scroll();
            }

            self.apply = function () {
                events.resize();
                events.scroll();
            }

            self.destroy = function () {
                removeEvents()

                el.html('')

                up = null
            }

            self.init()

            return self;
        },

        plissing: function (p) {

            var self = this;

            var render = function () {

                var rt = p.el.find('.plissingCnt');
                var rtclass = []

                if (p.left) {
                    rtclass.push('left')
                }

                if (p.white) {
                    rtclass.push('white')
                }

                if (rt.length) render.remove()

                p.el.append('<div class="plissingCnt"></div>')

                rt = p.el.find('.plissingCnt');

                rt.addClass(rtclass.join(' '))

                var h = ''


                var ball = function () {
                    h += '            <div class="plissingWrapperCell">'
                    h += '                <div class="pilsing">'
                    h += '                    <div></div>'
                    h += '                    <div></div>'
                    h += '                </div>'
                    h += '            </div>'
                }


                h += '<div class="plissingWrapper">'
                h += '<div class="plissingWrapperTable table">'


                if (!p.left) {
                    ball()
                }

                if (p.text || p.textHover) {



                    h += '            <div class="plissingTipCell">'
                    h += '                <div class="plissingTip all">'
                    h += (p.text || '')
                    h += '                </div>'

                    if (p.textHover) {
                        h += '                <div class="plissingTip hover">'
                        h += (p.textHover || '')
                        h += '                </div>'
                    }

                    h += '            </div>'

                }

                if (p.left) {
                    ball()
                }

                h += '    </div>'
                h += '</div>'


                rt.html(h);

                setTimeout(function () {
                    rt.addClass('active')
                }, 200)

            }

            self.init = function () {
                render()
            }

            self.destroy = function () {

                var e = p.el.find('.plissingCnt');

                e.removeClass('active')

                setTimeout(function () {
                    e.remove()
                }, 300)

            }

            self.init()

            if (p.time) {
                setTimeout(self.destroy, p.time)
            }

            return self;

        },

        mobiletooltip: function (_el, content, clbk, p, tooltip) {

            var d = function () {

                var dialog = tooltipMobileDialog({

                    html: content(),
                    clbk: function (el) {
                        if (clbk)

                            clbk(el, null, function () {
                                dialog.destroy()
                            })
                    },

                    app: app

                })
            }

            var mobiletooltip = _el.attr('mobiletooltip');

            if (mobiletooltip) return

            d()

            _el.on('click', function () {
                d()
            })

            if (!tooltip) {
                _el.attr('mobiletooltip', true)
            }

        },

        tooltip: function (_el, content, clbk, p, tooltip) {

            if (!p) p = {}

            if (self.app.mobileview || p.dlg || self.app.television) {
                return self.api.mobiletooltip(_el, content, clbk, p, tooltip)
            }

            if (_el.hasClass('tooltipstered')) return;


            if (!p) p = {};

            var options = {};

            options.debug = false;
            options.contentAsHTML = true;
            options.interactive = true;
            options.interactiveTolerance = 400;
            options.onlyOne = true;
            options.delay = 100;
            options.trigger = 'click'
            //options.autoClose = false;

            options.theme = p.theme || "lighttooltip";
            options.position || (options.position = "left");
            options.height || (options.height = 420);
            options.maxWidth || (options.maxWidth = 270);


            options.content = content

            options.functionReady = function (instance, h) {

                if (clbk) {
                    clbk($(h.tooltip), _el, function () {

                        try {
                            if (_el.tooltipster)
                                _el.tooltipster('hide')

                        } catch (e) {

                        }


                    })
                }
            }

            options.functionInit = function (i, h) {

            }

            _el.tooltipster(options)

            _el.tooltipster('show')

            return _el
        },

        electron: {
            storage: {},

            notifications: function (count, marker) {
                if (typeof _Electron != 'undefined') {


                    this.storage[marker] = count

                    var _count = _.reduce(this.storage, function (m, c) {
                        return m + c
                    }, 0)

                    electron.ipcRenderer.send('update-badge', _count || null);
                    electron.ipcRenderer.send('update-badge-tray', _count || null);


                }
            }
        },

        inputs: {
            user: function (parameter) {

                var render = function (info) {

                    if (parameter.el) {

                        if (!info) {

                        } else {

                        }
                    }
                }

                var change = function (v) {

                    if (parameter._onChange)
                        parameter._onChange(v)

                    var r = false;

                    try {
                        r = bitcoin.address.fromBase58Check(v);
                    } catch (e) {

                    }


                    if (r) {

                        self.sdk.users.get(v, function () {

                            var info = self.psdk.userInfo.get(v)
                            //self.sdk.users.storage[v] || null;

                            render(info)

                        })

                        return

                    }

                    render(null)

                }

                parameter.onChange = change;

                return parameter
            }
        },

        relation: function (address, type) {

            var me = self.psdk.userInfo.getmy()

            if (!me) return

            var r = me.relation(address, type)

            return r
        },

        actions: {

            blocking: function (address, clbk) {
                var blocking = new Blocking();
                blocking.address.set(address);


                self.app.platform.actions.addActionAndSendIfCan(blocking).then(action => {
                    var alias = action.object

                    successCheck()

                    if (clbk) clbk(alias)

                }).catch(e => {

                    if (clbk) clbk(null, e)

                })


            },
            miniapp: function (data, clbk) {
                var miniapp = new Miniapp();

                miniapp.id = data.id;
                miniapp.hash = data.hash
                miniapp.address = data.address
                miniapp.name = data.name
                miniapp.description = data.description
                miniapp.tscope = data.tscope
                miniapp.tags = data.tags
                miniapp.scope = data.scope


                self.app.platform.actions.addActionAndSendIfCan(miniapp).then(action => {
                    var alias = action.object

                    successCheck()

                    if (clbk) clbk(alias)

                }).catch(e => {

                    if (clbk) clbk(null, e)

                })


            },

            unblocking: function (address, clbk) {
                var unblocking = new Unblocking();
                unblocking.address.set(address);


                self.app.platform.actions.addActionAndSendIfCan(unblocking).then(action => {
                    var alias = action.object


                    successCheck()

                    if (clbk) clbk(alias)

                }).catch(e => {

                    if (clbk) clbk(null, e)

                })

                return

            },

            subscribeWithDialog: function (address, renderclbk) {

                menuDialog({

                    items: [

                        {
                            text: self.app.localization.e('e13263'),
                            class: 'itemmain',
                            action: function (clbk) {


                                self.api.actions.notificationsTurnOn(address, function (tx, error) {
                                    if (error) {
                                        self.errorHandler(error, true)
                                    }

                                    if (renderclbk) {
                                        renderclbk(tx);
                                    }

                                })

                                clbk()

                            }
                        },

                        {
                            text: self.app.localization.e('e13264'),
                            action: function (clbk) {

                                self.api.actions.subscribe(address, function (tx, error) {
                                    if (error) {
                                        self.errorHandler(error, true)
                                    }

                                    if (renderclbk) {
                                        renderclbk(tx);
                                    }

                                })

                                clbk()

                            }
                        }


                    ]
                })

            },

            unsubscribe: function (address, clbk) {
                var unsubscribe = new Unsubscribe();
                unsubscribe.address.set(address);


                self.app.platform.actions.addActionAndSendIfCan(unsubscribe).then(action => {

                    successCheck()

                    if (clbk) clbk(action.get())

                }).catch(e => {

                    if (clbk)
                        clbk(null, e)

                })


            },

            subscribe: function (address, clbk) {
                var subscribe = new Subscribe();
                subscribe.address.set(address);


                self.app.platform.actions.addActionAndSendIfCan(subscribe).then(action => {

                    successCheck()

                    if (clbk) clbk(action.get())

                }).catch(e => {

                    console.error(e)

                    if (clbk)
                        clbk(null, e)

                })


            },

            notificationsTurnOff: function (address, clbk) {
                self.api.actions.subscribe(address, clbk)
            },

            notificationsTurnOn: function (address, clbk) {
                var subscribe = new SubscribePrivate();
                subscribe.address.set(address);


                self.app.platform.actions.addActionAndSendIfCan(subscribe).then(action => {

                    successCheck()

                    if (clbk) clbk(action.get())

                }).catch(e => {


                    console.error(e)

                    if (clbk)
                        clbk(null, e)

                })


            },

            htls: function (id) {
                self.app.platform.ui.wallet.send({
                    id: id
                }, function () {

                })
            },

        },

        metmenu: function (_el, id, actions) {
            var share = self.psdk.share.get(id)

            var address = share.address

            var d = {};

            d.share = share
            d.authorsettings = self.psdk.accSet.get(address) || {}

            self.app.platform.sdk.ustate.me(function (_mestate) {

                self.sm.fastTemplate('metmenu', function (rendered, template) {

                    var t = self.api.tooltip(_el, function () {

                        d.share = self.psdk.share.get(id)

                        d.mestate = _mestate

                        try {
                            template(d)
                        } catch (e) {
                            console.error
                        }

                        return template(d);

                    }, function (el, f, close) {

                        el.find('.recommendationinfo').on('click', function () {


                            var data = {
                                ...self.sdk.recommendations.sharesinfo[share.txid] || {},
                                share: share.txid
                            }

                            self.app.nav.api.load({
                                open: true,
                                href: 'recommendationinfo',
                                inWnd: true,
                                history: true,

                                essenseData: data
                            })

                            close()
                        })

                        el.find('.opennewwindow').on('click', function () {

                            self.app.mobile.vibration.small()

                            var href = 'https://' + self.app.options.url + '/' /// domain


                            var path = ''

                            if (d.share.itisvideo() && !window.cordova && !self.app.mobileview){
                                path = 'index?video=1&v=' + id
                            } else {
                                path = 'post?s=' + id
                            }

                            href += path


                            if (window.cordova) {

                                if (!app.nav.current || app.nav.current.href != 'post') {
                                    app.nav.api.load({
                                        open: true,
                                        href: path,
                                        history: true,
                                    })
                                } else {
                                    cordova.InAppBrowser.open(href, '_system');
                                }


                            } else {
                                window.open(href, '_blank');
                            }

                            close()
                        })

                        var pinPost = function (share, clbk, unpin) {


                            self.app.platform.sdk.user.accSetMy({
                                pin: unpin ? '' : share.txid
                            }, function (err, alias) {

                                if (!err) {

                                    if (clbk) {

                                        clbk(null, alias)
                                    }

                                } else {
                                    self.app.platform.errorHandler(err, true)

                                    if (clbk)
                                        clbk(err, null)
                                }

                            })

                        }

                        el.find('.pin').on('click', function () {

                            close()

                            new dialog({
                                class: 'zindex',
                                html: self.app.localization.e('pinPostDialog'),
                                btn1text: self.app.localization.e('dyes'),
                                btn2text: self.app.localization.e('dno'),
                                success: function () {

                                    pinPost(d.share, function (err, result) {

                                    }, false)

                                }
                            })

                        })

                        el.find('.unpin').on('click', function () {

                            close()

                            new dialog({
                                class: 'zindex',
                                html: self.app.localization.e('unpinPostDialog'),
                                btn1text: self.app.localization.e('dyes'),
                                btn2text: self.app.localization.e('dno'),
                                success: function () {

                                    pinPost(d.share, function (err, result) {

                                        if (!err) {

                                            d.share.pin = false;
                                            var metatable = _el.closest('.metatable');
                                            var pinnedIcon = metatable.find('.pinnedIcon');
                                            var pinnedLabel = metatable.find('.pinnedLabel');
                                            pinnedIcon.children().remove();
                                            pinnedLabel.empty()

                                        }


                                    }, true)

                                }
                            })
                        })

                        el.find('.htls').on('click', function () {

                            actions.htls(id)

                            close()
                        })

                        el.find('.socialshare').on('click', function () {

                            self.app.mobile.vibration.small()
                            actions.sharesocial(id)

                            close()
                        })

                        el.find('.startchat').on('click', function () {

                            self.matrixchat.startchat(address)

                            self.app.mobile.vibration.small()


                            close()
                        })

                        el.find('.subscribe').on('click', function () {
                            self.app.mobile.vibration.small()
                            self.api.actions.subscribe(address, function (tx, error) {

                                if (error) {
                                    self.errorHandler(error, true)
                                }

                            })

                            close()
                        })

                        el.find('.unsubscribe').on('click', function () {
                            self.app.mobile.vibration.small()
                            self.api.actions.unsubscribe(address, function (tx, error) {
                                if (error) {
                                    self.errorHandler(error, true)
                                }
                            })

                            close()
                        })

                        el.find('.complain').on('click', function () {
                            self.app.mobile.vibration.small()
                            actions.complain(id)

                            close()

                        })

                        el.find('.donate').on('click', function () {
                            self.app.mobile.vibration.small()
                            //actions.donate(id)

                            self.ui.wallet.send({
                                address: address
                            })

                            //deep(window, 'POCKETNETINSTANCE.platform.ui.wallet.send')

                            close()

                        })

                        el.find('.remove').on('click', function () {
                            self.app.mobile.vibration.small();

                            close()


                            new dialog({
                                class: 'zindex',
                                html: self.app.localization.e('removePostDialog'),
                                btn1text: self.app.localization.e('dyes'),
                                btn2text: self.app.localization.e('dno'),
                                success: function () {

                                    var shareslist = _el.closest(`[stxid='${id}']`);
                                    var authorgroup = shareslist.closest('.sharecnt');

                                    var removePost = function (share, clbk) {

                                        /*share.deleted = true;
                                        var ct = new Remove();
                                        ct.txidEdit = share.txid;*/



                                        self.app.platform.sdk.node.shares.delete(share.txid, function (err, alias) {

                                            if (!err) {
                                                if (clbk) {

                                                    // var l = share.url;


                                                    // if (self.app.peertubeHandler.checklink(l)) {
                                                    //     share.settings.a = share.default.a

                                                    //     self.app.peertubeHandler.api.videos.remove(l).then(r => {
                                                    //         self.app.platform.sdk.videos.clearstorage(l)
                                                    //     })


                                                    // }

                                                    clbk(null, alias)
                                                }

                                            } else {
                                                self.app.platform.errorHandler(err, true)

                                                if (clbk)
                                                    clbk(err, null)
                                            }

                                        })

                                    }

                                    removePost(d.share, function (err, result) {

                                        if (!err) {

                                            //authorgroup.addClass('deleted');


                                        }


                                    })

                                }
                            })


                        })

                        el.find('.block').on('click', function () {

                            self.app.mobile.vibration.small()

                            close()

                            new dialog({
                                class: 'zindex',
                                html: self.app.localization.e('blockUserQ'),
                                btn1text: self.app.localization.e('dyes'),
                                btn2text: self.app.localization.e('dno'),
                                success: function () {

                                    self.api.actions.blocking(address, function (tx, error) {
                                        if (!tx) {
                                            self.errorHandler(error, true)
                                        }
                                    })



                                }
                            })



                        })

                        el.find('.unblock').on('click', function () {
                            self.app.mobile.vibration.small()

                            close()

                            new dialog({
                                class: 'zindex',
                                html: self.app.localization.e('e13023'),
                                btn1text: self.app.localization.e('dyes'),
                                btn2text: self.app.localization.e('dno'),
                                success: function () {

                                    self.api.actions.unblocking(address, function (tx, error) {
                                        if (!tx) {
                                            self.errorHandler(error, true)
                                        }
                                    })



                                }
                            })



                        })



                        el.find('.edit').on('click', function () {

                            self.app.mobile.vibration.small()
                            var em = null;
                            var editing = d.share.alias()

                            var hash = editing.shash()

                            if (editing.settings.v == 'a') {

                                if (editing.settings.version >= 2) {

                                    app.nav.api.load({
                                        open: true,
                                        href: 'articlev',
                                        history: window.cordova,
                                        inWnd: true,

                                        essenseData: {

                                            editing,

                                            save: function (art) {

                                            },
                                            close: function () {

                                            },
                                            complete: function () {

                                            },
                                            closeContainer: function () {

                                            }
                                        }
                                    })

                                } else {
                                    app.nav.api.load({
                                        open: true,
                                        href: 'article',
                                        inWnd: true,
                                        history: true,

                                        essenseData: {
                                            share: editing,
                                            hash: hash,

                                            save: function (art) {

                                            },
                                            close: function () {

                                            },
                                            complete: function () {

                                            },
                                            closeContainer: function () {

                                            }
                                        }
                                    })
                                }



                            } else {

                                app.nav.api.load({

                                    open: true,
                                    id: 'share',
                                    animation: false,
                                    inWnd: true,
                                    _id: d.share.txid,

                                    essenseData: {
                                        share: editing,
                                        notClear: true,
                                        hash: hash,
                                        absolute: true,
                                        cancel: function () {

                                            var close = deep(em, 'container.close')

                                            if (close)
                                                close()
                                        },

                                        post: function () {

                                            var close = deep(em, 'container.close')

                                            if (close)
                                                close()
                                        }
                                    },

                                    clbk: function (e, p) {
                                        em = p;
                                    }

                                })
                            }

                            close()

                        })

                        el.find('.downloadVideo').on('click', function () {


                            self.app.mobile.vibration.small()

                            self.ui.saveShare(share, function (id, deleted) {
                                if (actions.changeSavingStatus)
                                    actions.changeSavingStatus(share.txid, deleted)
                            }, {
                                before: actions.changeSavingStatusLight,
                                after: actions.changeSavingStatusLight
                            })

                            close()

                        })

                        el.find('.deleteSavedVideo').on('click', function () {

                            self.ui.saveShare(share, function (id, deleted) {
                                if (actions.changeSavingStatus)
                                    actions.changeSavingStatus(id, deleted)
                            })

                            close()

                        })

                        el.find('.savePost').on('click', function () {

                            var sendSiteMessage = function () {
                                sitemessage(self.app.localization.e('postsaved'), null, 5000, {
                                    action: {
                                        text: self.app.localization.e('gotosaved2'),
                                        do: function () {

                                            app.nav.api.load({
                                                open: true,
                                                href: 'index?r=saved',
                                                history: true,
                                                handler: true
                                            })

                                            app.actions.scrollToTop()

                                        }
                                    }
                                })
                            }

                            if (!self.app.savesupported() && !self.app.savesupportedForBrowser()) {
                                close();
                                return;
                            }

                            var user = self.psdk.userInfo.get(share.address)

                            if (user) {
                                share.user = user.export()
                            }

                            //share.user = deep(self.app, 'platform.sdk.usersl.storage.' + share.address).export();

                            // If we are on mobile/electron and post has a downloadable media video
                            // Do not download video on iOS
                            if (share.itisvideo() && self.app.savesupported()) {

                                // Ask user if he wants to download
                                app.nav.api.load({
                                    open: true,
                                    id: 'downloadMedia',
                                    inWnd: true,

                                    essenseData: {
                                        item: 'post',
                                        obj: share,

                                        success: function (saveMedia) {

                                            // Save the post on the device without medias
                                            if (!saveMedia) {

                                                self.app.platform.sdk.localshares.saveShare(share, {
                                                    doNotSaveMedia: true
                                                }).then(() => {

                                                    sendSiteMessage();

                                                });

                                                return;

                                            }

                                            // Save the post with video
                                            self.ui.saveShare(share, function () {});

                                            return;

                                        }
                                    },

                                    clbk: function () {

                                    }
                                })

                            } else if (self.app.savesupported()) {

                                // Save the post on the device
                                self.app.platform.sdk.localshares.saveShare(share).then(() => {

                                    sendSiteMessage();

                                });


                            } else {


                                self.app.platform.sdk.localshares.saveShare(share, {
                                    doNotSaveMedia: true
                                }).then(() => {

                                    sendSiteMessage();

                                });
                                // Here, we have access to the localstorage (browser)
                                //self.app.platform.sdk.localshares.write.share.localstorage(share);

                                //sendSiteMessage();

                            }

                            close()

                        })

                        el.find('.deleteSavedPost').on('click', function () {

                            if (self.app.platform.sdk.localshares.delete[self.sdk.localshares.key])
                                self.app.platform.sdk.localshares.delete[self.sdk.localshares.key](share.txid);

                            close()

                            if (app.nav.current.completeHref && app.nav.current.completeHref.startsWith('index?r=saved'))
                                _el.closest(`.share[id='${share.txid}']`).remove();

                        })

                        el.find('.videoshare').on('click', function () {
                            self.app.mobile.vibration.small()
                            actions.videoShare(share)

                            close()
                        })

                        el.find('.openOriginal').on('click', function () {
                            self.app.mobile.vibration.small()

                            self.app.nav.api.load({
                                open: true,
                                href: 'post?s=' + share.txid,
                                inWnd: true,
                                history: true,
                                clbk: function (d, p) {
                                    app.nav.wnds['post'] = p

                                    if (close) close()
                                },

                                essenseData: {
                                    share: share.txid
                                }
                            })

                            close()
                        })
                    }, false)

                }, d, 'lenta')
            })
        }
    }

    self.sdk = {

        miniapps: {
            getbyid: async function (appId) {
                const apps = await this.getall({id: appId})
                return apps[0]
            },
            getall: async function (ps = {}, rpc) {
                const delay = (ms) => new Promise((res) => setTimeout(res, ms))
                if(!Boolean(app.appready)) {
                    await delay(500)
	                return this.getall(ps, rpc)
                }
                var parameters = {
                    tags: [],
                    search: '',
                    topHeight: self.currentBlock,
                    pageStart: 0,
                    pageSize: 20,
                    orderBy: 'height',
                    orderDesc: true,
                    ...ps
                }
                return self.psdk.miniapp.request(() => {
                    return self.app.api.rpc('getapps', parameters, {
                        rpc: rpc
                    }).then(data => {

                        return Promise.resolve(data)

                    })
                }, {
                    method: 'getapps',
                    parameters: parameters
                }).then(d => {

                    return Promise.resolve(d)

                }).catch(e => {

                    return Promise.reject(e)

                })
            }
        },
        jury: {
            // Fetch all the jurys
            getalljury: function () {
                return self.app.api.rpc('getalljury');
            },
            // Fetch all the jurys for a specific user address
            getjuryassigned: function (address) {
                return self.psdk.jury.getjuryassigned(address).catch(e => {
                    return []
                })
            },

            getjurymoderators: function(juryId) {
                return self.app.api.rpc('getjurymoderators', [juryId]);
            },

            getcountforme : function(clbk){
                self.app.user.isState(function (state) {
                    if (state && self.sdk.user.isjury()){

                        self.sdk.node.shares.jury({page : 0, count : 1000}, (items) => {

                            var c = items.length

                            if(clbk) clbk(c)

                        })
                    }
                    else{
                        if(clbk) clbk(0)
                    }
                })
            },

            updatejurycount : function(){

                self.sdk.jury.getcountforme(function(count){
                    self.sdk.newmaterials.update({
                        jury : count
                    })
                })
                
            },

            sendverdict : function(juryobject, verdict){

                if(!juryobject || typeof verdict == undefined){
                    self.app.platform.errorHandler('network', true)

                    return Promise.reject('network')
                }

                var modvote = new ModVote();

                modvote.s2.set(juryobject.id)
                modvote.i1.set(verdict || 0)

                ///self.sdk.node.transactions.clearTempHard()

                return self.app.platform.actions.addActionAndSendIfCan(modvote).then(action => {
                    successCheck()
                    sitemessage(self.app.localization.e('juryvote_success'))

                    self.psdk.jury.clear()

                    return Promise.resolve(action)

                }).catch(e => {
                    console.error(e)
                    self.app.platform.errorHandler(e, true)

                    return Promise.reject(e)

                })
            }

        },

        external : {
            expandLink : function(json = {}){

                var eExt = {}

                if (json.address) eExt.address = json.address
                if (json.description) eExt.description = json.description
                if (json.value) eExt.value = json.value
                if (json.paymentHash) eExt.paymentHash = json.paymentHash


                if (json.a) eExt.action = (json.a == 'p' ? 'pay' : (json.a == 'a' ? 'auth' : json.a))
                if (json.ad) eExt.address = json.ad
                if (json.s) eExt.s_url = json.s
                if (json.sv) eExt.shipmentValue = json.shipmentValue
                if (json.c) eExt.c_url = json.c
                if (json.ct) eExt.c_url_type = json.ct
                if (json.e) eExt.email = true
                if (json.p) eExt.phone = true
                if (json.an) eExt.anonimus = true
                if (json.pl) eExt.payload = json.pl
                if (json.ex) eExt.expired = json.ex
                if (json.d) eExt.date = json.d
                if (json.h) eExt.paymentHash = json.h
                if (json.de) eExt.description = json.de
                if (json.v) eExt.value = json.v
                if (json.sav) eExt.saltValue = json.sav
                if (json.di) eExt.discount = json.di
                if (json.ta) eExt.tax = json.ta


                if (json.tg) eExt.tags = json.tg
                if (json.u) eExt.url = json.u

                if (json.st) {
                    eExt.store = {}

                    if (json.st.n) eExt.store.name = json.st.n
                    if (json.st.s) eExt.store.site = json.st.s
                }

                if (json.i) {
                    eExt.items = []

                    _.each(json.i, (it) => {
                        var item = {}

                        if (it.i) item.image = it.i
                        if (it.n) item.name = it.n
                        if (it.v) item.value = it.v
                        if (it.c) item.count = it.c


                        eExt.items.push(item)
                    })
                }

                if (!eExt.action) eExt.action = 'pay'



                return eExt
            },
            type: function (ext) {

                var ps = self.sdk.external.getFromHash(ext)

                return ps.action
            },

            getFromHash: function (ext) {
                var ps = self.sdk.external.expandLink(JSON.parse(clearStringXss(ext[0] == '_' ? hexDecode(ext.replace("_", "")) : decodeURI(ext))))

                ps.hash = ext

                if (!ps.action) {
                    throw 'missing:action'
                }

                if (ps.action == 'auth') {
                    if (!ps.c_url_type) ps.c_url_type = 'fetch'

                    if (!ps.c_url) {
                        throw 'missing:c_url'
                    }

                    try {
                        var url = new URL(ps.c_url)

                        ps.host = clearStringXss(url.hostname)

                    } catch (e) {
                        throw 'wrong:c_url:notvalid'
                    }
                }

                if (ps.action == 'share') {
                    if (ps.description) ps.description = clearStringXss(ps.description)
                    if (ps.url) ps.url = clearStringXss(ps.url)
                    if (ps.tags) {
                        if (!_.isArray(ps.tags)) throw 'tags:array'

                        ps.tags = _.map(ps.tags, (tag) => {
                            return clearStringXss(tag)
                        })
                    }
                }

                if (ps.action == 'pay') {

                    console.log('ps', ps)

                    if (!ps.address) throw 'missing:address'

                    if (ps.anonimus) {
                        delete ps.email
                        delete ps.phone
                        delete ps.s_url
                    }

                    try {
                        bitcoin.address.fromBase58Check(ps.address)
                    } catch (e) {
                        throw 'wrong:address:notvalid'
                    }

                    if (!ps.c_url_type) ps.c_url_type = 'fetch'
                    //if(!ps.payload) ps.payload = {}

                    if ((!ps.items || !_.isArray(ps.items) || ps.items.length == 0) && !ps.value) throw 'missing:valueOritems'

                    if (ps.items) {

                        var a = 0

                        _.each(ps.items, (item, i) => {
                            if (!item.name) throw 'missing:items:' + i + ':name'
                            if (!item.value) throw 'missing:items:' + i + ':value'

                            if (!_.isNumber(item.value)) throw 'wrong:items:' + i + ':value:nan'
                            if (item.value < 0) throw 'wrong:items:' + i + ':value:lessthanzero'

                            if (item.count && !_.isNumber(item.count)) throw 'wrong:items:' + i + ':count:nan'

                            a += (item.count || 1) * item.value

                            item.image = clearStringXss(item.image || '')
                            item.name = clearStringXss(item.name)
                            //item.formattedAmount = self.mp.coin(item.value)
                        })

                        ps.value = a
                    } else {
                        if (!_.isNumber(ps.value)) throw 'wrong:value:nan'
                    }

                    if (ps.saltValue) {
                        if (!_.isNumber(ps.saltValue)) throw 'wrong:saltValue:nan'
                        if (ps.saltValue >= 1) throw 'wrong:saltValue:morethan:1'
                        if (ps.saltValue <= -1) throw 'wrong:saltValue:lessthan:-1'
                        if (ps.saltValue.toFixed(8) != ps.saltValue.toString()) throw 'wrong:saltValue:8digitsRule'

                        ps.value = ps.value + ps.saltValue
                    }

                    if (ps.discount) {
                        if (!_.isNumber(ps.discount)) throw 'wrong:discount:nan'
                        if (ps.discount < 0) throw 'wrong:discount:lessthan:0'

                        ps.value = ps.value - ps.discount
                    }

                    if (ps.tax) {
                        if (!_.isNumber(ps.tax)) throw 'wrong:tax:nan'
                        if (ps.tax < 0) throw 'wrong:tax:lessthan:0'

                        ps.value = ps.value + ps.tax
                    }

                    if (typeof ps.shipmentValue != 'undefined') {
                        if (!_.isNumber(ps.shipmentValue)) throw 'wrong:shipmentValue:nan'
                        if (ps.shipmentValue < 0) throw 'wrong:shipmentValue:lessthan:0'
                    }


                    if (ps.store) {
                        if (!ps.store.name) throw 'missing:store.name'
                        //if(!ps.store.site) throw 'missing:store.site'

                        ps.store.name = clearStringXss(ps.store.name)

                        if (ps.store.site)
                            ps.store.site = clearStringXss(ps.store.site)

                    }

                    if (ps.expired) {
                        if (!ps.date) throw 'missing:date'

                        if (!_.isNumber(ps.expired)) throw 'wrong:expired:nan'
                    }

                    if (ps.description) ps.description = clearStringXss(ps.description)


                    if (!ps.value || ps.value <= 0) throw 'missing:value'

                    //ps.hash = p.ext
                }

                return ps
            },

            getObjectFromHash: function (hash) {


                var eExt = self.sdk.external.getFromHash(hash)


                if (eExt.action == 'pay') {
                    var payment = self.app.platform.sdk.payments.make({
                        payment: eExt
                    })

                    /*payment.makeQR().then(q => {
                        console.log(q)
                    })*/

                    return payment
                }

                return null


            }
        },
        payments: {

            save: function (lsdata, hash) {
                lsdata.updated = new Date()

                try {
                    localStorage['pays_' + hash] = JSON.stringify(lsdata) || {}
                } catch (e) {
                    console.error(e)
                }

            },
            load: function (hash) {
                var lsdata = {}

                try {
                    lsdata = JSON.parse(localStorage['pays_' + hash] || "{}") || {}
                    lsdata.updated = new Date(lsdata.updated)
                } catch (e) {
                    console.error(e)
                }

                return lsdata
            },


            get: function () {
                try {

                    var allpays = []

                    Object.keys(localStorage).forEach(key => {
                        if (key.indexOf('pays_') == 0) {
                            var parsed = JSON.parse(localStorage[key])

                            if (parsed.txid && parsed.account == self.app.user.address.value) {
                                parsed.updated = new Date(parsed.updated)
                                parsed.hash = key.replace('pays_', '')
                                parsed.info = self.sdk.external.getFromHash(parsed.hash)
                                parsed.vid = makeid()
                                allpays.push(parsed)
                            }

                        }
                    });


                    return _.sortBy(allpays, (pay) => {
                        return -pay.updated
                    })

                } catch (e) {
                    console.error(e)
                    return []
                }
            },

            getLastShipment: function () {
                try {

                    var allpays = []

                    Object.keys(localStorage).forEach(key => {
                        if (key.indexOf('pays_') == 0) {
                            var parsed = JSON.parse(localStorage[key])

                            if (parsed.shipment && parsed.account == self.app.user.address.value) {
                                parsed.updated = new Date(parsed.updated)
                                allpays.push(parsed)
                            }

                        }
                    });

                    if (!allpays.length) {
                        return null
                    }

                    var m = _.max(allpays, (p) => {
                        return p.updated
                    })

                    return m.shipment

                } catch (e) {
                    return null
                }

            },

            remove: function (hash) {
                try {
                    localStorage.removeItem('pays_' + hash);
                } catch (e) {

                }

            },

            prepare: function (clbk) {
                var removeKeys = []

                try {
                    Object.keys(localStorage).forEach(key => {
                        if (key.indexOf('pays_') == 0) {
                            var parsed = JSON.parse(localStorage[key])

                            if (!parsed.txid && (parsed.updated || parsed.date)) {
                                var upd = new Date(parsed.updated || parsed.date)

                                if (upd.addDays(3) < (new Date())) {
                                    removeKeys.push(key)
                                }
                            }

                        }
                    });

                    _.each(removeKeys, (key) => {
                        localStorage.removeItem(key);
                    })
                } catch (e) {

                }

                if (clbk) clbk()




            }
        },

        geolocation: {
            get: function (options) {
                return navigator.geolocation.getCurrentPosition(options.onSuccess, options.onError);
            }
        },
        broadcaster: {
            clbks: {},
            history: [],
            init: function (clbk) {
                if (typeof swBroadcaster != 'undefined') {
                    swBroadcaster.removeAllNamed('network-stats');

                    swBroadcaster.on('network-stats', (data) => {

                        if (self.sdk.broadcaster.history.length > 600) {
                            self.sdk.broadcaster.history.splice(0, 100)
                        }

                        self.sdk.broadcaster.history.push(data)

                        _.each(self.sdk.broadcaster.clbks, (c) => {
                            c(data)
                        })
                    })
                }

                if (clbk) clbk()
            }
        },
        translate: {
            storage: {},
            state: {
                share: {},
                comment: {}
            },
            share: {
                needtranslate: function (txid) {

                    var share = self.psdk.share.get(txid)

                    var user = self.psdk.userInfo.getmy()

                    if (!share || !user) return []

                    if (share.language == user.language) return []

                    return [share.language, user.language]

                },
                lang: function (txid) {
                    self.sdk.translate.storage.share || (self.sdk.translate.storage.share = {})

                    if (self.sdk.translate.state.share[txid] && self.sdk.translate.storage.share[txid][self.sdk.translate.state.share[txid]]) {
                        return self.sdk.translate.state.share[txid]
                    } else {
                        var share = self.psdk.share.get(txid)

                        if (!share) return null

                        return share.language
                    }
                },

                get: function (txid) {
                    var lang = self.sdk.translate.share.lang(txid)

                    if (self.sdk.translate.storage.share[txid] && self.sdk.translate.storage.share[txid][lang]) {
                        return self.sdk.translate.storage.share[txid][lang]
                    }
                },

                set: function (txid, dl) {
                    self.sdk.translate.state.share[txid] = dl
                },
                request: function (txid, dl) {

                    var share = self.psdk.share.get(txid)

                    if (share.language == dl) return Promise.resolve()

                    self.sdk.translate.storage.share || (self.sdk.translate.storage.share = {})
                    self.sdk.translate.storage.share[txid] || (self.sdk.translate.storage.share[txid] = {})

                    if (self.sdk.translate.storage.share[txid][dl]) return Promise.resolve(self.sdk.translate.storage.share[txid][dl])

                    return self.app.api.translate.share(txid, dl).then((result) => {

                        var cleaned = self.psdk.share.cleanData([result])

                        if (!cleaned.length) {
                            return Promise.reject('translate.clean')
                        }

                        self.sdk.translate.storage.share[txid][dl] = cleaned[0]

                        return Promise.resolve(self.sdk.translate.storage.share[txid][dl])

                    })

                }
            },
            comment: {
                needtranslate: function (txid) {},
                lang: function (txid) {

                },
                set: function (txid, dl) {
                    self.sdk.translate.state.comment || (self.sdk.translate.state.comment = {})
                    self.sdk.translate.state.comment[txid] = dl
                },
                request: function (txid, dl) {
                    self.sdk.translate.storage.comment || (self.sdk.translate.storage.comment = {})
                    self.sdk.translate.storage.comment[txid] || (self.sdk.translate.storage.comment[txid] = {})

                    if (self.sdk.translate.storage.comment[txid][dl]) return Promise.resolve(self.sdk.translate.storage.comment[txid][dl])

                    return self.app.api.translate.comment(txid, dl).then((result) => {

                        var cleaned = self.psdk.comment.cleanData([result])

                        if (!cleaned.length) {
                            return Promise.reject('translate.clean')
                        }

                        self.sdk.translate.storage.comment[txid][dl] = cleaned[0]

                        return Promise.resolve(self.sdk.translate.storage.comment[txid][dl])

                    })

                }
            }
        },
        faqLangs: {
            get: function (clbk) {

                ///TODO_UPDATE FROM MASTER

                importScript('js/faq.js', function () {

                    if (typeof FAQLANGS == 'undefined') {
                        if (clbk) clbk({})
                    }

                    if (clbk) {
                        clbk(FAQLANGS(app))
                    }

                }, null, app, 'satolist');

            }
        },

        localshares: {
            storage: {},
            saving: {},
            paused: {},
            key: '',

            getSegment: function (dir, filename) {

                return electron.ipcRenderer.invoke('getVideoSegment', dir, filename)

            },

            getByMasterSwarmId: function (masterSwarmId) {
                var s = self.sdk.localshares.storage

                var video = null

                _.find(s, (share) => {
                    return _.find(share.videos, function (v) {
                        if (v.infos && v.infos.videoDetails && v.infos.masterSwarmId == masterSwarmId && v.infos.segments && v.infos.dir) {
                            video = v;
                            return true
                        }
                    })
                })

                return video
            },

            status: function (id) {
                if (self.sdk.localshares.storage[id]) return 'saved'
                if (self.sdk.localshares.paused[id]) return 'paused'
                if (self.sdk.localshares.saving[id]) return 'saving'

                return 'cansave'
            },

            videoDlProgress: async function (id) {
                const progress = await electron.ipcRenderer.invoke('getVideoDownloadProgress', id);
                return progress;
            },

            setVideoDlStatus: async function (id, status) {
                await electron.ipcRenderer.invoke('setVideoDownloadStatus', id, status);
            },

            clearfromstorage: function (shareId) {
                delete self.sdk.localshares.storage[shareId]
            },
            addtostorage: function (share) {
                self.sdk.localshares.storage[share.id || share.share.txid] = share
            },

            initclbk: function (clbk) {
                self.sdk.localshares.init().then(r => {
                    if (clbk) clbk()
                }).catch(e => {
                    if (clbk) clbk()
                })
            },

            init: function () {

                var k = 'localstorage'

                if (window.cordova) k = 'cordova'
                if (typeof _Electron != 'undefined' && window.electron) k = 'electron'

                self.sdk.localshares.key = k

                if (!window.peertubeglobalcache) window.peertubeglobalcache = {}

                return self.sdk.localshares.getall[self.sdk.localshares.key]().then(r => {

                    _.each(r, function (share) {
                        self.sdk.localshares.addtostorage(share)

                        if (share.videos) {
                            _.each(share.videos, function (v) {
                                if (v && v.infos && v.infos.videoDetails) window.peertubeglobalcache[v.infos.videoDetails.uuid] = v.infos.videoDetails
                            })
                        }

                    })

                    var fm = _.map(_.filter(r, function (u) {
                        return u.share && u.share.user
                    }), u => {
                        return u.share.user
                    })

                    self.psdk.userInfo.insertFromResponseSmall(self.psdk.userInfo.cleanData(fm), true)

                    /*_.each(fm, (u) => {
                        self.psdk.userInfo.insertFromResponseSmall([_.clone(curShare.share.share)], true)
                    })*/


                    /*self.sdk.node.shares.takeusers(_.map(fm, function(u){
                        return {userprofile : u.share.user}
                    }), false)*/


                }).catch(error => {
                    //console.error(error)
                })
            },

            ////////////////////

            getShareIds: function () {
                return _.map(self.sdk.localshares.storage, function (v, i) {
                    return i
                })
            },

            getAllVideos: function () {
                var videos = []

                var s = self.sdk.localshares.storage

                _.find(s, (share) => {
                    var v = _.find(share.videos, function (v) {
                        if (v.infos && v.infos.videoDetails && v.infos.masterSwarmId && v.infos.segments && v.infos.dir) {
                            video = v;
                            return true
                        }
                    })

                    if (v) {
                        videos.push(v)
                    }
                })

                return videos
            },

            saveShare: function (share, p) {

                if (!p) p = {}

                if (self.sdk.localshares.saving[share.txid]) return Promise.reject('saving')

                if (self.sdk.localshares.storage[share.txid]) return Promise.reject('Saved')

                if (!share) return Promise.reject('share')

                var user = self.psdk.userInfo.get(share.address)

                if (!user) return Promise.reject('user')

                var exported = share.export()

                if (exported.lastComment) {
                    var c = self.psdk.comment.get(exported.lastComment)

                    if (c) {
                        exported.lastComment = c.export()
                    }
                }

                var shareInfo = {
                    share: {
                        id: share.txid,
                        share: exported,
                        user: user.export(),
                        timestamp: new Date(),
                    },
                };

                self.sdk.localshares.saving[share.txid] = true

                if (p.before) p.before(share)

                if (share.itisvideo())
                    shareInfo.video = share.url ? (app.platform.sdk.videos.storage[share.url] || {}).data || null : null


                return self.sdk.localshares.write.share[self.sdk.localshares.key](shareInfo.share).then(folder => {

                    return new Promise((resolve) => {

                        // Only save videos on Android
                        if (share.itisvideo() && !p.doNotSaveMedia) {

                            self.sdk.localshares.write.video[self.sdk.localshares.key](folder, shareInfo, p).then(r => {

                                if (r == undefined)
                                    return Promise.reject('paused');

                                shareInfo.share.videos || (shareInfo.share.videos = {})
                                if (r)
                                    shareInfo.share.videos[r.id] = r

                                return resolve()

                            })

                        } else if (share.images && share.images.length > 0 && !p.doNotSaveMedia) {

                            self.sdk.localshares.write.image[self.sdk.localshares.key](folder, shareInfo, share.images, p).then(images => {

                                shareInfo.share.share.i = images;

                                self.sdk.localshares.write.share[self.sdk.localshares.key](shareInfo.share).finally(() => {
                                    return resolve()
                                });

                            });

                        } else

                            return resolve()

                    });

                }).then(r => {
                    self.sdk.localshares.storage = {}

                    self.sdk.localshares.saving[share.txid] = false
                    delete self.sdk.localshares.paused[share.txid]

                    return self.sdk.localshares.init()

                    //self.sdk.localshares.addtostorage(shareInfo.share)

                    //return Promise.resolve()
                }).then(r => {

                    if (p.after) p.after(share)

                }).catch(e => {


                    self.sdk.localshares.saving[share.txid] = false
                    if (e == 'paused')
                        self.sdk.localshares.paused[share.txid] = p.resolutionId
                    else
                        delete self.sdk.localshares.paused[share.txid]

                    if (p.after) p.after(share)

                    return Promise.reject(e)
                })

            },

            getVideo: function (videoId) {
                var video, shares = self.sdk.localshares.storage;

                try {
                    for (const share in shares) {
                        if (video) break;

                        for (const vidId in shares[share].videos) {
                            if (vidId == videoId) {
                                video = shares[share].videos[vidId];
                                break;
                            }
                        }
                    }

                } catch (err) {

                }

                return video;
            },

            getShare: function (id) {
                return self.sdk.localshares.storage[id]
            },

            deleteShare: function (id) {
                return self.sdk.localshares.delete[self.sdk.localshares.key](id)
            },

            deleteAll: function () {
                return Promise.all(_.map(self.sdk.localshares.storage, function (v, id) {
                    return self.sdk.localshares.deleteShare(id)
                }))
            },

            getTotalSize: function () {
                var totalSize = 0;

                _.each(self.sdk.localshares.storage, function (share) {

                    if (share.videos) {

                        for (const videoId in share.videos) {
                            if (share.videos[videoId].size)
                                totalSize += share.videos[videoId].size;
                        }

                    }
                });

                return totalSize;
            },

            write: {
                video: {
                    cordova: function (folder, shareInfo, p) {

                        if (!shareInfo.video) return Promise.resolve()

                        if (!shareInfo.video || !shareInfo.video.original) return Promise.reject('originalinfo')

                        var id = shareInfo.video.original.uuid
                        var videoDetails = shareInfo.video.original

                        if (!p) p = {} //resolutionid, fileDownloadUrl


                        var fileDownloadUrl = _.find(
                            deep(videoDetails, 'streamingPlaylists.0.files') || [],
                            function (file) {
                                return file.resolution.id == p.resolutionId
                            })

                        if (!fileDownloadUrl) return Promise.reject('fileDownloadUrl')

                        var infos = {
                            thumbnail: 'https://' + videoDetails.from + videoDetails.thumbnailPath,
                            videoDetails: videoDetails,
                        }
                        var result = {
                            infos: infos,
                            id: id
                        }

                        var downloadThumbnail = function () {
                            return new Promise((resolve, reject) => {
                                if (!infos || !infos.thumbnail || infos.thumbnail.length <= 0)
                                    return reject();
                                folder.getDirectory('videos', {
                                    create: true
                                }, function (dirEntry3) {
                                    dirEntry3.getDirectory(id, {
                                        create: true
                                    }, function (dirEntry4) {
                                        // Download thumbnail
                                        let thumbnailName = infos.thumbnail.substring(infos.thumbnail.lastIndexOf('/') + 1, infos.thumbnail.length);
                                        dirEntry4.getFile(thumbnailName, {
                                            create: true
                                        }, function (thumbFile) {
                                            var fileTransfer = new FileTransfer();
                                            fileTransfer.download(
                                                'https://' + videoDetails.from + videoDetails.thumbnailPath,
                                                thumbFile.nativeURL,
                                                function (entry) {

                                                    var url = entry.toURL()

                                                    if (isios())
                                                        url = window.WkWebView.convertFilePath(thumbFile.nativeURL)

                                                    // Success
                                                    resolve(url);
                                                },
                                                function (error) {
                                                    reject('download thumbnail error');
                                                },
                                                null, {}
                                            );
                                        }, reject);
                                    }, reject);
                                }, reject);
                            });
                        }

                        return new Promise((resolve, reject) => {

                            // Download video thumbnail
                            downloadThumbnail().then((thumbnailPath) => {
                                infos.thumbnail = thumbnailPath;
                                result.infos.thumbnail = thumbnailPath;
                                infos.videoDetails.previewPath = thumbnailPath;
                            }).finally(() => {

                                // Download video
                                folder.getDirectory('videos', {
                                    create: true
                                }, function (dirEntry3) {

                                    dirEntry3.getDirectory(id, {
                                        create: true
                                    }, function (dirEntry4) {

                                        dirEntry4.getFile('info.json', {
                                            create: true
                                        }, function (infoFile) {
                                            // Write into file
                                            infoFile.createWriter(function (fileWriter) {

                                                fileWriter.write(JSON.stringify(infos));

                                                dirEntry4.getFile(p.resolutionId + '.mp4', {
                                                    create: true
                                                }, function (targetFile) {

                                                    var fileTransfer = new FileTransfer();

                                                    fileTransfer.download(
                                                        fileDownloadUrl.fileDownloadUrl,
                                                        targetFile.nativeURL,
                                                        function (entry) {

                                                            // Success
                                                            // Get file size
                                                            targetFile.file(function (fileDetails) {

                                                                targetFile.internalURL = entry.toURL();

                                                                if (isios())
                                                                    targetFile.internalURL = window.WkWebView.convertFilePath(targetFile.nativeURL)

                                                                result.video = targetFile;
                                                                result.size = fileDetails.size || null;

                                                                //self.sdk.local.shares.add(shareId, shareInfos);

                                                                return resolve(result);

                                                            }, reject);

                                                        },
                                                        function (error) {
                                                            reject(error);
                                                        },
                                                        null, {}
                                                    );

                                                    fileTransfer.onprogress = function (progressEvent) {
                                                        if (progressEvent)
                                                            p.progress('video', 100 * progressEvent.loaded / progressEvent.total);
                                                    }

                                                }, reject);

                                            }, reject);

                                        }, reject);

                                    }, reject)

                                }, reject)

                            });

                        })

                    },

                    electron: async function (folder, shareInfo, p = {}) {
                        if (!shareInfo.video || !shareInfo.video.original) {
                            return Promise.reject('originalinfo')
                        }

                        const id = shareInfo.video.original.uuid;
                        const videoResolution = p.resolutionId;
                        const videoDetails = shareInfo.video.original;


                        var progressInterval = setInterval(async function () {

                            const progress = await self.app.platform.sdk.localshares.videoDlProgress(shareInfo.share.id);

                            if (progress != undefined && progress.progress >= 1) {
                                clearInterval(progressInterval);
                            }

                            if (progress != undefined && !isNaN(progress.progress)) {

                                if (p.progress)
                                    p.progress('video', progress.progress * 100);

                            }
                        }, 500);




                        const videoData = await electron.ipcRenderer
                            .invoke('saveShareVideo', folder, videoDetails, videoResolution);

                        clearInterval(progressInterval);

                        return videoData;
                    },

                    localstorage: function (folder, shareInfo, p = {}) {
                        if (!shareInfo.video) return Promise.resolve()
                        return Promise.reject('todo')
                    }
                },

                image: {

                    cordova: async function (folder, shareInfo, images, p = {}) {

                        if (!folder || !images || images.length <= 0)
                            return Promise.resolve([]);

                        var nbToDo = images.length,
                            nbDone = 0,
                            resImages = images.map((i) => i);

                        return new Promise((resolve, reject) => {

                            var checkDone = function () {

                                nbDone += 1;

                                if (nbDone >= nbToDo)
                                    resolve(resImages);

                            }

                            // Save the base64 strings for the images
                            images.forEach((imageUrl, imageIndex) => {

                                var xhr = new XMLHttpRequest();
                                xhr.onload = function () {
                                    var reader = new FileReader();
                                    reader.onloadend = function () {
                                        resImages[imageIndex] = reader.result;
                                        checkDone();
                                    }
                                    reader.onerror = function (err) {
                                        console.log(err);
                                        checkDone();
                                    }
                                    reader.readAsDataURL(xhr.response);
                                };
                                xhr.open('GET', imageUrl);
                                xhr.responseType = 'blob';
                                xhr.send();

                            });

                        });

                    },

                    electron: async function (folder, shareInfo, images, p = {}) {
                        var imagesData = [];

                        try {
                            imagesData = await electron.ipcRenderer
                                .invoke('saveShareImages', folder, shareInfo.share.share.i);
                        } catch (err) {
                            console.log(err);
                        }

                        return Promise.resolve(imagesData);
                    },

                    localstorage: function () {
                        return Promise.resolve();
                    }
                },

                share: {
                    cordova: function (share) {

                        var storage = self.sdk.localshares.helpers.cordovaStorage()

                        if (!storage) return Promise.reject('storage')

                        return new Promise((resolve, reject) => {

                            // open target file for download
                            window.resolveLocalFileSystemURL(storage, function (dirEntry) {
                                // Create a posts folder
                                dirEntry.getDirectory('posts', {
                                    create: true
                                }, function (dirEntry11) {
                                    dirEntry11.getDirectory(share.id, {
                                        create: true
                                    }, function (dirEntry2) {

                                        // Create JSON file for share informations
                                        dirEntry2.getFile('share.json', {
                                            create: true
                                        }, function (shareFile) {
                                            // Write into file
                                            shareFile.createWriter(function (fileWriter) {
                                                fileWriter.write(JSON.stringify(share));

                                                resolve(dirEntry2)
                                            });
                                        });


                                    }, function (err) {
                                        return reject(err);
                                    });
                                }, function (err) {
                                    return reject(err);
                                });
                            }, function (err) {
                                return reject(err);
                            });

                        })

                    },

                    electron: async function (share) {
                        const shareDir = await electron.ipcRenderer
                            .invoke('saveShareData', share);

                        return shareDir;
                    },

                    // Write share in localstorage
                    localstorage: function (share) {

                        if (localStorage && localStorage.setItem) {

                            share.timestamp = new Date();
                            //delete share.share;

                            localStorage.setItem('saved2_share_' + share.id, JSON.stringify(share));

                            //share.share = share;
                            self.sdk.localshares.addtostorage({
                                id: share.id,
                                share
                            });

                            return Promise.resolve();

                        }

                        return Promise.reject();
                    }
                }
            },

            read: {
                share: {
                    electron: async function (shareId) {
                        let shareData = {};

                        try {
                            shareData = await electron.ipcRenderer
                                .invoke('getShareData', shareId);
                        } catch (e) {
                            console.log(e);
                            return shareData;
                        }

                        return shareData;
                    },

                    cordova: function (to, from) {


                        return new Promise((resolve, reject) => {

                            from.getFile('share.json', {
                                create: false
                            }, function (shareFile) {
                                shareFile.file(function (shareFileDetails) {
                                    // Read info file
                                    var reader = new FileReader();

                                    reader.onloadend = function () {

                                        try {

                                            to.share = JSON.parse(this.result);
                                            resolve()

                                        } catch (err) {
                                            reject(err)
                                        }

                                    };

                                    reader.readAsText(shareFileDetails);
                                });
                            });

                        })

                    },

                    // Read shares in localstorage
                    localstorage: function (shareId) {

                        var share;

                        if (localStorage && localStorage.getItem) {
                            let shareStr = localStorage.getItem('saved2_share_' + shareId);
                            if (shareStr) {
                                try {
                                    share = JSON.parse(shareStr);
                                    // share.user = { adr: share.address };
                                } catch (err) {}
                            }
                        }



                        return share;
                    }
                },

                video: {
                    cordova: function (to, from) {


                        return new Promise((resolve, reject) => {

                            from.getDirectory('videos', {
                                create: true
                            }, function (videosFolder) {


                                to.videos = {};

                                var videosReader = videosFolder.createReader();

                                videosReader.readEntries(function (videoFolders) {

                                    lazyEach({
                                        array: videoFolders,
                                        action: function (p) {
                                            var videoFolder = p.item;

                                            if (videoFolder.isDirectory) {
                                                to.videos[videoFolder.name] = {};
                                                to.videos[videoFolder.name].id = videoFolder.name

                                                videoFolder.createReader().readEntries(function (files) {
                                                    var videoFile, infoFile;

                                                    lazyEach({
                                                        array: files,
                                                        action: function (_p) {
                                                            var file = _p.item;


                                                            if (file.isFile && file.file) {

                                                                file.file(function (fileDetails) {


                                                                    if (file.name == 'info.json') {

                                                                        infoFile = file;


                                                                        var reader = new FileReader();

                                                                        reader.onloadend = function () {


                                                                            try {
                                                                                to.videos[videoFolder.name].infos = JSON.parse(this.result);

                                                                            } catch (err) {

                                                                                console.error('fileDetails error', err)

                                                                            }

                                                                            _p.success()
                                                                        };

                                                                        reader.readAsText(fileDetails);

                                                                        return
                                                                    }


                                                                    if (!videoFile && (!fileDetails.type || fileDetails.type == 'video/mp4')) {

                                                                        videoFile = file;


                                                                        if (fileDetails.size)
                                                                            to.videos[videoFolder.name].size = fileDetails.size;
                                                                        // Resolve internal URL

                                                                        window.resolveLocalFileSystemURL(videoFile.nativeURL, function (entry) {

                                                                            try {
                                                                                videoFile.internalURL = entry.toInternalURL()

                                                                                if (isios())
                                                                                    videoFile.internalURL = window.WkWebView.convertFilePath(videoFile.nativeURL)

                                                                                to.videos[videoFolder.name].video = videoFile;

                                                                            } catch (e) {
                                                                                console.error(e)
                                                                            }



                                                                            _p.success()
                                                                        });

                                                                        return
                                                                    }




                                                                    _p.success()
                                                                });
                                                            } else {
                                                                _p.success()
                                                            }
                                                        },

                                                        all: {
                                                            success: function () {
                                                                p.success()
                                                            }
                                                        }
                                                    })

                                                });

                                            } else {
                                                p.success()
                                            }
                                        },

                                        all: {
                                            success: function () {
                                                resolve()
                                            }
                                        }
                                    })

                                });
                            });
                        })
                    },

                    electron: async function (videoId, shareId) {

                        const videosDataList = {};

                        const videoData = await electron.ipcRenderer
                            .invoke('getVideoData', shareId, videoId);


                        if (videoData)
                            videosDataList[videoId] = videoData;

                        return videosDataList;
                    },

                    localstorage: function (to, from) {
                        return Promise.reject('todo')
                    }
                }
            },

            get: {
                electron: async function (shareId) {
                    const shareDataList = {
                        id: shareId
                    };


                    shareDataList.share = await self.sdk.localshares.read.share.electron(shareId);

                    var u = shareDataList.share.share.u.split(/(\%2F|\/)/g)

                    const videoId = u[u.length - 1]


                    if (videoId)
                        shareDataList.videos = await self.sdk.localshares.read.video.electron(videoId, shareId);


                    return shareDataList;
                },

                cordova: function (shareFolder) {

                    return new Promise((resolve, reject) => {

                        if (shareFolder.isDirectory) {
                            var share = {
                                id: shareFolder.name
                            }

                            self.sdk.localshares.read.share.cordova(share, shareFolder).then(r => {

                                return self.sdk.localshares.read.video.cordova(share, shareFolder)

                            }).then(r => {

                                resolve(share)

                            }).catch(er => {
                                reject(er)
                            })

                        } else {
                            resolve(null)
                            //reject('isDirectory')
                        }

                    })


                },

                // Get a share from localstorage
                localstorage: async function (shareId) {

                    var share = await self.sdk.localshares.read.share.localstorage(shareId);

                    return {
                        id: shareId,
                        share: share
                    };
                }
            },

            getall: {
                electron: async function () {
                    const shareLists = await electron.ipcRenderer
                        .invoke('getShareList');

                    const shareList = shareLists.savedShares;
                    const pausedShareList = shareLists.pausedShares;

                    const shareDataList = {};

                    for (const shareIndex in shareList) {
                        const shareId = shareList[shareIndex];

                        try {
                            shareDataList[shareId] = await self.sdk.localshares.get.electron(shareId);
                        } catch (e) {

                        }


                    }

                    for (const shareIndex in pausedShareList) {
                        self.sdk.localshares.paused[pausedShareList[shareIndex].shareId] = pausedShareList[shareIndex].resolutionId;
                    }

                    return shareDataList;
                },

                cordova: function () {

                    var v = {};

                    var storage = self.sdk.localshares.helpers.cordovaStorage()

                    if (!storage) return Promise.reject('storage')

                    return new Promise((resolve, reject) => {
                        // open target file for download
                        window.resolveLocalFileSystemURL(storage, function (dirEntry) {
                            // Create a downloads folder
                            dirEntry.getDirectory('posts', {
                                create: true
                            }, function (dirEntry2) {

                                var shareReader = dirEntry2.createReader();

                                shareReader.readEntries(function (shares) {


                                    Promise.all(_.map(shares, function (shareFolder) {

                                        return self.sdk.localshares.get.cordova(shareFolder).then(r => {

                                            if (r)
                                                v[shareFolder.name] = r

                                            return Promise.resolve()

                                        }).catch(err => {

                                            return Promise.resolve()

                                        })

                                    })).then(r => {

                                        resolve(v)

                                    }).catch(err => {
                                        reject(err)
                                    })

                                });
                            });
                        });
                    })


                },

                localstorage: async function () {

                    var shares = {};

                    for (i in localStorage) {

                        var matches = /^saved2_share_([a-zA-Z\d]+)$/.exec(i);

                        if (matches && matches.length >= 2) {

                            try {
                                let share = await self.sdk.localshares.get.localstorage(matches[1]);

                                shares[share.id] = share;
                            } catch (err) {
                                console.error(err)
                            }

                        }
                    }

                    return Promise.resolve(shares);
                }
            },

            helpers: {
                cordovaStorage: function () {

                    if (!window.cordova.file) return null

                    //return 'file:///storage/emulated/0/'

                    //return window.cordova.file.externalApplicationStorageDirectory

                    return (window.cordova.file.externalDataDirectory) ? window.cordova.file.externalDataDirectory : window.cordova.file.dataDirectory;
                }
            },

            delete: {
                localstorage: function (shareId) {
                    self.sdk.localshares.clearfromstorage(shareId)
                    if (localStorage && localStorage.removeItem)
                        localStorage.removeItem('saved2_share_' + shareId);

                    return Promise.resolve();
                },
                cordova: function (shareId) {
                    var storage = self.sdk.localshares.helpers.cordovaStorage()

                    if (!storage) return Promise.reject('storage')

                    return new Promise((resolve, reject) => {
                        window.resolveLocalFileSystemURL(storage, function (dirEntry) {
                            // Create a downloads folder
                            dirEntry.getDirectory('posts', {
                                create: true
                            }, function (dirEntry2) {
                                dirEntry2.getDirectory(shareId, {
                                    create: false
                                }, function (dirToDelete) {
                                    dirToDelete.removeRecursively(function () {
                                        // Success

                                        self.sdk.localshares.clearfromstorage(shareId)

                                        resolve()

                                    }, reject);
                                }, reject);
                            }, reject);
                        }, reject);
                    })

                },
                electron: function (shareId) {
                    self.sdk.localshares.clearfromstorage(shareId);

                    return electron.ipcRenderer.invoke('deleteShareWithVideo', shareId);
                }
            }


        },

        registrations: {
            storage: {},
            clbks: {},

            mappings: {
                loggingMapping: {
                    1: 'USER_ADDRESS_GENERATED',
                    2: 'USER_FILLED_ACCOUNT_INFO',
                    3: 'COINS_REQUEST_SENT',
                    4: 'COINS_REQUEST_COMPLETED',
                    5: 'ACCOUNT_CREATING_TRANSACTION_SUCCESS',
                    6: 'ACCOUNT_SUCCESSFULLY_CREATED',
                },
            },

            redirect: null,

            getredirectFromCurrentPage: function () {
                self.sdk.registrations.redirect = self.app.nav.get.pathnameSearch()

            },

            remove: function (address) {

                address || (address = self.app.user.address.value)

                if (address) {

                    var ex = self.sdk.registrations.storage[address];

                    delete self.sdk.registrations.storage[address];

                    if (ex) {

                        self.sdk.registrations.save()

                        _.each(this.clbks, function (c) {
                            c(address)
                        })
                    }

                }


            },

            add: function (address, value) {

                self.app.Logger.info({
                    actionId: 'USER_REGISTRATION_PROCESS',
                    actionSubType: self.sdk.registrations.mappings.loggingMapping[value] || value,
                    actionValue: bitcoin.crypto.sha256(Buffer.from(address, 'utf8')).toString('hex'),
                });

                self.sdk.registrations.storage[address] = value || true;
                self.sdk.registrations.save()

                _.each(this.clbks, function (c) {
                    c(address)
                })
            },

            value: function (address) {
                var regs = self.sdk.registrations.storage[address];
                var rm = self.sdk.registrations.storage[address + 'rm']

                if (rm) return 0

                return regs
            },

            showprivate: function (address) {
                address || (address = self.app.user.address.value)

                var regs = self.sdk.registrations.storage[address];

                return (!self.sdk.registrations.storage[address + 'rm'] && regs > 2 /*&& regs <= 5*/ )

            },

            donotshowprivate: function (address) {
                address || (address = self.app.user.address.value)

                self.sdk.registrations.storage[address + 'rm'] = true;
                self.sdk.registrations.save()

                _.each(this.clbks, function (c) {
                    c(address)
                })

                try {
                    localStorage['needshowkey_' + self.app.user.address.value] = false
                } catch (e) {

                }
            },

            load: function () {
                var storage = {};

                var local = "{}"

                try {
                    local = localStorage['registrations'] || "{}";
                } catch (e) {

                }

                if (local) {
                    try {
                        storage = JSON.parse(local)
                    } catch (e) {}
                }

                self.sdk.registrations.storage = storage;
            },
            save: function () {

                try {
                    localStorage['registrations'] = JSON.stringify(self.sdk.registrations.storage || {});
                } catch (e) {

                }

            }
        },

        ////TODO_REF_ACTIONS getRelTmpSubscriptions

        articles: {

            storage: [],

            findlastdraft: function () {

                return _.find(self.sdk.articles.storage, function (s) {
                    return s.version >= 2 && !s.txid
                })

            },

            getbyid: function (id) {
                return _.find(self.sdk.articles.storage, function (s) {
                    return s.id == id
                })
            },

            deletebyid: function (id) {
                self.sdk.articles.storage = _.filter(self.sdk.articles.storage, function (s) {
                    return s.id != id
                })

                self.sdk.articles.save()
            },

            getlist: function () {
                return _.filter(self.sdk.articles.storage, function (s) {
                    return s.version >= 2
                })
            },

            itisdraft(art) {

                if (art.editing) return false

                if (

                    art.caption.value &&
                    art.content && art.content.blocks && art.content.blocks.length

                ) return true
            },

            fromshare: function (share) {

                var edjs = new edjsHTML(null, app)


                var empty = self.sdk.articles.empty(null, 2)


                empty.visibility = (share.settings.f || 0) + ''
                empty.caption.value = share.caption.v
                empty.content = edjs.apply(JSON.parse(JSON.stringify(share.message.v)), articleDecode)
                empty.tags = _.clone(share.tags.v)
                empty.language = share.language.v
                empty.time = share.time
                empty.cover = deep(share, 'images.v.0')
                empty.editing = share.aliasid
                empty.shash = share.shash()

                return empty
            },

            empty: function (id, version) {
                return {

                    id: id || makeid(),

                    caption: {
                        value: ''
                    },

                    images: [],
                    content: null,
                    tags: [],
                    u: '',
                    version: version || 1,
                    time: null,
                    cover: '',
                    visibility: 0,

                    language: self.app.localization.key
                }
            },

            copy: function (art) {
                var _art = this.empty();

                _art.id = art.id;
                _art.u = art.u;
                _art.caption.value = art.caption.value;

                _art.images = _.clone(art.images);

                _.each(art.content, function (c, i) {
                    _art.content[i] = _.clone(c);
                })

                return _art;
            },

            getImages: function (cnt) {
                var h = $('<div>')

                h.html(cnt)

                var img = h.find('.medium-insert-images img');

                var _img = [];

                $.each(img, function () {

                    var src = $(this).attr('src');

                    if (src && src.length < 1000) {
                        _img.push(src)
                    }

                })

                return _img
            },

            getVideos: function (cnt) {
                var h = $('<div>')

                h.html(cnt)

                var videos = h.find('.js-player');

                var _videos = [];

                $.each(videos, function () {

                    var v = {
                        type: $(this).attr('data-plyr-provider'),
                        id: $(this).attr('data-plyr-embed-id')
                    }

                    if (v.type && v.id) {

                        _videos.push(v)

                    }

                })

                return _videos
            },

            lightVideo: function (content) {

                _.each(content, function (c, i) {
                    var html = c.value

                    var h = $('<div>')

                    h.html(html)

                    var v = h.find('.plyrvideo')

                    $.each(v, function () {

                        var cnt = $(this);

                        cnt.html('<div class="js-player" data-plyr-provider="' + cnt.attr('provider') + '" data-plyr-embed-id="' + cnt.attr('eid') + '"></div>')

                    })

                    c.value = h.html()
                })

                return content
            },

            echo: function (art) {
                var h = _.reduce(art.content || {}, function (m, el) {

                    return m + el.value

                }, '')

                return h
            },

            save: function () {


                try {
                    localStorage[self.app.user.address.value + 'articles'] = JSON.stringify(self.sdk.articles.storage || []);
                } catch (e) {
                    console.log("e", e)
                }


            },

            load: function () {

                var articles = {};

                var local = "[]"

                try {
                    local = localStorage[self.app.user.address.value + 'articles'] || "[]";
                } catch (e) {

                }


                if (local) {
                    try {
                        articles = JSON.parse(local)
                    } catch (e) {}
                }

                return articles;

            },

            init: function (clbk) {
                var articles = self.sdk.articles.load();

                self.sdk.articles.storage = articles;

                if (clbk)
                    clbk()
            },


            share: function (art) {

                var edjs = new edjsHTML(null, app)

                var artcontent = edjs.apply(art.content, articleEncode)

                var share = new Share(art.language || self.app.localization.key, self.app);

                share.tags.set(_.clone(art.tags))
                share.caption.set(art.caption.value)
                share.message.set({
                    blocks: artcontent.blocks,
                    version: artcontent.version
                })

                share.settings.v = 'a'
                share.settings.version = art.version
                share.settings.f = (art.visibility || 0) + ''

                share.images.set([art.cover])

                share.address = deep(app, 'user.address.value')

                if (art.editing) {
                    share.aliasid = art.editing
                }

                return share
            },

            uploadresource: {
                image: function (e) {

                    if (!deep(e, 'data.file.url')) {
                        return Promise.resolve()
                    }

                    return self.app.imageUploader.upload({
                        base64: e.data.file.url
                    }).then(url => {
                        e.data.file.url = url
                        return Promise.resolve()
                    })

                },
                carousel: function (e) {

                    return Promise.all(_.map(e.data, (d => {
                        return self.app.imageUploader.upload({
                            base64: d.url
                        }).then(url => {
                            d.url = url

                            return Promise.resolve()
                        })
                    })))
                },

                content: function (content) {
                    var tps = self.sdk.articles.uploadresource

                    var promises = _.map(content.blocks, function (e) {

                        if (tps[e.type]) {
                            return tps[e.type](e)
                        }

                        return Promise.resolve()

                    })

                    return Promise.all(promises)
                },

                art: function (art) {
                    if (!art.cover) {
                        return Promise.resolve()
                    }

                    return self.app.imageUploader.upload({
                        base64: art.cover
                    }).then(r => {
                        art.cover = r

                        return Promise.resolve()
                    })
                },


            },

            uploadresources: function (art) {

                return self.sdk.articles.uploadresource.art(art).then(r => {
                    return self.sdk.articles.uploadresource.content(art.content)
                })

            }
        },

        sharesObserver: {
            storage: {
                viewed: {}
            },

            newmaterials: function (counts) {

                if (!self.sdk.sharesObserver.storage.viewed) self.sdk.sharesObserver.storage.viewed = {}
                if (!self.sdk.sharesObserver.storage.viewed[app.user.address.value]) self.sdk.sharesObserver.storage.viewed[app.user.address.value] = {}

                _.each(counts, (c, i) => {
                    if (self.sdk.sharesObserver.storage.viewed[app.user.address.value][i]) {
                        self.sdk.sharesObserver.storage.viewed[app.user.address.value][i].new = (self.sdk.sharesObserver.storage.viewed[app.user.address.value][i].new || 0) + c
                    }
                })

                self.sdk.sharesObserver.save()
            },

            hasnewkeys: function (keys) {
                return _.reduce(keys, (m, key) => {
                    return m && self.sdk.sharesObserver.hasnew(key)
                }, true)
            },

            hasnew: function (key) {

                if (!self.sdk.sharesObserver.storage.viewed) self.sdk.sharesObserver.storage.viewed = {}
                if (!self.sdk.sharesObserver.storage.viewed[app.user.address.value]) self.sdk.sharesObserver.storage.viewed[app.user.address.value] = {}

                if (!self.sdk.sharesObserver.storage.viewed[app.user.address.value][key]) return true

                var block = self.currentBlock || (self.app.api.getCurrentBlock ? self.app.api.getCurrentBlock() : 0)

                if (block) {

                    if (block >= (self.sdk.sharesObserver.storage.viewed[app.user.address.value][key].block || 0) + 30) {

                        return true
                    }

                    if (block > (self.sdk.sharesObserver.storage.viewed[app.user.address.value][key].block || 0)) {

                        return self.sdk.sharesObserver.storage.viewed[app.user.address.value][key].new > 0
                    }
                }
            },

            view: function (key, first, last) {

                if (key == 'saved') return

                if (!self.sdk.sharesObserver.storage.viewed) self.sdk.sharesObserver.storage.viewed = {}
                if (!self.sdk.sharesObserver.storage.viewed[app.user.address.value])
                    self.sdk.sharesObserver.storage.viewed[app.user.address.value] = {}

                if (!self.sdk.sharesObserver.storage.viewed[app.user.address.value][key]) self.sdk.sharesObserver.storage.viewed[app.user.address.value][key] = {}

                if (!self.sdk.sharesObserver.storage.viewed[app.user.address.value][key].first || self.sdk.sharesObserver.storage.viewed[app.user.address.value][key].first <= first) {

                    self.sdk.sharesObserver.storage.viewed[app.user.address.value][key].first = first
                    self.sdk.sharesObserver.storage.viewed[app.user.address.value][key].new = 0

                }

                if (!self.sdk.sharesObserver.storage.viewed[app.user.address.value][key].last || self.sdk.sharesObserver.storage.viewed[app.user.address.value][key].last > last)
                    self.sdk.sharesObserver.storage.viewed[app.user.address.value][key].last = last

                self.sdk.sharesObserver.storage.viewed[app.user.address.value][key].time = new Date()
                self.sdk.sharesObserver.storage.viewed[app.user.address.value][key].block = self.currentBlock || (self.app.api.getCurrentBlock ? self.app.api.getCurrentBlock() : 0)


                self.sdk.sharesObserver.save()

            },

            key: function () {
                return 'observer_' + (window.testpocketnet ? 'test' : 'production')
            },

            save: function () {

                try {
                    localStorage[self.sdk.sharesObserver.key()] = JSON.stringify(self.sdk.sharesObserver.storage.viewed || {})
                } catch (e) {
                    console.error('observer', e)
                }

            },

            init: function (clbk) {
                self.app.user.isState(function (state) {
                    if (state) {
                        self.sdk.sharesObserver.load(clbk)
                        app.platform.sdk.syncStorage.on('change', self.sdk.sharesObserver.key(), () => {
                            self.sdk.sharesObserver.load()
                        });
                    } else {
                        if (clbk) clbk()
                    }
                })
            },

            destroy: function () {
                self.sdk.sharesObserver.storage.viewed = {}

                app.platform.sdk.syncStorage.off('change', self.sdk.sharesObserver.key());

            },

            load: function (clbk) {

                try {
                    self.sdk.sharesObserver.storage.viewed = JSON.parse(localStorage[self.sdk.sharesObserver.key()] || "{}") || {}
                } catch (e) {
                    self.sdk.sharesObserver.storage.viewed = {}
                }

                if (clbk) clbk()
            },
        },

        lentaMethod: {
            all: {
                hierarchical: 'hierarchical',
                historical: 'historical'
            },
            default: "hierarchical",
            current: null,

            save: function () {

                var c = self.sdk.lentaMethod.current

                try {
                    localStorage['lentaMethod'] = c;
                } catch (e) {

                }


            },

            load: function (clbk) {

                var t = self.sdk.lentaMethod

                t.current = t.default;

                try {
                    t.current = localStorage['lentaMethod'] || t.default;
                } catch (e) {

                }



                t.set()

                if (clbk) clbk()
            },

            get: function () {
                var t = self.sdk.lentaMethod;

                return t.all[t.current];
            },

            set: function (value) {

                var t = self.sdk.lentaMethod

                if (!value) {
                    value = t.current || t.default
                }

                if (value && t.all[value]) {



                    t.current = value;

                    _.each(self.sdk.categories.clbks.selected, function (f) {
                        f()
                    })



                    t.save()

                }

            }
        },

        theme: {
            all: {
                white: {
                    name: self.app.localization.e('e13266'), ////ch
                    class: "stwhite",
                    color: "#ffffff",
                    media: '(prefers-color-scheme: light)',
                    rootid: ''
                },

                black: {
                    name: self.app.localization.e('e13267'),
                    class: "stblack",
                    color: "#1e2235",
                    media: '(prefers-color-scheme: dark)',
                    rootid: 'black'
                },

                gray: {
                    name: self.app.localization.e('gray'),
                    class: "stgray",
                    color: "#1e1d1a",
                    media: '(prefers-color-scheme: dark)',
                    rootid: 'gray'
                },
            },
            default: "white",
            current: null,

            currentStyles: {},

            save: function () {

                var c = self.sdk.theme.current


                try {
                    localStorage['usertheme'] = c;
                } catch (e) {

                }

            },

            load: function (clbk) {

                var t = self.sdk.theme

                t.current = t.default;

                try {
                    t.current = localStorage['usertheme'] || t.default;
                } catch (e) {

                }

                t.set()

                if (clbk) clbk()

                self.sdk.syncStorage.on('change', 'usertheme', (e) => {

                    try {
                        t.current = localStorage.usertheme;
                    } catch (e) {

                    }

                    t.set();
                });
            },

            setstyles: function () {
                var root = document.querySelector(':root');

                var rootStyles = getComputedStyle(root);

                self.sdk.theme.currentStyles = rootStyles

            },

            getstyle: function (v) {

                if (self.sdk.theme.currentStyles) {
                    return self.sdk.theme.currentStyles.getPropertyValue(v)
                }

                return ''

            },

            set: function (value) {

                var t = self.sdk.theme
                var h = $('html')

                if (!value) {
                    value = t.current || t.default
                }

                if (value && t.all[value]) {
                    /*_.each(t.all, function (c) {
                        h.removeClass(c.class)
                    })

                    h.addClass(t.all[value].class)*/

                    t.current = value

                    self.matrixchat.changeTheme()

                    self.app.mobile.keyboard.style()

                    t.save()

                    var cm = deep(app, 'modules.menu.module.restart')

                    if (cm) cm()

                    if (document.documentElement.hasAttribute('theme')) {
                        document.documentElement.removeAttribute('theme');
                    }

                    document.documentElement.setAttribute('theme', t.all[value].rootid);

                    self.sdk.theme.setstyles()

                    $('meta[name="theme-color"]').attr('content', t.all[value].color)
                    $('meta[name="msapplication-navbutton-color"]').attr('content', t.all[value].color)
                    $('meta[name="apple-mobile-web-app-status-bar-style"]').attr('content', t.all[value].color)

                    if (self.app.apps)
                        self.app.apps.emit('theme', t.all[value])
                }

                app.mobile.statusbar.background()



            }
        },

        uiScale: {
            all: {
                small: {
                    name: self.app.localization.e('uiSmallSetting'),
                    scale: 75
                },
                normal: {
                    name: self.app.localization.e('uiNormalSetting'),
                    scale: 100
                },
                large: {
                    name: self.app.localization.e('uiLargeSetting'),
                    scale: 125
                },
                extraLarge: {
                    name: self.app.localization.e('uiXLargeSetting'),
                    scale: 150
                }
            },
            default: 'normal',
            current: null,

            save: function () {
                localStorage['uiscale'] = self.sdk.uiScale.current;
            },

            load: function (clbk) {
                const param = self.sdk.uiScale;

                param.current = localStorage['uiscale'] || self.sdk.uiScale.default;

                param.set();

                if (clbk) {
                    clbk();
                }
            },

            set: function (value) {
                const param = self.sdk.uiScale;

                if (!value) {
                    value = param.current || param.default;
                }

                const selectedValue = param.all[value];

                if (selectedValue) {
                    if (typeof _Electron === 'undefined') {
                        return;
                    }

                    const {
                        webFrame
                    } = require('electron');

                    webFrame.setZoomFactor(selectedValue.scale / 100);

                    param.current = value;

                    param.save();
                }
            },

            listenScalingEvents: function () {
                const zoomArrList = self.app.platform.sdk.uiScale.all;
                const zoomKeys = Object.keys(zoomArrList);

                let wheelLock = false;

                function scaleUi(e, isScroll, calcDelta) {
                    const mainKeyDown = e.metaKey || e.ctrlKey;

                    if (!mainKeyDown) {
                        if (isScroll && wheelLock) {
                            $('html').removeClass('scroll-lock');
                            wheelLock = false;
                        }

                        return;
                    }

                    const zoomDelta = calcDelta(e, mainKeyDown);

                    if (zoomDelta === 0) {
                        return;
                    }

                    const currentZoom = self.app.platform.sdk.uiScale.current;
                    const zoomCurrentIndex = zoomKeys.findIndex(zoom => (zoom === currentZoom));
                    const zoomNewIndex = zoomCurrentIndex + zoomDelta;
                    const zoomNewName = zoomKeys[zoomNewIndex];

                    self.app.platform.sdk.uiScale.set(zoomNewName);
                }

                self.app.el.window.on('keydown', (e) => scaleUi(e, false, ({
                    keyCode
                }) => {
                    /**
                     * Minus - 189
                     * Minus Numpad - 109
                     *
                     * Plus - 187
                     * Plus Numpad - 107
                     */
                    switch (keyCode) {
                        case 189:
                        case 109:
                            return -1;
                        case 187:
                        case 107:
                            return +1;
                    }

                    return 0;
                }));

                self.app.el.window.on('wheel', (e) => scaleUi(e, true, (e) => {
                    if (!wheelLock) {
                        $('html').addClass('scroll-lock');
                        wheelLock = true;
                    }

                    if (e.originalEvent.deltaY < 0) {
                        return +1;
                    } else {
                        return -1;
                    }
                }));
            },
        },

        accountsettings: {
            storage: {}
        },

        usersettings: {

            meta: self.__getSettingsMeta(),

            //self.canuseip

            create: function (id) {
                var m = self.sdk.usersettings.meta;

                var p = new Parameter(m[id])

                return p;
            },

            createall: function () {

                var create = self.sdk.usersettings.create;
                var m = self.sdk.usersettings.meta;

                var options = {};

                _.each(m, function (p, id) {

                    options[id] = create(id)
                })

                return options
            },

            compose: function (make) {

                var s = self.sdk.usersettings;

                var options = s.createall()

                var m = s.meta;

                var c = {

                    posts: {
                        class: 'posts',
                        name: self.app.localization.e('posts'),
                        options: {

                            preview: options.preview,
                            commentsOrder: options.commentsOrder

                        }
                    },


                    notifications: {
                        class: 'notifications',
                        name: self.app.localization.e('notifications'),
                        options: {

                            sound: options.sound,
                            win: options.win,
                            transactions: options.transactions,
                            upvotes: options.upvotes,
                            downvotes: options.downvotes,
                            comments: options.comments,
                            answers: options.answers,
                            followers: options.followers,
                            //rescued: options.rescued,
                            commentScore: options.commentScore

                        }
                    },


                    video: {
                        name: self.app.localization.e('video'),
                        options: {
                            embedvideo: options.embedvideo,
                            videoautoplay2: options.videoautoplay2,
                            videop2p: options.videop2p
                        }
                    },


                    stats: {
                        name: self.app.localization.e('captionUserStats'),
                        options: {
                            sendUserStatistics: options.sendUserStatistics,
                        }
                    },

                    

                    system: {
                        name: self.app.localization.e('system'),
                        options: {}
                    }
                }

                if (app.pkoindisable) {
                    delete c.notifications.options.win
                    delete c.notifications.options.transactions
                }


                if (!self.released.vidgets.staking) {
                    delete c.vidgets.options.vidgetstaking
                }


                if(self.app.mobileview){
                    c.interface = {
                        name: self.app.localization.e('interface'),
                        options: {
                            interfacemobilelayoutmenu: options.interfacemobilelayoutmenu,
                        }
                    }
                }

                c.system.options.useanimations = options.useanimations

                if (electron) {
                    c.system.options.autostart = options.autostart
                    c.video.options.videoTranscoding = options.videoTranscoding;
                } else {
                    if (!window.cordova) {
                        c.system.options.openlinksinelectron = options.openlinksinelectron
                    }
                }

                if (self.app.canuseip()) {
                    c.system.options.canuseip = options.canuseip
                }

                _.each(options, function (o, i) {
                    o.onChange = function (v) {

                        if (m[i].type === "BOOLEAN") {

                            m[i].value = boolnum(v);

                        }

                        if (m[i].type === "STRINGANY") {

                            m[i].value = v;

                        }

                        if (m[i].type === "VALUES") {

                            if (m[i].tgto) {

                                const idx = m[i].possibleValues.indexOf(String(v));
                                m[i].value = m[i].possibleValuesLabels[idx];
                                m[i].valueId = Number(v);

                            } else {

                                m[i].value = v;

                            }


                        }

                        s.save();


                        if (electron && i == 'autostart') {

                            electron.ipcRenderer.send('electron-autoLaunchManage', {
                                enable: m[i].value
                            });

                        }

                        if (i == 'canuseip') {
                            app.peertubeHandler.clear()
                        }


                        if (window.cordova) {

                            if (i == 'win' || i == 'transactions' || i == 'upvotes' || i == 'comments' || i == 'answers' || i == 'followers' || i == 'rescued') {


                                /*if (m[i].value) {
                                    self.firebase.api.subscribe(i)
                                }
                                else {
                                    self.firebase.api.unsubscribe(i)
                                }*/

                            }
                        }

                        if(i == 'interfacemobilelayoutmenu'){
                            if (self.app.modules.bnavigation)
                                self.app.modules.bnavigation.module.restart()

                            if (self.app.modules.menu)
                                self.app.modules.menu.module.restart()
                        }
                    }
                })

                return {
                    c: c,
                    o: options
                }

            },

            save: function () {

                var values = {};

                var meta = self.sdk.usersettings.meta;

                _.each(meta, function (o, i) {

                    if (o.type === "VALUES") {



                        values[i] = {};
                        values[i].possibleValues = o.possibleValues && o.possibleValues.map(i => String(i));
                        values[i].possibleValuesLabels = o.possibleValuesLabels;
                        values[i].value = o.value;



                    } else {

                        values[i] = o;
                    }

                })

                try {
                    localStorage['usersettings'] = JSON.stringify(values);
                } catch (e) {

                }


                self?.firebase?.settings()
            },

            load: function () {

                var values = {};

                var local = null

                try {
                    local = localStorage['usersettings'];
                } catch (e) {

                }

                if (local) {
                    try {
                        values = JSON.parse(local)
                    } catch (e) {

                    }
                }

                return values;

            },

            init: function (clbk) {

                var values = self.sdk.usersettings.load();
                var m = self.sdk.usersettings.meta = self.__getSettingsMeta();

                if (self.app.user.address.value && self.istest()) {

                    self.app.user.features.telegram = 1;

                } else {

                    self.app.user.features.telegram = 0;

                }

                _.each(values, function (v, i) {

                    if (!m[i]) return

                    if (typeof v === "object") {

                        if (m && m[i]) {



                            m[i].value = v.value;

                            if (!(m[i].possibleValues && m[i].possibleValues.length)) {

                                m[i].possibleValues = v.possibleValues && v.possibleValues.map(function (i) {
                                    return String(i);
                                })
                                m[i].possibleValuesLabels = v.possibleValuesLabels;

                            }


                        }


                    } else {
                        m[i].value = v;

                    }



                })

                if (electron) {

                    if (m.autostart.value === undefined) {
                        m.autostart.value = true;

                        electron.ipcRenderer.send('electron-autoLaunchManage', {
                            enable: m.autostart.value
                        });

                        self.sdk.usersettings.save();
                    }

                    self.ipcbridge.request('autoLaunchIsEnabled', {}).then(r => {

                        m.autostart.value = r

                        if (clbk) {
                            clbk()
                        }
                    })
                } else {
                    if (clbk) {
                        clbk()
                    }
                }
            }
        },

        keys: {
            clbks: {

            },


            haskeys: function () {
                self.sdk.keys.need().then(r => {
                    return Promise.reject('empty')
                }).catch(err => {

                    if (err == 'exist') {
                        return Promise.resolve()
                    }

                    return Promise.reject(err)

                })
            },

            error: function (text) {
                new dialog({
                    html: app.meta.fullname + " chat ask you to generate encryption keys. But some error with your profile update was occuried:<br><b>" + text + "</b>",
                    btn1text: 'Edit profile',
                    class: 'one',
                    success: function () {

                        self.app.nav.api.load({
                            open: true,
                            href: 'userpage?id=test&opeanimage=true',
                            history: true
                        })

                    }
                })
            },

            init: function () {
                return Promise.resolve()

            },
            need: function () {

                return new Promise((resolve, reject) => {
                    self.app.user.isState(function (state) {

                        if (state) {

                            var processing = false

                            if (processing) {
                                return reject('processing')
                            }

                            var me = self.psdk.userInfo.getmy()

                            if (!me || _.isEmpty(me)) {
                                return reject('me')
                            }

                            if (me.temp || me.relay || me.fromstorage) {
                                return reject('temprelaystorage')
                            }

                            if (me.keys && me.keys.length) {
                                return reject('exist')
                            }

                            return resolve(me)
                        } else {
                            reject('state')
                        }

                    })
                })
            }
        },

        user: {

            storage: {},

            isjury: function (address) {

                if (!address) address = self.app.user.address.value

                return self.sdk.user.type(address) == 'moderator'

            },

            type: function (address) {

                var info = self.psdk.userInfo.getShortForm(address)

                if (info.dev) return 'dev'
                if (info.real) return 'real'

                var ustate = self.psdk.userState.get(address) || self.psdk.userInfo.get(address)

                if (ustate) {
                    if (ustate.badges && ustate.badges.indexOf('moderator') > -1) return 'moderator'
                    if (ustate.badges && ustate.badges.indexOf('shark') > -1) return 'shark'
                }

                return ''

            },

            stateAction: function (clbk, messages) {
                app.user.isState(function (state) {

                    if (state) {
                        clbk()
                    } else {

                        if (_OpenApi) {

                            var phref = 'https://' + app.options.url + '/post?openapi=true&s=' + txid

                            if (app.ref) {
                                phref += '&ref=' + app.ref
                            }

                            window.open(phref, '_blank');

                            return
                        }

                        var openreg = function () {
                            app.nav.api.load({
                                open: true,
                                id: 'registration',
                                inWnd: true,

                                essenseData: {

                                    successHref: '_this',
                                    signInClbk: function () {

                                        if (app.platform.sdk.user.myaccauntdeleted()) {
                                            return
                                        }

                                        if (clbk)
                                            clbk()

                                    }
                                }
                            })
                        }

                        if (!messages) {
                            openreg()
                        } else {
                            new dialog({
                                html: self.app.localization.e(messages.text || 'stateactionDefault'),
                                btn1text: self.app.localization.e(messages.success || 'rcontinue'),
                                btn2text: self.app.localization.e(messages.cancel || 'dcancel'),

                                class: 'zindex accepting accepting2',

                                success: function () {
                                    openreg()
                                },

                                fail: function () {}
                            })
                        }


                    }

                })
            },

            meUpdate: function (clbk) {
                self.sdk.user.get(clbk, true)
            },

            loadRelation: function (address, key, reload) {

                if (!self.psdk[key]) return Promise.resolve([])

                return self.psdk[key].load(address, reload).then(r => {
                    return r
                })

            },

            get: function (clbk, update) {

                self.sdk.users.getone(app.user.address.value, (user, error) => {

                    var userInfo = self.psdk.userInfo.getmyoriginal()

                    if (userInfo) {

                        if (userInfo.subscribers_count + userInfo.subscribes_count + userInfo.blockings_count < 2000) {
                            self.sdk.user.getfullfb(clbk, update)
                        } else {
                            userInfo.loadRelations(['subscribes', 'blocking'], self.sdk.user.loadRelation, update).then(() => {
                                if (clbk) clbk(userInfo)
                            }).catch(e => {
                                console.error(e)

                                self.sdk.user.getfullfb(clbk, update)
                            })
                        }


                    } else {
                        if (clbk) clbk(userInfo)
                    }

                    //self.sdk.user.loadRelations(['subscribes', 'blocking'], () => {



                }, true, update)

            },

            getfullfb: function (clbk, update) {

                self.sdk.users.getone(app.user.address.value, (user, error) => {

                    var userInfo = self.psdk.userInfo.getmy()

                    if (clbk) clbk(userInfo)

                }, false, update)

            },

            getaccountearning: function (address) {

                return app.psdk.monetization.request(() => {

                    return self.app.api.rpc('getaccountearning', [address, 0, 1627534])

                }, address).then(function (s) {

                    var stats = {
                        ...s[0]
                    }

                    delete stats.address

                    _.each(stats, (v, i) => {
                        stats[i] = v / 100000000
                    })

                    return stats
                })


            },

            accSet: function (settings, clbk) {

                self.app.platform.actions.addActionAndSendIfCan(settings).then(action => {

                    var alias = action.get()

                    successCheck()

                    if (clbk) clbk(null, alias)

                }).catch(e => {

                    if (clbk)
                        clbk(e)

                })

            },

            accSetMy: function (settingsObj, clbk) {

                if (!settingsObj) settingsObj = {}

                self.psdk.accSet.load(self.app.user.address.value).then(() => {

                    var settings = self.psdk.accSet.get(self.app.user.address.value) || {}

                    var ct = new Settings();

                    ct.paidsubscription.set(typeof settingsObj.paidsubscription == 'undefined' ? (settings.paidsubscription || 0) : settingsObj.paidsubscription);

                    ct.pin.set(typeof settingsObj.pin == 'undefined' ? (settings.pin || '') : settingsObj.pin);
                    ct.monetization.set(typeof settingsObj.monetization == 'undefined' ?
                        ((settings.monetization === "" || settings.monetization === true || settings.monetization === false) ? settings.monetization : "") : settingsObj.monetization);

                    ct.cover.set(typeof settingsObj.cover == 'undefined' ? (settings.cover || '') : settingsObj.cover);

                    return new Promise((resolve, reject) => {
                        ct.uploadImage(self.app, function(err){

                            if (err){
    
                                reject('imageerror')
                                
                                return 
                            }
    
                            resolve()
    
                        })
                    }).then(() => {
                        return self.app.platform.actions.addActionAndSendIfCan(ct)
                    })

                }).then(action => {

                    var alias = action.get()

                    if (clbk) clbk(null, alias)

                }).catch(e => {

                    if (clbk)
                        clbk(e)

                })


            },

            subscribeRef: function (clbk) {

                var adr = self.app.user.address.value;

                var adrref = null

                try {
                    adrref = localStorage[adr + 'subscribeRef'];
                } catch (e) {

                }

                if (adrref) {

                    delete localStorage['ref'];

                    self.sdk.users.get(adrref, function () {

                        var r = self.psdk.userInfo.get(adrref)

                        if (r) {

                            self.sdk.node.transactions.get.unspents(function (unspents) {

                                self.sdk.node.transactions.get.canSpend([adr], function (cs) {

                                    if (cs) {

                                        delete localStorage[adr + 'subscribeRef'];

                                        var src = r.image;
                                        var name = r.name;
                                        var letter = name ? name[0] : '';

                                        var h = '<div class="refaddWrapper">'

                                        h += '<div class="refaddHeader">'
                                        h += self.app.localization.e('e13290') + ' ' + (r.name || adrref) + '?'
                                        h += '</div>'

                                        h += '<div class="refaddTable table">'
                                        h += '<div class="imageCell">'

                                        h += '<div class="usericon" contain ban=".gif" image="' + (src || '*') + '">'

                                        if (!src && letter) {

                                            h += '<span class="letter">' + letter.toUpperCase() + '</span>';

                                        } else if (!src) {

                                            h += '<svg width="40" height="40" data-jdenticon-value="' + adrref + '"></svg>'

                                        }

                                        h += '</div>'

                                        h += '</div>'

                                        h += '<div class="nameCell">'

                                        h += (r.name || adrref)

                                        h += '</div>'

                                        h += '</div>'
                                        h += '</div>'

                                        new dialog({
                                            html: h,
                                            btn1text: self.app.localization.e('dyes'),
                                            btn2text: self.app.localization.e('dno'),

                                            class: 'refadd',

                                            success: function () {

                                                topPreloader(10)

                                                self.api.actions.notificationsTurnOn(adrref, function (tx, error) {

                                                    if (!error) {

                                                        delete localStorage[adr + 'subscribeRef'];

                                                    }

                                                    topPreloader(100)


                                                })

                                            },

                                            fail: function () {
                                                delete localStorage[adr + 'subscribeRef'];
                                            },

                                            close: function () {
                                                delete localStorage[adr + 'subscribeRef'];
                                            }
                                        })
                                    }




                                })
                            })
                        }


                    }, true)
                }

                if (clbk) {
                    clbk()
                }


            },

            me: function () {
                return self.psdk.userInfo.getmy()
            },

            itisme: function (_address) {

                if (!self.app.user.address.value) return true

                return self.app.user.address.value == _address

            },

            newuser: function (address) {
                if (!address) address = self.app.user.address.value

                if (!address) return false

                var ustate = self.psdk.userState.get(address) || self.psdk.userInfo.get(address)

                if (!ustate) return false

                var redgate = ustate.user_reg_date || ustate.regdate

                if (!redgate) return true

                var d = new Date();
                d.setTime(redgate * 1000);

                if (d.addHours(24) > new Date()) {
                    return true
                }

                return false


            },

            reputationBlockedMe: function (address, count) {

                if (!address) address = self.app.user.address.value

                return self.app.platform.sdk.user.itisme(address) && self.app.platform.sdk.user.reputationBlocked(address, count)

            },

            reputationBlockedNotMe: function (address, count) {

                if (!address) address = self.app.user.address.value

                return !self.app.platform.sdk.user.itisme(address) && self.app.platform.sdk.user.reputationBlocked(address, count)

            },

            reputationBlocked: function (address, count) {

                if (!address) return false

                var ustate = self.psdk.userState.get(address) || self.psdk.userInfo.get(address)
                var uinfo = self.psdk.userInfo.get(address)

                if (!ustate || _.isEmpty(ustate)) return false

                var totalComplains = typeof ustate.flags === 'object' ? _.reduce(ustate.flags, (mem, a, b) => {
                    return mem + (b == 2 ? a * 3 : a)
                }, 0) : 0

                var isOverComplained = typeof ustate.flags === 'object' ? Object.values(ustate.flags).some(el => el / (ustate.postcnt || 1) > 5) : false

                if (ustate.likers_count > 100 && ustate.blockers_count < 100){
                    isOverComplained = false
                }

                var totalComplainsFirstFlags = typeof ustate.firstFlags === 'object' ? Object.values(ustate.firstFlags).reduce((a,b) => a + +b, 0) : 0

                if (self.bch[address]) return true

                if (self.bchl[address] && (typeof _Electron == 'undefined') && !window.cordova) {
                    return true
                }

                if (ustate.reputation < 100 && ustate.blockers_count > 100 && ustate.subscribers_count < ustate.blockers_count){
                    var tf = _.reduce(ustate.flags, (m, f) => {
                        return m + f
                    }, 0)

                    if(tf > 50 && tf * 2 > ustate.likers_count) return true
                }


                if (self.currentBlock > 0) {
                    if (uinfo.bans) {
                        _.find(uinfo.bans, (b, index) => {
                            if (b < self.currentBlock) {
                                return true
                            }
                        })
                    }
                }

                if (typeof count == 'undefined') count = -12

                if (ustate && ustate.reputation <= count && !self.real[address]
                    /* &&
                                        (ustate.likers_count < 20 || (ustate.likers_count < ustate.blockings_count * 2))*/
                ) {
                    return true
                }

                if (isOverComplained) {
                    return true
                }

                if (moment().diff(ustate.regdate, 'days') <= 7 && totalComplains > 20 && ustate.likers_count < totalComplainsFirstFlags) {
                    return true
                }

                if (totalComplainsFirstFlags > 20 && ustate.likers_count < totalComplainsFirstFlags) {
                    return true
                }

                if (totalComplains > 20 && ustate.likers_count * 2 < totalComplains) {
                    return true
                }

                if (this.isNotAllowedName(uinfo)) {
                    return true
                }
            },

            isNotAllowedNameStr: function (name) {
                return self.sdk.user.isNotAllowedName({
                    name
                })
            },

            maskNotAllowedName: function (name = '') {

                if (!name || name.length <= 1) return name

                if (self.sdk.user.isNotAllowedNameStr(name)) {
                    return name[0] + (name.substring(1).substring(0, name.length - 2)).replace(/[a-zA-Z]/g, '*') + name[name.length - 1]
                }

                return name
            },

            isNotAllowedName: function (user = {}) {

                let name, address
                if (user.name) {
                    name = user.name
                    address = user.address
                }
                if (user.data) {
                    name = user.data.name
                    address = user.data.address
                }

                if (!name) return false

                /*if(typeof self.api.name(address) !== 'undefined' && self.api.name(address) !== name) {
                    return true
                }*/

                name = name?.toLowerCase().replace(/[^a-z]/g, '') || ''

                var bwf = _.find(self.bwdictionary, (bww) => {
                    return name.indexOf(bww) > -1
                })

                if (bwf) return true

                if (!address) return

                if (name.indexOf('pocketnet') !== -1 || name.indexOf('bastyon') !== -1) {
                    if (self.whiteList.includes(address)) {
                        return false
                    }
                    return true
                }

            },

            hiddenComment: function (comment) {

                if (comment.blck_cnt_cmt) return 'hiddenCommentLabel'

                var address = comment.address
                var ustate = self.psdk.userState.get(address) || self.psdk.userInfo.get(address)

                if (self.app.platform.sdk.user.itisme(address)) return false


                if (ustate && ustate.reputation <= -0.5) {
                    if (comment.scoreDown >= 5) {
                        return 'hiddenCommentLabel'
                    }
                }


                if (ustate && ustate.reputation < 20){

					var matches = comment.message.match(urlreg);

                    if (matches && matches.length > 0){

                        if(_.find(matches, (m) => {
                            return !thislink(m)
                        })){
                            return 'hiddenCommentLabelLink'
                        }

                    }
                    
                }

                return false
            },

            canuseimagesincomments: function (address) {
                if (!address) address = self.app.user.address.value

                var ustate = self.psdk.userState.get(address) || self.psdk.userInfo.get(address)

                if (ustate && ustate.reputation > 100) {
                    return true
                }
            },

            scamcriteria: function (address) {

                if (!address) address = self.app.user.address.value

                var info = self.psdk.userInfo.get(address);

                return false


            },

            upvotevalueblockcriteria: function (value, address) {
                if (!address) address = self.app.user.address.value

                var info = self.psdk.userInfo.get(address);

                if (value <= 3 && info.reputation < 100) return true

                return false

            },

            reputationBlockedRedirect: function (address) {
                if (self.sdk.user.reputationBlocked(address)) {

                    if (self.sdk.user.itisme(address)) {
                        self.app.nav.api.load({
                            open: true,
                            href: 'userpage',
                            history: true,
                            replaceState: true
                        })
                    } else {
                        self.app.nav.api.load({
                            open: true,
                            href: 'page404',
                            replaceState: true
                        })
                    }

                    return true

                }
            },

            mystatisticnov: function () {
                var novblock = 1420300

                if (window.testpocketnet) novblock = 302900

                return pretry(function () {
                    return self.currentBlock
                }).then(r => {
                    return self.sdk.user.statistic(self.app.user.address.value, self.currentBlock - novblock)
                })

            },

            statistic: function (address, de) {


                /// TODO LATER MAYBE

                return self.app.api.rpc('getuserstatistic', [
                    [address], 0, de
                ]).then(d => {

                    var result = _.find(d, function (p) {
                        return p.address == address
                    })

                    return result

                }).catch(e => {
                    if (clbk)
                        clbk([])
                })
            },

            myaccauntdeleted: function () {
                var address = self.app.user.address.value
                if (!address) return null

                return self.sdk.user.deletedaccount(address)
            },

            deletedaccount: function (address) {


                var info = self.psdk.userInfo.getShortForm(address)

                if (info && info.deleted) return 'deleted'
            },

            deleteaccount: function (progress) {

                if (!progress) progress = () => {}

                var prepare = function () {

                    return new Promise((resolve, reject) => {

                        self.sdk.ustate.me((info) => {

                            var address = self.app.user.address.value

                            if (!info || _.isEmpty(info)) {
                                return reject('notprepared')
                            }

                            if (!address) {
                                return reject('notprepared')
                            }

                            var account = self.app.platform.actions.getCurrentAccount()

                            if (account) {


                                account.updateUnspents().then(() => {

                                    var b = account.actualBalance()
                                    var total = b.actual

                                    if (total) {
                                        resolve()
                                    } else {
                                        return reject('balance')
                                    }

                                }).catch(e => {
                                    return reject('balance')
                                })

                            } else {
                                return reject('notprepared')
                            }

                        }, true)


                    })
                }

                var removePeertube = function () {

                    var address = self.app.user.address.value


                    return self.app.peertubeHandler.api.proxy.allServers().then((peertubeservers) => {

                        var s = []

                        _.each(peertubeservers, (srv) => {
                            s = s.concat(srv)
                        })
                        //
                        var promises = _.map(s, (ps) => {


                            return self.app.peertubeHandler.api.user.removeAccount({
                                id: address.address
                            }, {
                                host: ps
                            }).catch(e => {

                                return Promise.resolve()
                            })

                        })

                        return Promise.all(promises)
                    }).catch(e => {
                        console.error('e', e)

                        return Promise.resolve()
                    })
                }

                var removeMatrix = function () {

                    return self.matrixchat.deactivateAccount().catch(e => {
                        console.error('e', e)

                        return Promise.resolve()
                    }).then(r => {

                        self.matrixchat.destroy()
                        self.matrixchat.init()

                        return Promise.resolve()
                    })

                }

                var removeBastyon = function () {

                    return new Promise((resolve, reject) => {

                        var obj = new DeleteAccount();

                        ///self.sdk.node.transactions.clearTempHard()

                        self.app.platform.actions.addActionAndSendIfCan(obj).then(action => {

                            self.psdk.clear.all('userInfo', self.app.user.address.value)
                            self.psdk.clear.all('userState', self.app.user.address.value)


                            //self.app.settings.delete(a, 'last_user')
                            //self.app.settings.delete(a, 'last_ustate_2')

                            self.deletedtest[self.app.user.address.value] = true

                            self.matrixchat.destroy()

                            self.sdk.ustate.me((info) => {
                                self.sdk.user.get(() => {

                                    setTimeout(() => {
                                        resolve()
                                    }, 1000)

                                }, true)
                            }, true)

                        }).catch(e => {

                            reject(error)

                        })

                        return





                    })
                }

                progress('prepare')

                return prepare().then(() => {

                    progress('removePeertube')

                    return removePeertube()
                }).then(() => {

                    progress('removeMatrix')

                    return removeMatrix()
                }).then(() => {

                    progress('removeBB')

                    return removeBastyon()
                }).then(() => {

                    progress()

                }).catch(e => {

                    progress()

                    return Promise.reject(e)

                })


            }

        },


        ustate: {
            storage: {},

            clbks: {},

            loading: {},

            change: function (address, state, value) {
                if (!value) value = 1

                var us = self.psdk.userState.getmy();

                if (us) {
                    us[state + "_spent"] = (us[state + "_spent"] || 0) + value
                    us[state + "_unspent"] = (us[state + "_unspent"] || 1) - value
                }

                _.each(self.sdk.ustate.clbks, function (c) {
                    c()
                })
            },
            validationcurrent: function (address, parameter) {

                if (!address && state) address = self.sdk.address.pnet().address;

                var info = self.psdk.userState.get(address);
                var result = true;
                var error = false;

                if (!info) {
                    result = false;
                    error = 'info';
                } else {

                    if (!info.trial) {
                        if (parameter == 'postunspent' && info.post_unspent <= 0) {
                            result = false;
                        }

                        if (parameter == 'scoreunspent' && info.score_unspent <= 0) {
                            result = false;
                        }
                    } else {
                        result = false;
                        error = 'trial';
                    }

                    if (!result) {
                        error = parameter
                    }

                }

                return result, error

            },

            meUpdate: function (clbk) {
                self.sdk.ustate.me(clbk, true)
            },

            me: function (clbk, update) {

                self.app.user.isState(function (state) {

                    if (state) {
                        self.sdk.ustate.get(app.user.address.value, (r) => {

                            if (clbk)
                                clbk(r[app.user.address.value] || {})

                        }, update)
                    } else {
                        if (clbk) clbk({})
                    }

                })

            },


            get: function (addresses, clbk, update) {

                return self.psdk.userState.load(addresses, update).then(r => {

                    if (clbk) clbk(r)
                }).catch((e) => {
                    if (clbk) clbk({})
                })

            },

            haslowlimits: function (state) {

                state || (state = {})

                var m = self.sdk.ustate.metrics()

                return _.filter(m, function (metrica) {

                    var l = Number(state[metrica.key + "_unspent"])

                    var m = Number(state[metrica.key + "_unspent"]) + Number(state[metrica.key + "_spent"])

                    return metrica.bad(l, m)

                })
            },

            haszerolimits: function (state) {

                state || (state = {})

                var m = self.sdk.ustate.metrics()

                return _.filter(m, function (metrica) {
                    return Number(state[metrica.key + "_unspent"]) === 0
                })
            },

            canincrease: function (p, clbk) {

                if (!p) p = {}

                if (p.template == 'trial') {
                    p.balance = 1000000000
                    p.reputation = 100
                    p.trial = true
                }

                if (p.template == 'video') {
                    p.balance = 500000000
                    p.reputation = 100
                    p.trial = true
                }

                var result = {}

                self.sdk.ustate.me(function (info) {
                    if (p.balance && (info.balance || 0) < p.balance) result.balance = true
                    else
                    if (p.reputation && (info.reputation || 0) < p.reputation) result.reputation = true
                    else
                    if (p.trial && !info.trial) result.trial = true

                    if (result.balance || result.reputation) {
                        result.canuseapplacation = (!window.cordova && typeof _Electron == 'undefined')
                    }

                    clbk(result)
                })
            },

            metrics: function () {
                return {

                    post: {
                        key: 'post',
                        vis: 'scale',
                        name: self.app.localization.e('spc'),
                        bad: function (remains, limit) {
                            if (remains <= 3) return true
                        }
                    },

                    video: {
                        key: 'video',
                        vis: 'scale',
                        name: self.app.localization.e('spv'),
                        bad: function (remains, limit) {
                            if (limit <= 3) return false

                            if (remains <= 1) {
                                return true
                            }
                        }
                    },

                    audio: {
                        key: 'audio',
                        vis: 'scale',
                        name: self.app.localization.e('spa'),
                        bad: function (remains, limit) {
                            if (limit <= 3) return false

                            if (remains <= 1) {
                                return true
                            }
                        }
                    },

                    score: {
                        key: 'score',
                        vis: 'scale',
                        name: self.app.localization.e('ssc'),
                        bad: function (remains, limit) {
                            if (remains <= 7) return true
                        }
                    },

                    comment: {
                        key: 'comment',
                        vis: 'scale',
                        name: self.app.localization.e('ccc'),
                        bad: function (remains, limit) {
                            if (remains <= 7) return true
                        }
                    },

                    comment_score: {
                        key: 'comment_score',
                        vis: 'scale',
                        name: self.app.localization.e('crc'),
                        bad: function (v, limit) {
                            if (v <= 10) return true
                        }
                    },

                    complain: {
                        key: 'complain',
                        vis: 'scale',
                        name: self.app.localization.e('ccpl'),
                        bad: function (remains, limit) {
                            if (remains <= 3) return true
                        }
                    },

                    article: {
                        key: 'article',
                        vis: 'scale',
                        name: self.app.localization.e('artc'),
                        bad: function (remains, limit) {

                            if (limit <= 3) return false

                            if (remains <= 1) {
                                return true
                            }
                        },
                    }
                }
            }

        },

        notifications: {
            storage: {},

            inited: false,

            clbks: {
                added: {},
                seen: {},
                inited: {}
            },
            clearlocalstorage: function () {

                try {
                    var values = {},
                        keys = Object.keys(localStorage),
                        i = keys.length;

                    while (i--) {

                        if (keys[i] && keys[i].indexOf('notificationsv') > -1) {

                            if (keys[i].indexOf('notificationsv15') == -1) {
                                localStorage.removeItem(keys[i]);
                            }


                        }

                    }
                } catch (e) {

                }



            },
            load: function () {

                var old = {}

                try {
                    old = JSON.parse(localStorage[self.sdk.address.pnet().address + 'notificationsv15'] || "{}")
                } catch (e) {

                }

                this.import(old)

            },
            save: function () {
                this.clearlocalstorage()
                var e = this.export();

                if (self.currentBlock && this.inited == true) {

                    e.notifications = _.uniq(e.notifications, function (n) {

                        if (n.txid) return n.txid

                        return makeid()

                    })

                    e.notifications = _.sortBy(e.notifications, function (n) {
                        return -Number(n.time || n.nTime)
                    })

                    e.notifications = firstEls(e.notifications, 150)

                    if (self.sdk.address.pnet()) {
                        try {
                            localStorage[self.sdk.address.pnet().address + 'notificationsv15'] = JSON.stringify(e)
                        } catch (e) {

                        }
                    }
                }


            },

            seenall: function () {
                var n = this

                _.each(n.storage.notifications, function (notification) {
                    if (!notification.seen)
                        notification.seen = self.app.platform.currentTime()
                })

                n.save()

                _.each(n.clbks.seen, function (f) {
                    f()
                })
            },

            seen: function (ids) {
                var n = this

                _.each(ids, function (id) {

                    var notification = _.find(n.storage.notifications, function (n) {
                        return n.txid == id
                    })

                    if (notification)
                        notification.seen = self.currentTime()
                })

                n.save()

                _.each(n.clbks.seen, function (f) {
                    f()
                })
            },

            import: function (exported) {
                var imported = [];

                _.each(exported.notifications, function (l) {
                    var imp = {};

                    _.each(l, function (attr, i) {
                        if (attr.exported) {
                            var alias = new kits.alias[attr.type]()

                            if (attr.type == 'userInfo') {
                                attr.exported.blocking = []
                                attr.exported.subscribers = []
                                attr.exported.subscribes = []

                                attr.exported.blocking_loaded = false
                                attr.exported.subscribers_loaded = false
                                attr.exported.subscribes_loaded = false
                            }

                            alias._import(attr.exported)

                            imp[i] = alias
                        } else {
                            imp[i] = attr
                        }

                    })

                    imported.push(imp)
                })

                if (imported.length)
                    this.storage.notifications = imported


                if (exported.block)
                    this.storage.block = exported.block

            },

            export: function () {
                var exported = [];


                _.each(this.storage.notifications, function (n) {

                    var l = {};

                    _.each(n, function (attr, i) {

                        if (!attr) return;

                        if (attr.export) {

                            var exported = attr.export()

                            if (attr.type == 'userInfo' && exported) {
                                exported.blocking = []
                                exported.blocking_loaded = false

                                exported.subscribers = []
                                exported.subscribers_loaded = false

                                exported.subscribes = []
                                exported.subscribes_loaded = false

                                exported.recomendedSubscribes = []

                            }

                            l[i] = {
                                exported: exported,
                                type: attr.type
                            }
                        } else {
                            l[i] = attr
                        }

                    })

                    exported.push(l)

                })

                return {
                    block: this.storage.block,
                    notifications: exported
                }
            },

            init: function () {

                if (_OpenApi) {
                    return Promise.reject('openapi')
                }

                this.inited = true;
                this.loading = false;

                this.load();

                this.storage.block || (this.storage.block = self.currentBlock)
                this.storage.notifications || (this.storage.notifications = [])

                return Promise.resolve()


            },

            initcl: function (clbk) {
                self.sdk.notifications.init().then(clbk).catch(clbk)
            },

            wsBlock: function (block) {

                if (block > this.storage.block) {

                    this.storage.block = block;
                }

                this.save()

            },

            addFromWs: function (data) {

                data.nblock || (data.nblock = self.currentBlock);

                if (data.msg == 'transaction' && data.address == self.sdk.address.pnet().address && !deep(data, 'tx.coinbase')) {
                    return
                }

                if (this.storage.notifications) {
                    this.storage.notifications.unshift(data)

                    _.each(this.clbks.added, function (f) {
                        f([data], true)
                    })

                    this.save()
                }

            },



            find: function (txid) {
                return _.find(this.storage.notifications, function (n) {
                    return n.txid == txid
                })
            }
        },

        missed: {
            get: function (block) {

                var dummy = function () {
                    return {
                        block: {
                            block: self.currentBlock,
                            contentsLang: {},
                            contentsSubscribes: {},
                            msg: 'newblocks'
                        }
                    }
                }

                if (!self.sdk.address.pnet()) return Promise.reject('address')
                if (!self.currentBlock) return Promise.reject('currentblock')
                if (!block) return Promise.reject('block')
                if (self.currentBlock == block) return Promise.resolve(dummy())

                return self.app.api.rpc('getmissedinfo', [self.sdk.address.pnet().address, block, 30]).then(d => {

                    if(!d || !d.length){
                        return Promise.resolve(dummy())
                    }

                    var notifications = d.slice(1) || []

                    notifications = _.sortBy(notifications, function (n) {
                        return -n.nblock
                    })

                    d[0].msg = 'newblocks'

                    return Promise.resolve({
                        block: d[0],
                        notifications: notifications
                    })

                })
            }
        },

        contents: {
            storage: {},
            loading: {},

            groups: [{
                key: 'art',
                caption: "Articles"
            }, {
                key: 'post',
                caption: "Posts"
            }],

            gets: function (contents, sort) {

                if (!sort) sort = 'popularity'

                var groups = group(contents, function (c) {
                    if (c.settings.v == 'a') return 'art'

                    return 'post'
                })

                var f = _.filter(this.groups, function (g) {
                    if (groups[g.key]) {
                        return true;
                    }
                })

                f = _.map(f, function (f) {

                    var items = groups[f.key];

                    if (sort) items = _.sortBy(items, function (i) {

                        if (sort == 'popularity') return -Number(i.scoreSum)

                    })

                    return {
                        g: f,
                        items: items
                    }
                })

                return f;
            },

            getsorteditems: function (contents, sort) {
                var g = this.gets(contents, sort)
                var items = []


                _.each(g, function (g) {
                    _.each(g.items, function (item) {
                        items.push(item)
                    })
                })

                return items
            },

            get: function (address, clbk) {

                var st = self.sdk.contents.storage
                var ld = self.sdk.contents.loading
                var gt = self.sdk.contents.get

                var timecache = deep(st, address + ".time")

                if (timecache && timecache.addMinutes(100) > (new Date())) {

                    if (clbk)
                        clbk(deep(this, 'storage.' + address + ".data"))

                    return
                }

                if (ld[address]) {
                    retry(function () {
                        return !ld[address]
                    }, function () {
                        gt(address, clbk)
                    })

                    return
                }

                ld[address] = true

                self.app.api.rpc('getcontents', [address]).then(d => {

                    var list = [];

                    _.each(d || [], function (d) {

                        if (!d.content) return

                        try {

                            var c = {
                                caption: filterXSS(decodeURIComponent(d.content), {
                                    whiteList: [],
                                    stripIgnoreTag: true
                                }),
                                time: new Date(d.time),
                                txid: d.txid,
                                settings: JSON.parse(d.settings),
                                scoreCnt: Number(d.scoreCnt),
                                scoreSum: Number(d.scoreSum),
                            }

                            c.score = 0;

                            if (c.scoreCnt) c.score = Number(c.scoreSum) / Number(c.scoreCnt)

                            list.push(c)
                        } catch (e) {

                        }


                    })

                    st[address] = {
                        data: list,
                        time: new Date()
                    }

                    ld[address] = false

                    if (clbk)
                        clbk(list)

                }).catch(e => {

                })


            }
        },

        userscl: {
            storage: {},
        },

        usersl: {
            storage: {},
        },

        paidsubscription : {
            _clbks : {
                setcondition : {},
                updatepaiddata : {}
                //TODO
            },
            checking : {},
            checkvisibilityCache : function(address){
                if(!paidsubscriptionCache[self.app.user.address.value]) paidsubscriptionCache[self.app.user.address.value] = {}

                return paidsubscriptionCache[self.app.user.address.value][address]
            },
            checkvisibilityStrong : function(address, update, lightupdate){

                if (self.sdk.paidsubscription.checking[address]) return self.sdk.paidsubscription.checking[address]
                
                var cache = this.checkvisibilityCache(address)
                var promise = null

                if (cache && !update && !lightupdate) return promise = () => {return Promise.resolve()}
                else{
                    promise = () => {
                        var data = {}
                        var promises = [
                            self.sdk.node.transactions.getfromtotransactions(self.app.user.address.value, address, update).then((r) => {

                               
        
                                data.getfromtotransactions = {
                                    result : r
                                }
                                return Promise.resolve()
        
                            }).catch(e => {
                                data.getfromtotransactions = {
                                    error : e
                                }
        
                                return Promise.resolve()
                            }),
        
                            self.sdk.paidsubscription.getcondition(address).then((v) => {

                                if (v == 0){
                                    return 'zerovalue'
                                }

                                data.getcondition = {
                                    result : v
                                }
                            }).catch(e => {
                                data.getcondition = {
                                    error : e
                                }
        
                                return Promise.resolve()
                            })
                        ]
        
                        if(!paidsubscriptionCache[self.app.user.address.value]) paidsubscriptionCache[self.app.user.address.value] = {}
        
                        return Promise.all(promises).then(() => {

                            if(data.getcondition.error || data.getfromtotransactions.error){
                                return Promise.reject(data.getcondition.error || data.getfromtotransactions.error)
                            }

                            if(!self.currentBlock){
                                return Promise.reject('currentBlock is empty')
                            }

                            var paidC = {
                                '1m' : {c : 1, m : 1, tx : []}, '6m' : {c : 5.5, m : 6, tx : []}, '1y' : {c : 10, m : 12, tx : []}
                            }

                            var d = 86400
                            var dc = 365

                            _.each(paidC, (v, k) => {
                                v.block = self.currentBlock - v.m * 43200
                                v.time = (Date.now() / 1000) - v.m * 2635200

                                v.value = (data.getcondition.result || 0) * v.c
                                v.balance = -v.value
                            })

                            var balance = {}
                            var until = 0

                            _.each(data.getfromtotransactions.result, (trx) => {
                                _.each(paidC, (v, k) => {
                                    if (trx.time > v.time){
                                        v.balance += trx.amount / smulti
                                        v.tx.push(trx)
                                    }
                                })
                            })


                            var resultStatus = 'paid'

                            if(_.find(paidC, (v) => {
                                return v.balance >= 0
                            })) {
                                resultStatus = 'paid_success'
                            }

                            if (resultStatus == 'paid_success'){

                                for(var i = 0; i < dc; i++){

                                    var pb = {}

                                    _.each(paidC, (v, k) => {
                                        pb[k] = {
                                            block : v.block,
                                            time : v.time,
                                            value : v.value,
                                            balance : -v.value
                                        }
                                    })

                                    _.each(data.getfromtotransactions.result, (trx) => {
                                        _.each(pb, (v, k) => {
                                            if (trx.time > v.time + d * i){
                                                v.balance += trx.amount / smulti
                                            }
                                        })
                                    })

                                    var resultStatus_l = 'paid'

                                    if(_.find(pb, (v) => {
                                        return v.balance > 0
                                    })) {
                                        resultStatus_l = 'paid_success'
                                    }

                                    if(resultStatus_l == 'paid'){

                                        until = new Date(Date.now() + i * d * 1000)

                                        break
                                    }

                                }
                            }

                            _.each(paidC, (v, k) => {
                                balance[k] = v.balance || 0
                            })
                            
                         
                            paidsubscriptionCache[self.app.user.address.value][address] = {
                                result : resultStatus,
                                balance : balance,
                                data : paidC,
                                until,
                                value : data.getcondition.result 
                            }
        
                        }).catch(e => {
                            paidsubscriptionCache[self.app.user.address.value][address] = {
                                error : e
                            }
        
                            return Promise.resolve()
                        })
                    }
                }

                self.sdk.paidsubscription.checking[address] = promise().then(() => {

                    _.each(self.sdk.paidsubscription._clbks.updatepaiddata, (f) => {
                        f(address, paidsubscriptionCache[self.app.user.address.value][address])
                    })

                    return paidsubscriptionCache[self.app.user.address.value][address]
                }).finally(() => {
                    delete self.sdk.paidsubscription.checking[address]
                })

                return self.sdk.paidsubscription.checking[address]
            },
            
            getcondition : function(address){
                return self.psdk.accSet.load(address).then(s => {

                    var settings = self.psdk.accSet.get(address) || {}

                    return Promise.resolve(Number(superXSS(settings.paidsubscription || 0)))
                })
            },

            setcondition : function(paidsubscription, clbk){
                self.app.platform.sdk.user.accSetMy({
                    paidsubscription: paidsubscription || 0
                }, function (err, alias) {

                    if (!err) {

                        _.each(self.sdk.paidsubscription._clbks.setcondition, (f) => {
                            f(paidsubscription)
                        })

                        if (clbk) {
                            clbk(null, alias)
                        }

                    } else {
                        self.app.platform.errorHandler(err, true)

                        if (clbk)
                            clbk(err, null)
                    }

                })
            }
        },

        users: {
            loading: {},
            storage: {},

            nameaddressstorage: {},
            getCover : function (address) {
                return self.psdk.accSet.load(address).then(s => {

                    var settings = self.psdk.accSet.get(address) || {}

                    return Promise.resolve(superXSS(settings.cover || ''))
                })
            },
            setCover : function (cover, clbk) {

                self.app.platform.sdk.user.accSetMy({
                    cover: cover || ''
                }, function (err, alias) {

                    if (!err) {

                        if (clbk) {
                            clbk(null, alias)
                        }

                    } else {
                        self.app.platform.errorHandler(err, true)

                        if (clbk)
                            clbk(err, null)
                    }

                })
            },

            setMonetization: function (monetization, clbk) {
                self.app.platform.sdk.user.accSetMy({
                    monetization: monetization || false
                }, function (err, alias) {

                    console.log("ERROR", err)

                    if (!err) {

                        if (clbk) {
                            clbk(null, alias)
                        }

                    } else {
                        self.app.platform.errorHandler(err, true)

                        if (clbk)
                            clbk(err, null)
                    }

                })
            },

            checkMonetizationOpportunity: function (address) {

                if (!address) return false
                var userinfo = self.psdk.userInfo.get(address)

                if (!userinfo) return false

                return self.app.monetization && self.app.boost && !self.app.pkoindisable && (self.real[address] || userinfo.dev)
            },

            checkMonetization: function (address) {


                if (self.sdk.users.checkMonetizationOpportunity(address)) {

                    return self.psdk.accSet.load(address).then(s => {

                        var settings = self.psdk.accSet.get(address) || {}

                        return Promise.resolve(settings.monetization === true || settings.monetization === "" ? true : false)

                    })

                } else {
                    return Promise.resolve(false)
                }
            },

            getone: function (address, clbk, light, reload) {


                self.sdk.users.get([address], function (data = {}, error) {
                    if (!data) data = {}

                    if (clbk) clbk(data[address] || null, error)
                }, light, reload)
            },

            get: function (addresses, clbk, light, reload) {
                return self.psdk.userInfo.load(addresses, light, reload).then(r => {


                    if (clbk) clbk(r)

                }).catch(e => {
                    console.error(e)

                    if (clbk) clbk(null, e)
                })



            },


            /////////////// REGISTRATION

            requestFreeMoney: function (clbk, proxyoptions) {


                var account = self.app.platform.actions.getCurrentAccount()

                if (account) {

                    this.checkFreeMoney(account.address, function (r) {
                        if (!r) {
                            if (clbk)
                                clbk(null)
                        } else {


                            self.app.api.fetchauth('free/registration', {

                                address: account.address,
                                captcha: self.sdk.captcha.done

                            }, proxyoptions).then(d => {

                                //self.sdk.captcha.done = null
                                account.willChangeUnspentsCallback(d.id, proxyoptions)

                                if (clbk)
                                    clbk(true)

                            }).catch(e => {
                                if (clbk)
                                    clbk(null, e)
                            })
                        }
                    })
                } else {
                    if (clbk)
                        clbk(null)
                }


            },

            checkFreeMoney: function (address, clbk) {
                self.sdk.users.get(address, function () {

                    var name = deep(self, 'sdk.users.storage2.' + address + '.name');


                    if (name) {

                        if (clbk)
                            clbk(false)
                    } else {
                        self.sdk.address.registration(address, function (r) {

                            if (!r) {

                                if (clbk)
                                    clbk(true)

                            } else {
                                if (clbk)
                                    clbk(false)
                            }
                        })
                    }

                })
            },

            requestUnspents: function () {

            },

            //////////////// ANOTHER

            addressByName: function (name, clbk) {

                if (!name) {
                    if (clbk) {
                        clbk(null)
                    }

                    return
                }


                var valid = true;

                try {
                    bitcoin.address.fromBase58Check(name)
                } catch (e) {
                    valid = false;
                }

                if (valid) {
                    if (clbk)
                        clbk(name)
                } else {

                    name = (name || '').toLowerCase()

                    var lf = self.psdk.userInfo.findlocal((s) => {
                        return s && s.name && s.name.toLowerCase() == name.toLowerCase()
                    })

                    var me = self.psdk.userInfo.getmy()

                    if (me && me.name.toLowerCase() == name.toLowerCase()) {
                        if (clbk) clbk(me.address)

                        return

                    }

                    if (lf) {
                        if (clbk) clbk(lf.address)
                    }

                    if (self.sdk.users.nameaddressstorage[name]) {
                        if (clbk)
                            clbk(self.sdk.users.nameaddressstorage[name])

                        return
                    }

                    self.psdk.nameAddress.load(name).then(address => {

                        if (clbk) clbk(address)

                    }).catch(e => {
                        console.error(e)
                        if (clbk) {
                            clbk(null, e)
                        }
                    })

                }

            },

            nameExist: function (name, clbk, reload) {

                var map = self.app.map;

                if (map[name] || _.find(map, function (m, i) {
                        if (m.uri == name) return true;
                        if (m.href == name) return true;
                    })) {



                    if (clbk)
                        clbk('pnetsystem')

                    return
                }

                self.psdk.nameAddress.load(name, reload).then((data) => {

                    if (clbk) {
                        clbk(data)
                    }
                }).catch(e => {
                    if (clbk) {
                        clbk(false)
                    }
                })

            },

            replacePattern: function (str, h, p) {

                var sreg = /(?:^|\s)@([a-zA-Z0-9_]+)/g

                var name = str.match(sreg);

                if (!name) {
                    return str
                } else {
                    var cname = h(name, p)
                    // return cname
                    var counter = 0
                    return str.replace(sreg, (match) => {
                        if (match) {
                            counter++
                        }
                        if (counter === 1) {
                            return cname
                        } else {
                            return ' '
                        }
                    })
                }

            },

            getTopAccounts: function (p, rpc, clbk) {

                var method = 'gettopaccounts';

                p.height = 0;
                p.tagsfilter = self.app.platform.sdk.categories.gettags();
                p.tagsexcluded = self.app.platform.sdk.categories.gettagsexcluded();

                p.tagsfilter = _.map(p.tagsfilter, function (t) {
                    return encodeURIComponent(t.toLowerCase())
                })

                p.tagsexcluded = _.map(p.tagsexcluded, function (t) {
                    return encodeURIComponent(t.toLowerCase())
                })

                p.depth || (p.depth = 10000);

                var parameters = [p.height, p.count, p.lang, p.tagsfilter, p.type, '', p.tagsexcluded, p.depth];

                var s = self.sdk.node.shares;


                clbk();

            },

            getRecommendedAccounts: function (clbk) {

                var rpc = {
                    cache: true,
                    locally: true,
                    fastvideo: true
                }

                var address = self.sdk.activity.getbestaddress();

                var method = 'getrecommendedaccountbyaddress';

                var p = {};

                p.addressexclude = '';
                p.type = [];
                p.lang = self.app.localization.key;
                p.count = 15;

                if (!address) {

                    self.app.platform.sdk.users.getTopAccounts(p, rpc, clbk);
                    return;

                }

                var parameters = [address, p.addressexclude, p.type, p.lang, p.count];

                var s = self.sdk.node.shares;

                s.getex(parameters, function (data, error) {

                    if (!(data && data.length) || error) {

                        self.app.platform.sdk.users.getTopAccounts(p, rpc, clbk);

                    } else {

                        self.sdk.activity.allowRequestAfterFive = false;
                        clbk(data, error);

                    }

                }, method, rpc)


            },


            commonuserpoint: function (address, me) {
                var point = 1;


                if (me && me.relation(address, 'subscribes')) {
                    point += 100
                }

                if (me && me.relation(address, 'subscribers')) {
                    point += 20
                }

                if (self.psdk.userInfo.get(address)) point += 40



                var activities = self.app.platform.sdk.activity.has('users', address)

                if (activities.point) {
                    point = point * activities.point / 10
                }




                return point

            }
        },

        posts: {},

        newmaterials: {
            storage: {},

            clbks: {
                update: {}
            },

            update: function (data) {

                var counts = {
                    sub: data['sharesSubscr'] || 0,
                    video: deep(data, 'contentsLang.video.' + self.app.localization.key) || 0,
                    article: deep(data, 'contentsLang.article.' + self.app.localization.key) || 0,
                    common: deep(data, 'sharesLang.' + self.app.localization.key) || ((deep(data, 'contentsLang.share.' + self.app.localization.key) || 0) + (deep(data, 'contentsLang.video.' + self.app.localization.key) || 0)),

                    index_sub: data['sharesSubscr'] || 0
                }

                counts.index = counts.common || 0

                _.each(counts, function (c, i) {
                    // c = rand(1,3)
                    self.sdk.newmaterials.storage[i] = (self.sdk.newmaterials.storage[i] || 0) + c
                })

                if(typeof data.jury != 'undefined') self.sdk.newmaterials.storage['jury'] = data.jury || 0

                _.each(self.sdk.newmaterials.clbks.update, function(u){
                    u(self.sdk.newmaterials.storage)
                })

                self.sdk.sharesObserver.newmaterials(counts)
            },

            clear: function () {

                self.sdk.newmaterials.storage = {}

                _.each(self.sdk.newmaterials.clbks.update, function (u) {
                    u(self.sdk.newmaterials.storage)
                })
            },

            see: function (key) {

                self.sdk.newmaterials.storage[key] = 0

                _.each(self.sdk.newmaterials.clbks.update, function (u) {
                    u(self.sdk.newmaterials.storage)
                })
            }
        },

        captcha: {
            storage: {},
            current: null,
            done: null,
            load: function (clbk) {

                try {
                    self.sdk.captcha.done = localStorage['capcha'] || null;

                } catch (e) {

                }

                if (clbk) clbk()
            },
            save: function () {

                try {
                    if (self.sdk.captcha.done) {
                        localStorage['capcha'] = self.sdk.captcha.done
                    } else {
                        delete localStorage['capcha']
                    }

                } catch (e) {

                }



            },
            get: function (clbk, refresh, proxyoptions) {
                if (refresh) this.current = null;

                self.app.api.fetchauth('captcha', {
                    captcha: this.done || this.current || null
                }, proxyoptions).then(d => {


                    self.sdk.captcha.current = d.id

                    if (d.id != self.sdk.captcha.done) {
                        self.sdk.captcha.done = null
                    }

                    self.sdk.captcha.save()

                    if (d.result && !d.done) {
                        self.sdk.captcha.make(d.result, null, function (err) {

                            if (!err) {

                                d.done = true

                                if (clbk)
                                    clbk(d)

                            } else {
                                if (clbk)
                                    clbk(null, err)
                            }
                        }, proxyoptions)
                    } else {
                        if (clbk)
                            clbk(d)
                    }

                }).catch(e => {
                    if (clbk)
                        clbk(null, e)
                })


            },
            getHex: function (clbk, refresh, proxyoptions) {
                if (refresh) this.current = null;

                self.app.api.fetchauth('captchaHex', {
                    captcha: this.done || this.current || null,
                    language: self.app.localization.key
                }, proxyoptions).then(d => {

                    self.sdk.captcha.current = d.id

                    if (d.id != self.sdk.captcha.done) {
                        self.sdk.captcha.done = null
                    }

                    self.sdk.captcha.save()

                    if (d.result && !d.done) {
                        self.sdk.captcha.make(d.result, d.angles, function (err) {

                            if (!err) {

                                d.done = true

                                if (clbk)
                                    clbk(d)

                            } else {
                                if (clbk)
                                    clbk(null, err)
                            }
                        }, proxyoptions)
                    } else {
                        if (clbk)
                            clbk(d)
                    }

                }).catch(e => {
                    if (clbk)
                        clbk(null, e)
                })


            },
            make: function (text, angles, clbk, proxyoptions) {

                self.app.api.fetchauth('makecaptcha', {
                    captcha: this.current || null,
                    text: text,
                    angles
                }, proxyoptions).then(d => {
                    self.sdk.captcha.done = d.id

                    self.sdk.captcha.save()

                    if (clbk)
                        clbk(null, d)

                }).catch(e => {
                    console.error(e)
                    if (clbk)
                        clbk(e)
                })


            }
        },

        exchanges: {
            storage: {},

            info: {},

            api: 'https://pkoin.net/Shifter',

            find: function (address) {
                var ar = self.sdk.exchanges.get();

                return _.find(ar, function (ao) {
                    return ao.info.address == address
                })
            },

            get: function () {
                var all = []

                _.each(self.sdk.exchanges.storage, function (addresses, cur) {
                    _.each(addresses, function (i, pocaddress) {

                        _.each(i, function (i) {


                            all.push({

                                pocaddress: pocaddress,
                                currency: cur,
                                info: i,

                            })
                        })

                    })
                })



                all = _.filter(all, function (a) {
                    if (a.info) return true
                })

                all = _.sortBy(all, function (a) {
                    return Number(a.info.time)
                })

                return all;
            },

            load: function (clbk) {

                try {
                    self.sdk.exchanges.storage = JSON.parse(localStorage[self.sdk.address.pnet().address + 'exchanges2'] || "{}");
                } catch (e) {

                }

                if (clbk)
                    clbk()
            },

            save: function (clbk) {

                try {
                    localStorage[self.sdk.address.pnet().address + 'exchanges2'] = JSON.stringify(self.sdk.exchanges.storage || {})
                } catch (e) {

                }

                if (clbk)
                    clbk()
            },

            remove: function (currency, address) {

                var storage = self.sdk.exchanges.storage;

                storage[currency] || (storage[currency] = {})

                _.each(storage[currency], function (a) {

                    delete a[address]

                })

                _.each(storage[currency], function (a, address) {
                    if (_.isEmpty(a)) delete storage[currency][address]
                })



                if (_.isEmpty(storage[currency]))

                    delete storage[currency]


                this.save()
            },

            reactivate: function (p, clbk) {

                self.app.ajax.run({
                    data: {
                        Action: 'REACTIVATEPOCDEAL',
                        Currency: p.currency.toUpperCase(),
                        Address: p.address
                    },
                    success: function (d) {
                        self.sdk.exchanges.status(p.currency, p.address, clbk)
                    },

                    fail: function () {
                        if (clbk) {
                            clbk('server')
                        }
                    }
                })
            },

            address: function (cur, clbk) {

                var me = self.app.user.address.value || '';

                fetch(this.api + '/PocShifter/donations/' + cur + '/' + me).then(function (d) {

                    var text = d.text();

                    return text;

                }).then(function (address) {

                    if (address) {

                        if (address.indexOf('is not available at the moment') > -1) {

                            clbk(null, self.app.localization.e('addrNotAvailable', cur));

                        } else {

                            clbk(address);

                        }
                    } else {
                        clbk(null, self.app.localization.e('e13094'))
                    }

                }).catch(function (err) {

                    clbk(null, err);


                })



            },
            statuses: function (clbk, list) {

                if (!list) {
                    list = [];

                    _.each(self.sdk.exchanges.storage, function (addresses, cur) {
                        _.each(addresses, function (i, pocaddress) {

                            _.each(i, function (i) {
                                list.push({
                                    Currency: cur.toUpperCase(),
                                    Address: i.address
                                })
                            })

                        })
                    })
                }


                self.app.ajax.run({
                    data: {
                        Action: 'GETPOCDEALSTATUS',
                        List: JSON.stringify(list)
                    },
                    success: function (d) {

                        if (d.Deal) {

                            if (!_.isArray(d.Deal)) d.Deal = [d.Deal]

                            _.each(d.Deal, function (i) {
                                self.sdk.exchanges.info[i.Address] = i
                            })

                            if (clbk)
                                clbk(null, d.Deal)
                        } else {
                            if (clbk)
                                clbk('empty', null)
                        }
                    },

                    fail: function () {
                        if (clbk) {
                            clbk('server')
                        }
                    }
                })

            },
            support: function (payload, clbk) {

                var serialize = function (obj) {
                    var str = [];
                    for (var p in obj)
                        if (obj.hasOwnProperty(p)) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                    return str.join("&");
                }

                var query = serialize(payload);

                fetch(this.api + '/PocShifter/SupportTicket?' + query, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                }).then(function (r) {

                    return r.text();

                }).then(function (r) {

                    clbk(r);

                }).catch(function (err) {

                    clbk(null, err);

                })

            },
            status: function (currency, address, clbk) {

                fetch(this.api + `/PocShifter/GetPOCDealStatus?currency=${currency}&address=${address}`).then(function (d) {

                    return d.json();

                }).then(function (d) {

                    if (d[0]) {
                        if (clbk)
                            clbk(null, d[0])
                    } else {
                        if (clbk)
                            clbk('empty', null)
                    }
                }).catch(function (err) {

                    if (clbk) {
                        clbk('server')
                    }
                })


            },

            rates: function (clbk) {

                self.app.ajax.run({
                    data: {
                        Action: 'GETPOCRATES',
                    },
                    success: function (d) {

                        var rates = {}

                        d.Rate || (d.Rate = [])

                        _.each(d.Rate, function (r, i) {
                            rates[r.Currency.toLowerCase()] = Number(r.Rate) / smulti
                        })

                        if (clbk)
                            clbk(rates)
                    },

                    fail: function () {
                        if (clbk) {
                            clbk('server')
                        }
                    }
                })

            }
        },

        wallet: {

            drawSpendLineActions: function (el, balance, clbk) {

                var total = balance.actual
                var amount = balance.actual - balance.tempbalance

                window.rifticker.add(() => {
                    if (total > 0 && amount < total) {

                        if (!el.find('.spendLine').length) {
                            el.append('<div class="spendLine"><div class="line"></div></div>')
                        }

                        var sline = el.find('.spendLine .line');;

                        if (amount == 0) {
                            if (!sline.hasClass('bad'))
                                sline.addClass('bad')
                        } else {
                            if (sline.hasClass('bad'))
                                sline.removeClass('bad')
                        }

                        sline.css('width', (100 * amount / total) + "%")


                    } else {
                        el.find('.spendLine').remove()
                    }

                    if (clbk)
                        clbk()
                })

            },

        },
        addresses: {
            storage: {

            },

            init: function (clbk) {
                if (!self.sdk.addresses.storage.addresses) {
                    self.sdk.addresses.storage.addresses = [];
                }

                if (!self.sdk.addresses.storage.addressesobj) {
                    self.sdk.addresses.storage.addressesobj = [];
                }

                var anum = 10
                var added = 0

                try {
                    anum = localStorage[self.sdk.address.pnet().address + 'addressesNum'] || 10;
                } catch (e) {}

                var walletsItem = self.sdk.address.pnet().address + 'wallets2';

                var addressesList = [];

                /**
                 * Here we take cached wallet ID's
                 * or generating them dynamically if
                 * not cached.
                 */

                if (walletsItem in localStorage) {

                    try {
                        var wallets = JSON.parse(localStorage[walletsItem]);

                        wallets.forEach((walletAddress, walletNum) => {

                            if (walletNum > anum - 1) return

                            self.sdk.addresses.addCachedWallet(walletNum, walletAddress);

                            addressesList.push(walletAddress);

                            added++
                        });

                    } catch (e) {

                    }


                }



                for (let i = added; i < anum; i++) {
                    var address = self.sdk.addresses.addWalletAddress(i);

                    addressesList.push(address);

                }

                try {
                    localStorage[walletsItem] = JSON.stringify(addressesList);
                } catch (e) {

                }

                self.sdk.addresses.save();

                if (typeof clbk === 'function') {
                    clbk();
                }
            },

            save: function () {
                const countAddresses = self.sdk.addresses.storage.addresses.length;

                if (countAddresses) {
                    const itemName = self.sdk.address.pnet().address + 'addressesNum';

                    try {
                        localStorage[itemName] = countAddresses;
                    } catch (e) {

                    }


                }
            },

            addCachedWallet: function (num, address) {
                const proxyData = {
                    getWalletData: self.sdk.address.wallet,
                    walletNum: num,
                    walletAddress: address,
                };


                /**
                 * Proxy object is used here to
                 * give access to wallet credentials
                 * populator, without really instantiating
                 * wallet data. It creates data only when
                 * requested.
                 */
                const proxy = new Proxy(proxyData, {
                    get: (p, num) => {

                        const addressObj = p.getWalletData(p.walletNum);

                        /**
                         * Once wallet credentials populated
                         * replacing Proxy object with
                         * original wallet data.
                         */
                        self.sdk.addresses.storage.addressesobj[p.walletNum] = addressObj;

                        return addressObj[num];
                    }
                });

                self.sdk.addresses.storage.addresses[num] = address;
                self.sdk.addresses.storage.addressesobj[num] = proxy;
            },

            addWalletAddress: function (num = self.sdk.addresses.storage.addresses.length) {
                const wallet = self.sdk.address.wallet(num);

                self.sdk.addresses.storage.addresses[num] = wallet.address;
                self.sdk.addresses.storage.addressesobj[num] = wallet;

                return wallet.address;
            },

            getRandomAddress: function (clbk) {
                if (self.sdk.addresses.storage.addresses.length) {

                    var ar = _.toArray(self.sdk.addresses.storage.addresses)

                    ar = _.first(ar, 10)

                    var address = ar[rand(0, ar.length - 1)]


                    return address
                } else {
                    var address = self.sdk.addresses.addWalletAddress()

                    return address
                }
            },

            getFirstRandomAddress: function (clbk) {
                if (self.sdk.addresses.storage.addresses.length) {

                    var ar = _.toArray(self.sdk.addresses.storage.addresses)

                    ar = _.first(ar, 10)

                    var address = ar[rand(0, ar.length - 1)]


                    if (clbk)
                        clbk(address)
                } else {
                    var address = self.sdk.addresses.addWalletAddress()

                    if (clbk)
                        clbk(address)
                }
            },

            addNewWalletAddress: function (clbk) {
                if (self.sdk.addresses.storage.addresses.length) {

                    var finded = null;

                    lazyEach({
                        array: self.sdk.addresses.storage.addresses,
                        action: function (p) {

                            if (finded) {
                                p.success();

                                return
                            }

                            var address = p.item;


                            self.app.api.rpc('txunspent', [
                                [address], 1, 9999999
                            ]).then(u => {
                                if (!u.length) {
                                    finded = address;
                                }

                                p.success()
                            }).catch(() => {
                                finded = address;

                                p.success()
                            })

                        },

                        all: {
                            success: function () {

                                if (!finded) {
                                    finded = self.sdk.addresses.addWalletAddress()
                                }

                                if (clbk)
                                    clbk(finded)

                            }
                        }
                    })

                } else {
                    var address = self.sdk.addresses.addWalletAddress()

                    if (clbk)
                        clbk(address)
                }
            }
        },


        address: {
            storage: {

            },
            path: function (n) {
                return "m/44'/0'/0'/" + n + "'"
            },
            path33: function (n) {
                return "m/33'/0'/0'/" + n + "'"
            },
            pnetsimple: function (pubkey) {

                var type = 'p2pkh';
                var a;

                if (type == 'p2pkh' || type == 'p2wpkh') {
                    a = bitcoin.payments[type]({
                        pubkey: pubkey
                    })

                    return a;
                }

            },
            pnet: function (pubkey, type) {

                type || (type = 'p2pkh')

                var pubkeyRefresh = false;

                if (!pubkey) pubkey = self.app.user.key.value;

                else {
                    pubkeyRefresh = true;
                }

                if (!pubkey) {


                    return null
                }

                var _a = this.storage[type],
                    a;

                if (_a && !pubkeyRefresh) {
                    return _a
                }

                if (type == 'p2pkh' || type == 'p2wpkh') {
                    a = bitcoin.payments[type]({
                        pubkey
                    })

                    this.storage[type] = a;

                    return a;
                }

                if (type == 'p2sh') {

                    a = bitcoin.payments['p2wpkh']({
                        pubkey
                    })

                    var p2sh = bitcoin.payments.p2sh({
                        redeem: a
                    })

                    this.storage[type] = p2sh;

                    return p2sh;
                }
            },

            wallet: function (n, _private) {

                const {
                    publicKey: pubkey
                } = self.sdk.address.dumpKeys(n, _private);

                const a = bitcoin.payments['p2wpkh']({
                    pubkey
                });

                const p2sh = bitcoin.payments.p2sh({
                    redeem: a
                });

                return p2sh;
            },

            dumpKeys: function (n, _private = self.app.user.private.value) {
                const addressPath = app.platform.sdk.address.path(n);
                const d = bitcoin.bip32.fromSeed(_private).derivePath(addressPath).toWIF();

                const keyPair = bitcoin.ECPair.fromWIF(d);

                return keyPair;
            },

            dumpPrivKey: function (n) {
                const keyPair = self.sdk.address.dumpKeys(n);

                return keyPair.privateKey;
            },

            registration: function (address, clbk) {

                self.app.api.rpc('getaddressregistration', [
                    [address]
                ]).then(d => {

                    var r = deep(d, '0.date') || 0;

                    if (clbk)
                        clbk(r > 0)

                }).catch(e => {
                    if (clbk) {
                        clbk(null, e)
                    }
                })

            }

        },
        remote: {
            storage: {},
            failed: {},
            loading: {},


            getnew: function (url, action) {

                var s = self.sdk.remote.storage;
                var f = self.sdk.remote.failed;
                var l = self.sdk.remote.loading;

                if (l[url]) return l[url]
                if (f[url]) return Promise.resolve(null)
                if (s[url]) return Promise.resolve(s[url])


                var appinfo = self.app.apps.isApplicationLink(url)

                var apppromise = (() => {
                    return Promise.resolve(null)
                })()

                if (appinfo){
                    apppromise = self.app.apps.get.applicationAny(appinfo).then(r => {

                        if (!r) return Promise.resolve(null)

                        return Promise.resolve({
                            og: {
                                ...r.meta,
                                application: r.application,
                                url: appinfo.url
                            }
                        })

                    })
                }


                l[url] = apppromise.then((d) => {

                    if (d) return Promise.resolve(d)

                    return self.app.api.fetch(action || 'urlPreview', {
                        url
                    })
                }).then(d => {

                    var og = deep(d, 'og');

                    if(!og) return Promise.reject()

                    _.each(og, (o, i) => {
                        og[i] = i == 'application' ? o : superXSS(o)
                    })


                    if (d.video) {
                        og.video = {}

                        _.each(d.video, (o, i) => {
                            og.video[i] = superXSS(o)
                        })
                    }

                    s[url] = og

                    return Promise.resolve(s[url])

                }).catch(e => {
                    f[url] = true

                    return Promise.resolve(null)
                }).finally(() => {
                    delete l[url]
                })

                return l[url]
            },

            get: function (url, clbk, action) {

                var s = this.storage;
                var f = this.failed;

                if (f[url]) {

                    if (clbk)
                        clbk(null)

                    return
                }

                if (s[url]) {
                    if (clbk)
                        clbk(s[url])
                } else {

                    s[url] = {};


                    self.app.api.fetch(action || 'urlPreview', {
                        url
                    }).then(d => {

                        var og = deep(d, 'og');

                        s[url] = og

                        if (!s[url]) {
                            f[url] = true

                            if (clbk)
                                clbk(null)

                            return
                        }

                        if (s[url].title) s[url].title = superXSS(s[url].title);
                        if (s[url].description) s[url].description = superXSS(s[url].description);

                        clbk(s[url]);

                    }).catch(e => {
                        f[url] = true

                        if (clbk)
                            clbk(null)
                    })

                }


            }
        },

        recommendations: {
            storage: {
                status: [],
                shares: [],
                keys: {}
            },

            planned: [],
            shares: [],

            sharesinfo: {},

            enabled: true,

            getcompleted: function (type) {
                return _.filter(self.sdk.recommendations.storage.status, (s) => {
                    return s.type == type && s.status == 'completed'
                })
            },

            plans: function (data, type) {

                var time = self.currentTime()

                var task = {

                    created: time,
                    id: makeid(),
                    status: 'created',

                    type,

                    ...data
                }

                if (type == 'users') {
                    if (
                        !_.find(self.sdk.recommendations.planned, (t) => {
                            return t.address == task.address
                        }) &&
                        !_.find(self.sdk.recommendations.storage.status, (t) => {
                            return t.address == task.address && (time - t.date > 60 * 24 * 14)
                        })
                    ) {
                        self.sdk.recommendations.planned.push(task)
                    }
                }

                if (type == 'tags') {
                    if (
                        !_.find(self.sdk.recommendations.planned, (t) => {
                            return t.hash == task.hash
                        }) &&
                        !_.find(self.sdk.recommendations.storage.status, (t) => {
                            return t.hash == task.hash && (time - t.date > 60 * 24 * 3)
                        })
                    ) {
                        self.sdk.recommendations.planned.push(task)
                    }
                }
            },

            clearplanned: function () {
                self.sdk.recommendations.planned = _.filter(self.sdk.recommendations.planned, (p) => {
                    return p.status == 'created' || p.status == 'processing'
                })
            },

            getshares: function (count, type) {
                if (!count) count = 1

                var result = []
                var remove = {}

                _.find(self.sdk.recommendations.shares, (share, i) => {
                    if (result.length >= count) return true

                    self.sdk.recommendations.storage.shares.unshift({
                        txid: share.txid,
                        date: self.currentTime()
                    })

                    remove[i] = true

                    result.push(share)
                })

                self.sdk.recommendations.storage.shares = _.first(self.sdk.recommendations.storage.shares, 300)


                self.sdk.recommendations.shares = _.filter(self.sdk.recommendations.shares, (a, i) => {
                    return !remove[i]
                })

                if (result.length) {
                    self.sdk.recommendations.save()
                }

                return result
            },
            maketasks: function () {

                if (self.sdk.recommendations.planned.length && self.sdk.recommendations.shares.length < 6) {
                    if (!_.find(self.sdk.recommendations.planned, (p) => {
                            return p.status == 'processing'
                        })) {
                        self.sdk.recommendations.maketask(self.sdk.recommendations.planned[0])
                    }
                }
            },

            maketasksdebounced: _.debounce(() => {
                self.sdk.recommendations.maketasks()
            }, 1000),

            point: function (recommendation) {

                var p = Number(recommendation.score || 0)

                p += 10 * (recommendation.comments || 0)

                p += 50 * (recommendation.reposted || 0)

                var activities = self.app.platform.sdk.activity.has('users', recommendation.address)

                if (activities.point) {
                    p = p + activities.point * 10
                }

                if (recommendation.itisvideo()) {
                    var h = self.app.platform.sdk.videos.historyget(recommendation.txid)

                    if (h.percent > 94) {
                        p = p / 100
                    } else
                    if (h.percent > 5) {
                        p = p * 10
                    }

                }


                if (recommendation.myVal) {
                    p = p / 10
                }

                return p

            },

            prepareshares: function () {
                var shares = self.sdk.recommendations.shares

                var me = self.psdk.userInfo.getmy()

                shares = _.filter(shares, (recommendation) => {
                    if (me && me.relation(recommendation.address, 'blocking')) {
                        return false
                    }

                    return true
                })

                if (!shares.length) {
                    return
                }

                var maxdate = _.max(shares, (u) => {
                    return u.time
                })

                var mindate = _.min(shares, (u) => {
                    return u.time
                })

                var difference = maxdate.time.getTime() - mindate.time.getTime()

                if (difference <= 0) difference = 1


                shares = _.sortBy(shares, (recommendation) => {
                    recommendation.point = self.sdk.recommendations.point(recommendation) * (0.5 + recommendation.time.getTime() - mindate.time.getTime()) / difference
                    return -self.sdk.recommendations.point(recommendation) * (0.5 + recommendation.time.getTime() - mindate.time.getTime()) / difference
                })


                self.sdk.recommendations.shares = _.first(shares, 12)

            },

            maketask: function (task) {

                if (task.status != 'created') return

                if (task.type == 'users') {
                    var p = {
                        contentAddress: task.address,
                        depth: 10000,
                        count: 15,
                        lang: 'all',
                        /*self.app.localization.key*/
                    }

                    var info = {
                        address: task.address,
                        lang: 'all',
                        /*self.app.localization.key*/
                        task: task.id
                    }

                    task.status = 'processing'

                    self.app.platform.sdk.node.shares.getrecomendedcontents(p, (shares, error) => {


                        if (!self.sdk.recommendations.storage.shares) return

                        task.status = 'completed'

                        shares = _.filter(shares, (s) => {
                            return s.address != task.address
                        })

                        _.each(shares, (share) => {
                            if (!_.find(self.sdk.recommendations.storage.shares.concat(self.sdk.recommendations.shares), (s) => {
                                    return s.txid == share.txid
                                })) {

                                self.sdk.recommendations.sharesinfo[share.txid] = {
                                    key: 'users',
                                    info: info
                                }

                                //share.recommendationKey = 'users'
                                //share._recommendationInfo = info
                                self.sdk.recommendations.shares.push(share)

                            }
                        })

                        task.shares = _.map(shares, (s) => {
                            return s.txid
                        })

                        self.sdk.recommendations.prepareshares()

                        self.sdk.recommendations.add(task)

                    }, 'clear');
                }


                if (task.type == 'tags') {
                    var p = {
                        depth: 7000,
                        count: 15,
                        lang: 'all',
                        /*self.app.localization.key*/
                        tagsfilter: task.tags
                    }

                    var info = {
                        lang: 'all',
                        /*self.app.localization.key*/
                        tags: task.tags,
                        task: task.id
                    }


                    task.status = 'processing'

                    self.app.platform.sdk.node.shares.gettopfeed(p, (shares, error) => {

                        task.status = 'completed'

                        /*shares = _.filter(shares, (s) => {
                            return s.address != task.address
                        })*/

                        _.each(shares, (share) => {
                            if (!_.find(self.sdk.recommendations.storage.shares.concat(self.sdk.recommendations.shares), (s) => {
                                    return s.txid == share.txid
                                })) {

                                self.sdk.recommendations.sharesinfo[share.txid] = {
                                    key: 'tags',
                                    info: info
                                }

                                self.sdk.recommendations.shares.push(share)

                            }
                        })

                        task.shares = _.map(shares, (s) => {
                            return s.txid
                        })

                        self.sdk.recommendations.prepareshares()

                        self.sdk.recommendations.add(task)

                    }, 'clear');
                }

            },

            schedulers: {
                users: function () {
                    var users = self.sdk.activity.getinterestingUsers()

                    var user = randomizer(users)

                    if (user) {
                        self.sdk.recommendations.plans({
                            address: user.address
                        }, 'users')
                    }

                },

                tags: function () {
                    var tags = self.sdk.memtags.getprobtags(3)

                    if (tags.length) {

                        var hash = bitcoin.crypto.hash256(JSON.stringify(_.sortBy(tags, (t) => {
                            return t
                        }))).toString('hex')

                        self.sdk.recommendations.plans({
                            tags: tags,
                            hash: hash
                        }, 'tags')
                    }
                }
            },

            successRecommendation: function (share) {
                if (share.recommendationKey) {
                    if (!self.sdk.recommendations.storage.keys[share.recommendationKey]) self.sdk.recommendations.storage.keys[share.recommendationKey] = 0
                    self.sdk.recommendations.storage.keys[share.recommendationKey]++
                    self.sdk.recommendations.save()
                }

            },

            schedulermake: function () {

                if (!self.sdk.recommendations.enabled) return

                self.sdk.recommendations.clearplanned()

                if (!self.sdk.recommendations.storage.keys) self.sdk.recommendations.storage.keys = {}

                self.app.user.isState(function (state) {
                    if (state) {

                        var kf = [
                            /*{
                                a : self.sdk.recommendations.schedulers.users,
                                probability : 50 + (self.sdk.recommendations.storage.keys['users'] || 1)
                            },*/
                            {
                                a: self.sdk.recommendations.schedulers.tags,
                                probability: 50 + (self.sdk.recommendations.storage.keys['tags'] || 1)
                            }
                        ]

                        var action = randomizer(kf)


                        action.a()

                        self.sdk.recommendations.maketasksdebounced()

                    }
                })


            },

            scheduler: _.debounce(() => {
                self.sdk.recommendations.schedulermake()
            }, 1000),

            add: function (task) {
                if (!self.sdk.recommendations.storage.status) return

                self.sdk.recommendations.storage.status.unshift(task)

                self.sdk.recommendations.storage.status = firstEls(self.sdk.recommendations.storage.status, 300)

                self.sdk.recommendations.save()
            },

            lskey: function () {
                if (window.testpocketnet) {
                    return 'recommendations_tn'
                } else {
                    return 'recommendations'
                }
            },

            save: function () {

                try {

                    localStorage[self.sdk.recommendations.lskey()] = JSON.stringify({
                        status: self.sdk.recommendations.storage.status,
                        shares: self.sdk.recommendations.storage.shares,
                        keys: self.sdk.recommendations.storage.keys,

                        unseen: _.filter(_.map(self.sdk.recommendations.shares, (s) => {

                            var exported = s.export()

                            if (exported.lastComment) {
                                var c = self.psdk.comment.get(exported.lastComment)

                                if (c) {
                                    exported.lastComment = c.export()
                                } else {
                                    return null
                                }
                            }

                            return {
                                date: self.currentTime(),
                                share: exported,
                                info: self.sdk.recommendations.sharesinfo[s.txid]
                            }
                        }), e => e)
                    })
                } catch (e) {
                    console.error(e)
                }

            },

            load: function () {

                var p = {};

                try {
                    p = JSON.parse(localStorage[self.sdk.recommendations.lskey()] || '{}');
                } catch (e) {}

                var time = self.currentTime()

                self.sdk.recommendations.storage.status = p.status || []
                self.sdk.recommendations.storage.shares = p.shares || []
                self.sdk.recommendations.storage.keys = p.keys || {}
                self.sdk.recommendations.sharesinfo = {}

                var unseens = _.map(p.unseen || [], (us) => {
                    return {
                        ...us,
                        ...{
                            ___temp: true
                        }
                    }
                })

                return self.psdk.share.insertFromResponse(_.map(_.filter(unseens, (sd) => {

                    if (self.psdk.share.get(sd.share.txid)) return false

                    if (time - sd.date < 60 * 60) {

                        self.sdk.recommendations.sharesinfo[sd.share.txid] = sd.info

                        return true
                    }

                }), (sd) => {
                    return sd.share
                })).then(r => {

                    self.sdk.recommendations.shares = _.filter(self.psdk.share.gets(_.map(r, ({
                        key
                    }) => {
                        return key
                    })), v => v)

                    return Promise.resolve()
                })

            },

            init: function (clbk) {

                self.sdk.recommendations.load().then(() => {
                    self.sdk.recommendations.scheduler()

                    app.platform.sdk.syncStorage.on('change', self.sdk.recommendations.lskey(), () => {
                        self.sdk.recommendations.load()
                    });

                    if (clbk) clbk()
                })


            },

            destroy: function () {
                app.platform.sdk.syncStorage.off('change', self.sdk.recommendations.lskey());
            }
        },

        activity: {
            latest: {},
            allowRequestAfterFive: true,

            getlatest: function (keys, type, count) {
                var r = []

                _.each(keys, (k) => {
                    r = r.concat(self.sdk.activity.latest[k] || [])
                })

                r = _.filter(r, (r) => {
                    return r.type == type
                })

                r = _.sortBy(r, (r) => {
                    return -r.date
                })

                r = _.uniq(r, (r) => {
                    return r.index
                })


                return _.first(r, count)
            },

            getbestaddress: function () {

                if (this.latest && this.latest.like) {

                    var availablesLikes = this.latest.like.filter(function (like) {

                        return like.value && like.data.subscribers_count + like.data.subscribes_count;
                    })


                    var bestAddress = '';
                    var bestCount = 1;

                    availablesLikes.forEach(function (like) {

                        if (like.value > bestCount) {

                            bestAddress = like.data.address;
                            bestCount = like.value;

                        } else if (!bestAddress && (like.value === bestCount)) {

                            bestAddress = like.data.address;
                        }
                    })

                    return bestAddress;
                }

                return ''



            },

            getinterestingUsers: function () {
                var users = {}

                var s = self.sdk.activity

                if (self.sdk.address.pnet()) {

                    _.each(s.latest || [], (a, i) => {

                        if (i == 'visited' || i == 'search' || i == 'transaction') return

                        _.each(a, (o) => {
                            if (o.type == 'user') {

                                if (o.id != self.sdk.address.pnet().address) {
                                    users[o.id] || (users[o.id] = {
                                        date: o.date,
                                        address: o.id,
                                        points: 0,
                                        value: 0
                                    })

                                    users[o.id].points = users[o.id].points + s.points.users[i] || 10
                                    users[o.id].value = users[o.id].value + (o.data.value || 1)

                                    if (o.date > users[o.id].date) users[o.id].date = o.date
                                }


                            }
                        })

                    })

                }

                if (_.isEmpty(users)) return []

                var maxdate = _.max(users, (u) => {
                    return u.date
                })

                var mindate = _.min(users, (u) => {
                    return u.date
                })

                var difference = maxdate.date - mindate.date

                if (difference <= 0) difference = 1

                var probabilitymap = _.map(users, (user) => {

                    return {
                        probability: (Math.max(user.value, 1000) + user.points) * (user.date - mindate.date) / difference,
                        address: user.address
                    }
                })

                return probabilitymap
            },

            clear: function () {
                self.sdk.activity.latest = {}
                self.sdk.activity.save()
            },

            addtagsearch: function (value) {

                var hash = bitcoin.crypto.hash256(value).toString('hex')

                var info = {
                    id: hash,
                    index: value.toLowerCase(),
                    value: value
                }


                self.sdk.activity.add('search', 'tags', info)

            },

            addsearch: function (value) {

                var hash = bitcoin.crypto.hash256(value).toString('hex')

                var info = {
                    id: hash,
                    index: value.toLowerCase(),
                    value: value
                }

                self.sdk.activity.add('search', 'str', info)

            },

            points: {
                users: {
                    like: 50,
                    clike: 20,
                    search: 30,
                    subscribe: 100,
                    visited: 20,
                    transaction: 20,
                    video: 30
                }
            },

            has: function (key, id) {

                var sum = 1

                var activities = _.filter(

                    _.map(self.sdk.activity.latest, function (ar, k) {


                        if (_.find(ar, function (u, k) {
                                return id == u.id
                            })) {

                            var p = self.sdk.activity.points[key][k] || 20

                            sum += p

                            return {
                                k: k,
                                p: p
                            }

                        } else {
                            return null
                        }


                    })

                    ,
                    function (v) {
                        return v
                    })

                return {
                    activities,
                    point: sum
                }
            },

            adduser: function (key, address, value) {

                if (!address) return

                self.sdk.users.get([address], function () {

                    var user = self.psdk.userInfo.get(address)

                    if (user) {

                        var info = {
                            id: address,
                            index: user.name.toLowerCase(),
                            name: user.name,
                            image: user.image,
                            address: address,
                            subscribers_count: user.subscribers_count,
                            subscribes_count: user.subscribes_count,
                            value: Number(value || '0')
                        }

                        var error = self.sdk.activity.add(key, 'user', info)

                    }

                }, true)

            },

            add: function (key, type, info) {

                var l = self.sdk.activity.latest

                if (!info.index) return 'index'
                if (!info.id) return 'id'

                l[key] || (l[key] = [])

                var obj = {
                    index: info.index,
                    id: info.id,
                    type: type,
                }

                if (type == 'user') {
                    if (!info.name || !info.address || !info.image) {
                        return 'validation'
                    }

                    obj.data = {
                        name: info.name,
                        address: info.address,
                        image: info.image,
                        subscribes_count: info.subscribes_count,
                        subscribers_count: info.subscribers_count,
                    }

                    var dvalue = 0

                    if (key == 'like') {
                        dvalue = 5
                    }

                    if (key == 'video') {
                        dvalue = 0.1
                    }

                    if (dvalue) {
                        var prev = _.find(l[key], (o) => {
                            return o.id == info.id
                        })


                        if (prev && prev.data) {
                            obj.data.value = Number(prev.data.value || (1)) + Number(info.value)
                        } else {
                            obj.data.value = Number(info.value)
                        }

                    }
                }


                if (type == 'str' || type == 'tags') {
                    if (!info.value) {
                        return 'validation'
                    }

                    obj.data = {
                        value: info.value
                    }
                }

                obj.date = self.currentTime()

                l[key] = _.filter(l[key], function (objects) {
                    return objects.id != info.id && objects.index != info.index
                })

                l[key].unshift(obj)

                l[key] = firstEls(l[key], 300)

                self.sdk.activity.save();

                if (type == 'user' && (key != 'visited' && key != 'search' && key != 'transaction')) {
                    self.sdk.recommendations.scheduler()
                }

            },

            key: function () {
                if (window.testpocketnet) {
                    return 'latestactivity_test'
                }

                return 'latestactivity'
            },

            save: function () {


                try {
                    localStorage[self.sdk.activity.key()] = JSON.stringify({
                        activity: self.sdk.activity.latest
                    })
                } catch (e) {

                }
            },

            load: function (clbk) {
                var p = {};


                try {
                    p = JSON.parse(localStorage[self.sdk.activity.key()] || '{}');
                } catch (e) {}


                if (!p.activity) p.activity = {}

                self.sdk.activity.latest = p.activity

                self.sdk.activity.filladdressstorage()

                if (clbk) clbk()
            },

            filladdressstorage: function () {

                var stor = self.app.platform.sdk.users.nameaddressstorage

                _.each(self.sdk.activity.latest, function (l) {
                    _.each(l, function (a) {

                        if (a.type == 'user') stor[a.index] = a.id
                    })
                })

            }
        },

        categories: {
            data: {
                all: {
                    en: [{
                            name: "Memes/Funny",
                            tags: ['funny', 'memes'],
                            id: 'c2'
                        },
                        {
                            name: "Politics",
                            tags: ['politics'],
                            id: 'c3'
                        },
                        {
                            name: "Crypto",
                            tags: ['crypto'],
                            id: 'c4'
                        },
                        {
                            name: "Technology/Science",
                            tags: ['technology', 'science'],
                            id: 'c5'
                        },
                        {
                            name: "Faith/Religion",
                            tags: ['faith', 'religion'],
                            id: 'c55'
                        },
                        {
                            name: "Investing/Finance",
                            tags: ['investing', 'finance'],
                            id: 'c6'
                        },

                        {
                            name: "PKOIN/peer-to-peer",
                            tags: ['pkoin_commerce'],
                            id: 'c63',
                            new: app.pkoindisable ? false : true
                        },

                        {
                            name: "COVID/Lockdowns",
                            tags: ['covid', 'lockdowns'],
                            id: 'c72'
                        },

                        {
                            name: "Auto/Racing",
                            tags: ['auto', 'racing'],
                            id: 'c7'
                        },
                        {
                            name: "Bastyon/Pocketnet",
                            tags: ['bastyon', 'pocketnet'],
                            id: 'c71'
                        },
                        {
                            name: "Sports",
                            tags: ['sports'],
                            id: 'c8'
                        },
                        {
                            name: "Gaming",
                            tags: ['gaming'],
                            id: 'c9'
                        },


                        {
                            name: "Art/Music",
                            tags: ['art', 'music'],
                            id: 'c11'
                        },

                        {
                            name: "News/Commentary",
                            tags: ['news', 'commentary'],
                            id: 'c12'
                        },

                        {
                            name: "History",
                            tags: ['history'],
                            id: 'c13'
                        },
                        {
                            name: "Story time",
                            tags: ['storytime'],
                            id: 'c14'
                        },

                        {
                            name: "Film/Animation",
                            tags: ['film', 'animation'],
                            id: 'c15'
                        },

                        {
                            name: "Nature/Animals",
                            tags: ['nature', 'animals'],
                            id: 'c16'
                        },

                        {
                            name: "Travel/Architecture",
                            tags: ['travel', 'architecture'],
                            id: 'c17'
                        },

                        {
                            name: "DIY",
                            tags: ['diy'],
                            id: 'c18'
                        }
                    ],
                    ru: [{
                            name: "Мемы/Юмор",
                            tags: ['мемы', 'юмор'],
                            id: 'c2'
                        },
                        {
                            name: "Политика",
                            tags: ['политика'],
                            id: 'c3'
                        },
                        {
                            name: "Криптовалюта",
                            tags: ['Криптовалюта'],
                            id: 'c4'
                        },
                        {
                            name: "Наука/Технологии",
                            tags: ['технологии', 'наука'],
                            id: 'c5'
                        },
                        {
                            name: "Вера/Религия",
                            tags: ['вера', 'религия'],
                            id: 'c55'
                        },
                        {
                            name: "Финансы/Инвестиции",
                            tags: ['финансы', 'инвестиции'],
                            id: 'c6'
                        },

                        {
                            name: "PKOIN/из рук в руки",
                            tags: ['pkoin_commerce'],
                            id: 'c63',
                            new: app.pkoindisable ? false : true
                        },


                        {
                            name: "COVID/локдаун",
                            tags: ['covid', 'локдаун'],
                            id: 'c72'
                        },
                        {
                            name: "Автомобили/Гонки",
                            tags: ['auto', 'racing'],
                            id: 'c7'
                        },
                        {
                            name: "Bastyon/Pocketnet",
                            tags: ['bastyon', 'pocketnet'],
                            id: 'c71'
                        },

                        {
                            name: "Спорт",
                            tags: ['спорт'],
                            id: 'c8'
                        },
                        {
                            name: "Игры",
                            tags: ['игры'],
                            id: 'c9'
                        },


                        {
                            name: "Искусство/Музыка",
                            tags: ['искусство', 'музыка'],
                            id: 'c11'
                        },

                        {
                            name: "Новости/Комментарии",
                            tags: ['новости', 'комментарии'],
                            id: 'c12'
                        },

                        {
                            name: "История",
                            tags: ['история'],
                            id: 'c13'
                        },
                        {
                            name: "Время историй",
                            tags: ['истории'],
                            id: 'c14'
                        },

                        {
                            name: "Кино/Анимация",
                            tags: ['кино', 'анимация'],
                            id: 'c15'
                        },

                        {
                            name: "Природа/Животные",
                            tags: ['Природа', 'животные'],
                            id: 'c16'
                        },

                        {
                            name: "Путешествия/Архитектура",
                            tags: ['путешествия', 'архитектура'],
                            id: 'c17'
                        },

                        {
                            name: "Сделай сам",
                            tags: ['сделайсам'],
                            id: 'c18'
                        }
                    ],
                    cmn: [{
                            name: "模因/幽默",
                            tags: ['模因', '幽默'],
                            id: 'c2'
                        },
                        {
                            name: "政治",
                            tags: ['政治'],
                            id: 'c3'
                        },
                        {
                            name: "加密貨幣",
                            tags: ['加密貨幣'],
                            id: 'c4'
                        },
                        {
                            name: "科學/技術",
                            tags: ['技術', '科學'],
                            id: 'c5'
                        },
                        {
                            name: "信仰/宗教",
                            tags: ['信仰', '宗教'],
                            id: 'c55'
                        },
                        {
                            name: "金融/投資",
                            tags: ['金融', '投資'],
                            id: 'c6'
                        },
                        {
                            name: "PKOIN/peer-to-peer",
                            tags: ['pkoin_commerce'],
                            id: 'c63',
                            new: app.pkoindisable ? false : true
                        },

                        {
                            name: "冠狀病毒病/封鎖",
                            tags: ['冠狀病毒病', '封鎖'],
                            id: 'c72'
                        },
                        {
                            name: "汽車/賽車",
                            tags: ['汽車', '賽車'],
                            id: 'c7'
                        },
                        {
                            name: "Bastyon/Pocketnet",
                            tags: ['bastyon', 'pocketnet'],
                            id: 'c71'
                        },
                        {
                            name: "運動",
                            tags: ['運動'],
                            id: 'c8'
                        },
                        {
                            name: "遊戲",
                            tags: ['遊戲'],
                            id: 'c9'
                        },


                        {
                            name: "藝術/音樂",
                            tags: ['藝術', '音樂'],
                            id: 'c11'
                        },

                        {
                            name: "新聞/評論",
                            tags: ['新聞', '評論'],
                            id: 'c12'
                        },

                        {
                            name: "歷史",
                            tags: ['歷史'],
                            id: 'c13'
                        },
                        {
                            name: "故事時間",
                            tags: ['故事時間'],
                            id: 'c14'
                        },

                        {
                            name: "電影/動畫",
                            tags: ['電影', '動畫'],
                            id: 'c15'
                        },

                        {
                            name: "自然/動物",
                            tags: ['自然', '動物'],
                            id: 'c16'
                        },

                        {
                            name: "旅遊/建築",
                            tags: ['旅遊', '建築'],
                            id: 'c17'
                        },

                        {
                            name: "自己做",
                            tags: ['自己做'],
                            id: 'c18'
                        }
                    ],
                    kr: [{
                            name: "밈/유머",
                            tags: ['밈', '유머'],
                            id: 'c2'
                        },
                        {
                            name: "정치",
                            tags: ['정치'],
                            id: 'c3'
                        },
                        {
                            name: "암호 화폐",
                            tags: ['암호 화폐'],
                            id: 'c4'
                        },
                        {
                            name: "과학/기술",
                            tags: ['기술', '과학'],
                            id: 'c5'
                        },
                        {
                            name: "신앙/종교",
                            tags: ['신앙', '종교'],
                            id: 'c55'
                        },
                        {
                            name: "금융/투자",
                            tags: ['금융', '투자'],
                            id: 'c6'
                        },
                        {
                            name: "PKOIN/peer-to-peer",
                            tags: ['pkoin_commerce'],
                            id: 'c63',
                            new: app.pkoindisable ? false : true
                        },

                        {


                            name: "COVID/Lockdowns",
                            tags: ['코로나', '잠금'],
                            id: 'c72'
                        },
                        {
                            name: "자동차/레이싱 ",
                            tags: ['자동차', '레이싱'],
                            id: 'c7'
                        },
                        {
                            name: "Bastyon/Pocketnet",
                            tags: ['bastyon', 'pocketnet'],
                            id: 'c71'
                        },
                        {
                            name: "스포츠",
                            tags: ['스포츠'],
                            id: 'c8'
                        },
                        {
                            name: "계략",
                            tags: ['계략'],
                            id: 'c9'
                        },

                        {
                            name: "예술/음악",
                            tags: ['예술', '음악'],
                            id: 'c11'
                        },

                        {
                            name: "뉴스/댓글",
                            tags: ['뉴스', '댓글'],
                            id: 'c12'
                        },

                        {
                            name: "역사",
                            tags: ['역사'],
                            id: 'c13'
                        },
                        {
                            name: "이야기의 시간",
                            tags: ['이야기의시간'],
                            id: 'c14'
                        },

                        {
                            name: "영화/애니메이션",
                            tags: ['영화', '애니메이션'],
                            id: 'c15'
                        },

                        {
                            name: "자연/동물",
                            tags: ['자연', '동물'],
                            id: 'c16'
                        },

                        {
                            name: "여행/건축",
                            tags: ['여행', '건축'],
                            id: 'c17'
                        },

                        {
                            name: "너 스스로해라",
                            tags: ['너스스로해라'],
                            id: 'c18'
                        }
                    ],
                    fr: [{
                            name: "Mèmes/Humour",
                            tags: ['mèmes', 'humour'],
                            id: 'c2'
                        },
                        {
                            name: "Politique",
                            tags: ['politique'],
                            id: 'c3'
                        },
                        {
                            name: "Crypto-monnaie",
                            tags: ['Crypto-monnaie'],
                            id: 'c4'
                        },
                        {
                            name: "Technologie/Scientifique",
                            tags: ['technologie', 'scientifique'],
                            id: 'c5'
                        },
                        {
                            name: "Foi/Religion ",
                            tags: ['foi', 'religion'],
                            id: 'c55'
                        },
                        {
                            name: "Finances/Investissements",
                            tags: ['finances', 'investissements'],
                            id: 'c6'
                        },
                        {
                            name: "PKOIN/peer-to-peer",
                            tags: ['pkoin_commerce'],
                            id: 'c63',
                            new: app.pkoindisable ? false : true
                        },

                        {

                            name: "COVID/Verrouillages",
                            tags: ['covid', 'Verrouillages'],
                            id: 'c72'
                        },
                        {
                            name: "Voitures/Courses",
                            tags: ['voitures', 'courses'],
                            id: 'c7'
                        },
                        {
                            name: "Bastyon/Pocketnet",
                            tags: ['bastyon', 'pocketnet'],
                            id: 'c71'
                        },
                        {
                            name: "Sport",
                            tags: ['Sport'],
                            id: 'c8'
                        },
                        {
                            name: "Jeux",
                            tags: ['jeux'],
                            id: 'c9'
                        },

                        {
                            name: "Art/Musique",
                            tags: ['art', 'musique'],
                            id: 'c11'
                        },

                        {
                            name: "Nouvelles/Commentaires",
                            tags: ['nouvelles', 'commentaires'],
                            id: 'c12'
                        },

                        {
                            name: "histoire",
                            tags: ['histoire'],
                            id: 'c13'
                        },
                        {
                            name: "Le temps des histoires",
                            tags: ['Letempsdeshistoires'],
                            id: 'c14'
                        },

                        {
                            name: "Cinéma/Animation",
                            tags: ['cinéma', 'animation'],
                            id: 'c15'
                        },

                        {
                            name: "Nature/Animaux",
                            tags: ['nature', 'animaux'],
                            id: 'c16'
                        },

                        {
                            name: "Voyage/Architecture",
                            tags: ['voyage', 'architecture'],
                            id: 'c17'
                        },

                        {
                            name: "Fais le toi-même",
                            tags: ['faisletoi-même'],
                            id: 'c18'
                        }
                    ],
                    es: [{
                            name: "Memes/Humor ",
                            tags: ['мемы', 'юмор'],
                            id: 'c2'
                        },
                        {
                            name: "Política",
                            tags: ['política'],
                            id: 'c3'
                        },
                        {
                            name: "Criptomoneda",
                            tags: ['criptomoneda'],
                            id: 'c4'
                        },
                        {
                            name: "Tecnología/Сientífica ",
                            tags: ['tecnología', 'científica'],
                            id: 'c5'
                        },
                        {
                            name: "Fe/Religión ",
                            tags: ['fe', 'religión'],
                            id: 'c55'
                        },
                        {
                            name: "Finanzas/Inversiones",
                            tags: ['finanzas', 'inversiones'],
                            id: 'c6'
                        },
                        {
                            name: "PKOIN/peer-to-peer",
                            tags: ['pkoin_commerce'],
                            id: 'c63',
                            new: app.pkoindisable ? false : true
                        },

                        {
                            name: "COVID/Cierres",
                            tags: ['covid', 'сierres'],
                            id: 'c72'
                        },
                        {
                            name: "Coches/Carreras",
                            tags: ['coches', 'carreras'],
                            id: 'c7'
                        },
                        {
                            name: "Bastyon/Pocketnet",
                            tags: ['bastyon', 'pocketnet'],
                            id: 'c71'
                        },
                        {
                            name: "Deporte",
                            tags: ['deporte'],
                            id: 'c8'
                        },
                        {
                            name: "Juegos",
                            tags: ['juegos'],
                            id: 'c9'
                        },


                        {
                            name: "Arte/Musical ",
                            tags: ['arte', 'musical'],
                            id: 'c11'
                        },

                        {
                            name: "Noticias/Comentarios",
                            tags: ['noticias', 'comentarios'],
                            id: 'c12'
                        },

                        {
                            name: "Historia",
                            tags: ['historia'],
                            id: 'c13'
                        },
                        {
                            name: "Tiempo de historias",
                            tags: ['Tiempo de historias'],
                            id: 'c14'
                        },

                        {
                            name: "Cine/Animación",
                            tags: ['cine', 'animación'],
                            id: 'c15'
                        },

                        {
                            name: "Naturaleza/Animales",
                            tags: ['naturaleza', 'animales'],
                            id: 'c16'
                        },

                        {
                            name: "Viajes/Arquitectura",
                            tags: ['viajes', 'arquitectura'],
                            id: 'c17'
                        },

                        {
                            name: "Hazlo tu mismo",
                            tags: ['hazlotumismo'],
                            id: 'c18'
                        }
                    ],
                    de: [{
                            name: "Meme/Humor ",
                            tags: ['meme', 'hunor'],
                            id: 'c2'
                        },
                        {
                            name: "Politik",
                            tags: ['politik'],
                            id: 'c3'
                        },
                        {
                            name: "Kryptowährung",
                            tags: ['Kryptowährung'],
                            id: 'c4'
                        },
                        {
                            name: "Wissenschaft/Technologie ",
                            tags: ['technologie', 'wissenschaft'],
                            id: 'c5'
                        },
                        {
                            name: "Glaube/Religion",
                            tags: ['glaube', 'religion'],
                            id: 'c55'
                        },
                        {
                            name: "Finanzen/Investitionen ",
                            tags: ['finanzen', 'investitionen'],
                            id: 'c6'
                        },
                        {
                            name: "PKOIN/peer-to-peer",
                            tags: ['pkoin_commerce'],
                            id: 'c63',
                            new: app.pkoindisable ? false : true
                        },

                        {
                            name: "COVID/Sperren",
                            tags: ['covid', 'Sperren'],
                            id: 'c72'
                        },
                        {
                            name: "Autos/Rennen ",
                            tags: ['autos', 'rennen'],
                            id: 'c7'
                        },
                        {
                            name: "Bastyon/Pocketnet",
                            tags: ['bastyon', 'pocketnet'],
                            id: 'c71'
                        },
                        {
                            name: "Sport",
                            tags: ['sport'],
                            id: 'c8'
                        },
                        {
                            name: "Spielen",
                            tags: ['spielen'],
                            id: 'c9'
                        },


                        {
                            name: "Kunst/Musik ",
                            tags: ['kunst', 'music'],
                            id: 'c11'
                        },

                        {
                            name: "Neuigkeiten/Kommentare",
                            tags: ['neuigkeiten', 'kommentare'],
                            id: 'c12'
                        },

                        {
                            name: "Geschichte",
                            tags: ['geschichte'],
                            id: 'c13'
                        },
                        {
                            name: "Zeit der Geschichten",
                            tags: ['zeit der geschichten '],
                            id: 'c14'
                        },

                        {
                            name: "Film/Animation ",
                            tags: ['film', 'animation'],
                            id: 'c15'
                        },

                        {
                            name: "Natur/Tiere ",
                            tags: ['natur', 'tiere'],
                            id: 'c16'
                        },

                        {
                            name: "Reisen/Architektur ",
                            tags: ['reisen', 'architektur'],
                            id: 'c17'
                        },

                        {
                            name: "Mach es selbst",
                            tags: ['machesselbst'],
                            id: 'c18'
                        }
                    ],
                    it: [{
                            name: "Meme/divertente",
                            tags: ['divertente', 'meme'],
                            id: 'c2'
                        },
                        {
                            name: "Politica",
                            tags: ['politica'],
                            id: 'c3'
                        },
                        {
                            name: "Cripto",
                            tags: ['cripto'],
                            id: 'c4'
                        },
                        {
                            name: "Tecnologia/Scienza",
                            tags: ['tecnologia', 'scienza'],
                            id: 'c5'
                        },
                        {
                            name: "Fede/Religione",
                            tags: ['fede', 'religione'],
                            id: 'c55'
                        },
                        {
                            name: "Investire/Finanza",
                            tags: ['investire', 'finanza'],
                            id: 'c6'
                        },
                        {
                            name: "PKOIN/peer-to-peer",
                            tags: ['pkoin_commerce'],
                            id: 'c63',
                            new: app.pkoindisable ? false : true
                        },

                        {
                            name: "COVID/Quarantena",
                            tags: ['covid', 'quarantena'],
                            id: 'c72'
                        },

                        {
                            name: "Auto/Da corsa",
                            tags: ['auto', 'dacorsa'],
                            id: 'c7'
                        },
                        {
                            name: "Bastyon/Pocketnet",
                            tags: ['bastyon', 'pocketnet'],
                            id: 'c71'
                        },
                        {
                            name: "Sport",
                            tags: ['sport'],
                            id: 'c8'
                        },
                        {
                            name: "Gioco",
                            tags: ['gioco'],
                            id: 'c9'
                        },


                        {
                            name: "Arte/Musica",
                            tags: ['arte', 'musica'],
                            id: 'c11'
                        },

                        {
                            name: "Notizia/Commento",
                            tags: ['notizia', 'commento'],
                            id: 'c12'
                        },

                        {
                            name: "Storia",
                            tags: ['storia'],
                            id: 'c13'
                        },
                        {
                            name: "Ora della favola",
                            tags: ['oradellafavola'],
                            id: 'c14'
                        },

                        {
                            name: "Film/Animazione",
                            tags: ['film', 'animazione'],
                            id: 'c15'
                        },

                        {
                            name: "Natura/Animali",
                            tags: ['nature', 'animali'],
                            id: 'c16'
                        },

                        {
                            name: "Viaggiare/Architettura",
                            tags: ['viaggiare', 'architettura'],
                            id: 'c17'
                        },

                        {
                            name: "Fai da te",
                            tags: ['faidate'],
                            id: 'c18'
                        }
                    ]
                },

                categoryIcons: [{
                        "id": "c2",
                        "icon": "far fa-smile"
                    },
                    {
                        "id": "c3",
                        "icon": "fas fa-award"
                    },
                    {
                        "id": "c4",
                        "icon": "fab fa-btc"
                    },
                    {
                        "id": "c5",
                        "icon": "fas fa-microscope"
                    },
                    {
                        "id": "c55",
                        "icon": "fas fa-book"
                    },
                    {
                        "id": "c6",
                        "icon": "fas fa-dollar-sign"
                    },
                    {
                        "id": "c73",
                        "icon": "fas fa-fist-raised"
                    },
                    {
                        "id": "c72",
                        "icon": "fas fa-thermometer"
                    },
                    {
                        "id": "c7",
                        "icon": "fas fa-flag-checkered"
                    },
                    {
                        "id": "c8",
                        "icon": "fas fa-running"
                    },
                    {
                        "id": "c9",
                        "icon": "fas fa-gamepad"
                    },
                    {
                        "id": "c10",
                        "icon": "fas fa-space-shuttle"
                    },
                    {
                        "id": "c11",
                        "icon": "fas fa-music"
                    },
                    {
                        "id": "c12",
                        "icon": "fas fa-newspaper"
                    },
                    {
                        "id": "c13",
                        "icon": "fas fa-history"
                    },
                    {
                        "id": "c14",
                        "icon": "fas fa-bookmark"
                    },
                    {
                        "id": "c15",
                        "icon": "fas fa-film"
                    },
                    {
                        "id": "c16",
                        "icon": "fas fa-paw"
                    },
                    {
                        "id": "c17",
                        "icon": "fas fa-route"
                    },
                    {
                        "id": "c18",
                        "icon": "fas fa-pencil-ruler"
                    }
                ]
            },

            settings: {
                tags: {},
                selected: {},
                added: {},
                excluded: {}
            },

            clbks: {
                selected: {},
                added: {},
                tags: {},
                removed: {},
                excluded: {}
            },

            fromTags: function (tags, _k) {
                var result = {
                    categories: [],
                    tags: []
                }

                var usedtags = {}

                var all = self.sdk.categories.get()

                _.each(all, function (ca) {
                    var addedtags = _.filter(tags, function (tag) {
                        return _.indexOf(ca.tags, tag.toLowerCase()) > -1
                    })

                    if (addedtags.length == ca.tags.length) {
                        result.categories.push(ca)

                        _.each(ca.tags, function (t) {
                            usedtags[t] = true
                        })
                    }
                })

                _.each(tags, function (tag) {
                    if (!usedtags[tag]) result.tags.push(tag)
                })

                return result
            },

            getaddedtags: function (_k) {

                var k = _k || self.app.localization.key

                if (!self.sdk.categories.data.all[k]) k = 'en'

                var selected = self.sdk.categories.settings.selected[k] || {}
                var addedtags = _.map(self.sdk.categories.settings.tags[k] || {}, function (v, i) {
                    return i
                })

                return addedtags
            },

            gettagsexcluded: function (_k, onlycategories) {
                var tags = []

                var k = _k || self.app.localization.key

                if (!self.sdk.categories.data.all[k]) k = 'en'

                var excluded = self.sdk.categories.settings.excluded[k] || {};

                var all = self.sdk.categories.get(k)

                _.each(all, function (c) {
                    if (excluded[c.id]) tags = tags.concat(c.tags)
                })


                if (onlycategories === 'onlytags') tags = excluded

                return tags
            },


            gettags: function (_k, onlycategories) {
                var tags = []

                var k = _k || self.app.localization.key

                if (!self.sdk.categories.data.all[k]) k = 'en'

                var selected = self.sdk.categories.settings.selected[k] || {}
                var addedtags = _.map(self.sdk.categories.settings.tags[k] || {}, function (v, i) {
                    return i
                })

                var all = self.sdk.categories.get(k)

                _.each(all, function (c) {
                    if (selected[c.id]) tags = tags.concat(c.tags)
                })

                if (!onlycategories)
                    tags = tags.concat(addedtags)

                if (onlycategories === 'onlytags') tags = addedtags

                return tags
            },

            getalltagsmap: function () {
                var t = {}
                _.each(self.sdk.categories.data.all, (l) => {
                    _.each(l, (c) => {
                        _.each(c.tags, (tg) => {

                            t[tg] = true
                        })
                    })
                })

                return t
            },

            gettagsmap: function (_k) {
                var ctags = self.sdk.categories.gettags(_k, true)
                var alltags = self.sdk.categories.gettags(_k)


                var mp = {}

                _.each(alltags, function (tag) {
                    mp[tag] = {
                        selected: true,
                        fixed: _.indexOf(ctags, tag) > -1
                    }

                })

                return mp
            },

            remove: function (id, _k) {
                var s = self.sdk.categories.settings
                var k = _k || self.app.localization.key

                if (!self.sdk.categories.data.all[k]) k = 'en'

                delete s.added[k][id]

                var selected = self.sdk.categories.settings.selected[k] || {}

                var changeselected = selected[id]

                delete selected[id]

                self.sdk.categories.save()

                if (changeselected) {
                    _.each(self.sdk.categories.clbks.selected, function (f) {
                        f(id, false, k)
                    })
                }

                _.each(self.sdk.categories.clbks.removed, function (f) {
                    f(id, k)
                })
            },

            add: function (category, _k) {

                if (!category.id) return 'id'
                if (!category.name.trim()) return 'name'
                if (!category.tags) return 'tags'
                if (!category.tags.length) return 'tags'

                category.tags = _.map(category.tags, function (t) {
                    return t.replace("#", '').toLowerCase()
                })

                var s = self.sdk.categories.settings
                var k = _k || self.app.localization.key

                if (!self.sdk.categories.data.all[k]) k = 'en'

                var exist = _.find(s.added[k], function (ca) {
                    if (ca.name == category.name) return true
                })

                if (exist) {
                    if (exist.id != category.id) {
                        return 'doublename'
                    }
                }

                s.added[k] || (s.added[k] = {})
                s.added[k][category.id] = {
                    name: category.name,
                    id: category.id,
                    tags: category.tags
                }

                _.each(self.sdk.categories.clbks.added, function (f) {
                    f(id, k)
                })

                self.sdk.categories.save()

                return false
            },

            tag: function (tag, _k) {

                if (!tag) return 'emptyid'


                var s = self.sdk.categories.settings
                var k = _k || self.app.localization.key

                if (!self.sdk.categories.data.all[k]) k = 'en'

                s.tags[k] || (s.tags[k] = {})

                self.app.Logger.info({
                    actionId: 'SELECT_FEED_TAG',
                    actionValue: tag,
                    actionSubType: s.tags[k][tag] ? 'DESELECT' : 'SELECT'
                });

                if (s.tags[k][tag])
                    delete s.tags[k][tag]

                else s.tags[k][tag] = true

                self.sdk.categories.save()

                _.each(self.sdk.categories.clbks.tags, function (f) {
                    f(tag, s.tags[k][tag], k)
                })


                return false
            },

            geteslected: function (_k) {
                var allcats = self.sdk.categories.get()

                var s = self.sdk.categories.settings
                var k = _k || self.app.localization.key

                if (!self.sdk.categories.data.all[k]) k = 'en'

                s.selected[k] || (s.selected[k] = {})

                return _.filter(allcats, function (c) {
                    return s.selected[k][c.id]
                })

            },

            clear: function (_k, onlytags) {
                var s = self.sdk.categories.settings
                var k = _k || self.app.localization.key

                if (!self.sdk.categories.data.all[k]) k = 'en'

                if (!onlytags)
                    s.selected[k] = {}
                s.excluded[k] = {}

                s.tags[k] = {}

                self.sdk.categories.save()

                _.each(self.sdk.categories.clbks.selected, function (f) {
                    f(null, false, k)
                })

                _.each(self.sdk.categories.clbks.excluded, function (f) {
                    f(null, false, k)
                })
            },

            select: function (id, _k) {
                if (!id) return 'emptyid'

                var allcats = self.sdk.categories.get(_k)

                var cat = _.find(allcats, function (c) {
                    return c.id == id
                })

                if (!cat) return 'cantonfound'

                var s = self.sdk.categories.settings
                var k = _k || self.app.localization.key

                if (!self.sdk.categories.data.all[k]) k = 'en'

                s.selected[k] || (s.selected[k] = {})

                var categoryNameForLogs = self.sdk.categories.getByIdForLogs(cat.id);

                self.app.Logger.info({
                    actionId: 'SELECT_FEED_CATEGORY',
                    actionValue: categoryNameForLogs.name,
                    actionSubType: s.selected[k][id] ? 'DESELECT' : 'SELECT'
                });

                if (s.selected[k][id])
                    delete s.selected[k][id]

                else s.selected[k][id] = true

                self.sdk.categories.save();

                _.each(self.sdk.categories.clbks.selected, function (f) {
                    f(id, s.selected[k][id], k)
                })

                return false
            },

            exclude: function (id, _k) {

                if (!id) return 'emptyid'

                var allcats = self.sdk.categories.get(_k)

                var cat = _.find(allcats, function (c) {
                    return c.id == id
                })

                if (!cat) return 'cantonfound'

                var s = self.sdk.categories.settings
                var k = _k || self.app.localization.key

                if (!self.sdk.categories.data.all[k]) k = 'en'

                s.excluded[k] || (s.excluded[k] = {})


                if (s.excluded[k][id]) {

                    delete s.excluded[k][id];

                } else {
                    s.excluded[k][id] = true;

                    s.selected[k] || (s.selected[k] = {})

                    if (s.selected[k][id]) {
                        delete s.selected[k][id]


                        _.each(self.sdk.categories.clbks.selected, function (f) {
                            f(id, s.selected[k][id], k)
                        })
                    }
                }


                self.sdk.categories.save()

                _.each(self.sdk.categories.clbks.excluded, function (f) {
                    f(id, s.excluded[k][id], k)
                })


                return false
            },

            get: function (_k) {
                var k = _k || self.app.localization.key;

                var added = _.map(self.sdk.categories.settings.added[k] || {},
                    function (c) {
                        var cc = _.clone(c);

                        cc.added = true;


                        return cc
                    })

                var categories = self.sdk.categories.data.all[k] || self.sdk.categories.data.all['en'];

                var categoryIcons = self.sdk.categories.data.categoryIcons;

                categories = _.map(categories, function (k) {
                    var withIcon = categoryIcons.find(function (ki) {
                        return ki.id === k.id;
                    })

                    if (withIcon) {
                        k.icon = withIcon.icon;
                    } else {
                        k.icon = 'fa fa-mouse-pointer'
                    }

                    return k;
                })

                return (categories).concat(added)
            },

            getByIdForLogs: function (id) {
                var categories = self.sdk.categories.data.all['en'];

                return categories.find(category => category.id === id) || {};
            },

            getbyid: function (id, _k) {
                var allcats = self.sdk.categories.get(_k)

                var cat = _.find(allcats, function (c) {
                    return c.id == id
                })

                return cat || null

            },

            getbyids: function (ids = [], _k) {
                var allcats = self.sdk.categories.get(_k)

                var cats = _.filter(allcats, function (c) {
                    return ids.indexOf(c.id > -1)
                })

                return cats

            },

            search: function (name) {

                return _.filter(self.sdk.categories.get(), function (c) {

                    if (c.name.toLowerCase().indexOf(name) > -1) return true

                    return stringEqTrig(c.name, name) > 0.7
                })

            },

            getwithselected: function (_k) {
                var k = _k || self.app.localization.key

                if (!self.sdk.categories.data.all[k]) k = 'en'

                var selected = self.sdk.categories.settings.selected[k] || {}
                var excluded = self.sdk.categories.settings.excluded[k] || {}

                var all = self.sdk.categories.get()

                return _.map(all, function (c) {
                    var cs = _.clone(c)

                    cs.selected = selected[c.id] ? true : false
                    cs.excluded = excluded[c.id] ? true : false

                    return cs
                })
            },

            save: function () {

                try {
                    localStorage['categoriessettings'] = JSON.stringify({
                        settings: self.sdk.categories.settings
                    })
                } catch (e) {

                }


            },

            load: function (clbk) {
                var p = {};

                self.sdk.categories.clbks.selected = {}
                self.sdk.categories.clbks.removed = {}
                self.sdk.categories.clbks.added = {}
                self.sdk.categories.clbks.tags = {}
                self.sdk.categories.clbks.excluded = {}



                try {
                    p = JSON.parse(localStorage['categoriessettings'] || '{}');
                } catch (e) {}


                if(!p.settings) {
                    p.settings = {}

                    if(window.project_config.preferredtags && window.project_config.preferredtags.length){

                        p.settings.selected = {}

                        _.each(self.sdk.categories.data.all, (cats, k) => {
                            p.settings.selected[k] = {}

                            _.each(window.project_config.preferredtags, (id) => {
                                p.settings.selected[k][id] = true
                            })
                        })
                    }
                }

                self.sdk.categories.settings = p.settings

                self.sdk.categories.settings.tags || (self.sdk.categories.settings.tags = {})
                self.sdk.categories.settings.selected || (self.sdk.categories.settings.selected = {})
                self.sdk.categories.settings.added || (self.sdk.categories.settings.added = {})
                self.sdk.categories.settings.excluded || (self.sdk.categories.settings.excluded = {})


                if (clbk) clbk()
            }

        },

        tags: {
            storage: {

                cloud: null,

                all: {
                    default: ['love', 'followback', 'instagramers', 'socialsteeze', 'tweegram', 'photooftheday', '20likes', 'amazing', 'smile', 'follow4follow', 'like4like', 'look', 'instalike', 'igers', 'picoftheday', 'food', 'instadaily', 'instafollow', 'followme', 'girl', 'instagood', 'bestoftheday', 'instacool', 'carryme', 'follow', 'colorful', 'style', 'swag', 'fun', 'instagramers', 'model', 'socialsteeze', 'food', 'smile', 'pretty', 'followme', 'nature', 'lol', 'dog', 'hair', 'sunset', 'swag', 'throwbackthursday', 'instagood', 'beach', 'friends', 'hot', 'funny', 'blue', 'life', 'art', 'photo', 'cool', 'carryme', 'bestoftheday', 'clouds', 'amazing', 'socialsteeze', 'fitness', 'followme', 'all_shots', 'textgram', 'family', 'instago', 'igaddict', 'awesome', 'girls', 'instagood', 'my', 'bored', 'baby', 'music', 'red', 'green', 'water', 'bestoftheday', 'black', 'party', 'white', 'yum', 'flower', 'carryme', 'night', 'instalove', 'photo', 'photos', 'pic', 'pics', 'socialsteeze', 'picture', 'pictures', 'snapshot', 'art', 'beautiful', 'instagood', 'picoftheday', 'photooftheday', 'color', 'all_shots', 'exposure', 'composition', 'focus', 'capture', 'moment', 'hdr', 'hdrspotters', 'hdrstyles_gf', 'hdri', 'hdroftheday', 'hdriphonegraphy', 'hdr_lovers', 'awesome_hdr']
                },


            },

            additional: [{
                tag: 'pkoin_commerce',
                new: true,
                class: 'bright',
                info: 'pkoin_commerce_info'
            }],

            findadditional: function (tag) {
                return _.find(this.additional, function (v) {
                    return v.tag == tag
                })
            },

            ex: {
                'news': true,
                'images': true,
                'videos': true,
                'politics': true,
                'funny': true,
                'art': true,
                'photo': true
            },

            search: function (str, clbk) {
                var all = []
                str = clearTagString(str);

                _.each(self.sdk.tags.storage.all, function (st) {
                    var s = _.filter(st, function (t) {

                        if (t.indexOf(str) > -1) return true;

                    })

                    all = all.concat(s)
                })

                all = _.uniq(all)

                if (clbk)
                    clbk(lastEls(all, 7))

            },

            get: function (address, count, block, localization, clbk) {

                var parameters = [address || ''];

                if (count) parameters.push(count.toString())
                else parameters.push('')

                if (block) parameters.push(block.toString())
                else parameters.push('')

                parameters.push(localization || self.app.localization.key)

                var cacheparameters = _.clone(parameters)
                cacheparameters[2] = ''

                self.psdk.tag.request(() => {
                    return self.app.api.rpcwt('gettags', parameters)
                }, cacheparameters).then(data => {
                    if (clbk) clbk(data)
                })

            },

            filterCats: function (tags) {
                var tm = self.sdk.categories.getalltagsmap()

                return _.filter(tags, t => {
                    return !tm[t.tag]
                })
            },

            filterEx: function (tags) {

                var ex = this.ex

                return _.filter(tags, function (t) {

                    if (!ex[t.tag]) return true

                })
            },

            getfastsearch: function (clbk) {
                var s = this.storage;
                var t = this
                var loc = self.app.localization.key

                if (!s.all) s.all = {}

                retry(function () {
                    return self.currentBlock
                }, function () {

                    var round = (a, b) => a - a % b

                    t.get('', 350, round(self.currentBlock, 1000) - 23700, loc, function (d) {

                        if (!s.all) s.all = {}

                        if (d && d.length) {

                            s.all[loc] = _.map(d, function (t) {
                                return t.tag
                            })

                        } else {
                            s.all[loc] = []
                        }

                        _.each(t.additional, function (at) {
                            if (s.all[loc].indexOf(at.tag) == -1) {
                                s.all[loc].unshift(at.tag)
                            }
                        })

                        if (clbk) {
                            clbk()
                        }
                    })

                })


            },

            cloudUpdate: function (clbk) {
                self.app.platform.sdk.tags.cloud(clbk, true)
            },

            cloud: function (clbk, update) {

                var t = this
                var s = this.storage;
                var loc = self.app.localization.key

                if (!s.cloud) s.cloud = {}

                if (s.cloud[loc] && !update) {
                    if (clbk) {
                        clbk(s.cloud[loc])
                    }
                } else {

                    var round = (a, b) => a - a % b

                    retry(function () {
                        return self.currentBlock
                    }, function () {

                        t.get('', 100, (round(self.currentBlock, 1000) - 23700), loc, function (d, error) {
                            if (!s.cloud) s.cloud = {}

                            if (!error) s.cloud[loc] = d

                            _.each(t.additional, function (at) {

                                if (at.positionincloud) {

                                    var lt = _.find(s.cloud, function (t) {
                                        return t.tag == at.tag
                                    })

                                    if (!lt) {
                                        var vs = _.clone(at)
                                        s.cloud.push(vs)
                                    }

                                    if (lt) {

                                        lt.positionincloud = at.positionincloud
                                        lt.class = at.class

                                        if (lt.count < 2000) {
                                            lt.new = at.new
                                        }
                                    }
                                }

                            })

                            if (clbk) {
                                clbk(s.cloud[loc], error)
                            }

                            self.sdk.recommendations.scheduler()

                        })
                    })

                }

            },

            getcloudall: function () {
                var all = {}
                _.each(this.storage.cloud, (c, loc) => {
                    _.each(c, (tg) => {
                        all[tg.tag] = tg
                    })
                })

                return all
            },

            totals: function () {
                var r = {
                    max: 0
                }

                _.each(this.storage.cloud, (c, loc) => {
                    r[loc] = this.total(loc)

                    if (r.max < r[loc]) r.max = r[loc]
                })



                return r
            },

            total: function (loc) {
                var s = this.storage;

                loc || (loc = self.app.localization.key)

                if (!s.cloud) s.cloud = {}

                if (s.cloud[loc]) {
                    return _.reduce(s.cloud[loc], (m, tag) => {
                        return m + tag.count
                    }, 0)
                }

                return 0
            },

            maxs: function () {
                var r = {
                    max: 0
                }

                _.each(this.storage.cloud, (c, loc) => {
                    r[loc] = this.max(loc)

                    if (r.max < r[loc]) r.max = r[loc]
                })



                return r
            },


            max: function (loc) {
                var s = this.storage;

                loc || (loc = self.app.localization.key)

                if (!s.cloud) s.cloud = {}

                if (s.cloud[loc]) {

                    return ((_.max(s.cloud[loc], (tag) => {
                        return tag.count
                    }) || {}).count) || 0
                }

                return 0
            },

            gettag: function (tag) {
                var s = this.storage;

                if (!s.cloud) s.cloud = {}

                var mincount = 2
                var res = null
                var l = self.app.localization.key

                _.find(s.cloud, (lg, loc) => {
                    return _.find(lg, (tg) => {

                        if (mincount > tg.count) mincount = tg.count

                        if (tg.tag == tag) {
                            res = tg

                            l = loc

                            return true
                        }
                    })
                })

                if (!res) {
                    res = {
                        tag: tag,
                        count: mincount / 2,
                        loc: l
                    }
                }

                return res
            }

        },

        memtags: {
            storage: {},
            added: {},


            getprobtags: function (count) {

                var tags = this.gettags()

                tags = self.sdk.tags.filterEx(self.sdk.tags.filterCats(tags))

                return _.map(randomizerarray(tags, count || 3, 'probability') || [], (t) => {
                    return t.tag
                })
            },

            gettags: function () {
                var totals = self.sdk.tags.maxs()
                var result = []

                var maxdate = _.max(this.storage.tags, (u) => {
                    return u.date
                })

                var mindate = _.min(this.storage.tags, (u) => {
                    return u.date
                })

                var difference = maxdate.date - mindate.date

                if (difference <= 0) difference = 1

                if (totals.max) {

                    var tgc = _.reduce(this.storage.tags, (m, tg) => {

                        if (tg.c < 0) return m

                        return m + tg.c
                    }, 0)

                    _.each(this.storage.tags, (tg, i) => {

                        if (tg.c < 0) return

                        var tag = self.sdk.tags.gettag(i)
                        var t = totals[tag.loc] || totals.max

                        var p = tg.c / tgc + Math.sqrt((t - tag.count) / t) * (0.5 + (tg.date - mindate.date) / difference)

                        result.push({
                            tag: i,
                            probability: p
                        })
                    })
                }

                return result

            },

            add: function (tags, id, value) {
                if (id && this.added[id]) return

                if (!self.sdk.memtags.storage.tags) self.sdk.memtags.storage.tags = {}


                //var total = 0

                _.each(tags, (tag) => {
                    self.sdk.memtags.storage.tags[tag] || (self.sdk.memtags.storage.tags[tag] = {
                        c: 0
                    })

                    self.sdk.memtags.storage.tags[tag].c = self.sdk.memtags.storage.tags[tag].c + (value || 1)

                    if ((value || 1) > 0)
                        self.sdk.memtags.storage.tags[tag].date = self.currentTime()

                })

                if (id)
                    this.added[id] = true

                self.sdk.memtags.saveandrun()
            },

            saveandrunfast: function () {
                self.sdk.memtags.save()

                self.sdk.recommendations.scheduler()
            },

            lskey: function () {
                if (window.testpocketnet) {
                    return 'memtags_tn'
                } else {
                    return 'memtags'
                }
            },

            save: function () {

                try {
                    localStorage[self.sdk.memtags.lskey()] = JSON.stringify({
                        tags: self.sdk.memtags.storage.tags,
                    })
                } catch (e) {

                }
            },

            load: function (clbk) {
                var p = {};

                try {
                    p = JSON.parse(localStorage[self.sdk.memtags.lskey()] || '{}');
                } catch (e) {}

                self.sdk.memtags.storage.tags = p.tags || {}

                if (clbk) clbk()
            },
        },

        search: {
            storage: {
                all: {},
                fs: {},
                posts: {},
                users: {},
                tags: {}
            },

            clear: function () {
                this.storage = {
                    all: {},
                    fs: {},
                    posts: {},
                    users: {},
                    tags: {}
                }
            },

            getcached: function (value, fixedBlock, type, start, count, address) {
                var s = this.storage;
                var result = []

                if (!start) start = 0

                if (!s[type]) s[type] = {}

                if (s[type][value] && s[type][value][address] && s[type][value][address][fixedBlock] && s[type][value][address][fixedBlock].data) {

                    for (var i = 0; i < count; i++) {
                        if (s[type][value][address][fixedBlock].data[start + i])
                            result.push(s[type][value][address][fixedBlock].data[start + i])
                    }

                }


                if (result.length) return {
                    data: result
                }

                return null
            },

            add: function (value, fixedBlock, type, result, start, count, address) {
                var s = this.storage;

                if (!start) start = 0

                if (!s[type]) s[type] = {}

                if (!s[type][value]) s[type][value] = {}
                if (!s[type][value][address]) s[type][value][address] = {}

                if (!s[type][value][address][fixedBlock]) {
                    s[type][value][address][fixedBlock] = result;
                } else {
                    for (var i = 0; i < count; i++) {

                        if (result.data[i])
                            s[type][value][address][fixedBlock].data[start + i] = result.data[i]
                    }
                }

            },

            preview: function (value, fixedBlock, type, start, count, address) {
                var s = this.storage;

                if (!start) start = 0

                if (type != 'fs' && type != 'all') {

                    if (!s[type]) s[type] = {}

                    if (!s[type][address])
                        s[type][address] = {}

                    if (!s[type][address][fixedBlock]) return

                    for (var i = 0; i < count; i++) {

                        if (!s[type][address][fixedBlock].data[start + i])

                            s[type][address][fixedBlock].data[start + i] = {
                                preview: true,
                                index: start + i
                            }
                    }

                }
            },


            get: function (value, type, start, count, fixedBlock, clbk, address, cached) {
                if (!address) address = 'pocketnet'

                var s = self.sdk.search;

                if (typeof fixedBlock == 'undefined') fixedBlock = self.currentBlock

                type || (type = 'fs')

                if (!s[type]) s[type] = {}

                s.preview(fixedBlock, type, start, count, address)

                value = trim(value.replace(/[^а-яА-Яa-zA-Z0-9\# _]+/g, ''))

                if (cached && type && type != 'fs') {
                    var g = self.sdk.search.getcached(value, fixedBlock, type, start, count, address)

                    if (g) {
                        if (clbk)
                            clbk(g, fixedBlock)

                        return
                    }
                }

                var np = [(value), type, fixedBlock, (start || 0), (count || 10)]

                if (address != 'pocketnet') np.push(address)

                if (value.length) {

                    if (type === 'users') {

                        self.psdk.searchUsers.request(() => {
                            return self.app.api.rpc('searchusers', np)
                        }, np).then(d => {

                            d = _.filter(_.map(d, (a) => {
                                return a && self.psdk.userInfo.get(a.address)
                            }), (v) => {
                                return v
                            })

                            d = {
                                data: [...d]
                            }

                            s.add(value, fixedBlock, type, d, start, count, address)

                            if (clbk)
                                clbk(d, fixedBlock)

                        }).catch(e => {
                            console.error(e)
                            if (clbk) {
                                clbk({})
                            }
                        })

                        return;

                    }

                    //

                    self.psdk.search.request(() => {

                        var options = {}

                        var nodes = ['135.181.196.243:38081', '65.21.56.203:38081']

                        console.log('type', type)

                        if (type == 'videos'){
                            options.rpc = {
                                fnode: nodes[rand(0, nodes.length - 1)]
                            }
                        }

                        console.log('type options', options)

                        return self.app.api.rpc('search', np, options)
                    }, np).then(d => {

                        if (type != 'fs') {

                            if (type == 'all') {
                                _.each(d, function (d, k) {
                                    s.add(value, fixedBlock, k, d, start, count, address)
                                })
                            } else {
                                d = d[type == 'videos' ? 'posts' : type] || {
                                    data: []
                                }

                                s.add(value, fixedBlock, type, d, start, count, address)
                            }

                        }

                        if (clbk)
                            clbk(d, fixedBlock)

                    }).catch(e => {
                        if (clbk) {
                            clbk({})
                        }
                    })



                } else {
                    if (clbk) {
                        clbk({})
                    }
                }



            }
        },

        postscores: {
            storage: {},
            get: function (id, clbk, update) {

                self.psdk.postScores.load([id]).then((scores) => {

                    if (clbk)
                        clbk(scores)

                }).catch(e => {

                    if (clbk) {
                        clbk(e, null)
                    }

                })

                return


            }
        },

        likes: {
            storage: {},
            who: {},

            get: function (shareIds, clbk) {

                var commentIds = []

                _.each(shareIds, function (id) {

                    var commentId = deep(self.psdk.share.get(id), 'lastComment');

                    if (commentId) {
                        commentIds.push(commentId)
                    }

                })

                self.app.user.isState((state) => {
                    if (!state) {
                        if (clbk) clbk()
                    } else {

                        self.psdk.myScore.load(shareIds, commentIds).finally(() => {
                            if (clbk) clbk()
                        })
                    }
                })
            }
        },

        upvote: {
            checkvalue: function (value, clbk, fclbk) {
                if (clbk) clbk()
            },
        },

        comments: {
            storage: {},

            blocked: {

            },

            sendclbks: {},

            upvoteClbks: {

            },

            saveblocked: function () {

                var a = self.sdk.address.pnet();

                if (a) {
                    self.app.settings.set(self.sdk.address.pnet().address, 'blockedcomments', JSON.stringify(self.sdk.comments.blocked || {}))
                }

            },
            loadblocked: function (clbk) {
                var a = self.sdk.address.pnet();

                /*if (a) {
                    self.sdk.comments.blocked = JSON.parse(self.app.settings.get(self.sdk.address.pnet().address, 'blockedcomments') || "{}")
                }*/

                if (clbk) clbk()
            },

            address: function (id) {

                var comment = self.psdk.comment.get(id)

                if (comment) return comment.address

                return ''
            },

            users: function (comments, clbk) {
                var addresses = _.map(comments, function (r) {
                    return r.address
                })

                self.sdk.users.get(addresses, function (n, e) {
                    if (clbk)
                        clbk(n, e)
                }, true)
            },


            ini: function (d) {

                console.error("TODO_REF_ACTIONS_INI_COMMENTS")

                return d

            },

            getbyid: function (ids, clbk, update) {

                if (!_.isArray(ids)) ids = [ids]


                self.psdk.comment.load(ids).then(() => {
                    var comments = self.psdk.comment.gets(ids)

                    self.sdk.comments.users(comments, function (d, e) {

                        if (clbk)
                            clbk(comments, e)

                    })

                }, update).catch(e => {
                    if (clbk)
                        clbk(e)
                })

                return


            },



            getclear: function (txid, pid, clbk, ccha) {

                var parameters = [txid, pid || '', self.app.user.address.value || '']

                self.psdk.comment.request(() => {
                    return self.app.api.rpc('getcomments', parameters)
                }, {
                    parameters
                }).then(d => {

                    var comments = self.psdk.comment.gets(_.map(d, (s) => {
                        return s.id
                    }))

                    comments = self.psdk.comment.tempAdd(comments, (action) => {
                        return (txid == action.postid) && ((pid || '') == (action.parentid || ''))
                    })

                    if (clbk) clbk(comments)

                }).catch(e => {

                    console.error('e', e)

                    if (clbk) {
                        clbk(null, e)
                    }

                })


            },


            last: function (clbk) {

                var ps = ['20', '', self.app.localization.key]

                self.psdk.comment.request(() => {
                    return self.app.api.rpc('getlastcomments', ps)
                }, ps).then(d => {

                    var comments = _.filter(self.psdk.comment.gets(_.map(d, (d) => {
                        return d.id
                    })), (c) => {
                        return !c.deleted
                    })

                    if (clbk) clbk(comments)

                }).catch(e => {
                    if (clbk)
                        clbk([], e)
                })


            },

            upvote: function (upvote, clbk) {

                self.app.platform.actions.addActionAndSendIfCan(upvote).then(action => {

                    var alias = action.get()

                    if (clbk)
                        clbk(null, alias)

                }).catch(e => {
                    if (clbk) {
                        clbk(e, null)
                    }

                })


            },

            delete: function (comment, clbk) {


                self.app.platform.actions.addActionAndSendIfCan(comment).then(action => {

                    var alias = action.get()

                    if (clbk)
                        clbk(null, alias)

                }).catch(e => {
                    if (clbk) {
                        clbk(e, null)
                    }

                })


            },

            send: function (comment, clbk) {

                comment.uploadImages(self.app, function () {

                    if (comment.checkloaded()) {

                        if (clbk) {
                            clbk('imageerror')
                        }

                        return
                    }

                    self.app.platform.actions.addActionAndSendIfCan(comment, 2, null, {
                        rejectIfError: ['actions_noinputs_wait']
                    }).then(action => {

                        var alias = action.get()


                        if (clbk)
                            clbk(null, alias)

                    }).catch(e => {

                        if (clbk)
                            clbk(e)

                    })

                })


            }
        },

        node: {

            get: {

                info: function (clbk) {

                    self.app.api.rpc('getnodeinfo').then(d => {
                        if (clbk)
                            clbk(d)

                    }).catch(e => {
                        if (clbk) {
                            clbk(null, e)
                        }
                    })

                },

                timepr: function () {

                    if (self.lasttimecheck) {

                        var d = new Date()

                        if (self.lasttimecheck.addSeconds(10) > d) {
                            return Promise.resolve()
                        }
                    }

                    return self.app.api.rpc('getnodeinfo').then(d => {

                        var t = deep(d, 'time') || 0

                        self.currentBlock = 0
                        self.timeDifference = 0;

                        try {
                            self.currentBlock = deep(d, 'lastblock.height') || localStorage['lastblock'] || 0
                            localStorage['lastblock'] = self.currentBlock
                        } catch (e) {

                        }

                        if (t) {

                            var d = new Date()

                            self.lasttimecheck = d

                            self.timeDifference = t - Math.floor((d.getTime()) / 1000)
                            self.timeDifferenceTimeZone = t - Math.floor((d.getTime() + (d.getTimezoneOffset() * 60000)) / 1000);

                        }

                        return Promise.resolve()

                    })
                },

                time: function (clbk) {

                    self.sdk.node.get.timepr().then(() => {
                        if (clbk)
                            clbk()
                    }).catch(e => {
                        if (clbk) {
                            clbk(null, e)
                        }
                    })

                },

            },

            shares: {

                storagelights: {

                },

                storage: {

                },
                loading: {

                },
                parameters: {
                    stor: {},
                    defaults: {
                        period: '4320'
                    },
                    get: function () {
                        var meta = self.sdk.node.shares.parameters.meta
                        var e = {}
                        _.each(meta, function (p, i) {
                            e[i] = new Parameter(p())

                            e[i]._onChange = function (v) {
                                self.sdk.node.shares.parameters.stor[i] = e[i].value
                                self.sdk.node.shares.parameters.save()
                            }
                        })


                        return e
                    },
                    meta: {
                        period: function () {

                            var v = self.sdk.node.shares.parameters.stor.period || self.sdk.node.shares.parameters.defaults.period

                            return {
                                type: "VALUES",
                                name: self.app.localization.e('period'),
                                id: 'period',
                                placeholder: self.app.localization.e('period'),
                                possibleValues: ['1440', '4320', '10080', '43200', '262080'],
                                possibleValuesLabels: [
                                    self.app.localization.e('periodday'),
                                    self.app.localization.e('period3day'),
                                    self.app.localization.e('period7day'),
                                    self.app.localization.e('period31day'),
                                    self.app.localization.e('period182day')
                                ],
                                value: v,
                                defaultValue: v,


                            }

                        },
                    },
                    load: function (clbk) {
                        var p = {};

                        try {
                            p = JSON.parse(localStorage['sharessettings'] || '{}');
                        } catch (e) {

                        }

                        self.sdk.node.shares.parameters.stor = p.stor || {}

                        if (clbk) clbk()
                    },
                    save: function () {

                        try {
                            localStorage['sharessettings'] = JSON.stringify({
                                stor: self.sdk.node.shares.parameters.stor
                            })
                        } catch (e) {

                        }


                    }
                },

                clbks: {
                    added: {

                    }
                },

                ////TODO_REF_ACTIONS

                checkvisibility : function(share){

                    if(!share.visibility) return false

                    var v = share.visibility()

                    var a = self.sdk.address.pnet()

                    if (a && a.address == share.address) return false

                    if (!v) return false

                    if (a && a.address){
                        if(self.sdk.user.type(a.address) == 'moderator'){
                            return false
                        }
                    }

                    if (v == 'reg') {

                        if (self.app.user.getstate()) return false

                        return v

                    }

                    if (v == 'sub') {

                        var me = self.psdk.userInfo.getmy()

                        if (me && me.relation(share.address, 'subscribes')) {
                            return false
                        }

                    }

                    if (v == 'paid') {

                        var me = self.psdk.userInfo.getmy()

                        if (me && me.relation(share.address, 'subscribes')) {

                            /*if (app.paidsubscriptiondisable){
                                return false
                            }*/

                            var cache = self.sdk.paidsubscription.checkvisibilityCache(share.address)

                            if (cache){
                                if(cache.error){
                                    return 'paid_error'
                                }

                                if(cache.result == 'paid_success'){
                                    return false
                                }
                                else{

                                    if(v == 'paid' && app.paidsubscriptiondisable){
                                        return 'paid_paidsubscriptiondisable'
                                    }
                                    
                                    return v
                                }
                            }

                            return 'paid_check'

                        }
                        else{
                            /*if (app.paidsubscriptiondisable){
                                return 'sub'
                            }*/
                        }

                    }

                    if(v == 'paid' && app.paidsubscriptiondisable){
                        return 'paid_paidsubscriptiondisable'
                    }

                    return v


                },



                users: function (shares, clbk, withoutlastcomment) {
                    var users = [];

                    _.each(shares || [], function (s) {

                        if (!s) return

                        users.push(s.address)

                        if (!withoutlastcomment) {

                            var lastComment = s.lastComment ? self.psdk.comment.get(s.lastComment) : null

                            if (lastComment) {
                                users.push(lastComment.address)
                            }


                        }

                    })

                    self.sdk.users.get(users, clbk, true)
                },

                add: function (share) {

                    ////TODO_REF_ACTIONS

                    this.storage[share.txid] = share;

                    _.each(this.clbks.added, function (a) {
                        a(share)
                    })

                },


                delete: function (txid, clbk) {

                    var rm = new Remove()
                    rm.txidEdit.set(txid);

                    self.app.platform.actions.addActionAndSendIfCan(rm).then(action => {

                        var alias = action.get()

                        successCheck()

                        if (clbk) clbk(null, alias)

                    }).catch(e => {

                        if (clbk)
                            clbk(e, null)

                    })

                    return


                },


                txids: function (p, clbk, refresh) {
                    this.getbyid(p.txids, clbk, refresh)
                },
                getbyidsp: function (p, clbk, refresh) {
                    this.getbyids(p.txids, p.begin, 10, clbk, refresh)
                },

                getsavedbyids: function (p, clbk) {

                    if (!p.txids.length) {
                        if (clbk)
                            clbk([], null, p);
                        return;
                    }
                    var loadedShares = [];

                    _.each(p.txids, function (txid) {

                        var curShare = self.sdk.localshares.getShare(txid);

                        if (curShare) {

                            if (!curShare || !curShare.share || !curShare.share.user || !curShare.share.user.adr || !curShare.share.share) return;


                            self.psdk.share.insertFromResponseSmall([{
                                ...curShare.share.share,
                                ...{
                                    ___temp: true
                                }
                            }], true)
                            //self.psdk.share.userInfo([curShare.share.share])

                            var newShare = self.psdk.share.get(txid)

                            if (newShare) {
                                if (curShare.share.timestamp)
                                    newShare.downloadedDate = new Date(curShare.share.timestamp);


                                loadedShares.push(newShare);
                            }


                        }
                    });

                    // Sort by download date

                    loadedShares = _.sortBy(loadedShares, function (s1) {

                        if (!s1.downloadedDate) {
                            return 1
                        }

                        return -s1.downloadedDate.getTime()
                    })


                    if (clbk) {
                        clbk(loadedShares, null, {
                            count: p.txids.length
                        });
                    }

                },

                getbyids: function (txids, begin, cnt, clbk, refresh) {

                    var s = this.storage;
                    var key = bitcoin.crypto.hash256(JSON.stringify('txids'), 'utf8');

                    var p = {}

                    cnt || (cnt = 10)
                    p.count = cnt

                    if (!s.ids) s.ids = {};
                    if (!s.ids[key] || refresh) s.ids[key] = [];

                    if (!txids.length) {

                        if (clbk)
                            clbk([], null, p)

                        return
                    }

                    if (!s.ids[key].length) {
                        begin || (begin = txids[0])

                    } else {

                        if (!begin) {
                            var l = s.ids[key][s.ids[key].length - 1]

                            if (l == txids[txids.length - 1]) {
                                if (clbk)
                                    clbk([], null, p)

                                return
                            }

                            begin = l;
                        }
                    }

                    var index = _.indexOf(txids, begin);

                    var _txids = _.clone(txids).splice(index, cnt);

                    this.getbyid(_txids, function (shares) {

                        s.ids[key] = shares;

                        if (clbk)
                            clbk(shares, null, p)

                    }, refresh)
                },

                getbyid: function (txids, clbk, refresh) {

                    self.psdk.share.load(txids, refresh).then(() => {

                        var shares = self.psdk.share.gets(txids)

                        clbk(shares, null, {
                            count: txids.length
                        })

                    }).catch(e => {

                        console.error("E", e)

                        if (clbk) {
                            clbk(null, e, {})
                        }

                    })

                },

                get: function (parameters, clbk, method, rpc = {}) {

                    self.psdk.share.request(() => {

                        return self.app.api.rpc(method, parameters, {
                            rpc: rpc
                        }).then(data => {

                            if (_.isArray(data)) {
                                return Promise.resolve({
                                    contents: data
                                })

                            }

                            return Promise.resolve(data)

                        })
                    }, {
                        method,
                        parameters
                    }, method == 'getboostfeed' ? 'getboostfeed' : null).then(d => {

                        var shares = self.psdk.share.gets(_.map(d.contents, (s) => {
                            return s.txid
                        }))

                        d.contents = shares

                        if (clbk) clbk(d)

                    }).catch(e => {

                        console.error('e', e)

                        if (clbk) {
                            clbk([], e)
                        }

                    })
                },

                getex: function (parameters, clbk, method, rpc) {

                    if (!rpc) rpc = {}
                    rpc.ex = true

                    self.sdk.node.shares.get(parameters, clbk, method, rpc)
                },

                recommended: function (p, clbk, cache, methodparams) {

                    if (!methodparams) methodparams = {}

                    if (!p) p = {};


                    self.app.user.isState(function (state) {

                        p.count || (p.count = '20')

                        if (state) {
                            p.address = self.sdk.address.pnet().address;
                        }

                        var storage = self.sdk.node.shares.storage
                        var key = 'recommended'

                        if (cache == 'cache' && storage[key]) {

                            if (clbk)
                                clbk(storage[key], null, p)

                        } else {

                            var period = p.period || self.sdk.node.shares.parameters.stor.period || '60'

                            var depth = p.offset ? self.currentBlock - p.offset : 0

                            var parameters = []

                            parameters = [depth, '', p.count, self.app.localization.key, [],
                                [],
                                [],
                                [],
                                [], '', period
                            ]

                            if (p.type) {
                                parameters[5].push(p.type)
                            }

                            self.sdk.node.shares.getex(parameters, function (data, error) {

                                var shares = data.contents


                                if (shares) {

                                    self.sdk.node.shares.loadvideoinfoifneed(shares, p.type == 'video', function () {

                                        if (p.type == 'video') {
                                            shares = _.filter(shares, function (share) {

                                                if (!share.url) return

                                                var meta = app.platform.parseUrl(share.url);

                                                if ((meta.type == 'youtube') || meta.type == 'vimeo' || meta.type == 'bitchute' || meta.type == 'peertube') {

                                                    if (self.sdk.videos.storage[share.url] && self.sdk.videos.storage[share.url].data)
                                                        return true
                                                }
                                            })
                                        }

                                        if (clbk)
                                            clbk(shares, error, p)
                                    })


                                } else {
                                    if (clbk)
                                        clbk(shares, error, p)
                                }

                            }, methodparams.method || 'getmostcommentedfeed')


                        }

                    })
                },
                best: function (p, clbk, cache, methodparams) {

                    if (!methodparams) methodparams = {}

                    if (!p) p = {};

                    self.app.user.isState(function (state) {

                        p.count || (p.count = '20')

                        if (state) {
                            p.address = self.sdk.address.pnet().address;
                        }

                        var storage = self.sdk.node.shares.storage
                        var key = 'best'

                        if (cache == 'cache' && storage[key]) {

                            if (clbk)
                                clbk(storage[key], null, p)

                        } else {

                            var period = p.period || self.sdk.node.shares.parameters.stor.period || '60'

                            var page = p.page || 0
                            var offset = p.offset
                            var parameters = []
                            parameters = [p.count.toString(), period, offset || '0', self.app.localization.key]

                            if (p.type) {
                                parameters.push(p.type)
                            }

                            self.sdk.node.shares.getex(parameters, function (d, error) {

                                var shares = d.contents

                                if (shares) {

                                    self.sdk.node.shares.loadvideoinfoifneed(shares, p.type == 'video', function () {

                                        /*if (state) {
                                            _.each(self.sdk.relayTransactions.withtemp('blocking'), function (block) {
                                                _.each(shares, function (s) {
                                                    if (s.address == block.address) s.blocking = true;
                                                })
                                            })
                                        }*/

                                        if (p.type == 'video') {
                                            shares = _.filter(shares, function (share) {

                                                if (!share.url) return

                                                var meta = app.platform.parseUrl(share.url);


                                                if ((meta.type == 'youtube') || meta.type == 'vimeo' || meta.type == 'bitchute' || meta.type == 'peertube' || meta.type == 'brighteon' || meta.type == 'stream.brighteon') {

                                                    if (self.sdk.videos.storage[share.url] && self.sdk.videos.storage[share.url].data)
                                                        return true
                                                }
                                            })
                                        }


                                        storage[key] = shares;

                                        if (clbk)
                                            clbk(storage[key], error, p)

                                    })


                                } else {
                                    if (clbk)
                                        clbk(shares, error, p)
                                }

                            }, methodparams.method || 'gethotposts')


                        }

                    })
                },

                jury : function(p = {}, clbk, cache){

                    if(!p.page) p.page = 0
                    if(!p.count) p.count = 20
                    

                    self.app.user.isState(function (state) {

                        if(!state){
                            return clbk([])
                        }

                        p.address = self.sdk.address.pnet().address;

                        var storage = self.sdk.node.shares.storage
                        var key = 'jury' + p.address
                        var promise = null

                        if (cache != 'clear' && storage[key]) {
                            promise = () => {
                                return Promise.resolve(storage[key])
                            }
                        }
                        else {
                            promise = self.app.platform.sdk.jury.getjuryassigned(p.address)
                        }

                        promise.then((items) => {

                            items = _.filter(items, (item, i) => {
                                return i >= p.page * p.count && i < (p.page + 1) * p.count
                            })

                            items =  self.psdk.jury.tempRemove(items, (i) => {return true}, (alias) => {

                                return alias.actor == p.address
                            })

                            if(clbk) clbk(items, null, {})
                        })

                    })
                },

                gettopfeed : function(p, clbk, cache){

                    self.app.platform.sdk.node.shares.hierarchical(p, clbk, cache, {
                        method: 'gettopfeed',
                        rpc: {
                            cache: true,
                            fastvideo: true
                        }
                    });

                },

                getrecomendedcontents: function (p, clbk, cache) {

                    self.app.platform.sdk.node.shares.hierarchical(p, clbk, cache, {
                        method: 'getrecommendedcontentbyaddress',
                        rpc: {
                            cache: true,
                            fastvideo: true
                        }
                    });

                },

                loadvideoinfoifneed: function (shares, need, clbk) {

                    if (need) {
                        self.sdk.videos.infoshares(shares).then(r => {
                            if (clbk) clbk()
                        }).catch(e => {
                            console.error(e)
                            if (clbk) clbk()
                        })
                    } else {
                        if (clbk) clbk()
                    }


                },

                getprofilefeed: function (p, clbk, cache) {

                    self.app.platform.sdk.node.shares.hierarchical(p, clbk, cache, {
                        method: 'getprofilefeed'
                    })


                },

                getsubscribesfeed: function (p, clbk, cache) {

                    p.tempSubscriptions = self.psdk.subscribe.tempAdd([], (alias) => {
                        if (alias.actor == self.app.user.address.value) return true
                    })


                    self.app.platform.sdk.node.shares.hierarchical(p, clbk, cache, {
                        method: 'getsubscribesfeed'
                    })

                },


                historical: function (p, clbk, cache) {

                    self.app.platform.sdk.node.shares.hierarchical(p, clbk, cache, {
                        method: 'gethistoricalstrip'
                    })

                },

                getboost: function (p, clbk, cache) {

                    self.app.platform.sdk.node.shares.lightsid(p, clbk, cache, {
                        method: 'getboostfeed',
                        /*rpc: {
                            fnode: '65.21.252.135:38081'
                        }*/
                    })
                },

                lightsid: function (p, clbk, cache, methodparams) {

                    if (!methodparams) methodparams = {}

                    var mtd = methodparams.method

                    self.app.user.isState(function (state) {

                        if (!p) p = {};

                        p.count || (p.count = 10)

                        if (!p.lang) {
                            p.lang = self.app.localization.key || ''
                        }

                        p.height || (p.height = 0)
                        p.tagsfilter || (p.tagsfilter = [])
                        p.tagsexcluded || (p.tagsexcluded = [])

                        if (state) {
                            p.address = self.sdk.address.pnet().address;
                        }

                        var key = mtd + p.count + (p.address || "") + "_" + (p.lang || "") + "_" + /*(p.height || "")  +*/ "_" + (p.tagsfilter.join(',')) + "_" + (p.begin || "") + (p.type ? p.type : '')

                        if (p.author) key = key + p.author

                        var storage = self.sdk.node.shares.storagelights;
                        var s = self.sdk.node.shares;

                        if (cache == 'cache' && storage[key]) {

                            if (clbk)
                                clbk(storage[key], null, p)

                        } else {
                            if (!storage[key] || cache == 'clear') storage[key] = [];

                            p.tagsfilter = _.map(p.tagsfilter, function (t) {
                                return encodeURIComponent(t.toLowerCase())
                            })

                            p.tagsexcluded = _.map(p.tagsexcluded, function (t) {
                                return encodeURIComponent(t.toLowerCase())
                            })

                            var parameters = [Number(p.height), p.txid || '', mtd == 'getboostfeed' ? 60 * 24 : p.count, p.lang, mtd == 'getboostfeed' ? [] : p.tagsfilter, p.type ? [p.type] : [],
                                [],
                                [], p.tagsexcluded
                            ];

                            s.getex(parameters, function (data, error) {

                                var shares = data.boosts || []
                                var blocknumber = data.height
                                p.blocknumber = blocknumber


                                storage[key] = shares

                                if (clbk)
                                    clbk(shares, error, p)

                            }, mtd, methodparams.rpc)


                        }
                    })
                },

                hierarchical: function (p, clbk, cache, methodparams) {

                    if (!methodparams) methodparams = {}

                    var mtd = (methodparams.method || 'gethierarchicalstrip')

                    /*

                    p.height
                    p.start_txid
                    p.count 10
                    p.lang lang
                    p.tagsfilter tagsfilter
                    p.type

                    */

                    self.app.user.isState(function (state) {

                        if (!p) p = {};

                        p.count || (p.count = 10)

                        if (!p.lang) {
                            (mtd == 'gethierarchicalstrip' || mtd == 'gethistoricalstrip') ? p.lang = self.app.localization.key: p.lang = ''
                        }


                        p.height || (p.height = 0)
                        p.tagsfilter || (p.tagsfilter = [])
                        p.tagsexcluded || (p.tagsexcluded = [])
                        p.begin || (p.begin = '')
                        p.depth || (p.depth = 10)

                        if (state) {
                            p.address = self.sdk.address.pnet().address;
                        }

                        var key = mtd + p.count + (p.address || "") + "_" + (p.lang || "") + "_" + /*(p.height || "")  +*/ "_" + (p.tagsfilter.join(',')) + "_" + (p.begin || "") + (p.type ? p.type : '')

                        if (p.author) key = key + p.author

                        var storage = self.sdk.node.shares.storage;
                        var s = self.sdk.node.shares;

                        if (cache == 'cache' && storage[key]) {

                            var tfinded = null;
                            var added = 0;

                            if (!p.txid) tfinded = true;

                            _.each(storage[key], function (s, i) {

                                if (tfinded && added < p.count) {
                                    added++;
                                    return true;
                                }
                                if (s.txid == p.txid) {
                                    tfinded = true;
                                }
                            })

                            if (clbk)
                                clbk(storage[key], null, p)

                        } else {
                            if (!storage[key] || cache == 'clear') storage[key] = [];

                            if (!p.txid) {
                                if (storage[key].length) {

                                    if (p.count > 0) {
                                        var st = storage[key][storage[key].length - 1]

                                        p.txid = st.txid
                                    } else {
                                        var st = storage[key][0]

                                        p.txid = st.txid
                                    }

                                }
                            }

                            if (!p.txid) p.txid = p.begin || ''


                            p.tagsfilter = _.map(p.tagsfilter, function (t) {
                                return encodeURIComponent(t.toLowerCase())
                            })


                            p.tagsexcluded = _.map(p.tagsexcluded, function (t) {
                                return encodeURIComponent(t.toLowerCase())
                            })

                            /////temp
                            ////

                            var parameters = [Number(p.height), p.txid, p.count, p.lang == 'all' ? '' : p.lang, p.tagsfilter, p.type ? [p.type] : [],
                                [],
                                [], p.tagsexcluded
                            ];


                            if (p.author) {
                                parameters.push('');
                                parameters.push(p.author)
                            }
                            if (mtd == 'getsubscribesfeed') {
                                parameters.push('');
                                parameters.push(p.address)

                                if (p.tempSubscriptions && p.tempSubscriptions.length) {
                                    //parameters.push(p.tempSubscriptions) TODO_REF_ACTIONS
                                }
                            }




                            if (methodparams.method == 'getrecommendedcontentbyaddress')
                                parameters = [p.contentAddress, '', p.type ? [p.type] : [], p.lang || "", p.count];

                            if (mtd == 'gettopfeed') {
                                parameters.push('');
                                parameters.push(p.depth)

                            }

                            if (mtd === 'getprofilefeed') {
                                // keyword
                                parameters.push(p.keyword || '');
                                // orderby
                                parameters.push(p.orderby || '');
                                // ascdesc
                                parameters.push(p.ascdesc || 'desc');
                            }

                            s.getex(parameters, function (data, error) {

                                var shares = data.contents || []

                                p.blocknumber = data.height


                                //// TODO TODO_REF_ACTIONS + check blocking

                                if (shares) {

                                    if (p.author) {

                                        if (!p.txid) {
                                            shares = self.psdk.share.tempAdd(shares, (alias) => {
                                                return alias.actor == p.author
                                            })
                                        }
                                    }

                                    self.sdk.node.shares.loadvideoinfoifneed(shares, p.skipvideo ? false : true, function () {

                                        if (p.video) {
                                            shares = _.filter(shares, function (share) {

                                                if (!share.url) return

                                                var meta = app.platform.parseUrl(share.url);

                                                if ((meta.type == 'youtube') || meta.type == 'vimeo' || meta.type == 'bitchute' || meta.type == 'peertube' || meta.type == 'brighteon' || meta.type == 'stream.brighteon') {

                                                    if (self.sdk.videos.storage[share.url] && self.sdk.videos.storage[share.url].data)
                                                        return true
                                                }
                                            })
                                        }

                                        _.each(shares || [], function (s) {

                                            if (!storage[key]) storage[key] = []

                                            if (p.count > 0) {
                                                storage[key].push(s)
                                            } else {
                                                storage[key].unshift(s)
                                            }
                                        })


                                        if (clbk)
                                            clbk(shares, error, p)

                                    })
                                } else {
                                    if (clbk)
                                        clbk(shares, error, p)
                                }

                            }, mtd, methodparams.rpc)


                        }
                    })
                },

                getboostfeed: function (p, clbk, count, cache) {

                    self.app.platform.sdk.node.shares.getboost(p, function (boostinfo, error) {

                        //// filter viewed

                        boostinfo = _.filter(boostinfo, (bi) => {
                            var cf = _.reduce(bi.flags, (m, c) => {
                                return m + c
                            }, 0)

                            if (cf < 10) {
                                return true
                            }

                            return false
                        })
                        //flags

                        var boostedmap = _.uniq(randomizerarray(boostinfo, count || 3, 'boost') || [], function (v) {
                            return v.txid
                        })

                        var txids = _.map(boostedmap, function (v) {
                            return v.txid
                        })

                        self.app.platform.sdk.node.shares.getbyid(txids, function (shares) {


                            self.app.platform.sdk.node.shares.users(shares, function () {

                                shares = _.filter(shares, function (s) {

                                    if (!self.sdk.user.reputationBlocked(s.address)) {
                                        return true
                                    }

                                })


                                if (clbk)
                                    clbk(shares, null, p)
                            })



                        })


                    }, cache)

                },
            },

            transactions: {

                unspent: null,

                storage: {},

                loading: {},

                clbks: {

                },

                getfromtotransactions : function(from, to, update){

                    return pretry(function () {
                        return self.currentBlock
                    }).then(() => {
                        if(!self.currentBlock){
                            return Promise.reject('currentBlock is empty')
                        }
    
                        return app.psdk.getfromtotransactions.request(() => {
    
                            var nodes = ['135.181.196.243:38081', '65.21.56.203:38081']
    
                            return self.app.api.rpc('getfromtotransactions', [from, to, self.currentBlock - 43200 * 12], {
                                rpc: {
                                    fnode: nodes[rand(0, nodes.length - 1)]
                                }
                            })
        
                        }, from + to, {
                            update : update
                        }).then(function (s) {

                            s = self.psdk.getfromtotransactions.tempAdd(s, from, to)

                            return s
                        })
                    })

                    

                },

                getCoibaseType: function (tx, address) {

                    var type = null;



                    if (!tx.vout || !tx.vout.length || !address) return null

                    var firstout = tx.vout[0]

                    var n = -1
                    var uservout = _.find(tx.vout, (v) => {
                        n++
                        return _.find(deep(v, 'scriptPubKey.addresses') || [], (a) => {
                            return a == address
                        })
                    })


                    /**/
                    var l = tx.vout.length

                    if (!firstout || l <= 1 || !uservout) return null

                    n = l - n

                    try {
                        var chunks = bitcoin.script.decompile(Buffer.from(firstout.scriptPubKey.hex, 'hex'))

                        if (!chunks.length) return

                        var cl = chunks.length

                        if (!cl) return null

                        if (chunks[cl - n]) {
                            var ch = chunks[cl - n]

                            if (ch == bitcoin.opcodes.OP_WINNER_POST) {
                                type = 'post'
                            }

                            if (ch == bitcoin.opcodes.OP_WINNER_COMMENT) {
                                type = 'comment'
                            }

                            if (ch == bitcoin.opcodes.OP_WINNER_POST_REFERRAL) {
                                type = 'postref'
                            }

                            if (ch == bitcoin.opcodes.OP_WINNER_COMMENT_REFERRAL) {
                                type = 'commentref'
                            }
                        }

                    } catch (e) {
                        console.log("E", e)
                    }


                    return type
                },
                getOpreturn: function (tx) {

                    var opreturnData = [];

                    _.each(tx.vout, function (v) {

                        try {
                            var chunks = bitcoin.script.decompile(Buffer.from(v.scriptPubKey.hex, 'hex'))

                            if (chunks[0] == bitcoin.opcodes.OP_RETURN) {

                                opreturnData.push(chunks[1].toString())

                            }


                        } catch (e) {

                        }
                    })

                    return opreturnData.join('')
                },

                addressFromScryptSig: function (asm) {

                    if (!asm) return ''

                    var pub = asm.split(" ")[1];

                    if (!pub) return ''

                    var keyPair = bitcoin.ECPair.fromPublicKey(Buffer.from(pub, 'hex'))

                    var a = self.sdk.address.pnetsimple(keyPair.publicKey).address

                    return a
                },

                toUT: function (tx, address, n) {


                    var vout = _.find(tx.vout, function (v) {
                        return _.find(v.scriptPubKey.addresses, function (a) {
                            return a == address && (typeof n == 'undefined' || n == v.n)
                        })
                    })


                    var coinbase = deep(tx, 'vin.0.coinbase') || (deep(tx, 'vout.0.scriptPubKey.type') == 'nonstandard') || false

                    var t = {
                        txid: tx.txid,
                        vout: vout.n,
                        address: address,
                        confirmations: tx.confirmations || 0,
                        coinbase: coinbase || tx.coinstake,
                        amount: vout.value,
                        scriptPubKey: vout.scriptPubKey.hex,
                        pockettx: deep(tx, 'vout.0.scriptPubKey.addresses.0') == ""
                    }

                    return t

                },
                ///TODO_REF_ACTIONS
                toUTs: function (tx, address) {

                    var outs = [];

                    _.each(tx.vout, function (vout) {
                        var a = _.find(vout.scriptPubKey.addresses, function (a) {
                            return a == address
                        })

                        if (a) {
                            var coinbase = deep(tx, 'vin.0.coinbase') || (deep(tx, 'vout.0.scriptPubKey.type') == 'nonstandard') || false

                            var t = {
                                txid: tx.txid,
                                vout: Number(vout.n),
                                address: address,
                                confirmations: tx.confirmations,
                                coinbase: coinbase || tx.coinstake,
                                amount: vout.value,
                                scriptPubKey: vout.scriptPubKey.hex,
                                pockettx: deep(tx, 'vout.0.scriptPubKey.addresses.0') == ""
                            }

                            outs.push(t)

                        }
                    })



                    return outs

                },

                get: {

                    tx: function (id, clbk, p, upd) {

                        self.psdk.transaction.load(id, upd || false, p).then(tx => {

                            if (clbk) {
                                clbk(tx)
                            }

                        }).catch(e => {
                            console.error("E", e)
                            if (clbk) {
                                clbk(null, e)
                            }
                        })

                    },

                    txwide: function (id) {
                        return api.rpcwide('getrawtransaction', [id, 1], {
                            changedata: (d) => {
                                if (!d.confirmations) {
                                    d.confirmations = 0

                                    if (d.height) {
                                        app.platform.currentBlock ? (d.confirmations = Math.max(app.platform.currentBlock - d.height, 0)) : null
                                    } else {
                                        app.platform.currentBlock ? (d.height = app.platform.currentBlock) : null
                                    }
                                }
                            }
                        })
                    }
                },


                ///TODO_REF_ACTION - later

                htls: {
                    plcreate: function (id, amount, inputs, dummyoutputs, clbk) {

                        var lock = 0

                        self.sdk.node.shares.getbyid(id, function () {
                            var item = self.psdk.share.get(id)


                            if (!item) return clbk('item')

                            //lock = 10

                            var time = 965504 + 200 //item.time  self.currentBlock + lock

                            var address = item.address

                            var {
                                txb,
                                payment
                            } = self.sdk.node.transactions.htls.create(inputs, dummyoutputs, id, address, amount, time)

                            if (clbk) clbk(txb, {
                                address,
                                time,
                                //lock,
                                payment,
                                htlc: payment.htlc,
                                //hash,
                                tdif: time - self.currentBlock
                            })

                        })
                    },

                    create: function (inputs, dummyoutputs, id, reciever, amount, time) {

                        var multisha = function (str, count) {

                            if (!count) count = 100

                            var h = Buffer.from(str)

                            for (var i = 0; i < count; i++) {
                                h = bitcoin.crypto.sha256(h)
                            }

                            return h.toString('hex')
                        }

                        var createhash = function (key, seed) {

                            var str = multisha(multisha(key) + '_' + seed, 10)

                            return str
                        }

                        var crrc = function (key, txid) {
                            return createhash(key, txid)
                        }

                        var keyPair = self.app.user.keys()
                        var privatekey = keyPair.privateKey
                        var secret = crrc(privatekey.toString('hex'), id)

                        var payment = bitcoin.payments.htlc({
                            htlc: {
                                secret,
                                lock: time,
                                reciever,
                                sender: self.sdk.address.pnetsimple(keyPair.publicKey).address
                            }
                        });

                        var htlcout = _.find(dummyoutputs, function (dout) {
                            return dout.key == 'htlc'
                        })

                        if (!htlcout) {
                            return Promise.reject('htlcout')
                        }

                        var outputs = [{
                            scriptPubKey: payment.output,
                            amount: htlcout.amount
                        }]

                        var indexes = {}

                        _.each(dummyoutputs, function (dop) {
                            if (dop.address) {
                                indexes[outputs.push(dop) - 1] = true

                                //dop.amount = dop.amount - 0.02
                            }
                        })

                        console.log("htlc", {
                            secret,
                            lock: time,
                            reciever,
                            sender: self.sdk.address.pnetsimple(keyPair.publicKey).address
                        })


                        var txb = self.sdk.node.transactions.create.wallet(inputs, outputs, null, true)

                        return {
                            txb,
                            payment,
                            secret
                        }
                    },

                    withdrawal: function (prevoutputs, destination, fees, htlc) {
                        if (!htlc) htlc = {}

                        var total = 0

                        if (!fees) fees = 0

                        var inputs = _.map(prevoutputs, function (output) {

                            total += output.value

                            return {
                                vout: output.n,
                                scriptPubKey: output.scriptPubKey.hex,
                                amount: output.value,
                                type: output.scriptPubKey.type,
                                txid: output.txid
                            }
                        })

                        var outputs = [{
                            address: destination,
                            amount: total - fees
                        }]

                        var tx = self.sdk.node.transactions.create.wallet(inputs, outputs, null, false, htlc)


                        self.sdk.node.transactions.send(tx, function (d, err) {


                            if (err) {
                                sitemessage(err)
                            }

                        })


                    }
                },



            },

            sys: {

                revokeproxy: function (node, clbk) {

                    self.app.ajax.api({
                        action: 'nodes.revoke',

                        data: node,
                        signature: true,

                        success: function (d) {

                            removeEqual(self.app.platform.nodes, {
                                host: node.host
                            })

                            if (clbk)
                                clbk(false, d.data)
                        },
                        fail: function (d) {

                            if (clbk)
                                clbk(deep(d, 'error') || deep(d, 'data') || 'Undefined Error')
                        }
                    })

                },

                createproxy: function (node, clbk) {

                    self.app.ajax.api({
                        action: 'nodes.create',

                        data: node,
                        signature: true,

                        success: function (d) {

                            if (clbk)
                                clbk(false, d.data)
                        },
                        fail: function (d) {

                            if (clbk)
                                clbk(deep(d, 'data') || deep(d, 'error') || 'Undefined Error')
                        }
                    })

                },

                updateproxy: function (node, clbk) {

                    var udata = _.clone(node)

                    delete udata.stable;
                    delete udata.statistic

                    self.app.ajax.api({
                        action: 'nodes.update',
                        data: udata,
                        signature: true,

                        success: function (d) {

                            if (clbk)
                                clbk(false, d.data)
                        },
                        fail: function (d) {

                            if (clbk)
                                clbk(deep(d, 'data') || deep(d, 'error') || 'Undefined Error')
                        }
                    })

                },

                createlocally: function (node, clbk) {
                    var f = _.find(this.userlist, function (n) {

                        if (n.host == node.host) {
                            return true;
                        }


                    })

                    if (f) {
                        if (clbk)
                            clbk(self.app.localization.e('e13292'))

                        return
                    }

                    node.addedby = self.sdk.address.pnet().address
                    node.date = new Date()

                    this.userlist.unshift(node)

                    this.save()

                    if (clbk)
                        clbk(null, node)


                },
                updatelocally: function (node, clbk) {

                    var f = _.find(this.userlist, function (n) {

                        if (n.host == node.host) {
                            return true;
                        }

                    })

                    if (!f) {
                        if (clbk)
                            clbk(self.app.localization.e('e13293') + ' /ul100')

                        return
                    } else {
                        f.ws = node.ws,
                            f.port = node.port,
                            f.name = node.name;

                        this.save()


                        if (clbk)
                            clbk(null, f)
                    }

                },

                revokelocally: function (node, clbk) {

                    removeEqual(this.userlist, {
                        host: node.host
                    })

                    this.save()

                    if (clbk)
                        clbk(null)
                },

                userlist: [],

                save: function () {

                    try {
                        localStorage['usernodes'] = JSON.stringify({
                            list: this.userlist
                        })
                    } catch (e) {

                    }


                },

                load: function () {
                    var p = {};

                    try {
                        p = JSON.parse(localStorage['usernodes'] || '{}');
                    } catch (e) {

                    }


                    this.userlist = p.list || []
                }
            }

        },

        pool: {
            current: null,

            info: function (pack, clbk) {
                self.sdk.users.get(pack.addresses, clbk, true)
            },

            dumpKey: function (pack, address, clbk) {
                this.expand(pack, function (pa) {

                    var i = _.indexOf(pa.addresses, address)

                    if (i == -1) {
                        if (clbk)
                            clbk(null)
                    } else

                    if (clbk)
                        clbk(pa.private[i])



                })
            },

            expand: function (exportedPack, clbk) {

                self.app.user.isState(function (state) {

                    if (!state) {
                        if (clbk)
                            clbk(null, 'state')
                    } else {
                        var address = self.sdk.address.pnet().address;

                        var i = _.indexOf(exportedPack.addresses, address);

                        if (i > -1) {
                            var _key = null;
                            var aeskey = exportedPack.aes[i];

                            var mk = self.app.user.private.value.toString('hex');

                            if (self.cryptography.disabled) {
                                if (clbk)
                                    clbk(null, 'disabledcryptography')
                            }

                            self.cryptography.api.aeswc.decryption(aeskey, mk, {}, function (decrypted) {


                                _key = decrypted;

                                var pack = {
                                    addresses: exportedPack.addresses,

                                    private: [],

                                    aes: exportedPack.aes,

                                    _key: _key
                                }


                                lazyEach({
                                    array: exportedPack.keys,
                                    action: function (p, index) {
                                        var privatemk = p.item;


                                        self.cryptography.api.aeswc.decryption(privatemk, _key, {}, function (mk) {

                                            if (mk) {
                                                pack.private[index] = mk;

                                                p.success()
                                            }

                                        })
                                    },

                                    sync: true,

                                    all: {
                                        success: function () {


                                            if (clbk)
                                                clbk(pack)

                                        }
                                    }
                                })
                            })
                        } else {
                            if (clbk)
                                clbk(null, 'address')
                        }
                    }



                })
            },

            export: function (pack, clbk) {

                var exported = {
                    addresses: pack.addresses,
                    keys: [],
                    aes: pack.aes
                }


                lazyEach({
                    array: pack.private,
                    action: function (p, index) {
                        var _private = p.item;

                        self.cryptography.api.aeswc.encryption(_private, pack._key, {}, function (encrypted) {
                            exported.keys[index] = encrypted;

                            p.success()
                        })
                    },

                    sync: true,

                    all: {
                        success: function () {

                            if (clbk)
                                clbk(exported)

                        }
                    }
                })
            },

            push: function (pack, address, mk, _key, clbk) {

                pack.addresses.push(address)
                pack.private.push(mk)



                self.cryptography.api.aeswc.encryption(_key, mk, {}, function (encrypted) {

                    pack.aes.push(encrypted)

                    if (clbk)
                        clbk(pack)

                })
            },

            remove: function (pack, address) {
                var s = self.sdk.pool;
                var pool = s.get();

                var i = _.indexOf(pack.addresses, address);

                if (i > -1) {

                    pack.addresses.splice(i, 1)

                    if (pack.private) {
                        pack.private.splice(i, 1)
                    }

                    if (pack.keys) {
                        pack.keys.splice(i, 1)
                    }

                    if (pack.aes) {
                        pack.aes.splice(i, 1)
                    }

                    delete pool.map[address]

                    return true
                }

                return false
            },

            add: function (pack, mnemonic, clbk) {
                var s = self.sdk.pool;
                var pool = s.get();

                var keyPair = self.app.user.keysPairFromPrivate(mnemonic)

                if (!keyPair) {

                    if (clbk)
                        clbk(null, 'failedkeypair')

                    return
                }

                var address = self.sdk.address.pnetsimple(keyPair.publicKey).address;

                var mk = keyPair.privateKey.toString('hex');

                if (_.indexOf(pack.addresses, address) > -1) {
                    if (clbk)
                        clbk(null, 'hasinthispack')

                    return;
                }

                if (pool.map[address]) {

                    var id = pool.map[address];
                    var _pack = pool.packs[id];

                    if (_pack.addresses.length > 1 /* || _pack.addresses[0] == address*/ ) {
                        if (clbk)
                            clbk(null, 'hasinanotherpack')

                        return;
                    } else {
                        delete pool.map[address]
                        delete pool.packs[id]
                    }

                }

                this.push(pack, address, mk, pack._key, function () {

                    s.currentMap();

                    if (clbk)
                        clbk(pack)

                })

            },

            new: function (clbk) {

                var s = self.sdk.pool

                var pack = {
                    addresses: [],

                    private: [],

                    aes: [],

                    _key: null
                }

                var ps = [null, null]

                self.app.user.isState(function (state) {

                    if (!state) {

                        ps[1] = 'state'

                    } else {
                        var key = app.user.private.value;

                        if (key) {

                            var mk = key.toString('hex');

                            var address = self.sdk.address.pnet().address;

                            pack._key = self.cryptography.api.random.crypto();

                            s.push(pack, address, mk, pack._key, function (pack) {

                                s.export(pack, function (exported) {

                                    ps[0] = exported

                                    if (clbk)
                                        clbk(ps[0], ps[1])
                                })


                            })



                            return

                        } else {

                            ps[1] = 'key'
                        }
                    }

                    if (clbk)
                        clbk(ps[0], ps[1])

                })
            },

            init: function (clbk) {

                var s = self.sdk.pool

                self.app.user.isState(function (state) {

                    if (state && !_Node) {
                        var pool = s.get();

                        var address = self.sdk.address.pnet().address;

                        var packid = pool.map[address];

                        s.current = pool;

                        if (!packid) {
                            s.new(function (exportedpack, error) {
                                if (!exportedpack) {
                                    sitemessage(error);
                                } else {
                                    var id = makeid();

                                    pool.map[address] = id;
                                    pool.packs[id] = exportedpack;

                                    s.save();
                                }

                                if (clbk)
                                    clbk(exportedpack, id)
                            })
                        } else {
                            if (clbk)
                                clbk(pool.packs[packid], packid)

                        }
                    } else {
                        if (clbk)
                            clbk()
                    }

                })
            },

            get: function () {

                var s = self.sdk.pool

                var pool = s.current;

                if (!pool) {


                    try {
                        pool = localStorage['pool'];
                    } catch (e) {

                    }

                    if (pool) pool = JSON.parse(pool)
                }

                if (!pool) {
                    pool = {
                        map: {},
                        packs: {}
                    };
                }

                return pool;
            },

            getPack: function (address) {
                var s = self.sdk.pool;

                var pool = s.get();

                var id = pool.map[address]

                if (id) {
                    return [pool.packs[id], id]
                }
            },

            currentMap: function () {

                var c = self.sdk.pool.current;

                c.map = {};

                _.each(c.packs, function (pack, packid) {
                    _.each(pack.addresses, function (address) {
                        c.map[address] = packid
                    })
                })

            },

            save: function (pool) {

                var s = self.sdk.pool;

                self.app.user.isState(function (state) {

                    if (state && s.current) {

                        s.currentMap();

                        try {
                            localStorage['pool'] = JSON.stringify(s.current)
                        } catch (e) {

                        }



                    }

                })

            }
        },

        system16: {
            requestes: {},

            clbks: {
                tick: {

                }
            },

            tickstate: {},
            tickstatehash: [],
            inited: false,

            proxy: {
                settings: {
                    meta: {

                        server: {
                            name: self.app.localization.e('e13302'),
                            id: 'server',
                            type: "BOOLEAN",
                            value: false,

                            dbId: 'server'
                        },

                        serverPortHttps: {
                            name: self.app.localization.e('e13303'),
                            id: 'serverPortHttps',
                            type: "NUMBER",
                            value: '',
                            format: {
                                Precision: 0,
                                groupSeparator: ''
                            },
                            dbId: 'ports.https'
                        },

                        serverPortWss: {
                            name: self.app.localization.e('e13304'),
                            id: 'serverPortWss',
                            type: "NUMBER",
                            value: '',
                            format: {
                                Precision: 0,
                                groupSeparator: ''
                            },
                            dbId: 'ports.wss'
                        },

                        serverSslKeyUpload: {
                            name: self.app.localization.e('e13305'),
                            id: 'serverSslKeyUpload',
                            type: "file",
                            value: '',

                            upload: {

                            },

                            dbId: 'ssl.key'
                        },

                        serverSslCertUpload: {
                            name: self.app.localization.e('e13306'),
                            id: 'serverSslCertUpload',
                            type: "file",
                            value: '',
                            upload: {

                            },
                            dbId: 'ssl.cert'
                        },

                        serverSslPassphrase: {
                            name: self.app.localization.e('e13307'),
                            id: 'serverSslPassphrase',
                            type: "password",
                            value: '',

                            dbId: 'ssl.passphrase'
                        },

                        serverFirebaseAdminSDK: {
                            name: self.app.localization.e('e13308'),
                            id: 'serverFirebaseAdminSDK',
                            type: "file",
                            value: '',
                            upload: {

                            },
                            dbId: 'fbk'
                        },

                        pocketNetAuthTransactionCrane: {
                            name: self.app.localization.e('e13309'),
                            id: 'pocketNetAuthTransactionCrane',
                            type: "STRING",
                            value: '',

                            dbId: 'refkey'
                        },

                        captchaEnable: {
                            name: self.app.localization.e('e13310'),
                            id: 'captchaEnable',
                            type: "BOOLEAN",
                            value: true,

                            dbId: 'captcha'
                        },

                        iplimiterEnable: {
                            name: self.app.localization.e('e13311'),
                            id: 'iplimiterEnable',
                            type: "BOOLEAN",
                            value: true,

                            dbId: 'iplimiter'
                        }
                    },

                    create: function (id) {

                        var t = self.sdk.system16.proxy.settings

                        var m = t.meta;

                        var p = new Parameter(m[id])

                        return p;
                    },

                    createall: function () {
                        var t = self.sdk.system16.proxy.settings

                        var create = t.create
                        var m = t.meta;

                        var options = {};

                        _.each(m, function (p, id) {
                            options[id] = create(id)
                        })

                        return options
                    },

                    compose: function (values) {

                        if (!values) values = {}

                        var s = self.sdk.system16.proxy.settings;

                        var options = s.createall()

                        var m = s.meta;

                        var c = {


                            server: {
                                name: self.app.localization.e('e13312'),
                                options: {

                                    server: options.server,
                                    serverPortHttps: options.serverPortHttps,
                                    serverPortWss: options.serverPortWss,
                                    serverSslKeyUpload: options.serverSslKeyUpload,
                                    serverSslCertUpload: options.serverSslCertUpload,
                                    serverSslPassphrase: options.serverSslPassphrase

                                }
                            },

                            firebase: {
                                name: self.app.localization.e('e13314'),
                                options: {

                                    serverFirebaseAdminSDK: options.serverFirebaseAdminSDK

                                }
                            },

                            other: {
                                name: self.app.localization.e('e13315'),
                                options: {

                                    pocketNetAuthTransactionCrane: options.pocketNetAuthTransactionCrane,
                                    captchaEnable: options.captchaEnable,
                                    iplimiterEnable: options.iplimiterEnable

                                }
                            },


                        }

                        _.each(options, function (o) {
                            if (deep(values, o.dbId)) o.value = deep(values, o.dbId)
                        })

                        return {
                            c: c,
                            o: options
                        }

                    },
                }
            },

            // node control settings
            node: {
                settings: {
                    meta: {

                        Enable: {
                            name: self.app.localization.e('e13316'),
                            id: 'Enable',
                            type: "BOOLEAN",
                            value: false,
                            dbId: 'Enable'
                        },
                        BinPath: {
                            name: self.app.localization.e('e13317'),
                            id: 'binPath',
                            type: "FILE_SELECT",
                            upload: {},
                            value: '',
                            dbId: 'BinPath'
                        },
                        ConfPath: {
                            name: self.app.localization.e('e13318'),
                            id: 'confPath',
                            type: "FILE_SELECT",
                            upload: {},
                            value: '',
                            dbId: 'ConfPath'
                        },
                        DataPath: {
                            name: self.app.localization.e('e13319'),
                            id: 'dataPath',
                            type: "FILE_SELECT",
                            upload: {},
                            value: '',
                            dbId: 'DataPath'
                        },
                        SetPrivateKey: {
                            name: self.app.localization.e('e13320'),
                            id: 'setPrivateKey',
                            type: "BUTTON",
                            value: '#link_to_wallets',
                            text: self.app.localization.e('e13321'),
                            dbId: 'SetPrivateKey'
                        },

                        state: {
                            name: self.app.localization.e('e13322'),
                            id: 'state',
                            type: "LABEL",
                            value: '',
                            dbId: 'control.state'
                        },

                        addresses: {
                            name: self.app.localization.e('e13323'),
                            id: 'addresses',
                            type: "LABEL",
                            value: '',
                            dbId: 'control.addresses'
                        },

                        lastBlock: {
                            name: self.app.localization.e('e13324'),
                            id: 'lastBlock',
                            type: "LABEL",
                            value: '-',
                            dbId: 'control.lastBlock'
                        }
                    },

                    create: function (id) {

                        var t = self.sdk.system16.node.settings

                        var m = t.meta;

                        var p = new Parameter(m[id])

                        return p;
                    },

                    createall: function () {
                        var t = self.sdk.system16.node.settings

                        var create = t.create
                        var m = t.meta;

                        var options = {};

                        _.each(m, function (p, id) {
                            options[id] = create(id)
                        })

                        return options
                    },

                    compose: function (values) {

                        if (!values) values = {}

                        var s = self.sdk.system16.node.settings;

                        var options = s.createall()

                        var m = s.meta;

                        var c = {

                            control: {
                                name: self.app.localization.e('control'),
                                options: {

                                    state: options.state,
                                    lastBlock: options.lastBlock,
                                    addresses: options.addresses,

                                }
                            },

                            setup: {
                                name: self.app.localization.e('setup'),
                                options: {

                                    Enable: options.Enable,
                                    DataPath: options.DataPath,
                                    SetPrivateKey: options.SetPrivateKey,

                                }
                            },

                        }

                        _.each(options, function (o) {
                            if (deep(values, o.dbId)) o.value = deep(values, o.dbId)
                        })

                        return {
                            c: c,
                            o: options
                        }

                    },
                }
            },

            destroy: function () {
                if (electron) {
                    electron.ipcRenderer.off('proxy-message', this.response)
                    this.inited = false
                }
            },

            request: function (action, data, clbk) {

                var rdata = {
                    action: action,
                    id: makeid(),
                    data: data
                }

                self.sdk.system16.requestes[rdata.id] = {
                    id: rdata.id,
                    clbk: function (error, data) {
                        if (clbk) clbk(error, data)
                    }

                }

                electron.ipcRenderer.send('proxy-message', rdata);

            },

            tick: function (e, message) {

                var t = self.sdk.system16
                var hash = bitcoin.crypto.hash256(JSON.stringify(message))

                var change = (hash.join('') !== t.tickstatehash.join(''))

                t.tickstatehash = hash
                t.tickstate = message.data || {}

                _.each(t.clbks.tick, function (c) {
                    if (c)
                        c(t.tickstate, change)
                })
            },

            response: function (e, message) {
                var request = self.sdk.system16.requestes[message.id]

                if (request) {

                    if (request.clbk)
                        request.clbk(message.error, message.data)

                    delete self.sdk.system16.requestes[message.id]
                } else {

                    /// another messages/ system

                }
            },

            init: function () {

                this.clbks.tick = {}
                this.tickstate = {}
                this.tickstatehash = []

                if (electron) {
                    electron.ipcRenderer.on('proxy-message', this.response)
                    electron.ipcRenderer.on('proxy-message-tick', this.tick)
                }

                this.inited = true
            }
        },

        videos: {
            storage: {},
            historykey: 'videohistory_v1_',

            unposted: {
                remove: function (url) {
                    var unpostedVideos;

                    try {
                        unpostedVideos = JSON.parse(localStorage.getItem('unpostedVideos') || '{}');
                    } catch (error) {
                        unpostedVideos = {};

                        app.Logger.error({
                            err: 'DAMAGED_LOCAL_STORAGE',
                            code: 801,
                            payload: error,
                        });
                    };

                    if (unpostedVideos[app.user.address.value]) {
                        unpostedVideos[app.user.address.value] = unpostedVideos[app.user.address.value].filter(
                            (video) => video !== url,
                        );

                        try {
                            localStorage.setItem('unpostedVideos', JSON.stringify(unpostedVideos));
                        } catch (e) {

                        }


                    }
                }
            },

            historygetall: function () {

                var data = {}

                for (var i = 0; i < localStorage.length; i++) {

                    var key = localStorage.key(i)

                    if (key.indexOf(this.historykey) > -1) {
                        try {
                            data[key.replace(this.historykey, '')] = JSON.parse(localStorage.getItem(key))

                        } catch (e) {

                        }
                    }

                }

                return _.map(_.sortBy(_.toArray(data), (v) => {
                    return -(new Date(v.date)).getTime()
                }), (v) => {
                    if (v.data && v.data.data) {

                        var s = new pShare();

                        var cleaned = self.psdk.share.cleanData([v.data.data])

                        if (cleaned && cleaned.length) {
                            s._import(cleaned[0]);

                            v.data.share = s
                        }

                    }

                    return v
                })
            },

            historyget: function (txid) {

                var h = {
                    time: 0,
                    date: null,
                    percent: 0
                }


                try {
                    var jsn = JSON.parse(localStorage[self.sdk.videos.historykey + txid] || "{}")

                    if (jsn.time) h.time = jsn.time
                    if (jsn.date) h.date = jsn.date
                    if (jsn.percent) h.percent = Number(jsn.percent)

                } catch (e) {}

                return h
            },
            historyset: function (txid, data) {

                if (!data) data = {}

                data.time || (data.time = 0)

                var lasthistory = self.sdk.videos.historyget(txid)

                lasthistory.time = data.time
                lasthistory.date = new Date()
                lasthistory.percent = data.percent
                lasthistory.txid = txid
                lasthistory.data = data

                try {
                    localStorage[self.sdk.videos.historykey + txid] = JSON.stringify(lasthistory)
                } catch (e) {}
            },

            infoshares: function (shares) {


                var links = _.filter(_.map(shares, function (s) {
                    return s ? s.url : null
                }), function (l) {
                    return l ? true : false
                })

                return self.sdk.videos.info(links)

            },
            clearstorage: function (link) {

                if (!link) return

                delete this.storage[link]

                var meta = parseVideo(link)

                if (meta.type == 'peertube') {
                    delete window.peertubeglobalcache[meta.id]
                }


            },
            info: function (links, update, proxyupdate) {


                var s = self.sdk.videos.storage


                var lmap = _.map(links, function (l) {

                    var meta = parseVideo(l)

                    return {
                        meta: meta,
                        link: l
                    }
                });

                lmap = _.filter(lmap, function (l) {

                    if (!l.meta.type) return false

                    if (s[l.link] && !s[l.link].waitTranscoding && !update) return false

                    return true
                })

                if (!lmap.length) return Promise.resolve()

                var groups = group(lmap, function (l) {
                    return /*l.meta.subType || */ l.meta.type;
                })

                var promisesmap = _.map(groups, function (links, type) {

                    if (!self.sdk.videos.types[type]) {
                        return Promise.reject('typehandler')
                    }

                    return self.sdk.videos.types[type](links, proxyupdate).then(r => {

                        _.each(r, function (l) {
                            s[l.link] = s[l.meta.id] = l
                        })

                        return Promise.resolve(r)
                    }).catch(e => {
                        return Promise.resolve()
                    })

                })

                return Promise.all(promisesmap).catch(e => {
                    return Promise.resolve()
                })
            },

            paddingplaceholder: function (url, middle, clbk, elf) {

                if (!url) {
                    middle(clbk)
                    return
                }

                return self.sdk.videos.info([url]).catch((e) => {
                    return Promise.resolve()
                }).then(() => {

                    middle(function (p) {

                        if (self.sdk.videos.storage[url] && self.sdk.videos.storage[url].data) {
                            var info = self.sdk.videos.storage[url].data;

                            var loadingPlayer = elf ? elf() : p.el.find('.jsPlayerLoading-matte');

                            var width = 100;

                            loadingPlayer.css('padding-top', `${width / (2 * info.aspectRatio)}%`);
                            loadingPlayer.css('padding-bottom', `${width / (2 * info.aspectRatio)}%`);
                        }

                        if (clbk) clbk(p)
                    })

                })
            },

            getVideoResponse: function (videos) {
                var s = self.sdk.videos.storage

                var lmap = _.map(videos, function (i, l) {

                    var meta = parseVideo(l)

                    return {
                        meta: meta,
                        link: l
                    }
                })

                self.sdk.videos.catchPeertubeLinks(videos, lmap)

                _.each(lmap, function (l) {
                    s[l.link] = s[l.meta.id] = l
                })
            },

            catchPeertubeLinks: function (linksInfo, links) {
                if (!window.peertubeglobalcache)
                    window.peertubeglobalcache = {}

                links.forEach(link => {

                    const linkInfo = linksInfo[link.link];

                    if (linkInfo) {

                        if ((new Date(linkInfo.createdAt)).getTime() < (new Date(2021, 4, 19)).getTime() || linkInfo.isLive) {
                            linkInfo.aspectRatio = 1.78
                        }

                        linkInfo ? link.data = {
                            image: 'https://' + linkInfo.from + linkInfo.previewPath,
                            thumbnail: 'https://' + linkInfo.from + linkInfo.thumbnailPath,
                            views: linkInfo.views,
                            viewers: linkInfo.viewers,
                            duration: linkInfo.duration,
                            aspectRatio: linkInfo.aspectRatio || 1,
                            isLive: linkInfo.isLive,

                            isCorrect: linkInfo.uuid ? true : false,
                            original: linkInfo
                        } : '';

                        if (link.meta.id.indexOf('/audio') > -1) {
                            window.peertubeglobalcache[link.meta.id.replace('/audio', '')] = linkInfo
                        }
                        window.peertubeglobalcache[link.meta.id] = linkInfo
                    }


                });
            },

            types: {
                youtube: function (links) {
                    var result = _.map(links, function (l) {

                        l.data = {
                            image: videoImage(l.link),
                            views: 0
                        }

                        return l

                    })

                    return Promise.resolve(result)
                },

                vimeo: function (links) {
                    return self.sdk.videos.types.youtube(links)
                },

                peertube: function (links, update) {

                    return self.app.api.fetch('peertube/videos', {
                        urls: links.map(link => link.link),
                        update : update ? true : false
                    }).then(linksInfo => {
                        self.sdk.videos.catchPeertubeLinks(linksInfo, links)
                        return Promise.resolve(links);
                    })

                },

                common: function (links) {

                    return self.app.api.fetch('peertube/videos', {
                        urls: links.map(link => link.link),
                    }).then(linksInfo => {
                        self.sdk.videos.catchPeertubeLinks(linksInfo, links)
                        return Promise.resolve(links);
                    })

                },


                peertubeStream: function (links) {
                    const promisesStack = links.map((link) =>
                        self.app.peertubeHandler.api.videos
                        .getDirectVideoInfo({
                            id: link.meta.id
                        }, {
                            host: link.meta.host_name
                        }, )
                        .then((res) => ({
                            ...res,
                            linkFull: link.link,
                        })),
                    );

                    return Promise.all(promisesStack).then((res) => {
                        const linksInfoObject = res.reduce(
                            (acc, curVal) => ({
                                ...acc,
                                [curVal.linkFull]: curVal,
                            }), {},
                        );
                        self.sdk.videos.catchPeertubeLinks(linksInfoObject, links)
                        return Promise.resolve(links);
                    });
                },

                bitchute: function (links) {

                    var promises = _.map(links, function (l) {
                        return new Promise((resolve, reject) => {

                            var link = l.link.replace('/embed/', '/video/');

                            self.app.platform.sdk.remote.getnew(link, 'bitchute').then(og => {

                                if (og.video && og.video.as) {

                                    return resolve(og.video)

                                } else {
                                    reject()
                                }


                            }).catch(reject)



                        }).then(r => {

                            l.data = {
                                views: 0,
                                image: r.preview
                            }

                            return Promise.resolve(l)
                        })
                    })

                    return Promise.all(promises)

                },
                ipfs: function (links) {
                    const dataMap = links.map((l) => {
                        l.data = {
                            views: 0,
                            image: null
                        };

                        return l;
                    });

                    return Promise.resolve(dataMap);
                },
            },

            volume: 0,
            save: function () {

                try {
                    localStorage['pn_videovolume_2'] = self.sdk.videos.volume || 1
                } catch (e) {

                }
            },
            load: function () {

                var _v = undefined

                try {
                    _v = localStorage['pn_videovolume_2']
                } catch (e) {

                }


                if (typeof _v == 'undefined') {
                    if (self.app.mobileview && !window.cordova)
                        _v = '0'
                    else
                        _v = '1'
                }


                self.sdk.videos.volume = Number(_v)

            },

            init: function (clbk) {
                self.sdk.videos.load()

                if (clbk) clbk()
            }
        },

        syncStorage: {
            eventListeners: {},
            on(eventType, lStorageProp, callback) {
                if (typeof this.eventListeners[lStorageProp] !== 'object') {
                    this.eventListeners[lStorageProp] = {};
                }

                this.eventListeners[lStorageProp][eventType] = callback;
            },
            off(eventType, lStorageProp) {
                if (this.eventListeners[lStorageProp]) {
                    delete this.eventListeners[lStorageProp][eventType];

                    if (Object.keys(this.eventListeners[lStorageProp]).length === 0) {
                        delete this.eventListeners[lStorageProp];
                    }
                }

            },
            init() {
                window.storage_tab = makeid()
                window.addEventListener('storage', (e) => {

                    if (!e.oldValue) {
                        this.eventListeners[e.key]?.create?.(e);
                        return;
                    }

                    if (!e.newValue) {
                        this.eventListeners[e.key]?.delete?.(e);
                        return;
                    }

                    this.eventListeners[e.key]?.change?.(e);
                });
            },
        },
    }

    self.sdk.memtags.saveandrun = _.debounce(self.sdk.memtags.saveandrunfast, 3000)


    self.Firebase = function (platform) {

        var self = this;

        //var FirebasePlugin = new FakeFirebasePlugin()

        var using = typeof window != 'undefined' && window.cordova && typeof FirebasePlugin != 'undefined';
        var usingWeb = typeof window != 'undefined' && typeof _Electron === 'undefined' && !window.cordova && typeof firebase != 'undefined'

        var currenttoken = null;

        var appid = deep(window, 'BuildInfo.packageName') || window.location.hostname || window.pocketnetdomain
        if (appid == 'localhost' || appid == '127.0.0.1') appid = 'pocketnet.app' /// url

        var device = function () {
            var id = platform.app.options.device

            return id;
        }

        var getaddress = function () {
            if (platform.sdk.address.pnet())
                return platform.sdk.address.pnet().address

            return null
        }


        self.storage = {
            data: {},
            key: 'firebasetokens_v1',
            clear: function () {
                self.storage.data = {}
                this.save()
            },
            load: function () {
                var storage = {};

                var local = null

                try {
                    local = localStorage[self.storage.key] || "{}";
                } catch (e) {

                }


                if (local) {
                    try {
                        storage = JSON.parse(local)
                    } catch (e) {}
                }

                self.storage.data = storage;
            },
            save: function () {
                try {
                    localStorage[self.storage.key] = JSON.stringify(self.storage.data);
                } catch (e) {

                }
            },

            get: function (proxy, address, token) {

                return deep(self.storage.data, appid + '.' + token + '.' + address + '.' + proxy)
            },

            set: function (proxy, address, token) {
                if (!self.storage.data[appid]) self.storage.data[appid] = {}
                if (!self.storage.data[appid][token]) self.storage.data[appid][token] = {}
                if (!self.storage.data[appid][token][address]) self.storage.data[appid][token][address] = {}

                self.storage.data[appid][token][address][proxy] = true

                this.save()
            }

        }

        self.api = {
            addMiniappToken: function (appId, address, proxy) {
                if (!self.isFirebaseConfigured) return Promise.reject('firebase:not_configured')
                return self.request.addMiniappToken(appId, address, proxy)
                    .then(r => {
                        const port = proxy.port ? `:${proxy.port}` : ''
                        return Promise.resolve({
                            token: r.token,
                            address: r.address,
                            proxy: `https://${proxy.host}${port}`
                        });
                    })
                    .catch(e => {
                        return Promise.reject(e);
                    });
            },
            checkMiniappToken: function (appId, address, proxy) {
                return self.request.checkMiniappToken(appId, address, proxy)
                    .then(r => {
                        return Promise.resolve(r);
                    })
                    .catch(e => {
                        return Promise.reject(e);
                    });
            },
            revoke: function (token, proxy) {

                var address = getaddress()

                if (!address) return Promise.reject()

            },

            revokeDevice: function (proxy) {

                return self.app.api.fetchauth('firebase/revokedevice', {
                    device: device()
                }, {
                    proxy: proxy
                })

            },

            setToken: function (address, token, proxy) {

                if (!address) return Promise.reject('address')

                if (!proxy) return Promise.reject('proxy')

                //var exist = self.storage.get(proxy, address, token)

                return self.request.setToken(token, proxy).then(r => {

                    self.storage.set(proxy, address, token)

                    return Promise.resolve()

                })

            },

            setSettings: function (proxy) {
                if (!proxy) return Promise.reject('proxy')
                return self.request.setSettings(proxy).then(r => {
                    return Promise.resolve()
                })
            },

            existanother: function (proxy, address) {
                var obj = self.storage.data[appid] || {}

                var nf = function (obj, ii) {
                    return _.find(obj || {}, function (v, i) {
                        return i != ii
                    })
                }

                obj = nf(obj, proxy)

                if (obj) return true

                obj = nf(obj, address)

                if (obj) return true

                return false
            },

            exist: function (proxy, address, token) {
                /*var exist = self.storage.get(proxy, address, token)

                if (exist){
                    return Promise.resolve(true)
                }*/

                return self.request.mytokens(proxy).then(r => {

                    var exist = _.find(r.tokens, function (t) {
                        return t.token == token && t.id == appid
                    })

                    if (exist) {
                        return Promise.resolve(exist)
                    }

                    return Promise.resolve(false)
                })
            },

            checkProxy: function (proxy) {
                return self.request.info(proxy).then(r => {

                    var apps = (r.id || "").split(',')

                    if (apps.indexOf(appid) == -1) {
                        return Promise.reject('proxyfirebaseid')
                    }
                    return Promise.resolve(appid)

                })
            }
        }

        self.revokeall = function () {
            if (using) {
                FirebasePlugin?.unregister();
            }

            self.storage.clear();

            return self.request.revokeall()
        }
        self.isFirebaseConfigured = async function () {
            const tokensData = self.storage.data[appid] || {};
            return Object.keys(tokensData).length > 0;
        }
        self.set = function (proxy) {
            if (!currenttoken) return Promise.reject('emptytoken')

            var address = getaddress()
            var token = currenttoken


            return self.api.checkProxy(proxy).then(r => {
                return self.api.exist(proxy, address, token)
            }).then(exist => {

                if (exist) return Promise.resolve()

                if (self.api.existanother(proxy, address)) return self.request.revokeall()

            }).then(r => {

                return self.api.setToken(address, token, proxy)
            }).catch(e => {
                console.log(e)
                return Promise.resolve()
            })

        }

        self.getNotificationsProxy = async function () {
            let current = null;
            for (const proxy of platform.app.api.get.proxies()) {
                const {
                    info
                } = await proxy.get.info();
                
                if (info.firebase.useNotifications && info.firebase.inited) {   
                    current = proxy;
                }
            }
            if (current) {
                return self.api.checkProxy(current).then(r => {
                    return Promise.resolve(current)
                })
            } else {
                return Promise.reject('none')
            }
        }

        self.settings = async function (current) {

            if (!using && !usingWeb) return
            if (!currenttoken) return

            if (!current) {
                for (const proxy of platform.app.api.get.proxies()) {
                    const {
                        info
                    } = await proxy.get.info();
                    if (info.firebase.useNotifications && info.firebase.inited) {
                        current = proxy;
                    }
                }
            }
            if (!current) return Promise.reject('proxy')

            return self.api.checkProxy(current).then(r => {
                return self.api.setSettings(current)
            }).catch(e => {
                console.log(e)
                return Promise.resolve()
            })
        }

        self.request = {
            addMiniappToken: function (appId, address, proxy) {
                return platform.app.api.fetchauth('miniapp/addToken', {
                    appId: appId,
                    address: address
                }, {
                    proxy: proxy
                });
            },
            checkMiniappToken: function (appId, address, proxy) {
                return platform.app.api.fetchauth('miniapp/checkToken', {
                    appId: appId,
                    address: address
                }, {
                    proxy: proxy
                });
            },
            revokeall: function () {

                return platform.app.api.fetchauthall('firebase/revokedevice', {
                    device: device()
                })

            },

            info: function (proxy) {
                return platform.app.api.fetchauth('firebase/info', {}, {
                    proxy: proxy
                })
            },

            mytokens: function (proxy) {
                return platform.app.api.fetchauth('firebase/mytokens', {
                    device: device()
                }, {
                    proxy: proxy
                })
            },

            revoke: function (token, proxy) {

                return platform.app.api.fetchauth('firebase/revoke', {
                    token
                }, {
                    proxy: proxy
                })

            },

            revokeDevice: function (proxy) {

                return platform.app.api.fetchauth('firebase/revokedevice', {
                    device: device()
                }, {
                    proxy: proxy
                })


            },

            setToken: function (token, proxy) {


                return platform.app.api.fetchauth('firebase/set', {
                    device: device(),
                    token: token,
                    id: appid,
                    settings: self.getSettings()
                }, {
                    proxy: proxy
                })

            },

            setSettings: function (proxy) {
                return platform.app.api.fetchauth('firebase/settings', {
                    device: device(),
                    settings: self.getSettings()
                }, {
                    proxy: proxy
                })

            }
        }

        self.getSettings = function () {
            const data = {}
            const settings = platform.sdk.usersettings.meta;

            var keys = {
                transactions: 't',
                upvotes: 'u',
                downvotes: 'd',
                comments: 'c',
                answers: 'a',
                followers: 'f',
                commentScore: 'cs',
                win: 'w'
            }

            _.each(keys, (key, i) => {
                if (settings[i]) {
                    data[key] = settings[i].value
                }

            })

            /*for(const key in settings){
                data[key] = settings[key].value;
            }*/

            data['web'] = Boolean(!window.cordova)

            return data;
        }

        self.get = function (clbk) {
            if (using) {

                FirebasePlugin.getToken(function (token) {

                    currenttoken = token
                    platform.fcmtoken = token

                    platform.matrixchat.changeFcm()

                    self.events()

                    if (clbk)
                        clbk(currenttoken)

                }, function (error) {
                    console.error(error, 'fcmToken not set on server');

                    if (clbk)
                        clbk()
                });


            } else if (usingWeb) {

                //
                // if (clbk)
                //     clbk()
                //
                // return

                try {
                    if (!firebase.apps.length) {

                        if(!window.project_config.firebaseweb){
                            throw 'window.project_config.firebaseweb'
                        }

                        firebase.initializeApp(JSON.parse(hexDecode(window.project_config.firebaseweb)));
                    }

                    const messaging = firebase.messaging();


                    messaging.getToken().then(token => {
                        currenttoken = token
                        platform.fcmtoken = token
                        platform.matrixchat.changeFcm()
                        self.events()

                        if (clbk)
                            clbk(token)

                    }).catch(e => {
                        console.log("E", e)
                    })

                } catch (e) {
                    console.log("E", e)
                }

            }
        }

        self.permissions = function (clbk) {
            if (using) {
                FirebasePlugin.hasPermission(function (hasPermission) {

                    if (!hasPermission) {
                        FirebasePlugin.grantPermission(function (hasPermission) {

                            if (hasPermission) {
                                self.get(clbk)
                            }

                        });
                    } else {
                        self.get(clbk)
                    }

                });
            } else if (usingWeb) {

                if (typeof Notification == 'undefined') {

                } else {
                    const notificationPermission = Notification.requestPermission();

                    if (!notificationPermission) {
                        return Notification.permission;
                    }

                    notificationPermission.then((permission) => {
                        if (permission === 'granted') {
                            self.get(clbk)
                        } else {
                            usingWeb = false;
                        }
                    });
                }



            }
        }

        self.events = function () {
            if (using) {
                FirebasePlugin.onMessageReceived((data) => {

                    pretry(function () {

                        return app.appready

                    }).then(r => {
                        if (!data) data = {}

                        if (data.data)
                            platform.ws.messageHandler(data.data)



                        if (data.room_id) {

                            if (data.tap) {
                                // Wait until we can navigate Matrix
                                retry(function () {

                                    return platform && platform.matrixchat && platform.matrixchat.core;

                                }, function () {

                                    setTimeout(function () {

                                        platform.matrixchat.core.goto(data.room_id);

                                        if (platform.matrixchat.core.apptochat)
                                            platform.matrixchat.core.apptochat();

                                    }, 50)



                                });
                            }



                            return;
                        }

                        if (data.tap) {

                            platform.ws.destroyMessages();
                            const body = JSON.parse(data?.json);
                            body.url = body?.url.replace("/index", "");

                            if (body.url) {
                                if (body.url === "/userpage?id=wallet") {
                                    platform.app.nav.api.go({
                                        open: true,
                                        href: 'wallet',
                                        history: true,
                                        inWnd: true,
                                        essenseData: {},
                                    });
                                } else {

                                    const params = new URLSearchParams(body.url);

                                    platform.app.nav.api.load({
                                        open: true,
                                        href: 'post?s=' + params.get('s'),
                                        inWnd: true,
                                        history: true,
                                        clbk: function (d, p) {
                                            app.nav.wnds['post'] = p
                                        },

                                        essenseData: {
                                            share: params.get('s'),

                                            reply: {
                                                answerid: params.get('commentid') || "",
                                                parentid: params.get('parentid') || "",
                                                noaction: true
                                            }
                                        }
                                    })

                                }
                            } else {
                                platform.app.nav.api.go({
                                    open: true,
                                    href: 'notifications',
                                    inWnd: true,
                                    history: true,
                                    essenseData: {}
                                })
                            }
                        } else {

                            if (typeof cordova != 'undefined') {

                                var cordovabadge = deep(cordova, 'plugins.notification.badge')

                                if (cordovabadge)
                                    cordovabadge.increase(1, function (badge) {});
                            }

                        }
                    })

                });

                // When token is refreshed, update the matrix element for the Vue app
                FirebasePlugin?.onTokenRefresh(function (token) {

                    platform.fcmtoken = token
                    currenttoken = token
                    platform.matrixchat.changeFcm()

                    //prepareclbk(token)

                }, function (error) {
                    console.error(error);
                });

            }
        }

        var prepareclbk = async function (token) {
            if (token) {
                let current = null;
                for (const proxy of platform.app.api.get.proxies()) {
                    const {
                        info
                    } = await proxy.get.info();
                    if (info.firebase.useNotifications && info.firebase.inited) {
                        current = proxy;
                    }
                }
                if (current) {
                    self.set(current).catch(e => {
                        console.log("error", e)
                    })
                }

            }

        }

        self.init = function (clbk) {

            if (clbk) clbk()

            app.user.isState(function (state) {

                if (state) {
                    self.prepare(function (token) {

                        prepareclbk(token)

                    })
                } else {

                }


            })

        }

        self.prepare = function (clbk) {
            self.storage.load()

            if (using || usingWeb) {

                self.permissions(clbk)
            } else {
                if (clbk)
                    clbk()
            }

        }

        self.destroy = function (clbk) {

            currenttoken = null

            self.storage.clear()

            // if (using || usingWeb){
            //     self.revokeall().then(clbk).catch(e => {})
            //
            //     return
            // }

            if (clbk)
                clbk()

        }

        return self;

    }

    self.WSn = function (platform) {

        var self = this;
        var app = platform.app;

        var socket;
        var opened = false;
        var closing = false;

        var wait = null;

        self.connected = {};
        self.online = false;
        self.onlineCheck = false;
        self.fastMessages = [];
        self.app = app

        var txidstorage = {};

        self.loadingMissed = false;


        self.tempates = {

            _share: function (share, c) {
                var m = share.caption || share.message;
                var nm = ''

                if (typeof joypixels != 'undefined') {
                    nm = joypixels.toImage(filterXSS(trimHtml(m, c || 20)));
                } else {
                    nm = filterXSS(trimHtml(m, c || 20));
                }

                if (share.repost) {
                    nm += ' + ' + self.app.localization.e('reposted')
                }

                return nm
            },

            share: function (share, extra, extendedpreview) {
                var h = '';

                var m = share.caption;

                var paidsub = share.visibility() == 'paid' && !platform.app.pkoindisable && !app.paidsubscriptiondisable

                if (!m) m = share.renders.text()

                var symbols = extendedpreview ? (platform.app.mobileview ? 80 : 180) : 20;

                var nm = trimHtml(m, symbols)

                var links = _.isObject(share.message) ? [] : linkify.find(share.message);

                var images = _.map(share.images, function (i) {
                    return {
                        i: i,
                        v: false
                    }
                });

                var meta = parseVideo(share.url || "")

                if (app.curation()) return ''

                h = '<div class="sharepreview"><div class="shareprwrapper">'

                if (images.length && !extendedpreview && !paidsub) {

                    var img = images[0]

                    h += '<div class="tcell forimage">'
                    h += '<div class="img" image="' + img.i + '">'

                    if (img.v) {
                        h += '<div class="vstyle">'
                        h += '<i class="fas fa-play"></i>'
                        h += '</div>'
                    }

                    h += '</div>'
                    h += '</div>'

                }

                h += '<div class="tcell fortext">'

                if (nm.length > 2 && !paidsub) {
                    h += '<div><span>' + nm + '</span></div>'
                }

                if (paidsub){
                    h += '<div><span><b>' + self.app.localization.e('fastmessagepaidsubscription_share') + '</b></span></div>'
                }

                if (share.repost) {
                    h += '<div><i class="fas fa-share"></i> <span>' + self.app.localization.e('reposted') + '</span></div>'
                }


                if (images.length && extendedpreview && !paidsub) {


                    h += '<div class="shareimages commentprev">'
                    h += '<div class="imagesContainer">'
                    _.each(images, function (image) {

                        h += '<div class="imagesWrapper">'
                        h += '<div class="image" image="' + image.i + '" i="' + image.i + '">'

                        if (image.v) {
                            h += '<div class="vstyle">'
                            h += '<i class="fas fa-play"></i>'
                            h += '</div>'
                        }

                        h += '</div>'
                        h += '</div>'

                    })

                    h += '</div>'
                    h += '</div>'

                }

                if (!paidsub && (images.length || links.length || share.tags.length || meta.type)) {

                    h += '<div class="additionalcontent">'

                    var a = ' + '

                    if (!meta.type) {
                        if (images.length) {
                            a += flb(self.app.localization.e('timages')) + ' (' + images.length + ') '
                        }

                        if (links.length) {
                            a += flb(self.app.localization.e('tlinks')) + ' (' + links.length + ') '
                        }

                        if (share.tags.length) {
                            a += flb(self.app.localization.e('e13280')) + ' (' + share.tags.length + ') '
                        }
                    } else {
                        a += '<b>' + flb(self.app.localization.e('video')) + '</b> <i class="fas fa-play"></i> '
                    }

                    h += a

                    h += '</div>'
                }

                h += '</div>'

                if (extra) {
                    h += '<div class="tcell extra">'
                    h += extra
                    h += '</div>'
                }


                h += '</div>\
                    </div>'


                return h;
            },

            transaction: function (data, message) {
                var h = '<div class="transactionmessage">'

                h += '<div class="transactionmessagewrapper">'

                if (message) {
                    h += '<div class="tcell formessage">'

                    h += clearStringXss(message)

                    h += '</div>'
                }

                h += '<div class="tcell foramount">'

                h += "+" + platform.mp.coin(clearStringXss(data.amountall || data.tx.amount));


                h += " PKOIN"

                if (data.opmessage == 'a:donate' || data.opmessage == 'a:reward' || data.opmessage == 'a:a' || data.opmessage == 'a:monetization') {
                    h += ' <i class="fas fa-heart"></i>'
                }

                if (data.opmessage == 'a:subscription') {
                    h += ' <i class="fas fa-fire"></i>'
                }



                h += '</div>'

                h += '</div>'

                h += '</div>'

                return h;
            },

            comment: function (comment, share) {

                var t = comment.renders.previewEmojidis();


                var h = '<div class="commentmessage">'

                h += '<div class="commentmessagewrapper table">'

                h += '<div class="tcell fortext">'


                if (t) {
                    h += '<div class="commenttext commentprev"><span>'
                    h += t
                    h += '</span></div>'
                }

                if (comment.images.length) {

                    h += '<div class="commentimages commentprev">'
                    h += '<div class="imagesContainer">'
                    _.each(comment.images, function (image) {

                        h += '<div class="imagesWrapper">'
                        h += '<div class="image imageCommentOpen" image="' + (image) + '" i="' + (image) + '">'
                        h += '</div>'
                        h += '</div>'

                    })

                    h += '</div>'
                    h += '</div>'

                }


                h += '</div>'

                h += '</div>'

                h += '</div>'

                return h;
            },

            commentScore: function (comment, thumbs) {

                var t = comment.renders.previewEmojidis();

                var h = '<div class="commentmessage">'

                h += '<div class="commentmessagewrapper table">'

                h += '<div class="tcell fortext">'

                if (t) {
                    h += '<div class="commenttext commentprev"><span>'
                    h += t
                    h += '</span></div>'
                }

                if (comment.images.length) {

                    h += '<div class="commentimages commentprev">'
                    h += '<div class="imagesContainer">'
                    _.each(comment.images, function (image) {
                        h += '<div class="imagesWrapper">'
                        h += '<div class="image imageCommentOpen" image="' + clearStringXss(image) + '" i="' + clearStringXss(image) + '">'
                        h += '</div>'
                        h += '</div>'
                    })

                    h += '</div>'
                    h += '</div>'

                }

                h += '</div>'

                if (thumbs) {
                    h += '<div class="tcell forthumbs">'
                    h += thumbs
                    h += '</div>'
                }


                h += '</div>'

                h += '</div>'

                return h;
            },

            star: function (count) {

                count = clearStringXss(count)

                var _star = '<i class="fas fa-star"></i>';
                if (electron) _star = '★';
                return '<div class="messagestar" count="' + count + '">' + count + '' + _star + '</div>'
            },

            thumbs: function (value) {

                var t = '';

                if (electron) {
                    t = '👍';

                    if (value < 0) t = '👎';
                } else {
                    t = '<i class="fas fa-thumbs-up"></i>';

                    if (value < 0) t = '<i class="fas fa-thumbs-down fa-flip-horizontal"></i>';
                }

                return '<div class="messagethumbs" value="' + clearStringXss(value) + '">' + t + '</div>'
            },

            _user: function (author) {
                return platform.api.clearname(filterXSS(deep(author, 'name') || author.address), true)
            },

            user: function (author, html, gotoprofile, caption, extra, time, donation) {

                if (!author || !author.name) {
                    return html
                }

                var h = '';

                var src = deep(author, 'image');
                var name = deep(author, 'name');
                var letter = name ? name[0] : '';

                var link = '<a href="' + encodeURI(clearStringXss(author.name.toLowerCase())) + '">'
                var clink = "</a>"

                /*if (app.curation()) {
                    link = ''
                    clink = ''
                    gotoprofile = false
                }*/


                h += '<div class="cwrapper">\
                    <div class="cell cellforimage">\
                        <div class="icon">'

                if (gotoprofile) h += link

                h += '<div class="usericon" contain ban=".gif" image="' + (clearStringXss(src || '') || '*') + '">'

                if (!src && letter) {

                    h += '<span class="letter">' + letter.toUpperCase() + '</span>';
                }


                if (self.app.platform.ui.markUser) {

                    h += self.app.platform.ui.markUser(author.address);

                }


                h += '</div>'

                if (gotoprofile) h += clink

                h += '</div>\
                    </div>\
                    <div class="ccell">\
                        <div class="infomain">\
                            <div class="caption">'

                if (author.address != platform.sdk.address.pnet().address) {

                    if (gotoprofile) h += link
                    h += '<b class="adr">' + platform.api.clearname(filterXSS(deep(author, 'name') || author.address), true) + '</b>'
                    if (gotoprofile) h += clink

                }

                if (caption) {

                    if (donation) {

                        h += " " + caption;

                    } else {

                        h += " " + clearStringXss(caption)

                    }
                }

                h += '</div>\
                            <div class="tips">' + (html) + '\
                            </div>\
                        </div>'

                h += self.tempates.time(time)

                h += '</div>'

                if (extra) {
                    h += '<div class="ccell extra">'
                    h += extra
                    h += '</div>'
                }


                h += '</div>'



                return h;
            },

            time: function (time) {

                var t = '';
                var h = '';

                if (time) {

                    t = new Date()
                    t.setTime(clearStringXss(time) * 1000);

                    h += '<div class="time">'
                    h += '<span class="realtime" time="' + t + '">' + app.reltime(t) + '</span>'
                    h += '</div>'
                }

                return h
            },

            subscribe: function (author) {

                var me = platform.psdk.userInfo.getmy()

                var d = ''

                if (me && me.relation(author.address, 'subscribes')) {
                    d = 'disabled'
                }

                var link = '<a href="' + encodeURI(clearStringXss(author.name.toLowerCase())) + '">'
                var clink = "</a>"

                var h = '<div class="subscribeWrapper ">'

                h += link + self.app.localization.e('gotoprofileMessage') + clink

                h += '</div>'

                return h
            },

            simple: function (json) {

                h += '<div class="cwrapper">\
                        <div class="cell cellforimage">\
                            <div class="icon">'


                h += '<div class="usericon" contain ban=".gif" image="' + (clearStringXss(json.image || '') || '*') + '">'
                h += '</div>'

                h += '</div>\
                        </div>\
                        <div class="ccell">\
                            <div class="infomain">\
                                <div class="caption">'

                if (json.caption) {
                    h += " " + clearStringXss(json.caption)
                }

                h += '</div>\
                                <div class="tips">' + clearStringXss(json.text) + '\
                                </div>\
                            </div>'

                h += self.tempates.time(json.time)

                h += '</div>'


                h += '</div>'

                return h;
            }


        }

        self.showedIds = {}

        self.messages = {

            registered: {
                loadMore: function (data, clbk) {

                    self.connected[data.addr] = true


                }
            },
            connectionfailed: {
                loadMore: function (data) {}
            },

            ///

            cScore: {
                electronSettings: {
                    size: 'medium'
                },
                fastMessageEvents: function (data, message, close) {

                    message.el.find('.commentprev').on('click', function () {

                        platform.app.nav.api.load({
                            open: true,
                            href: 'post?s=' + data.comment.postid,
                            inWnd: true,
                            history: true,
                            clbk: function (d, p) {
                                app.nav.wnds['post'] = p

                                if (close) close()
                            },

                            essenseData: {
                                share: data.comment.postid,

                                reply: {
                                    answerid: data.comment.id,
                                    parentid: data.comment.parentid || "",
                                    noaction: true
                                }
                            }
                        })



                        return false

                    })

                },

                loadMore: function (data, clbk, wa) {

                    platform.psdk.ws.update('cScore', data)

                    platform.sdk.users.get([data.addrFrom], function () {


                        data.user = platform.psdk.userInfo.get(data.addrFrom)


                        data.i = '👍';

                        if (data.value < 0) data.i = '👎';

                        platform.sdk.comments.getbyid(data.commentid, function (t) {

                            data.comment = t[0]

                            //data.comment = deep(platform.sdk.comments, 'storage.all.' + data.commentid)

                            if (data.comment) {
                                if (data.upvoteVal > 0) data.comment.scoreUp++
                                else data.comment.scoreDown++
                            }

                            if (data.comment && !data.comment.deleted) {

                            }

                            clbk()

                        })

                    }, true)

                },

                refs: {

                },
                audio: {
                    unfocus: 'water_droplet',
                    if: function (data) {

                        if (data.user && data.comment && platform.sdk.usersettings.meta.commentScore.value) {
                            return true
                        }

                        return false;
                    }
                },

                notificationData: function (data) {
                    var n = {};

                    if (data.user && data.comment && !data.comment.deleted && data.upvoteVal > 0) {
                        n.text = self.tempates._user(data.user) + " " + self.app.localization.e('e13328')
                        n.caption = self.app.localization.e('e13329')
                    }

                    if (_.isEmpty(n))
                        return null;

                    return n
                },

                fastMessage: function (data) {

                    var text = '';
                    var html = '';

                    if (data.user && data.user.address) {

                        var me = platform.sdk.user.me()
                        if (me && me.relation(data.user.address, 'blocking')) {
                            return html
                        }

                    }

                    if (data.comment && !data.comment.deleted && (data.upvoteVal > 0 || platform.sdk.usersettings.meta.downvotes.value)) {

                        if (platform.sdk.usersettings.meta.commentScore.value) {
                            text = self.tempates.commentScore(data.comment)
                        }

                        if (text) {
                            html += self.tempates.user(data.user, '<div class="text">' + text + '</div>', true, platform.app.localization.e('upvoteCommentMessage') + ':', self.tempates.thumbs(data.upvoteVal), data.time)
                        }

                    }



                    return html;

                },

                clbks: {}
            },

            reshare: {
                loadMore: function (data, clbk, wa) {

                    platform.sdk.users.get([data.addrFrom], function () {

                        data.user = platform.psdk.userInfo.get(data.addrFrom)

                        platform.sdk.node.shares.getbyid([data.txid, data.txidRepost], function (s, fromcashe) {


                            s || (s = []);

                            if (s[0]) {
                                data.share = s[0];
                            }

                            if (s[1]) {
                                data.shareReposted = s[1];
                            }

                            clbk()
                        })

                    }, true)

                },

                refs: {

                },
                audio: {
                    unfocus: 'water_droplet',
                    if: function (data) {

                        if (data.share) {
                            return true
                        }

                        return false;
                    }
                },

                notificationData: function (data) {
                    var n = {};

                    if (data.user && data.share) {
                        n.caption = self.tempates._user(data.user) + ' ' + self.app.localization.e('e13330')
                        n.text = self.tempates._share(data.shareReposted, platform.app.mobileview ? 50 : 100)
                    }

                    if (_.isEmpty(n))
                        return null;

                    return n
                },

                fastMessage: function (data) {

                    var text = '';
                    var html = '';


                    if (data.user && data.user.address) {

                        var me = platform.sdk.user.me()
                        if (me && me.relation(data.user.address, 'blocking')) {
                            return html
                        }

                    }

                    if (data.share && data.shareReposted) {
                        text = self.tempates.share(data.share, null, true) + '<div class="sharedivide"></div>' + self.tempates.share(data.shareReposted, null, true)
                    }



                    if (text) {
                        html += self.tempates.user(data.user, text, true, " " + self.app.localization.e('e13331'), '<div class="repostshare"><i class="fas fa-share"></i></div>', data.time)
                    }


                    return html;

                },

                fastMessageEvents: function (data, message, close) {

                    message.el.find('.sharepreview').on('click', function () {


                        platform.app.nav.api.load({
                            open: true,
                            href: 'post?s=' + data.txid,
                            inWnd: true,
                            history: true,
                            clbk: function (d, p) {
                                app.nav.wnds['post'] = p

                                if (close) close()
                            },

                            essenseData: {
                                share: data.txid
                            }
                        })

                        return false
                    })

                },

                clbks: {}
            },

            postfromprivate: {
                loadMore: function (data, clbk, wa) {

                    if (data.addrFrom) {

                        platform.sdk.users.get([data.addrFrom], function () {

                            data.user = platform.psdk.userInfo.get(data.addrFrom)


                            if (data.txids && !data.txid) data.txid = data.txids

                            platform.psdk.ws.update('share', data)

                            platform.sdk.node.shares.getbyid(data.txid, function (s, fromcashe) {

                                s || (s = []);

                                if (s[0]) {
                                    data.share = s[0];
                                }

                                clbk()
                            })

                        }, true)

                        return
                    }

                    clbk()
                },

                refs: {

                },
                audio: {
                    unfocus: 'water_droplet',
                    if: function (data) {

                        if (data.share) {
                            return true
                        }

                        return false;
                    }
                },

                notificationData: function (data) {
                    var n = {};

                    if (data.user && data.share) {
                        n.caption = self.tempates._user(data.user) + " " + self.app.localization.e('e13332')
                        n.text = self.tempates._share(data.share, platform.app.mobileview ? 50 : 100)
                    }

                    if (_.isEmpty(n))
                        return null;

                    return n
                },

                fastMessage: function (data) {

                    var text = '';
                    var html = '';

                    if (data.share) {
                        text = self.tempates.share(data.share, null, true)
                    }

                    if (text) {

                        if (data.postsCnt > 1) {

                            var c = data.postsCnt - 1
                        }

                        html += self.tempates.user(data.user, text, true, " " + self.app.localization.e('e13332'), null, data.time)
                    }

                    return html;

                },

                fastMessageEvents: function (data, message, close) {

                    message.el.find('.sharepreview').on('click', function () {

                        self.app.platform.sdk.node.shares.getbyid([data.txid], function () {

                            var share = self.app.platform.psdk.share.get(data.txid)

                            if (share && (share.itisstream() || (share.itisvideo() && self.app.television))) {

                                platform.app.nav.api.load({
                                    open: true,
                                    href: 'index?video=1&v=' + data.txid,
                                    history: true
                                })

                                if (close) close()

                            } else {
                                platform.app.nav.api.load({
                                    open: true,
                                    href: 'post?s=' + data.txid,
                                    inWnd: true,
                                    history: true,
                                    clbk: function (d, p) {
                                        app.nav.wnds['post'] = p

                                        if (close) close()
                                    },

                                    essenseData: {
                                        share: data.txid
                                    }
                                })
                            }

                        })

                        return false

                    })

                    if (data.share && (data.share.itisstream() || (!platform.app.pkoindisable && !platform.app.paidsubscriptiondisable && data.share.visibility() == 'paid'))) {
                        message.el.addClass('bright')
                    }

                },

                clbks: {}
            },

            sharepocketnet: {
                loadMore: function (data, clbk, wa) {

                    data.addrFrom || (data.addrFrom = window.testpocketnet ? 'TAqR1ncH95eq9XKSDRR18DtpXqktxh74UU' : 'PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd')

                    if (data.addrFrom) {

                        platform.sdk.users.get([data.addrFrom], function () {

                            data.user = platform.psdk.userInfo.get(data.addrFrom)


                            if (data.txids && !data.txid) data.txid = data.txids

                            platform.sdk.node.shares.getbyid(data.txid, function (s, fromcashe) {

                                s || (s = []);

                                if (s[0]) {
                                    data.share = s[0];
                                }

                                clbk()
                            })

                        }, true)

                        return
                    }

                    clbk()
                },

                refs: {

                },
                audio: {
                    unfocus: 'water_droplet',
                    if: function (data) {

                        if (data.share) {
                            return true
                        }

                        return false;
                    }
                },

                notificationData: function (data) {
                    var n = {};

                    if (data.user && data.share) {
                        n.caption = self.tempates._user(data.user)
                        n.text = self.tempates._share(data.share, platform.app.mobileview ? 50 : 100)
                    }

                    if (_.isEmpty(n))
                        return null;

                    return n
                },

                fastMessage: function (data) {

                    var text = '';
                    var html = '';

                    if (data.share) {
                        text = self.tempates.share(data.share, null, true)

                        if (text) {
                            html += self.tempates.user(data.user, text, true, " " + self.app.localization.e('e13332'), null, data.time)
                        }
                    }

                    return html;

                },

                fastMessageEvents: function (data, message, close) {

                    message.el.find('.sharepreview').on('click', function () {


                        platform.app.nav.api.load({
                            open: true,
                            href: 'post?s=' + data.txid,
                            inWnd: true,
                            history: true,
                            clbk: function (d, p) {
                                app.nav.wnds['post'] = p

                                if (close) close()
                            },

                            essenseData: {
                                share: data.txid
                            }
                        })

                        return false
                    })

                },

                clbks: {}
            },

            "transaction": {
                electronSettings: {
                    size: 'small'
                },
                loadMore: function (data, clbk, wa) {

                    var _dataclbk = function (tx, err) {


                        if (err || !tx) {

                            if (clbk) clbk()

                            return

                        }

                        data.txinfo = tx;


                        var addr = platform.app.user.address.value

                        if (!data.addr) data.addr = addr

                        data.tx = platform.sdk.node.transactions.toUT(tx, data.addr, data.nout)

                        data.amountall = _.reduce(data.txinfo.vout, function (m, v) {

                            var forme = deep(v, 'scriptPubKey.addresses.0') == addr

                            return m + (forme ? v.value : 0)
                        }, 0)

                        data.address = deep(data.txinfo, 'vin.0.address') || platform.sdk.node.transactions.addressFromScryptSig(deep(data.txinfo, 'vin.0.scriptSig.asm'))

                        data.opmessage = platform.sdk.node.transactions.getOpreturn(data.txinfo)

                        data.cointype = platform.sdk.node.transactions.getCoibaseType(data.txinfo, platform.sdk.address.pnet().address)


                        platform.sdk.users.getone(data.address || '', function () {

                            if (data.address) {
                                data.user = platform.psdk.userInfo.getShortForm(data.address)

                            }

                            if (clbk)
                                clbk(data)


                        }, data.type != "userInfo", data.type == "userInfo")

                    }

                    if (data.txinfo) {
                        _dataclbk(data.txinfo)
                    } else {
                        platform.sdk.node.transactions.get.tx(data.txid, _dataclbk)
                    }

                    platform.actions.ws.transaction(data)


                },

                refs: {

                },

                notificationData: function (data, user) {
                    var n = {};


                    if (data.tx) {


                        if (data.tx.coinbase) {

                            var a = 'activity'

                            n.caption = self.app.localization.e('e13333')
                            n.text = self.app.localization.e('e13334') + " " + platform.mp.coin(data.tx.amount) + " " + self.app.localization.e('e13335') + " '" + a + "'!"
                            n.topic = 'pos'


                        } else {


                            if (data.address != user.address && data.user) {

                                if (_.indexOf(platform.sdk.addresses.storage.addresses || [], data.address) > -1) return

                                if (data.amountall >= 0.05 || data.tx.amount >= 0.05) {
                                    n.text = self.tempates._user(data.user) + " sent " + platform.mp.coin(data.tx.amount) + " PKOIN to you"

                                    if (data.opmessage && data.opmessage.indexOf('pay_') > -1) {
                                        n.text = n.text + ' ' + self.app.localization.e('e13336') + ' "' + data.opmessage + '"'
                                    } else {
                                        n.text = n.text + "!"
                                    }

                                    n.caption = self.app.localization.e('e13333') + ": " + self.tempates._user(data.user)
                                    n.topic = 'transactions'
                                }

                            }

                        }
                    }

                    if (_.isEmpty(n))
                        return null;

                    return n
                },

                fastMessage: function (data, ld) {

                    var html = '';


                    if (data.tx) {


                        if (data.cointype) {

                            if (!app.pkoindisable && platform.sdk.usersettings.meta.win.value) {

                                var td = 'coinbaseSuccess'

                                if (data.cointype) {
                                    td = td + data.cointype
                                }

                                html += self.tempates.user(

                                    platform.psdk.userInfo.getShortForm()

                                    ,

                                    self.tempates.transaction(data,

                                        '<div class="text">' +
                                        platform.app.localization.e(td, platform.mp.coin(clearStringXss(data.amountall || data.tx.amount))) +
                                        '</div>'

                                    ),

                                    false,
                                    platform.app.localization.e('transactionCome'),
                                    null,

                                    data.time

                                )



                            }

                        } else {

                            if (!platform.sdk.address.pnet() || data.address != platform.sdk.address.pnet().address) {


                                if (data.address) {

                                    var me = platform.sdk.user.me()
                                    if (me && me.relation(data.address, 'blocking')) {
                                        return html
                                    }

                                }

                                if (!app.pkoindisable && platform.sdk.usersettings.meta.transactions.value && data.user && data.user.name) {

                                    if (data.amountall >= 0.05 || data.tx.amount >= 0.05) {

                                        var txt = platform.app.localization.e('userSent', platform.mp.coin(data.amountall || data.tx.amount))

                                        if (data.opmessage) {

                                            if (data.opmessage != 'a:donate' && data.opmessage != 'a:reward' && data.opmessage != 'a:a' && data.opmessage != 'a:monetization' && data.opmessage != 'a:subscription') {
                                                txt += ' ' + self.app.localization.e('e13336') + ' <span>&ldquo;' + data.opmessage + '&rdquo;</span>'
                                            }

                                            if (data.opmessage == 'a:monetization') {
                                                txt += ' ' + self.app.localization.e('fastmessagemonetization')
                                            }

                                            if (data.opmessage == 'a:donate') {
                                                txt += ' ' + self.app.localization.e('fastmessagedonate')
                                            }

                                            if (data.opmessage == 'a:subscription') {
                                                txt += ' ' + self.app.localization.e('fastmessagepaidsubscription')
                                            }
                                            


                                        }

                                        html += self.tempates.user(data.user, '', true, txt, self.tempates.transaction(data), data.time)

                                    }

                                }
                            }

                        }
                    }


                    return html;

                },
                audio: {
                    unfocus: 'water_droplet',

                    if: function (data) {

                        if (data.temp) {
                            return false;
                        }

                        if (data.tx) {
                            if (data.tx.coinbase) {
                                if (!platform.sdk.usersettings.meta.win.value || app.pkoindisable) {

                                    return false;
                                }
                            } else {
                                if (data.address != platform.sdk.address.pnet().address) {
                                    if (!platform.sdk.usersettings.meta.transactions.value || app.pkoindisable) {
                                        return false;
                                    }
                                } else {
                                    return false;
                                }
                            }
                        } else {
                            return false;
                        }

                        return true;
                    }
                },
                clbks: {
                    /*transactions : function(data){

                        _.each(platform.sdk.node.transactions.clbks, function(c){
                            c(data.tx.amount)
                        })

                    }*/
                },

                fastMessageEvents: function (data, message, close) {

                    if (data.opmessage == 'a:monetization' && platform.app.monetization) {
                        message.el.find('.infomain,.extra').on('click', function () {



                            platform.app.nav.api.go({
                                open: true,
                                href: self.app.mobileview ? 'earnings' : 'userpage?id=earnings',
                                inWnd: self.app.mobileview ? true : false,
                                history: true,
                                essenseData: {}
                            })

                        })
                    } else {
                        message.el.find('.infomain,.extra').on('click', function () {

                            app.nav.api.load({
                                open: true,
                                id: 'transactionview',
                                inWnd: true,

                                essenseData: {
                                    txid: data.txid,
                                    share: true,
                                }
                            })

                        })
                    }

                    ///data.opmessage

                    //message.el.addClass('bright')

                },

                fastMessageEventsFst: function (data, message, close) {

                    if (data.opmessage == 'a:donate' || data.opmessage == 'a:reward' || data.opmessage == 'a:a' || data.opmessage == 'a:monetization') {

                        self.app.platform.effects.templates.donatehearts(app.el.html, function () {

                        })
                    }

                    if (data.opmessage == 'a:subscription') {

                        self.app.platform.effects.templates.paidsubscription(app.el.html, function () {

                        })
                    }
                },
            },

            'newblocks': {
                loadMore: function (data, clbk) {

                    var hb = (data.block || data.height)

                    if (hb <= platform.currentBlock) {

                        platform.sdk.notifications.wsBlock(hb)

                        if (clbk) clbk(0)

                        return

                    }

                    var s = platform.sdk.node.transactions;

                    var dif = platform.currentBlock - hb

                    platform.currentBlock = hb;
                    platform.lasttimecheck = new Date()
                    platform.lastblocktime = new Date()


                    try {
                        localStorage['lastblock'] = platform.currentBlock
                    } catch (e) {

                    }


                    if (dif)
                        platform.sdk.newmaterials.update(data)

                    //self.reconnected = platform.currentBlock;

                    platform.sdk.notifications.wsBlock(hb)

                    _.each(s.unspent, function (unspents) {
                        _.each(unspents, function (txu) {
                            txu.confirmations = (txu.confirmations || 0) + (dif || 0)
                        })
                    })

                    platform.sdk.user.subscribeRef()

                    clbk(dif)

                    data.difference = platform.currentBlock - hb

                    platform.actions.ws.block(data)

                    platform.app.apps.emit('block', {height : hb})

                    ////////////////




                    setTimeout(function () {
                        platform.matrixchat.init()
                    }, 100)
                    ////////
                },

                refs: {

                },
                fastMessage: function (data) {

                    var html = '';

                    return html;

                },

                clbks: {
                    transactions: function () {
                        _.each(platform.sdk.node.transactions.clbks, function (c) {
                            c()
                        })
                    }
                }
            },

            "new block": {

                loadMore: function (data, clbk) {

                    if (data.height <= platform.currentBlock) {
                        platform.sdk.notifications.wsBlock(data.height)
                        return
                    }

                    var s = platform.sdk.node.transactions;

                    platform.currentBlock = data.height;

                    platform.lasttimecheck = new Date()
                    platform.lastblocktime = new Date()
                    try {
                        localStorage['lastblock'] = platform.currentBlock
                    } catch (e) {

                    }


                    platform.sdk.notifications.wsBlock(data.height)

                    _.each(s.unspent, function (unspents, address) {
                        _.each(unspents, function (txu) {

                            txu.confirmations || (txu.confirmations = 0)

                            txu.confirmations++

                        })
                    })

                    platform.sdk.newmaterials.update(data)

                    platform.sdk.user.subscribeRef()

                    data.difference = platform.currentBlock - (data.block || data.height)

                    platform.actions.ws.block(data)

                    _.each(platform.sdk.node.transactions.storage, (tx) => {
                        if (tx.height && tx.height != platform.currentBlock) tx.confirmations++
                    })


                    platform.app.apps.emit('block', {
                        height: data.block || data.height
                    })


                    platform.app.apps.emit('block', {height : data.block || data.height})

                    ////////////////


                    clbk()

                    setTimeout(function () {
                        platform.matrixchat.init()
                    }, 100)
                },

                refs: {

                },
                fastMessage: function (data) {

                    var html = '';

                    return html;

                },

                clbks: {
                    transactions: function () {
                        _.each(platform.sdk.node.transactions.clbks, function (c) {
                            c()
                        })
                    },

                    interface: function () {

                        if (typeof $ != 'undefined') {
                            $('.temptransaction').removeClass('temptransaction')
                        }

                    }
                }
            },

            comment: {
                electronSettings: {
                    size: 'medium'
                },
                fastMessageEvents: function (data, message, close) {

                    message.el.find('.commentprev').on('click', function () {

                        platform.app.nav.api.load({
                            open: true,
                            href: 'post?s=' + data.posttxid,
                            inWnd: true,
                            history: true,
                            clbk: function (d, p) {
                                app.nav.wnds['post'] = p

                                if (close) close()
                            },

                            essenseData: {
                                share: data.posttxid,

                                reply: {
                                    answerid: data.commentid,
                                    parentid: data.parentid || "",
                                    noaction: true
                                }
                            }
                        })

                        return false

                    })

                    message.el.find('.reply').on('click', function () {

                        platform.sdk.node.shares.getbyid(data.posttxid, function (s, fromcashe) {

                            platform.app.nav.api.load({
                                open: true,
                                href: 'post?s=' + data.posttxid,
                                inWnd: true,
                                history: true,
                                clbk: function (d, p) {
                                    app.nav.wnds['post'] = p

                                    if (close) close()
                                },

                                essenseData: {
                                    share: data.posttxid,

                                    reply: {
                                        answerid: data.commentid,
                                        parentid: data.parentid || ""
                                    }
                                }
                            })

                        })

                        return false

                    })

                },

                loadMore: function (data, clbk, wa) {

                    platform.sdk.users.get([data.addrFrom], function () {

                        data.user = platform.psdk.userInfo.getShortForm(data.addrFrom)

                        data.user.address = data.addrFrom

                        if (!data.commentid && data.txid)
                            data.commentid = data.txid


                        var ids = [data.commentid]

                        data.txid = data.commentid


                        platform.sdk.comments.getbyid(ids, function (comments) {


                            data.comment = comments[0]

                            platform.psdk.ws.update('comment', data)

                            // TODO WS EVENT

                            /*if (data.comment) {
                                platform.sdk.comments.storage[data.comment.postid] ||
                                    (platform.sdk.comments.storage[data.comment.postid] = {})

                                var pid = data.comment.parentid || '0';

                                if (platform.sdk.comments.storage[data.comment.postid][pid]) {
                                    platform.sdk.comments.storage[data.comment.postid][pid].push(data.comment)
                                }
                            }*/


                            clbk()
                        }, true)


                    }, true)
                },

                notificationData: function (data) {
                    var n = {};

                    if (data.reason == 'post' && data.comment && data.share && data.user) {
                        n.text = data.comment.renders.previewEmojidis()
                        n.topic = 'comments'

                        n.caption = self.tempates._user(data.user) + " " + self.app.localization.e('e13337') + ""
                    }

                    if (data.reason == 'answer' && data.comment && data.share && data.user) {
                        n.text = data.comment.renders.previewEmojidis()
                        n.topic = 'answers'
                        n.caption = self.tempates._user(data.user) + ' ' + self.app.localization.e('e13338') + ''
                    }

                    if (_.isEmpty(n))
                        return null;

                    return n
                },

                fastMessage: function (data) {

                    var text = '';
                    var html = '';

                    var extra = ''
                    extra += '<div class="tcell foranswer">'
                    extra += '<button class="reply ghost">' + self.app.localization.e('reply') + '</button>'
                    extra += '</div>'

                    if (data.user && data.user.address) {

                        var me = platform.sdk.user.me()
                        if (me && me.relation(data.user.address, 'blocking')) {

                            return html
                        }

                    }

                    if (data.reason == 'post' && data.comment && data.user &&
                        (!platform.sdk.usersettings.meta.comments || platform.sdk.usersettings.meta.comments.value)) {

                        text = self.tempates.comment(data.comment)

                        var toptext = self.app.localization.e('e13337');

                        if (data.donation && data.amount) {

                            var amount = String(Number(data.amount) / smulti || 0);
                            toptext = '<span>' + self.app.localization.e('donated') + '</span>' + ' <span class="donate"> +' + amount + ' PKOIN </span>';
                        }

                        if (text) {
                            var toptext = self.tempates.user(data.user, '<div class="text">' + text + '</div>', true, ' ' + toptext, extra, data.time, data.donation);

                            html += toptext
                        }

                    }

                    if (data.reason == 'answer' && data.comment && data.user &&
                        (!platform.sdk.usersettings.meta.answers || platform.sdk.usersettings.meta.answers.value)) {

                        text = self.tempates.comment(data.comment)

                        if (text) {

                            var toptext = self.app.localization.e('e13338')

                            html += self.tempates.user(data.user, '<div class="text">' + text + '</div>', true, ' ' + toptext, extra, data.time)
                        }
                    }

                    if (data.reason == 'system') {

                        // text = self.tempates.comment(data.comment/*, self.tempates.share(data.share)*/)

                        // if (text) {

                        //     var toptext = self.app.localization.e('e13337')

                        //     html += self.tempates.user(data.user, '<div class="text">' + text + '</div>', true, ' ' + toptext, extra, data.time)
                        // }

                        html += `<div><b>System notification</b></div><div class="text">${data.text}</div>`;
                    }


                    return html;

                },
                refs: {

                },
                audio: {
                    unfocus: 'water_droplet',
                    if: function (data) {

                        if (data.mesType == 'post' && data.comment && data.share && data.user &&
                            (!platform.sdk.usersettings.meta.comments || platform.sdk.usersettings.meta.comments.value)) {

                            return true
                        }

                        if (data.mesType == 'answer' && data.comment && data.share && data.user &&
                            (!platform.sdk.usersettings.meta.answers || platform.sdk.usersettings.meta.answers.value)) {

                            return true
                        }
                    }
                },

                clbks: {},

                fastMessageEventsFst: function (data, message, close) {

                    if (data.donation && data.amount) {
                        message.el.addClass('dnt')

                        self.app.platform.effects.templates.donatehearts(app.el.html, function () {

                        })
                    }
                },
            },

            event: {
                electronSettings: {
                    size: 'small'
                },
                loadMore: function (data, clbk, wa) {



                    if (data.addrFrom) {

                        platform.sdk.users.get([data.addrFrom], function () {

                            data.user = platform.psdk.userInfo.getShortForm(data.addrFrom)

                            data.user.address = data.addrFrom

                            if (data.mesType == 'userInfo' && !wa) {

                                platform.psdk.ws.update('userInfo', data)

                                var me = platform.psdk.userInfo.getmy()

                                //platform.sdk.users.storage[platform.sdk.address.pnet().address];

                                if (me) {

                                    delete me.temp
                                    delete me.relay


                                    var cm = deep(app, 'modules.menu.module.restart')

                                    if (cm) cm()

                                    var c = deep(app, 'nav.clbks.history.navigation')

                                    if (c) c()

                                    me.rc++
                                }
                            }

                            if (data.mesType == 'upvoteShare') {

                                platform.psdk.ws.update('upvoteShare', data)

                                platform.sdk.node.shares.getbyid(data.posttxid, function (s, fromcashe) {

                                    s || (s = []);

                                    if (s[0]) {
                                        data.share = s[0];

                                        if (fromcashe && !wa) {

                                            data.share.score = Number(data.share.score) + Number(data.upvoteVal)
                                            data.share.scnt = Number(data.share.scnt) + 1
                                        }

                                    }


                                    if (!data.electronSettings) data.electronSettings = {}
                                    data.electronSettings.size = 'medium'

                                    clbk()
                                })
                            } else {

                                if ((data.mesType == 'subscribe' || data.mesType == 'unsubscribe' || data.mesType == 'subscribePrivate') && !wa) {


                                    platform.psdk.ws.update(data.mesType, data)

                                    //var u = platform.psdk.userInfo.get(data.addrFrom)

                                    ///platform.sdk.users.storage[data.addrFrom];

                                    //var me = platform.psdk.userInfo.getmy() 



                                    //platform.sdk.users.storage[platform.sdk.address.pnet().address];


                                    /*if (me) {

                                        if (data.mesType == 'subscribe') {
                                            me.addRelation(data.addrFrom, 'subscribers')
                                        }

                                        if (data.mesType == 'unsubscribe') {
                                            me.removeRelation(data.addrFrom, 'subscribers')
                                        }
                                    }

                                    if (u) {

                                        if (data.mesType == 'subscribe') {

                                            u.addRelation({
                                                adddress: platform.sdk.address.pnet().address,
                                                private: false
                                            })
                                        }

                                        if (data.mesType == 'unsubscribe') {

                                            u.removeRelation({
                                                adddress: platform.sdk.address.pnet().address,
                                                private: false
                                            })
                                        }

                                    }*/
                                }

                                clbk()
                            }


                        }, true)

                        return
                    }

                    clbk()
                },

                refs: {

                },
                audio: {
                    unfocus: 'water_droplet',
                    if: function (data) {

                        if (data.mesType == 'upvoteShare' && data.share) {

                            if (data.upvoteVal > 2 && (!platform.sdk.usersettings.meta.upvotes || platform.sdk.usersettings.meta.upvotes.value)) {

                                return true

                            }
                        }

                        if (data.mesType == 'subscribe') {
                            if ((!platform.sdk.usersettings.meta.followers || platform.sdk.usersettings.meta.upvotes.followers)) {
                                return true
                            }
                        }

                        if (data.mesType == 'userInfo') {

                            /*if ((!platform.sdk.usersettings.meta.rescued || platform.sdk.usersettings.meta.rescued.value)) {

                                return true

                            }*/


                        }



                        return false;
                    }
                },

                fastMessageEvents: function (data, message, close) {

                    if (data.mesType == 'subscribe' && data.user) {

                        message.el.find('.subscribe').on('click', function () {


                            var be = $(this)

                            if (be.hasClass('disabled')) return;

                            be.addClass('disabled');

                            platform.api.actions.subscribe(data.user.address, function (tx, error) {
                                if (tx) {} else {
                                    self.app.platform.errorHandler(error, true)

                                    be.removeClass('disabled');
                                }
                            })

                            return false
                        })

                    }


                    if (data.mesType == 'upvoteShare' && data.share) {
                        message.el.find('.sharepreview').on('click', function () {


                            platform.app.nav.api.load({
                                open: true,
                                href: 'post?s=' + data.posttxid,
                                inWnd: true,
                                history: true,
                                clbk: function (d, p) {
                                    app.nav.wnds['post'] = p

                                    if (close) close()
                                },

                                essenseData: {
                                    share: data.posttxid
                                }
                            })

                            return false
                        })

                    }
                },
                notificationData: function (data) {
                    var n = {};



                    if (data.mesType == 'userInfo') {
                        n.text = self.app.localization.e('e13339')
                        n.topic = 'rescued'

                        n.caption = self.app.localization.e('e13340')
                    }

                    if (data.mesType == 'subscribe' && data.user) {
                        n.text = self.tempates._user(data.user) + ' ' + self.app.localization.e('e13341')
                        n.topic = 'followers'
                        n.caption = self.app.localization.e('e13342')
                    }


                    if (data.mesType == 'upvoteShare' && data.share && data.user) {

                        if (data.upvoteVal > 2) {

                            n.text = self.tempates._user(data.user) + " " + self.app.localization.e('e13343') + ", " + data.upvoteVal + ' ★'
                            n.topic = 'upvotes'
                            n.caption = self.app.localization.e('e13344')
                        }
                    }



                    if (_.isEmpty(n))
                        return null;

                    return n
                },
                fastMessage: function (data) {

                    var text = '';
                    var html = '';
                    var caption = '';
                    var extra = '';

                    if (data.user && data.user.address) {

                        var me = platform.sdk.user.me()
                        if (me && me.relation(data.user.address, 'blocking')) {
                            return html
                        }

                    }

                    if (data.mesType == 'userInfo') {

                    }


                    if (data.mesType == 'subscribe' || data.mesType == 'subscribePrivate') {
                        if ((!platform.sdk.usersettings.meta.followers || platform.sdk.usersettings.meta.followers.value)) {

                            text = self.tempates.subscribe(data.user)
                            caption = platform.app.localization.e('subscribeUserMessage')
                            extra = null

                        }
                    }


                    if (data.mesType == 'upvoteShare' && data.share) {

                        var tkey = 'upvoteShareMessage'

                        if (

                            (data.upvoteVal <= 2 && platform.sdk.usersettings.meta.downvotes.value) ||

                            (data.upvoteVal > 2 && platform.sdk.usersettings.meta.upvotes.value)

                        ) {

                            if (data.upvoteVal <= 2) {
                                tkey = 'downvoteShareMessage'
                            }

                            var star = self.tempates.star(data.upvoteVal)

                            text = '<div class="text">' + self.tempates.share(data.share) + '</div>'
                            caption = platform.app.localization.e(tkey)
                            extra = star


                        }
                    }



                    if (caption || text) {
                        html += self.tempates.user(data.user, text || "", true, caption, extra, data.time)
                    }


                    return html;

                },

                clbks: {}
            },

            message: {
                loadMore: function (data, clbk, wa) {


                    if (data.address) {

                        platform.sdk.users.get([data.address], function () {

                            data.user = platform.psdk.userInfo.getShortForm(data.address)



                            if (data.user) {
                                data.user.address = data.address

                                clbk()
                            }
                        }, true)

                    }
                },

                refs: {

                },
                audio: {
                    unfocus: 'water_droplet'
                },

                fastMessageEvents: function (data, message) {

                    message.el.find('.tochat').on('click', function () {
                        return false
                    })

                },

                fastMessage: function (data) {

                    var text = '';
                    var html = '';

                    if (data.user && data.user.address) {
                        var me = platform.sdk.user.me()
                        if (me && me.relation(data.user.address, 'blocking')) {
                            return html
                        }

                    }

                    text = self.tempates.subscribe(data.user, self.app.localization.e('e13345'))

                    html += self.tempates.user(data.user, '<div class="text">' + text + '</div>', true)


                    return html;

                },

                clbks: {}
            }
        }

        var auth = function (clbk, proxy) {

            app.user.isState(function (state) {

                if (state) {

                    self.addAccount(null, clbk, proxy)

                } else {
                    if (clbk)
                        clbk(false)
                }


            })
        }

        var reconnect = function () {


            if (closing) {
                return;
            }

            closing = false;

            self.close();

            initconnection();
        }

        self.reconnect = reconnect

        var initconnection = function (clbk) {

            platform.app.api.get.currentwss().then(wss => {

                socket = wss.dummy || (new ReconnectingWebSocket(wss.url, null, {
                    reconnectDecay: 1
                }));


                socket.onmessage = function (message) {
                    message = message.data ? message.data : message;

                    var jm = message;

                    try {
                        jm = JSON.parse(message || "{}");
                    } catch (e) {
                        console.log("E", e)
                    }


                    if (jm) {


                        if (jm.type == 'proxy-message-tick') {

                            return wss.proxy.system.tick(jm.data)

                        }

                        if (jm.type == 'changenode') {

                            var temp = platform.sdk.node.transactions.temp

                            var t = [];

                            _.each(temp, function (trx, s) {
                                _.each(trx, function (tr) {
                                    t.push(tr)
                                })
                            })

                            /*if(!temp.length)
                                wss.proxy.changeNode(jm.data.node)*/

                            return

                        }

                        if (jm.type == 'proxy-settings-changed') {

                            return wss.proxy.changed(jm.data)

                        }


                        self.messageHandler(jm);

                    }



                };

                socket.onopen = function () {

                    self.connected = {};

                    //lost = platform.sdk.notifications.storage.block || platform.currentBlock || 0




                    opened = true;

                    auth(() => {

                        self.getMissed().then(() => {})

                    }, wss.proxy)

                    if (clbk)
                        clbk()
                }

                wss.proxy.clbks.changed.wss = function () {

                    reconnect()
                }

                socket.onclose = function () {
                    delete wss.proxy.clbks.changed.wss
                }

                if (socket.init) socket.init()

            }).catch(e => {

                if (clbk)
                    clbk(e)

            })

        }

        var rmmessageDestroy = function (message) {
            if (message.timeout) {
                clearTimeout(message.timeout);
                message.timeout = null
            }
        }

        var rmmessagesDestroy = function () {
            _.each(self.fastMessages, function (message, i) {
                rmmessageDestroy(message)
            })
        }

        var addmessagesTime = function (time = 5000) {

            _.each(self.fastMessages, function (message, i) {
                destroyMessage(message, time, false, true);
            })


        }

        var destroyMessage = function (message, time, noarrange, destroyUser) {


            var rmfu = function () {




                if (!time) {
                    rmfu2()
                } else {
                    message.el.addClass('willhidden')

                    setTimeout(rmfu2, 200)
                }

            }

            var rmfu2 = function () {

                message.el.remove();

                removeEqual(self.fastMessages, {
                    id: message.id
                })

                if (message.destroyclbk && destroyUser) {
                    message.destroyclbk()
                }

                if (!noarrange)
                    tArrangeMessages()

            }

            if (message.timeout) clearTimeout(message.timeout);

            if (platform.focus || noarrange) {

                if (time) {
                    message.timeout = setTimeout(rmfu, time)
                } else {
                    rmfu()
                }

            } else {
                setTimeout(function () {
                    destroyMessage(message, time, noarrange)
                }, 1000)
            }

        }

        var hideallnotifications = function () {
            hideallnotificationselement(false)
            self.destroyMessages()

        }

        var hideallnotificationselementShowed = false

        var hideallnotificationselement = function (show) {

            if (hideallnotificationselementShowed == show) return

            if (self.hideallnotificationsel) {
                if (show) {
                    self.hideallnotificationsel.html('<div class="hidenf">' + platform.app.localization.e('hideallnotifications') + '</div>')
                    self.hideallnotificationsel.find('div').on('click', hideallnotifications)

                } else {
                    self.hideallnotificationsel.addClass('willhidden')
                    self.hideallnotificationsel.html('')
                    self.hideallnotificationsel.removeClass('willhidden')
                }
            }

            hideallnotificationselementShowed = show
        }

        var arrangeMessages = function () {

            var offset = 0;

            var maxCount = 4;
            var showremove = 2;

            var boffset = 0;

            var mtbl = platform.app.mobileview

            if (mtbl) {
                maxCount = 2;
                showremove = 2;
            }

            var remove = self.fastMessages.length - maxCount;

            var s = false;

            var ioffset = 0

            if(window.cordova && isios()){
                ioffset = Number((getComputedStyle(document.documentElement).getPropertyValue("--app-margin-top-i") || '0px').replace('px', ''))
            }

			if(self.fastMessages.length >= maxCount){
				_.each(self.fastMessages, function(m, i){

                    if (!m.expanded && !m.el.hasClass('smallsize')) {
                        m.el.addClass('smallsize');
                        s = true
                    }

                })
            } else {
                _.each(self.fastMessages, function (m, i) {
                    if (m.el.hasClass('smallsize')) {
                        m.el.removeClass('smallsize');
                    }
                })
            }

            if (mtbl) {
                boffset = platform.app.margintop

                if(window.cordova && isios()){
                    boffset = Math.max(ioffset, platform.app.margintop)
                }
                
            }

            if (showremove && self.fastMessages.length >= showremove) {
                boffset = 50

                if (mtbl) {
                    boffset += Math.max(ioffset, platform.app.margintop)
                }

                hideallnotificationselement(true)
            } else {

                hideallnotificationselement(false)
            }

            offset = offset + boffset

            _.each(self.fastMessages, function (m, i) {

                if (i < remove) {
                    /*if(!isMobile()) {
                        destroyMessage(m, 0, true)
                    }
                    else {*/
                    m.el.addClass('hidden')

                    rmmessageDestroy(m)

                    //}
                } else {

                    if (m.el.hasClass('hidden')) {
                        m.el.removeClass('hidden')
                        destroyMessage(m, 5000, false, true)
                    }

                    offset += 5;

                    var r = offset

                    window.rifticker.add(() => {
                        if (!mtbl) {
                            m.el.css('bottom', r + 'px');
                        } else {
                            m.el.css('top', r + 'px');
                        }
                    })

                    offset += m.el.outerHeight();
                }

            })


        }

        var tArrangeMessages = _.debounce(arrangeMessages, 200)

        self.getMissed = function (initial) {

            if (!initial && ((!platform.lastblocktime || (new Date() < platform.lastblocktime.addMinutes(2))))) return Promise.resolve()

            if (self.loadingMissed) return Promise.resolve()

            self.loadingMissed = true;

            return platform.sdk.node.get.timepr().then(r => {

                return platform.sdk.missed.get(platform.sdk.notifications.storage.block || platform.currentBlock || 0)

            }).then(({
                block,
                notifications
            }) => {

                self.messageHandler(block, function () {
                    self.loadingMissed = false;


                    if (!notifications) return

                    lazyEach({
                        array: notifications,
                        action: function (p) {

                            p.success()

                            self.messageHandler(p.item)
                        },

                        all: {
                            success: function () {}
                        }
                    })

                })

            }).catch(e => {

                console.error(e)

                self.loadingMissed = false;

                return Promise.reject(e)
            })


        }

        self.destroyMessages = function () {

            _.each(_.clone(self.fastMessages), function (message, i) {
                destroyMessage(message, 0, true)
            })

            tArrangeMessages()
        }

        self.fastMessageByJson = function (json, destroyclbk, p = {}) {
            var html = self.tempates.simple(json)

            return self.fastMessage(html, destroyclbk, p = {})
        }

        self.fastMessage = function (html, destroyclbk, p = {}) {
            var id = makeid(true);

            html = '<div class="fastMessage" elementsid="notificationmessage" id="' + id + '">\
                <div class="fmCnt">' + html + '</div>\
                <div class="close">\
                    <i class="fa fa-times" aria-hidden="true"></i>\
                </div>\
            </div>';

            $('body').append(html);

            var el = $('#' + id);

            var message = {
                id: id,
                el: el,
                html: html,
                destroyclbk: destroyclbk
            }

            bgImagesCl(el)


            self.fastMessages.push(message);

            platform.app.nav.api.links(null, el, function () {
                destroyMessage(message, 1)
            });

            destroyMessage(message, 5000, false, true);

            message.el.on('click', function () {

                if (p.click) {

                    p.click()
                    destroyMessage(message, 1)

                    setTimeout(() => {
                        addmessagesTime(15000)
                    }, 50)

                    return
                }

                /*if (platform.app.mobileview){

                    platform.app.nav.api.go({
                        open : true,
                        href : 'notifications',
                        inWnd : true,
                        history : true,
                        essenseData : {
                        }
                    })

                    if(!p.click)
                        destroyMessage(message, 1)

                    setTimeout(() => {
                        rmmessagesDestroy()
                    }, 50)

                }
                else{*/
                if (!message.expanded) {

                    setTimeout(() => {
                        addmessagesTime(15000)
                    }, 50)

                    message.el.removeClass('smallsize');

                    message.expanded = true

                    tArrangeMessages();

                    setTimeout(function () {
                        tArrangeMessages();
                    }, 200)
                }
                //}



            })

            message.el.on('mouseenter', function () {
                clearTimeout(message.timeout);
            })

            message.el.on('mouseleave', function () {
                destroyMessage(message, 5000, false, true);
            })

            message.el.find('.close').on('click', function (e) {
                destroyMessage(message, 1, false, true);
                e.preventDefault()
                return false
            })

            if (isTablet()) {
                var d = 60
                var parallax = new SwipeParallaxNew({
                    //prop : 'position',
                    el: message.el,
                    allowPageScroll: false,
                    directions: {
                        left: {
                            //endmove : true,
                            trueshold: 15,
                            distance: d,
                            positionclbk: function (px) {
                                var p = 1 - Math.min(px / d, 1)
                            },

                            clbk: function () {
                                destroyMessage(message, 0)

                                setTimeout(() => {
                                    rmmessagesDestroy()
                                }, 50)
                            }

                        }
                    }

                }).init()
            }

            tArrangeMessages();


            return message
        }

        self.messageHandler = function (data, clbk) {


            data || (data = {})

            if (!data.msg && !data.mesType) {
                if (data.vin && data.vout) {
                    data.msg = 'transaction'
                }
            }

            if (data.msg || data.mesType) {

                var m = null;

                if (data.msg == 'transaction' && data.mesType) {
                    data.type = data.mesType
                    delete data.mesType
                }

                if (data.mesType) m = self.messages[data.mesType]
                if (data.msg && !m) m = self.messages[data.msg]
                if (!data.electronSettings) data.electronSettings = {}

                if (!m) m = {}


               if (data.txid) {

                    if (txidstorage[data.txid] || (data.msg === 'transaction' && data.donation)) return;

                    txidstorage[data.txid] = true


                    if (platform.sdk.notifications.find(data.txid)) return
                }


                var clbks = function (loadedData) {

                    data.loadedData = true;

                    var audio = deep(m, 'audio')

                    _.each(m.clbks, function (clbk) {
                        clbk(data, loadedData);
                    })

                    if (!_Node && !platform.app.television) {
                        if (audio && !window.cordova && platform.sdk.usersettings.meta.sound.value) {

                            if (!audio.if || audio.if(data, loadedData)) {

                                if (audio.focus && platform.focus) {

                                    ion.sound.play(audio.focus);
                                }


                                if (audio.unfocus && !platform.focus) {

                                    ion.sound.play(audio.unfocus);
                                }

                            }


                        }


                        if (m.fastMessage && !m.refs.all && !m.refs[data.RefID]) {

                            var html = m.fastMessage(data, loadedData);

                            if (html) {

                                var txid = data.txid

                                if (!self.showedIds[txid]) {
                                    self.showedIds[txid] = true


                                    var message = self.fastMessage(html, function () {
                                        //platform.sdk.notifications.seen([data.txid])
                                    });

                                    if (m.fastMessageEvents) {
                                        m.fastMessageEvents(data, message, () => {
                                            destroyMessage(message, 1)
                                        })
                                    }

                                    if (m.fastMessageEventsFst) {
                                        m.fastMessageEventsFst(data, message, () => {
                                            destroyMessage(message, 1)
                                        })
                                    }

                                    data.loaded = true

                                    platform.sdk.notifications.addFromWs(data)

                                    if (typeof _Electron != 'undefined' && !platform.focus && message.html) {

                                        var _el = $(message.html)

                                        var title = _el.find('.caption').text()
                                        var body = _el.find('.tips').text()
                                        var image = _el.find('[image]').attr('image')

                                        _el = null


                                        drawRoundedImage(image, 100, 200, 200).then(image => {

                                            electron.ipcRenderer.send('electron-notification-small', {
                                                title,
                                                body,
                                                image
                                            });

                                        })



                                    }

                                } else {
                                    return
                                }

                            }


                        }

                        if (m.header && !platform.focus && platform.titleManager) {

                            var t = m.header(data);

                            if (t)

                                platform.titleManager.add(t)

                        }
                    }



                    if (clbk)
                        clbk()

                }


                if (m.electronSettings) data.electronSettings = _.clone(m.electronSettings)

                if (m.loadMore) {
                    m.loadMore(data, clbks);
                } else {
                    clbks();
                }

            }
        }

        self.send = function (message) {

            if (socket) {
                try {
                    socket.send(message);
                } catch (e) {

                }
            }

        }

        self.close = function () {

            if (closing) return

            closing = true;
            opened = false;
            wait = null;


            self.connected = {};

            if (socket) {
                socket.close()
            }

            socket = null;

            closing = false;

        }

        self.destroy = function () {
            self.close()

            self.loadingMissed = false;
        }


        /////////

        self.wait = function (address, clbk) {
            retry(function () {
                if (!wait || !wait[address]) {
                    return true
                }

                if (Math.floor((new Date().getTime()) / 1000) > wait[address] + 1) {
                    return true
                }

                if (self.connected[address]) return true;
            }, clbk)
        }

        self.addAccount = function (keyPair, clbk, proxy) {

            if (!keyPair) {
                keyPair = platform.app.user.keys();
            }

            var keyPairs = [{
                kp: keyPair,
                n: 0
            }];

            self.addAddresses(keyPairs, clbk, proxy)

        }

        self.addAddresses = function (keyPairs, clbk, proxy) {

            var success = 0;

            lazyEach({
                array: keyPairs,
                sync: true,
                action: function (p) {
                    self.addAddress(p.item.kp, p.item.n, function (r) {

                        if (r)
                            success++;

                        p.success()
                    }, proxy)
                },

                all: {
                    success: function () {
                        if (clbk)
                            clbk(success != 0)

                    }
                }
            })
        }

        self.subscribe = {
            logs: function () {

                address = platform.sdk.address.pnet(keyPair.publicKey).address

                var message = {
                    signature: platform.app.user.signature(),
                    address: address,
                    action: 'subscribe.logs'
                }

                self.send(JSON.stringify(message))
            }


        }

        self.unsubscribe = {
            logs: function () {

                address = platform.sdk.address.pnet(keyPair.publicKey).address

                var message = {
                    signature: platform.app.user.signature(),
                    address: address,
                    action: 'unsubscribe.logs'
                }

                self.send(JSON.stringify(message))
            }
        }

        self.addAddress = function (keyPair, n, clbk, proxy) {


            var address = '';

            if (!n) {
                address = platform.sdk.address.pnet(keyPair.publicKey).address
            } else {
                address = platform.sdk.address.wallet(n, keyPair.privateKey).address
            }

            if (self.connected[address]) {

                if (clbk)
                    clbk(true)

                return
            }



            var message = {

                signature: platform.app.user.signature(),
                address: address,
                device: platform.app.options.device,
                block: platform.currentBlock || 0,
                node: proxy.current ? proxy.current.key : null
            }

            //platform.sdk.system.nodeex(message)

            if (!wait)
                wait = {};

            wait[address] = Math.floor((new Date().getTime()) / 1000);

            self.wait(address, function () {
                if (self.connected[address]) {

                    if (clbk)
                        clbk(true)
                } else {
                    if (clbk)
                        clbk(false)
                }
            })


            self.send(JSON.stringify(message))
        }

        self.removeAddresses = function (addresses) {

            _.each(addresses, function (i, a) {
                self.removeAddress(a)
            })
        }

        self.removeAccount = function () {
            self.destroy()
        }

        self.removeAddress = function (address) {

            var message = {
                msg: "unsubscribe",
                addr: address
            }

            delete self.connected[address]
            delete wait[address]

            self.send(JSON.stringify(message))
        }

        /////////

        self.init = function (clbk) {

            if (!_OpenApi) {

                closing = false;
                self.onlineCheck = true;

                if (!_Node)

                    self.onlineCheck = deep(window, 'navigator.onLine') || false;

                self.online = self.onlineCheck;
                self.connected = {};


                initconnection();

                self.hideallnotificationsel = $('#hideallnotificationsel')

                self.getMissed(true)

            }

            if (clbk)
                clbk()

        }

        setTimeout(function () {

            //platform.matrixchat.notify.event()



            /*self.messageHandler({
                "addr":"PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM","msg":"event",
                "txid":"170fa3679d10d8aaa9d2ee95240cf7e5e3452f183c8c84d840163adeaa6bafaa","time":1726040005,
                "addrFrom":"PHdW4pwWbFdoofVhSEfPSHgradmrvZdbE5","avatarFrom":"https://i.imgur.com/5kkmKpS.jpg",
                "mesType":"postfromprivate",
                "nameFrom":"Daniel_Satchkov",
                "node":"185.44.127.61:38081:8087"
            })*/



            /*self.messageHandler({
                "addr": "PXqzCNZjUsCALqiNkhTsgn6gZSQLKicVY3",
                "msg": "event",
                "mesType": "cScore",
                "addrFrom": "PJBban63zJqsrYvd8JCVxVbyQsPnaB1jsH",
                "txid": "d9e0505ed1a27eb0366cbc1b0a5fa2ea5b8a81c4c54c0de852f8c67107c5024f",
                "time": 1708022928,
                "commentid": "17dcfb892ba6e9440ef0c5e1db074154bfb1c3d91e3ad74b323862ae3dd32671",
                "upvoteVal": 1,
                "nblock": 2628209
            })*/

            /*self.messageHandler({
                "txid": "d4864ba4af7cd61deb7346d3cfd5eeaf4007518ea7c1ed2a01fc4984c4786dff",
                "time": 1707803215,
                "nblock": 2624587,
                "addrFrom": "PEqZBgw92riGLivcDWJet7RKs3xjZLpVyi",
                "nameFrom": "Janos",
                "avatarFrom": "https://bastyon.com:8092/i/JcldUvzVxGlOxXMvZFQuDJ.jfif",
                "msg": "event",
                "mesType": "postfromprivate",
                "postsCnt": 11
            })*/

            /*self.messageHandler({
                addr: "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                addrFrom: "PKpdrwDVGfuBaSBvboAAMwhovFmGX8qf8S",
                mesType: "post",
                msg: "comment",
                text: "Please, set avatar",
                reason: "system",
                time: "1619697839",
            })*/

            /*self.messageHandler({
                "addr": "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                "msg": "transaction",
                "txid": "8b1b924b74d5231fc180b62af879be656a2c3659fbbd94212e65325a8b4b387f",
                "time": 1725542676,
                "amount": "200000000",
                "nout": "1",
                "node": "95.31.30.84:38081:8087"
            })

            self.messageHandler({
                addr: "PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82",
                amount: "166666",
                msg: "transaction",
                node: "64.235.45.119:38081:8087",
                nout: "7",
                time: 1629883584,
                txid: "4e73740eba080aae73aceb80636dcf8f3fe8aed1a9c8c7de417a59ee2d54d357"
            })


                
            self.messageHandler({
                "txid": "87cf9a5c0da04779e21a2100cc0c4f209e93c1ce4ed9b59b29ccb95b435e4f0b",
                "time": 1725569767,
                "nblock": 2924284,
                "addrFrom": "PHdW4pwWbFdoofVhSEfPSHgradmrvZdbE5",
                "nameFrom": "Daniel_Satchkov",
                "avatarFrom": "https://i.imgur.com/5kkmKpS.jpg",
                "msg": "event",
                "mesType": "postfromprivate",
                "postsCnt": 1
            })
            self.messageHandler({
                "txid": "e4598a0838a16cbc222757212f2b439b3971e4df808930fb9c80e9f6968329e3",
                "time": 1725564976,
                "nblock": 2924201,
                "addrFrom": "PL8nRqbUwALzoAxuukpgujZnsvsRdxhDgZ",
                "nameFrom": "Lornet",
                "avatarFrom": "https://bastyon.com:8092/i/JIUHlCHyfdksewIyPyBhjt.jfif",
                "msg": "event",
                "mesType": "postfromprivate",
                "postsCnt": 1
            })*/



            /*self.messageHandler({"addr":"TXDVUUXnSMPuakN9kU1JyF1vsPLc5Le12F","msg":"transaction","txid":"426831ff4b7fe2b6c589f47a03c66e75db0065b6d39dfb4021c9e1157f3c8217","time":1688559470,"amount":"100000000","nout":"0","node":"157.90.228.34:39091:6067"})*/




            /*self.messageHandler({
                msg: "sharepocketnet",
                nblock: 1115942,
                time: "1617371657",
                txid: "e7a7c9f84794ccac6dead944e4d6fffc06628030b1d5428010d585c8bf7e659c"
            })*/

            // setTimeout(() => {
            //     self.messageHandler({
            //         addr: "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
            //         addrFrom: "PJorG1HMRegp3SiLAFVp8R5Ef6d3nSrNxA",
            //         mesType: "upvoteShare",
            //         msg: "event",
            //         nblock: 1253143,
            //         posttxid: "ea9ea91e8baf69f752470f55d146f4638bab0960ef55753a3c44df02c645798c",
            //         time: "1625662971",
            //         txid: "d2533c04f0ef7ca9ff95cb6746567cdac5e8eaf285a57ed0831e0afdd624ca92",
            //         upvoteVal: 5
            //     })

            // }, 10000)


            /*self.messageHandler({
                addr: "PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82",
                amount: "500000",
                msg: "transaction",
                node: "216.108.231.40:38081:8087",
                nout: "3",
                time: 1640237360,
                txid: "acbd05c9ac81fe9ca2b12bdb7c2fe1127270a9b94fed872d71c7d079004243e9",
            })

            self.messageHandler({
                addr: "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                addrFrom: "PMGPzPbZnYEbVtYY4sajELjpWnT71w1cN8",
                mesType: "post",
                msg: "comment",
                nblock: 1154413,
                posttxid: "37348021a565fa549dfae5e9fb855c40dadae4456bda1cb1bfd3d3398081db91",
                reason: "post",
                time: "1619694710",
                txid: "670be9561196c76b68ec81948de2c39e03af0add79df1e236be49f359fd38626"
            })

            self.messageHandler({
                addr: "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                addrFrom: "PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82",
                mesType: "subscribe",
                msg: "event",
                node: "135.181.196.243:38081:8087",
                time: 1625762423,
                txid: "6119caaadaef37be8f3716be8280e88206adf043f38fc1665d7e42bdcf90128a"
            })

			self.messageHandler({
                addr: "PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82",
                addrFrom: "PTcArXMkhsKMUrzQKn2SXmaVZv4Q7sEpBt",
                mesType: "postfromprivate",
                msg: "event",
                node: "51.174.99.18:38081:8087",
                time: 1625723521,
                txid: "b52f38b272b7a18c0947b853ee35fee2aa0e0105aa86daa9cd1efcb35b54f036"
            })*/

            // referral
            /*self.messageHandler({
                addr: "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                addrFrom: "PJTjvqynFHqarEKgg6UJMQBSjuDsqn1ztF",
                mesType: "userInfo",
                msg: "event",
                nameFrom: "reftest1011",
                node: "137.135.25.73:38081:8087",
                time: 1636521290,
                txid: "65fee9b1e925833c5ff623178efecc436d3af0c9f6a4baa0b73c52907a9d1d7b"
            })


            self.messageHandler({"addr":"PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82","msg":"transaction","txid":"02049bfc66ccf0efdd03cf715dad9d3f18c729b4012671982b115ff4d67f8069","time":1731655840,"amount":"1250000","nout":"6","node":"185.9.187.123:38081:8087"})*/


            // test coin

            //self.messageHandler({"addr":"TSVui5YmA3JNYvSjGK23Y2S8Rckb2eV3kn","msg":"transaction","txid":"a6819e0de29c148a193932da4581b79cae02163f717962a86ccbf259f915a4be","time":1657701744,"amount":"1000000","nout":"2","node":"116.203.219.28:39091:6067"})

        }, 3000)
    }


    self.convertUTCSS = function (str) {

        var d = utcStrToDate(str);

        if (self.timeDifference) {

            d.addSeconds(-self.timeDifference)
        }

        return convertDate(dateToStr(d))
    }

    self.convertUTCSSrel = function (str) {

        var d = utcStrToDate(str);

        if (self.timeDifference) {

            d.addSeconds(-self.timeDifference)
        }

        return app.reltime(d)
    }

    self.currentTimeSS = function () {
        var created = new Date()

        if (self.timeDifference) {

            created.addSeconds(self.timeDifference)
        }

        return dateToStrUTCSS(created)
    }

    self.currentTime = function (date) {
        var created = Math.floor(((date || new Date()).getTime()) / 1000)

        if (self.timeDifference) {
            created += self.timeDifference
        }

        return created;
    }

    self.Cryptography = function (platform) {

        var self = this;
        var mk;
        var mk256;
        var iv = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];
        var crypto;
        var currentRsaKeys = null;

        var check = '0101010101010101'

        if (typeof window != 'undefined') {
            crypto = window.crypto || window.msCrypto;
        } else {
            crypto = _crypto
        }

        self.helpers = {
            keyFromString: function (key, l, clbk) {

                if (_Node) {
                    var derivedKey = PBKDF2.pbkdf2Sync(key, 'helper', 1, 32, 'sha512')

                    clbk(key)

                } else {
                    var mypbkdf2 = new PBKDF2(key, 'helper', 1, l);

                    mypbkdf2.deriveKey(null, function (key) {
                        clbk(key)
                    });
                }

            },

            keyForAes: function (key, clbk) {

                var _clbk = function (key) {

                    if (!crypto.subtle) {
                        if (clbk)
                            clbk('')
                        return
                    }

                    crypto.subtle.importKey(
                            "raw",
                            aesjs.utils.utf8.toBytes(key), { //this is the algorithm options
                                name: "AES-CBC",
                            },
                            false,
                            ["encrypt", "decrypt"]
                        )
                        .then(function (key) {

                            if (clbk)
                                clbk(key)

                        })
                        .catch(function (err) {
                            console.log(err)
                        });
                }

                if (key.length >= 128) {
                    _clbk(key)
                } else {
                    self.helpers.keyFromString(key, 16, function (key) {

                        _clbk(key)

                    })
                }


            }
        }

        self.api = {
            random: {
                crypto: function (clbk, bits) {

                    bits || (bits = 256)

                    var random_num = new Uint8Array(bits / 8);

                    if (crypto.getRandomValues) {

                        crypto.getRandomValues(random_num);
                    } else {
                        getRandomValues(random_num);
                    }



                    var str = aesjs.utils.hex.fromBytes(random_num)

                    if (clbk) {
                        clbk(str)
                    }

                    return str;
                }
            },


            rsa: {

                settings: {
                    hashL: "256",
                    name: "RSA-OAEP",
                    length: 4096
                },
                createKeys: function (clbk) {
                    var settings = this.settings;

                    crypto.subtle.generateKey({
                                name: settings.name,
                                modulusLength: settings.length, //can be 1024, 2048, or 4096
                                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                                hash: {
                                    name: "SHA-" + settings.hashL
                                }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
                            },
                            true, //whether the key is extractable (i.e. can be used in exportKey)
                            ["encrypt", "decrypt"] //must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
                        )
                        .then(function (keys) {

                            if (clbk)
                                clbk(keys)
                        })
                        .catch(function (err) {
                            console.error(err);
                        });
                },
                exportKeys: function (keys, clbk) {
                    var k = ['public', 'private'];
                    var exporting = {};
                    var m = this.exportKey;

                    lazyEach({
                        array: k,
                        synk: true,
                        action: function (p) {

                            m(keys[p.item + 'Key'], p.item, function (keydata) {

                                exporting[p.item] = keydata;

                                p.success();
                            })
                        },

                        all: {
                            success: function () {
                                if (clbk)
                                    clbk(exporting)
                            }
                        }
                    })
                },
                exportKey: function (key, pp, clbk) {

                    var m = 'jwk'

                    if (pp == 'public') {
                        m = 'spki'
                    }
                    if (pp == 'private') {
                        m = 'pkcs8'
                    }

                    crypto.subtle.exportKey(
                            m, //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
                            key //can be a publicKey or privateKey, as long as extractable was true
                        )
                        .then(function (keydata) {
                            //returns the exported key data

                            if (clbk)
                                clbk(convertArrayBufferToString(keydata))

                        })
                        .catch(function (err) {
                            console.error(err);
                        });
                },
                importKeys: function (importing, clbk) {
                    var k = ['public', 'private'];

                    var m = this.importKey;
                    var keys = {}

                    lazyEach({
                        array: k,
                        action: function (p) {

                            m(importing[p.item], p.item, function (key) {

                                keys[p.item + 'Key'] = key

                                p.success();
                            })
                        },

                        all: {
                            success: function () {
                                if (clbk)
                                    clbk(keys)
                            }
                        }
                    })
                },
                importKey: function (keyH, pp, clbk) {
                    var settings = self.api.rsa.settings;

                    var _pp = [];
                    var m = 'jwk';

                    if (pp == 'public') {
                        _pp = ["encrypt"];
                        m = 'spki'
                    }
                    if (pp == 'private') {
                        _pp = ["decrypt"];
                        m = 'pkcs8'
                    }

                    crypto.subtle.importKey(
                            m, //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
                            convertStringToArrayBuffer(keyH),
                            /*{   //this is an example jwk key, other key types are Uint8Array objects
                                kty: "RSA",
                                e: "AQAB",
                                n: keyH,
                                alg: settings.name + "-" + settings.hashL,
                                ext: true,
                            },*/
                            { //these are the algorithm options
                                name: settings.name,
                                hash: {
                                    name: "SHA-" + settings.hashL
                                }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
                            },
                            true,
                            _pp
                        )
                        .then(function (key) {

                            if (clbk)
                                clbk(key)

                        })
                        .catch(function (err) {
                            console.error(err);
                        });
                },
                encrypt: function (publicKey, text, clbk) {

                    //var data = aesjs.utils.utf8.toBytes(text);
                    //
                    var data = convertStringToArrayBuffer(text);

                    crypto.subtle.encrypt({
                                name: "RSA-OAEP",
                            },
                            publicKey,
                            data
                        )
                        .then(function (encrypted) {

                            if (clbk)
                                clbk(convertArrayBufferToString(encrypted))
                        })
                        .catch(function (err) {
                            console.error(err);
                        });
                },
                decrypt: function (privateKey, text, clbk) {
                    var data = convertStringToArrayBuffer(text);

                    crypto.subtle.decrypt({
                                name: "RSA-OAEP",

                            },
                            privateKey,
                            data
                        )
                        .then(function (decrypted) {


                            //returns an ArrayBuffer containing the decrypted data
                            if (clbk)
                                clbk(convertArrayBufferToString(decrypted))
                        })
                        .catch(function (err) {

                            console.error(err);

                            if (clbk)
                                clbk('')

                            //
                        });
                }
            },

            aeswc: {
                pwd: {
                    encryption: function (str, p, clbk) {

                        self.api.aeswc.encryption(str, mk, p, clbk);
                    },

                    decryption: function (str, p, clbk) {

                        self.api.aeswc.decryption(str, mk, p, clbk);

                    }
                },

                cryptoPair: function (pair, clbk) {

                    if (!pair.privateEncrypted)

                        self.api.aeswc.pwd.encryption(pair.private, {}, function (privateEncrypted) {
                            pair.privateEncrypted = privateEncrypted

                            if (clbk)
                                clbk(pair)
                        })

                    else {
                        if (clbk)
                            clbk(pair)
                    }
                },

                uncryptoPair: function (pair, clbk) {

                    if (!pair.private)

                        self.api.aeswc.pwd.decryption(pair.privateEncrypted, {}, function (_private) {
                            pair.private = _private

                            if (clbk)
                                clbk(pair)
                        })

                    else {
                        if (clbk)
                            clbk(pair)
                    }

                    return pair;
                },
                encryption: function (str, key, p, clbk) {

                    if (!p) p = {};

                    p.charsetEnc = (p.charsetEnc || 'utf8')
                    p.charsetDec = (p.charsetDec || 'hex')

                    var strBytes = aesjs.utils[p.charsetEnc].toBytes(str);

                    self.helpers.keyForAes(key, function (akey) {
                        crypto.subtle.encrypt({
                                    name: "AES-CBC",
                                    iv: new Uint8Array(iv) /*window.crypto.getRandomValues(new Uint8Array(16)),*/
                                },
                                akey, //from generateKey or importKey above
                                strBytes //ArrayBuffer of data you want to encrypt
                            )
                            .then(function (encrypted) {

                                var _encrypted = aesjs.utils[p.charsetDec].fromBytes(new Uint8Array(encrypted));

                                if (clbk)
                                    clbk(_encrypted)
                            })
                            .catch(function (err) {
                                console.error(err);
                            });
                    })
                },

                decryption: function (str, key, p, clbk) {
                    if (!p) p = {};

                    p.charsetEnc = (p.charsetEnc || 'utf8')
                    p.charsetDec = (p.charsetDec || 'hex')

                    var encryptedBytes = new Uint8Array(aesjs.utils[p.charsetDec].toBytes(str));

                    self.helpers.keyForAes(key, function (akey) {

                        if (!crypto.subtle) {
                            if (clbk)
                                clbk('')

                            return
                        }


                        crypto.subtle.decrypt({
                                    name: "AES-CBC",
                                    iv: new Uint8Array(iv), //The initialization vector you used to encrypt
                                },
                                akey, //from generateKey or importKey above
                                encryptedBytes //ArrayBuffer of the data
                            )
                            .then(function (decrypted) {


                                var _decrypted = aesjs.utils[p.charsetEnc].fromBytes(new Uint8Array(decrypted));

                                if (clbk)
                                    clbk(_decrypted)
                            })

                            .catch(function (err) {

                                console.error(err)

                                if (clbk)
                                    clbk('')
                            });

                    })

                }
            },


        }

        self.messages = {
            chat: {
                encryptions: function (publicKeys, messages, clbk) {

                    if (!currentRsaKeys) {
                        if (clbk)
                            clbk()

                        return
                    }

                    var _ar = [];
                    var keys = _.map(messages, function (m, k) {
                        _ar.push(m)
                        return k
                    })

                    var skey = self.api.random.crypto();

                    var encryptedMessages = {};
                    var encryptedKeys = null;

                    lazyEach({
                        array: _ar,
                        action: function (p, index) {
                            var message = p.item;
                            var key = keys[index];

                            if (message) {

                                self.messages.chat.encryption(publicKeys, message, function (em) {

                                    if (em) {
                                        encryptedMessages[key] = em.message;
                                        encryptedKeys = em.keys;

                                        p.success()
                                    } else {
                                        p.fail()
                                    }



                                }, skey)
                            } else {
                                encryptedMessages[key] = message;

                                p.success()
                            }

                        },
                        all: {
                            success: function () {

                                if (clbk)
                                    clbk(encryptedMessages, encryptedKeys)
                            },
                            fail: function () {

                                if (clbk)
                                    clbk()
                            }
                        }
                    })
                },
                encryption: function (publicKeys, message, clbk, skey) {

                    if (currentRsaKeys) {
                        publicKeys || (publicKeys = [])

                        publicKeys.push({
                            key: currentRsaKeys.publicKey,
                            user: platform.app.user.data.id
                        })


                        self.messages.encryption(publicKeys, check + message, clbk, skey)
                    } else {
                        if (clbk)
                            clbk()
                    }



                },
                decryptions: function (skey, messages, clbk) {

                    var _ar = [];

                    var keys = _.map(messages, function (m, k) {
                        _ar.push(m)

                        return k
                    })

                    var decryptedMessages = {};

                    lazyEach({
                        array: _ar,
                        synk: true,
                        action: function (p, index) {

                            var message = p.item;
                            var key = keys[index];

                            if (message) {

                                self.messages.chat.decryption(skey, message, function (message) {

                                    decryptedMessages[key] = message;

                                    p.success()

                                })
                            } else {
                                decryptedMessages[key] = message;

                                p.success()
                            }

                        },
                        all: {
                            success: function () {

                                clbk(decryptedMessages)
                            }
                        }
                    })
                },
                decryption: function (skey, encryptedMessage, clbk) {

                    if (currentRsaKeys) {
                        self.messages.decryption(currentRsaKeys.privateKey, skey, encryptedMessage, function (message) {
                            if (message.indexOf(check) === 0) {

                                message = message.substr(check.length)

                            } else {
                                message = ''
                                //message = "Can't decrypt message"
                            }

                            if (clbk)
                                clbk(message)
                        })
                    } else {
                        if (clbk)
                            clbk('')
                    }


                }
            },
            decryption: function (privateKey, encryptedKey, encryptedMessage, clbk) {

                var decryption = function (privateKey) {
                    self.api.rsa.decrypt(privateKey, encryptedKey, function (skey) {

                        var decryptedMessage = self.api.aeswc.decryption(encryptedMessage, skey, {}, clbk);

                    })
                }

                if (!_.isObject(privateKey)) {
                    self.api.rsa.importKey(privateKey, 'private', function (privateKey) {
                        decryption(privateKey)
                    })
                } else {
                    decryption(privateKey)
                }

            },
            encryption: function (publicKeys, message, clbk, skey) {
                skey || (skey = self.api.random.crypto());

                var encryptedKeys = [];

                lazyEach({
                    array: publicKeys,
                    action: function (p, index) {
                        var key = p.item.key;

                        var encryption = function (key) {

                            self.api.rsa.encrypt(key, skey, function (encryptedKey) {
                                encryptedKeys[index] = {
                                    key: encryptedKey,
                                    user: p.item.user
                                }

                                p.success();
                            })
                        }

                        if (!_.isObject(key)) {
                            self.api.rsa.importKey(key, 'public', function (key) {
                                encryption(key)
                            })
                        } else {
                            encryption(key)
                        }
                    },

                    all: {
                        success: function () {

                            self.api.aeswc.encryption(message, skey, {}, function (encryptedMessage) {

                                if (clbk)
                                    clbk({
                                        keys: encryptedKeys,
                                        message: encryptedMessage
                                    })

                            });


                        }
                    }
                })
            }
        }

        self.prepare = function (clbk) {

            if (!crypto.subtle) self.disabled = true

            app.user.isState(function (state) {
                if (state) {

                    var key = app.user.private.value;

                    if (key) {

                        mk = key.toString('hex');

                        if (clbk)
                            clbk(false)

                    } else {
                        if (clbk)
                            clbk('key')
                    }
                } else {
                    if (clbk)
                        clbk('state')
                }
            })
        }



        return self;
    }

    self.autoUpdater = function () {

        if (!electron) return

        var d = null;

        var updateReady = function () {

            if (!d) {
                d = new dialog({
                    html: self.app.localization.e('e13347'),
                    btn1text: self.app.localization.e('dyes'),
                    btn2text: self.app.localization.e('e13348'),

                    success: function () {


                        globalpreloader(true)
                        electron.ipcRenderer.send('quitAndInstall');
                        d = null;

                    },

                    fail: function () {
                        d = null;
                        setTimeout(updateReady, 86400000)
                    }
                })
            }
        }

        var updateAvailable = function () {
            if (!d) {
                if (self.app.platform.applications.ui[os()]) {
                    var _os = self.app.platform.applications.ui[os()]
                    if (_os.github && _os.github.page) {
                        d = new dialog({
                            html: self.app.localization.e('e13349'),
                            btn1text: self.app.localization.e('dyes'),
                            btn2text: self.app.localization.e('e13348'),

                            success: function () {
                                require("electron").shell.openExternal(_os.github.page);
                                d = null;
                            },

                            fail: function () {
                                d = null;
                                setTimeout(updateReady, 86400000)
                            }
                        })
                    }
                }
            }
        }

        var silentUpdateAvailable = function() {
            $('.app-update-available').show()
        }

        electron.ipcRenderer.on('updater-message', function (event, data) {
            if (data.type == 'info') {
                if (data.msg == 'update-downloaded') {
                    updateReady()
                }

                if (data.msg == 'download-progress') {

                }

                if (data.msg == 'update-available' && (data.linux || data.macos)) {

                    if (data.linux && data.silent)
                        silentUpdateAvailable()
                    else
                        updateAvailable()

                    // TODO APPLICATIONS PAGE
                }
            }

            if (data.type == 'error') {}
        })

    }

    self.nodes = listofnodes || null

    self.clearStorageFast = function () {
        _.each(self.sdk, function (c, id) {

            if (id == 'users' || id == 'usersl' || id == 'tags' || id == 'localshares') return;

            if (c.storage) {
                c.storage = {}
            }
        })

        self.sdk.likes.who = {};

        self.sdk.node.transactions.storage = {}
    }

    self.clearStorage = function () {
        _.each(self.sdk, function (c, id) {

            if (id != 'tags' && id != 'localshares') {
                if (c.storage) {
                    c.storage = {}
                }
            }



        })

        self.sdk.search.storage = {
            all: {},
            fs: {},
            posts: {},
            users: {},
            tags: {}
        }


        self.sdk.sharesObserver.storage = {
            viewed: {}
        }

        self.sdk.ustate.loading = {}

        self.sdk.likes.who = {};

        self.sdk.node.transactions.storage = {}

        delete self.sdk.node.transactions.unspent
    }

    self.clearStorageLight = function () {

        app.platform.sdk.node.transactions.storage = {}

        _.each(app.platform.sdk.node.shares.storage, function (s, id) {
            if (id != 'trx')
                delete app.platform.sdk.node.shares.storage[id]
        })

    }

    self.clearlocal = function () {
        self.sdk.tags.storage.cloud = {}

        self.sdk.newmaterials.clear()
    }

    self.clear = function (fast) {
        self.app.nav.addParameters = null;

        self.sdk.articles.storage = []

        self.sdk.notifications.clbks.seen = {};
        self.sdk.notifications.clbks.added = {};
        self.sdk.notifications.inited = false;
        self.sdk.notifications.loading = false;

        self.sdk.ustate.clbks = {};

        self.sdk.registrations.clbks = {};
        self.sdk.sharesObserver.destroy()
        self.sdk.recommendations.destroy()

        //self.sdk.node.storage = { balance: {} }

        fast ? self.clearStorageFast() : self.clearStorage()

        if (app.peertubeHandler) app.peertubeHandler.clear()

        //self.sdk.node.transactions.clearUnspentoptimizationInterval()

        //self.sdk.node.transactions.unspentLoading = {}

        if (electron) {
            electron.ipcRenderer.send('update-badge', null);
            electron.ipcRenderer.send('update-badge-tray', null);
        }

        if (self.ws)
            self.ws.destroy()

        if (self.clientrtctemp) {
            self.clientrtctemp.destroy()
        }

        /*if (self.focusListener) {
            self.focusListener.destroy()
        }*/

        if (onlinetnterval)
            clearInterval(onlinetnterval)

        checkfeatures()

    }

    self.restart = function (clbk) {

        app.errors.clear();

        self.clear();

        app.user.isState(function (state) {
            self.prepare(clbk, state)
        })
    }

    self.update = function (clbk) {

        if (self.updating || self.preparingUser || self.preparing) return;

        self.updating = makeid()

        //// ?
        setTimeout(function () {
            self.updating = false;
        }, 600000)

        var methods = [
            'ustate.meUpdate',
            'user.meUpdate',
            'node.get.time',
        ]

        var progress = 10;

        lazyEach({
            array: methods,
            action: function (p) {
                var m = p.item;

                deep(self.sdk, m)(function () {
                    progress = progress + 15;
                    p.success();
                })
            },

            all: {
                success: function () {
                    if (clbk)
                        clbk();
                }
            }
        })
    }

    self.updating = makeid()
    setTimeout(function () {
        self.updating = false;
    }, 600000)

    var reloading = false

    self.appstateclbk = function (c) {
        if (self.loadingWithErrors) {
            self.appstate(function () {
                setTimeout(function () {
                    if (c) c()
                }, 200)
            })
        } else {
            if (c) c()
        }
    }

    self.appstate = function (clbk) {

        if (reloading) {
            return
        }

        reloading = true

        self.loadingWithErrors = false;


        self.restart(function () {

            self.app.reload({
                clbk: function () {
                    reloading = false

                    self.loadingWithErrors = !_.isEmpty(self.app.errors.state)

                    if (clbk) clbk()
                }
            })

        })
    }

    self.directdialog = function (proxy) {

        return new Promise((resolve, reject) => {

            var d = new dialog({
                html: self.app.localization.e('pdirectdialog'),
                btn1text: self.app.localization.e('dyes'),
                btn2text: self.app.localization.e('dno'),

                success: function () {
                    self.app.api.set.current(proxy.id).then(r => {

                        resolve()
                    }).catch(resolve)
                },

                fail: function () {
                    resolve()
                },

                class: 'zindex'
            })

            self.app.api.wait.ready('useexternal').then(r => {
                d.destroy()

                resolve()
            })

        })


    }

    self.prepare = function (clbk) {

        if (typeof _Electron === 'undefined' && !window.cordova) {
            self.sdk.syncStorage.init();
        }

        self.nodeControlUpdateNodeLast = new Date()
        self.nodeControlUpdateNodePopup = false
        self.preparing = true;
        self.sdk.registrations.load();
        //self.sdk.relayTransactions.load();
        self.applications = self.__applications()

        self.sdk.lentaMethod.load()

        self.sdk.uiScale.load();
        self.sdk.uiScale.listenScalingEvents();

        self.sdk.system16.init()
        self.sdk.broadcaster.init();

        //self.app.platform.sdk.node.sys.load()

        setTimeout(function () {
            self.initSounds();
        }, 35000)

        /*if (self.app.errors.clbks) {
            self.app.errors.clbks.platform = self.appstate
        }*/

        ///

        //initOnlineListener() // /remove for test



        self.app.api.wait.ready('use', 6000).then(r => {

            return new Promise((resolve, reject) => {
                setTimeout(function () {

                    self.app.api.changeProxyIfNeed().then(l => {

                        if (!l) {

                            var d = self.app.api.get.direct()

                            if (d) {

                                self.directdialog(d).then(resolve)

                                return
                            }
                        }

                        resolve()

                    }).catch(reject)

                }, 50)
            })

        }).then(() => {
            return self.app.api.getPeertubeserversList()
        }).then(r => {


            var directproxy = self.app.api.get.direct()

            if (directproxy) {
                directproxy.clbks.tick.globalclbk = function (data) {

                    if (data.nodeControl.state.hasUpdate) {
                        if (!self.nodeControlUpdateNodePopup && (new Date(self.nodeControlUpdateNodeLast)).addSeconds(60 * 60) < new Date()) {
                            self.nodeControlUpdateNodeLast = new Date()
                            self.nodeControlUpdateNodePopup = true

                            new dialog({
                                html: self.app.localization.e('easyNode_e10062'),
                                btn1text: self.app.localization.e('easyNode_e10015'),
                                btn2text: self.app.localization.e('skip'),
                                class: 'zindex',

                                success: function () {

                                    directproxy.fetchauth('manage', {
                                        action: 'node.update',
                                        data: {
                                            all: 'all'
                                        }
                                    }).then(r => {
                                        sitemessage(self.app.localization.e('easyNode_e10063'), null, 5000)
                                    }).catch(e => {
                                        sitemessage(JSON.stringify(e), null, 5000)
                                    })

                                },
                                destroy: function () {
                                    self.nodeControlUpdateNodeLast = new Date()
                                    self.nodeControlUpdateNodePopup = false
                                }
                            })
                        }
                    }
                }
            }


            self.ws = new self.WSn(self);

            self.firebase = new self.Firebase(self);

            self.state.load();

            self.focusListener = self.FocusListener(self);
            self.focusListener.init();
            self.titleManager = new self.TitleManager();
            self.sdk.captcha.load()

            setTimeout(function () {
                self.sdk.tags.cloud()
                self.sdk.node.get.time()
            }, 1000)

            self.sdk.videos.init()

            self.preparing = false;

            self.preparePeertubeServer();

            self.prepareUser(function () {

                self.ui.externalFromCurrentUrl()

                self.sdk.theme.load()

                clbk();
            });


        }).catch(e => {
            console.log("ERROR", e)
        })

        self.sdk.payments.make = (new window.__BastyonLib(window.project_config)).payments


    }

    self.preparePeertubeServer = function () {
        return new Promise((resolve, reject) => {
            if (self.app.options.peertubeServer)
                return resolve();

            if (typeof PeerTubePocketnet != 'undefined') {

                self.app.peertubeHandler = new PeerTubePocketnet(self.app);
                // Fetch the peertube servers
                self.app.peertubeHandler.api.proxy.roys({
                    type: 'upload'
                }).then((ptServers) => {
                    try {
                        if (ptServers)
                            self.app.options.peertubeServer = ptServers[_.sample(Object.keys(ptServers))];
                    } catch (err) {
                        console.log(err);
                        return reject(err);
                    }
                    // Authenticate to this Peertube server
                    self.app.peertubeHandler.api.user.getClientId(self.app.options.peertubeServer).then(({
                        client_id,
                        client_secret
                    }) => {
                        if (client_id)
                            self.app.options.peertubeCreds.client_id = client_id;
                        if (client_secret)
                            self.app.options.peertubeCreds.client_secret = client_secret;
                        return resolve();
                    }, (err) => {
                        console.log(err);
                        return reject(err);
                    });
                }, (err) => {
                    console.log(err);
                    return reject(err);
                });
            } else
                return reject('No peertube handler');
        });
    }


    var checkfeatures = function () {

        self.app.user.features.telegram = 0;
        self.enablePeertube = false

        if (self.app.user.address.value) {

            var addresses = self.testchataddresses;

            var peertubeAddresses = self.testaddresses;

            if (peertubeAddresses.indexOf(self.app.user.address.value) > -1) {

                self.enablePeertube = true
            }

            if (addresses.indexOf(self.app.user.address.value) > -1) {

                self.app.user.features.telegram = 1;

            } else {
                self.app.user.features.telegram = 0;
            }
        }
    }

    self.acceptterms = function (clbk) {

        if (window.cordova && window.pocketnetstore) {
            var key = 'acceptterms'

            var aterms = null
            try {
                aterms = localStorage[key]
            } catch (e) {}

            if (!aterms) {
                app.nav.api.load({
                    open: true,
                    id: 'terms',
                    inWnd: true,
                    essenseData: {
                        success: function () {
                            try {
                                localStorage[key] = new Date();
                            } catch (e) {}


                            setTimeout(function () {
                                if (clbk) clbk()
                            }, 300)

                        }
                    },

                    clbk: function () {

                    }
                })

                return
            }
        }




        if (clbk) clbk()

    }

    self.prepareUser = function (clbk) {

        self.preparingUser = true;

        self.matrixchat.destroy()

        checkfeatures()

        self.psdk.clearStorageAndObjects()
        self.psdk.clearIdCacheAll()

        app.user.isState(function (state) {


            if (state) {

                self.actions.prepare(() => {
                    lazyActions([

                        //self.sdk.node.transactions.loadTemp,
                        self.sdk.addresses.init,
                        self.sdk.ustate.me,
                        self.sdk.user.get,
                        self.sdk.usersettings.init,
                        self.matrixchat.importifneed,

                        self.firebase.init,
                        /*self.app.platform.sdk.node.transactions.get.allBalance,*/

                        //self.sdk.exchanges.load,
                        self.sdk.articles.init,
                        self.sdk.categories.load,
                        self.sdk.activity.load,
                        self.sdk.memtags.load,
                        self.sdk.recommendations.init,
                        self.sdk.node.shares.parameters.load,
                        self.sdk.sharesObserver.init,
                        self.sdk.comments.loadblocked,
                        self.sdk.notifications.initcl,
                        self.sdk.payments.prepare

                    ], function () {

                        //self.ui.showmykey()

                        self.ws.init()

                        setTimeout(() => {
                            self.ui.showkeyafterregistration()
                            self.app.platform.sdk.jury.updatejurycount()
                        },3000)

                        var account = self.actions.addAccount(self.app.user.address.value)

                        if (self.psdk.userState.getmy()) {
                            account.setStatus(true)
                        }

                        account.setKeys(app.user.keys())
                        account.updateUnspents().catch(e => {
                            console.error(e)
                        })
    
         
    
                        self.preparingUser = false;

                        self.loadingWithErrors = !_.isEmpty(self.app.errors.state)

                        self.app.Logger.info({
                            actionId: 'SESSION_STARTED',
                            actionSubType: 'AUTHORIZED_SESSION',
                        });

                        ricfbl(() => {
                            self.matrixchat.init()
                        }, 10)

                        self.app.initApplications()

                        if (clbk)
                            clbk()

                        setTimeout(self.acceptterms, 5000)

                        ricfbl(function () {

                            self.app.peertubeHandler.init()

                            lazyActions([
                                self.cryptography.prepare,
                                self.sdk.pool.init,
                                self.sdk.user.subscribeRef
                            ], function () {
                                //app.notifications.subscribe()
                            })

                            if (app.curation()) {
                                if (app.user.validate()) {
                                    if (app.nav.get.href() == 'userpage?pc=1') {
                                        self.matrixchat.core.apptochat()
                                    }
                                }
                            }



                            if (self.istest()) {
                                $('html').addClass('testaddress')
                            } else {
                                if ($('html').hasClass('testaddress'))
                                    $('html').removeClass('testaddress')
                            }

                        }, 2000)



                    })
                })



            } else {
                self.app.Logger.info({
                    actionId: 'SESSION_STARTED',
                    actionSubType: 'UNAUTHORIZED_SESSION',
                });

                self.app.initApplications()

                self.preparingUser = false;

                if (clbk)
                    clbk()
            }

            setTimeout(() => {
                console.log('self.app.television', self.app.television)
                if (typeof initShadowPopups === 'function' && !self.app.television) initShadowPopups()
            }, 1000)



        })

        /*setTimeout(() => {
            app.user.isState(function(state){

                if(app.nav.current.href == 'index'){

                    if($(document.activeElement).is('#application')){
                        if(!state){
                            self.ui.popup('application');
                        }
                        else{

                            var a = self.sdk.address.pnet()

                            if (a){
                                var regs = self.sdk.registrations.value(a.address)

                                if(!regs){
                                    self.ui.popup('application');
                                }
                            }

                        }
                    }

                }

            })
        }, 30000)*/

    }

    self.matrixchat = {
        el: null,
        inited: false,
        initing: false,
        chatparallax: null,

        clbks: {
            ALL_NOTIFICATIONS_COUNT: {},
            NOTIFICATION: {},
            SHOWING: {}
        },

        deactivateAccount: function () {
            if (self.matrixchat.core) {
                return self.matrixchat.core.mtrx.deactivateAccount()
            }

            return Promise.reject('matrixchat.core')
        },

        destroy: function () {


            if (self.matrixchat.chatparallax) {


                self.matrixchat.chatparallax.destroy()
                self.matrixchat.chatparallax = null
            }


            if (window.matrixchat) {
                window.matrixchat.destroy()
            }


            $('#matrix').html('');


            self.matrixchat.el = null
            self.matrixchat.inited = false


            self.matrixchat.clbks = {
                ALL_NOTIFICATIONS_COUNT: {},
                NOTIFICATION: {},
                SHOWING: {}
            }

        },

        import: function (clbk) {


            if (self.matrixchat.imported) {
                if (clbk) clbk()
            } else {
                self.matrixchat.imported = true;

                if (electron) {
                    if (clbk) clbk()
                } else {

                    var vs = '10'

                    if (typeof numfromreleasestring != 'undefined') {
                        vs = numfromreleasestring(window.packageversion) + '_' + (window.versionsuffix || "0")
                    }

                    importScript('chat/matrix-element.min.js?v=' + vs, clbk)

                }

            }


        },

        startchat: function (address) {

            if (self.matrixchat.core) {

                var link = 'contact?id=' + hexEncode(address)

                if (self.app.mobileview) {
                    self.matrixchat.core.apptochat(link)
                } else {
                    self.matrixchat.core.gopage(link)
                }
            }


        },

        importifneed: function (clbk) {

            app.user.isState(function (state) {

                if (self.matrixchat.inited || self.matrixchat.initing || _OpenApi || !state) {
                    if (clbk) clbk()

                    return
                }

                self.matrixchat.import(clbk)
            })
        },

        init: function () {

            if (self.matrixchat.inited) return
            if (self.matrixchat.initing) return
            if (_OpenApi) return
            if (self.app.television) return

            self.matrixchat.initing = true

            app.user.isState(function (state) {

                self.matrixchat.initing = false

                if (state) {

                    if (self.sdk.user.reputationBlockedMe()) return
                    if (self.sdk.user.myaccauntdeleted()) return

                    if (state) {

                        self.matrixchat.import(function () {

                            self.matrixchat.inited = true

                            var privatekey = self.app.user.private.value.toString('hex');

                            var massmailingenabled = self.app.platform.istest() || (self.sdk.user.type(self.app.user.address.value) ? true : false)
                            
                            var iscallsenabled = true///self.app.platform.istest() ? true : false

                            var path = '/'

                            if (!window.cordova && typeof _Electron == 'undefined') {
                                path = window.pocketnetpublicpath
                            }

                            if (window.cordova && isios()) {
                                path = ''
                            }

                            if (typeof _Electron != 'undefined') path = './'

                            
                            var matrix = `<div class="wrapper matrixchatwrapper">
                                <matrix-element
                                    address="${self.app.user.address.value}"
                                    privatekey="${privatekey}"
                                    pocketnet="` + (self.app.mobileview ? '' : 'true') + `"
                                    recording="true"
                                    iscallsenabled="` + iscallsenabled + `"
                                    mobile="` + (self.app.mobileview ? 'true' : '') + `" 
                                    ctheme="` + self.sdk.theme.current + `"
                                    localization="` + self.app.localization.key + `"
                                    fcmtoken="` + (self.fcmtoken || "") + `"
                                    viewtype="` + (isTablet() ? "split" : "single") + `"
                                    isSoundAvailable="` + (self.sdk.usersettings.meta.sound.value) + `"
                                    pkoindisabled="` + (self.app.pkoindisable) + `"
                                    massmailingenabled="` + massmailingenabled + `"
                                    device="` + $.md5(self.app.options.device + self.app.user.address.value) + `"
                                    cssrules='["` + path + `css/fontawesome/css/all.min.css"]'
                                >
                                </matrix-element>
                            </div>`

                            window.rifticker.add(() => {
                                $('#matrix').html(matrix);

                                self.matrixchat.el = $('.matrixchatwrapper')
                                self.matrixchat.initevents()
                                self.matrixchat.connect()
                            })

                        }, null, app);


                    }
                }
            })
        },

        initcl: function (clbk) {
            self.matrixchat.init()
            if (clbk) clbk()
        },

        changeFcm: function () {
            if (self.matrixchat.el) {
                self.matrixchat.el.find('matrix-element').attr('fcmtoken', self.fcmtoken)
            }
        },

        changeMobile: function () {
            if (self.matrixchat.el) {
                self.matrixchat.el.find('matrix-element').attr('mobile', (self.app.mobileview ? 'true' : ''))
                self.matrixchat.el.find('matrix-element').attr('pocketnet', (self.app.mobileview ? '' : 'true'))
            }
        },

        changePip: function () {
            if (self.matrixchat.el) {
                self.matrixchat.el.find('matrix-element').attr('pip', self.app.mobile.pip.enabled)
            }
        },

        changeTheme: function () {
            if (self.matrixchat.el) {
                self.matrixchat.el.find('matrix-element').attr('ctheme', self.sdk.theme.current)
            }
        },

        changeLocalization: function () {
            if (self.matrixchat.el) {
                self.matrixchat.el.find('matrix-element').attr('localization', self.app.localization.key)
            }
        },

        initevents: function () {
            if (self.matrixchat.el) {

                if (self.app.mobileview) {


                    if (self.matrixchat.chatparallax) return

                    self.matrixchat.chatparallax = new SwipeParallaxNew({

                        el: self.matrixchat.el,
                        transformel: self.matrixchat.el,

                        allowPageScroll: 'vertical',

                        directions: {
                            left: {
                                cancellable: true,



                                positionclbk: function (px) {},

                                constraints: function (e) {

                                    var path = e.path

                                    if (!e.path && e.composedPath) path = e.composedPath()

                                    if (_.find(path, function (el) {
                                            return el.className && el.className.indexOf('noswipepnt') > -1
                                        })) return false

                                    if (self.matrixchat.core && (!self.matrixchat.core.canback || self.matrixchat.core.canback())) return true
                                },

                                restrict: true,
                                trueshold: 30,
                                clbk: function () {

                                    if (self.matrixchat.core && (!self.matrixchat.core.canback || self.matrixchat.core.canback()))
                                        self.matrixchat.core.backtoapp()

                                }

                            }
                        }


                    }).init()

                } else {
                    if (self.matrixchat.chatparallax) {
                        self.matrixchat.chatparallax.destroy()
                        self.matrixchat.chatparallax = null
                    }
                }

                self.matrixchat.clbks.NOTIFICATION.global = self.matrixchat.notify.event

                /*self.matrixchat.el[0].addEventListener('pointermove', function(e){
                    e.preventDefault()
                });*/

            }
        },

        notify: {
            tpl: function (matrixevent) {

                if (!self.ws) return


                var wsntemplates = self.ws.tempates

                var html = ''

                var ctypes = {
                    encrypted: 'e13345',
                    message: 'e133452',
                    invite: 'e133451'
                }

                if (!matrixevent.ctype) return

                var ctype = ctypes[matrixevent.ctype]

                if (!ctype) return

                html += wsntemplates.user({

                    image: matrixevent.icon,
                    name: matrixevent.title,
                    address: ''

                }, "", true, self.app.localization.e(ctype), '', dateNow())

                var text = deep(matrixevent, 'event.event.decrypted.body') || deep(matrixevent, 'event.event.content.message') || ''
                var dtype = deep(matrixevent, 'event.event.content.msgtype')
                var type = deep(matrixevent, 'event.event.type')

                if (type != 'm.room.message') {
                    text = ''

                    return
                } else {

                    if (dtype == 'm.image') text = self.app.localization.e('image')
                    if (dtype == 'm.file') text = self.app.localization.e('file')

                }



                var h = '<div class="fastMessage">\
                <div class="fmCnt">' + html + '<div class="tips">' + text + '</div></div>\
                <div class="close">\
                    <i class="fa fa-times" aria-hidden="true"></i>\
                </div>\
                </div>'

                return h;
            },
            event: function (matrixevent) {




                if (typeof _Electron != 'undefined' && !self.focus) {

                    var _el = $(self.matrixchat.notify.tpl(matrixevent))

                    var title = _el.find('.caption').text()
                    var body = _el.find('.tips').text()
                    var image = _el.find('[image]').attr('image')
                    _el = null

                    drawRoundedImage(image, 100, 200, 200).then(image => {

                        electron.ipcRenderer.send('electron-notification-small', {
                            title,
                            body,
                            image
                        });

                    })




                }
            }
        },

        shareInChat: {
            url: function (id, url) {
                if (self.matrixchat.core) {

                    self.matrixchat.core.apptochat()

                    return self.matrixchat.core.mtrx.shareInChat(id, {
                        urls: [url]
                    }).catch(e => {

                        self.matrixchat.core.backtoapp()

                        return Promise.reject(e)
                    })
                }

                return Promise.reject('matrixchat.core')
            }
        },

        getNotificationsCount: function () {
            if (self.matrixchat.core) {
                return self.matrixchat.core.getNotificationsCount()
            }

            return 0
        },

        share: {

            object: function (sharing) {
                if (self.matrixchat.core) {

                    self.matrixchat.core.apptochat()

                    return self.matrixchat.core.share(sharing).catch(e => {

                        self.matrixchat.core.backtoapp()

                        return Promise.reject(e)
                    })
                }

                return Promise.reject('matrixchat.core')
            },

            url: function (url) {
                if (self.matrixchat.core) {

                    self.matrixchat.core.apptochat()

                    return self.matrixchat.core.share({
                        urls: [url]
                    }).catch(e => {

                        self.matrixchat.core.backtoapp()

                        return Promise.reject(e)
                    })
                }

                return Promise.reject('matrixchat.core')
            }
        },

        backtoapp: function () {

            if (self.matrixchat.core && !self.matrixchat.core.hiddenInParent) {
                self.matrixchat.core.backtoapp()

                return true
            }
        },

        wait: function () {
            return pretry(function () {
                return self.matrixchat.core
            }).then(() => {
                return self.matrixchat.core
            })
        },

        showed: function () {
            if (!self.matrixchat.core) {
                return false
            }

            if (self.app.mobileview) {
                return !self.matrixchat.core.hiddenInParent
            }


            return self.matrixchat.core.isactive()
        },

        link: function (core) {

            core.update({
                block: {
                    height: self.currentBlock
                }
            })

            core.backtoapp = function (link) {

                if (self.app.mobileview)
                    app.nav.api.history.removeParameters(['pc'], null, {
                        replaceState: true
                    })

                if (link) {

                    var protocol = ((window.project_config || {}).protocol || 'bastyon')

                    link = link.replace('https://' + self.app.options.url + '/', '').replace('https://' + window.pocketnetdomain + '/', '').replace(protocol + "://", '')


                    if (link.indexOf('index') == '0' && link.indexOf('v=') == -1 &&
                        (link.indexOf('s=') > -1 || link.indexOf('i=') > -1 || link.indexOf('p=') > -1))
                        link = link.replace('index', 'post')


                    if (link.indexOf('index') == '0') {

                        var arrHref = link.split("?");

                        const params = new URLSearchParams('?' + arrHref[1]);

                        var ext = params.get('ext');

                        if (ext) {

                            self.app.nav.api.history.addRemoveParameters([], {
                                ext: ext
                            }, {
                                replaceState: true
                            })

                            self.app.platform.ui.externalFromCurrentUrl()

                            return false;
                        }


                    }

                    self.app.nav.api.load({
                        open: true,
                        href: link,
                        history: true,
                        handler: true
                    })
                }

                if (!self.matrixchat.el) return

                core.activeChange(false)

                if (!self.matrixchat.el.hasClass('active')) return
                self.matrixchat.el.removeClass('active')


                if (app.chatposition)
                    app.chatposition(false)


                //self.app.actions.playingvideo()

                if (self.app.mobileview) self.app.actions.restore()

                if (document.activeElement) document.activeElement.blur()

                if (self.matrixchat.core) {
                    self.matrixchat.core.cancelshare ? self.matrixchat.core.cancelshare() : '';

                    self.matrixchat.core.hideInParent(self.app.mobileview ? true : false)

                    if (self.app.mobileview)
                        self.matrixchat.core.hideOptimization(true)
                }

                if (self.app.mobileview) {

                    setTimeout(function () {
                        self.app.actions.onScroll()
                    }, 300)

                }

                _.each(self.matrixchat.clbks.SHOWING, function (c) {
                    c(false)
                })



            }

            core.activeChange = function (value) {

                var wnds = self.app.el.windows.find('.wnd:not(.pipmini,.appwindow)')
                var pips = self.app.el.windows.find('.wnd.pipmini')

                window.rifticker.add(() => {
                    if (value) {
                        wnds.css('z-index', 999)
                    } else {
                        wnds.css('z-index', '')
                    }

                    if (!self.app.mobileview) {
                        if (value) {
                            pips.css('right', '360px')
                        } else {
                            pips.css('right', '')
                        }

                    }
                })


                if (!value) {
                    app.mobile.reload.initdestroyparallaxAuto()
                } else {
                    app.mobile.reload.destroyparallax()
                }


                if (!value) {
                    self.app.mobile.unsleep(false)
                } else {
                    self.app.mobile.unsleep(true)
                }



            }

            core.apptochat = function (link) {

                /*self.app.Logger.info({
					actionId: 'CHAT_OPENED',
					actionSubType: 'FROM_MOBILE_INTERFACE',
				});*/

                if (document.activeElement) document.activeElement.blur()

                if (self.matrixchat.core) {
                    if (link) {
                        self.matrixchat.core.gotoRoute(link)
                    }
                }

                if (!self.matrixchat.el) return

                core.activeChange(true)

                if (self.matrixchat.el.hasClass('active')) return
                self.matrixchat.el.addClass('active')

                if (app.chatposition)
                    app.chatposition(true)

                //self.app.actions.playingvideo()

                if (self.app.mobileview) {
                    setTimeout(function () {
                        self.app.actions.offScroll(self.matrixchat.el)
                        self.app.actions.optimize()
                    })
                }

                if (self.app.mobileview)
                    app.nav.api.history.addParameters({
                        'pc': '1'
                    })

                if (self.matrixchat.core) {
                    self.matrixchat.core.hideInParent(false)


                    if (self.app.mobileview)
                        self.matrixchat.core.hideOptimization(false)
                }


                _.each(self.matrixchat.clbks.SHOWING, function (c) {
                    c(true)
                })





            }

            self.matrixchat.core = core

            core.hideOptimization(self.app.mobileview ? true : false)
            core.hideInParent(self.app.mobileview ? true : false)
            core.externalLink(self.matrixchat)

            self.app.platform.ws.messages["newblocks"].clbks.newsharesLenta =
                self.app.platform.ws.messages["new block"].clbks.matrixchat = function () {

                    core.update({
                        block: {
                            height: self.currentBlock
                        }
                    })

                }

            var cm = deep(app, 'modules.menu.module.restart')

            if (cm) cm()

            var c = deep(app, 'nav.clbks.history.navigation')

            if (c) c()

            self.matrixchat.connect()
        },

        unlink: function () {

            if (self.matrixchat.core) {
                //self.matrixchat.core.hideInParent(false)
                self.matrixchat.core.destroyExternalLink()
            }

            self.matrixchat.connectWith = null
            self.matrixchat.joinRoom = null

            delete self.app.platform.ws.messages["new block"].clbks.matrixchat
            delete self.matrixchat.core

            if (app.chatposition)
                app.chatposition(false)

            var cm = deep(app, 'modules.menu.module.restart')

            if (cm) cm()

            var c = deep(app, 'nav.clbks.history.navigation')

            if (c) c()
        },

        update: function () {
            if (!self.matrixchat.core) return

            self.matrixchat.core.updateUser()
        },

        transaction: function (id, roomid) {

            if (!self.matrixchat.core) return

            if (!roomid) {
                /// get roomid
            }

            if (!roomid) return

            self.matrixchat.core.mtrx.transaction(roomid, id)
        },



        connect: function () {

            if (!self.matrixchat.connectWith && !self.matrixchat.joinRoom) return
            if (!self.matrixchat.core) return


            self.matrixchat.core.apptochat()


            if (self.matrixchat.connectWith) {
                return self.matrixchat.core.connect(self.matrixchat.connectWith).then(r => {
                    self.matrixchat.connectWith = null
                }).catch(e => {
                    self.matrixchat.connectWith = null
                })


            }

            if (self.matrixchat.joinRoom) {
                return self.matrixchat.core.joinRoom(self.matrixchat.joinRoom).then(r => {
                    self.matrixchat.joinRoom = null
                }).catch(e => {
                    self.matrixchat.joinRoom = null
                })


            }
        },

    }

    self.initSounds = function () {
        if (typeof ion != 'undefined' && !window.cordova) {
            ion.prepare()
            ion.sound({
                sounds: [{
                    name: "water_droplet"
                }, {
                    name: "glass"
                }],
                volume: 0.5,
                path: "js/vendor/ion.sound/sounds/",
                preload: true
            });

        }


    }

    self.FocusListener = function (platform) {

        var self = this;

        var unfocustime = null;

        var haspip = false

        var fpauseel = function (e) {
            fpause(e)
        }

        var fpause = function (e) {
            f(e, true)
        }

        var f = function (e, resume) {

            var focustime = platform.currentTime()
            var time = focustime - (unfocustime || focustime)

            self.focus = true;

            if (time > 120 && (window.cordova || electron || isInStandaloneMode())) {
                self.clearStorageLight()

                var account = self.app.platform.actions.getCurrentAccount()

                if (account) {
                    account.updateUnspents()
                }

            }

            if (time > 120 && window.cordova) {

                retry(function () {
                    return platform && platform.matrixchat && platform.matrixchat.core;
                }, function () {

                    setTimeout(function () {
                        platform.matrixchat.core.mtrx.fastsync()
                    }, 500)
                })
            }

            platform.ws.getMissed()

            self.clbks.focus(time);

            if (self.titleManager) {
                self.titleManager.clear();
            }


            if (window.cordova) {

                if (haspip) {

                    try {
                        document.exitPictureInPicture()
                    } catch (e) {

                    }

                    haspip = false
                }


                //self.app.mobile.backgroundMode(false)

            }

        }

        var ufel = function () {

            uf()
        }

        var uf = function () {

            self.focus = false;

            unfocustime = platform.currentTime()

            self.clbks.unfocus();

            if (self.activecall) {

                if (window.cordova) {
                    self.app.mobile.pip.supported((r) => {

                        if (r) {
                            self.activecall.ui.toMini()
                            self.app.mobile.pip.enable($(self.activecall.ui.root))
                        } else {



                        }
                    })
                }
            } else {
                if (self.app.pipwindow && self.app.pipwindow.playerstatus && self.app.pipwindow.playerstatus() == 'playing') {
                    self.app.mobile.pip.enable(self.app.pipwindow.el)
                } else {

                }
            }





        }



        window.focus();

        self.focus = true;

        var inited = false;


        self.init = function () {
            inited = true;

            if (window.cordova) {

                document.addEventListener("pause", uf, false);
                document.addEventListener("resume", f, false);

                return

            }

            if (electron) {

                electron.ipcRenderer.on('win-hide', uf)
                electron.ipcRenderer.on('win-minimize', uf)
                electron.ipcRenderer.on('win-restore', f)

                electron.ipcRenderer.on('pause-message', ufel)
                electron.ipcRenderer.on('resume-message', f)


                electron.ipcRenderer.on('win-cross', () => {
                    setTimeout(function () {

                        if (self.focus) return

                        if (self.app.pipwindow && self.app.pipwindow.playerstatus && self.app.pipwindow.playerstatus() == 'playing') {

                        } else {
                            if (self.app.playingvideo) {
                                self.app.playingvideo.pause()
                            }
                        }

                    }, 200)
                })





            }

            self.app.el.window.on('focus', f);
            self.app.el.window.on('blur', uf);

        }

        self.destroy = function () {
            if (!inited) return

            inited = false;

            if (window.cordova) {

                document.removeEventListener("pause", uf, false);
                document.removeEventListener("resume", f, false);

                return
            }


            if (electron) {

                electron.ipcRenderer.off('win-hide', uf)
                electron.ipcRenderer.off('win-minimize', uf)
                electron.ipcRenderer.off('win-restore', f)

                electron.ipcRenderer.off('pause-message', ufel)
                electron.ipcRenderer.off('resume-message', fpauseel)

            }

            self.app.el.window.off('focus', f);
            self.app.el.window.off('blur', uf);


        }


        return self;
    }

    self.TitleManager = function () {
        var self = this;

        var initial = '';
        var interval = null;

        self.add = function (text) {

            text = $('<div>').html(text).text()

            if (interval)
                clearInterval(interval);

            if (!initial) {
                initial = document.title || app.meta.fullname //fullName
            }

            var i = 0;

            interval = setInterval(function () {

                i++;

                if (i % 2) {
                    document.title = text;
                } else {
                    document.title = initial;
                }

            }, 700)
        }

        self.clear = function () {

            if (interval)
                clearInterval(interval);

            interval = null;

            if (initial) {
                document.title = initial;
            }

            initial = '';
        }


        return self;
    }

    self.state = {
        save: function () {
            try {
                if (self.nodeid)
                    localStorage['nodeid2'] = JSON.stringify(self.nodeid);

                else
                    delete localStorage['nodeid2']
            } catch (e) {}


        },
        load: function () {

            if (self.nodes && self.nodes.length) {

                try {
                    self.nodeid = JSON.parse(localStorage['nodeid2'])
                } catch (e) {}


                if (!self.nodeid) {
                    self.nodeid = self.nodes[0]
                }

            }

        }
    }

    self.cordovaSetup = function () {

        function setupOpenwith() {

            if (!cordova.openwith) return

            //cordova.openwith.setVerbosity(cordova.openwith.DEBUG);

            var mime = {

                'image/jpeg': 'images',
                'image/jpg': 'images',
                'image/png': 'images',
                'image/webp': 'images',
                'application/pdf': 'files',
                'application/msword': 'files'

            }

            var utitomime = {
                'public.image': 'image/jpeg'
            }

            cordova.openwith.init();
            cordova.openwith.addHandler(function (intent) {
                var sharing = {}

                if (intent.action == 'VIEW') return



                var promises = _.map(
                    _.filter(intent.items || [], function (i) {
                        return i
                    }),
                    (item) => {


                        /*if (item.type == 'text/plain'){
                            delete item.type
                        }*/


                        return new Promise((resolve, reject) => {


                            if (utitomime[item.type]) item.type = utitomime[item.type]

                            if (item.base64 && isios()) item.data = 'data:' + item.type + ';base64,' + item.base64

                            if (!item.type || !mime[item.type] || item.data) {
                                resolve()
                            } else {
                                cordova.openwith.load(item, function (data) {

                                    item.data = 'data:' + item.type + ';base64,' + data

                                    resolve()

                                });
                            }


                        }).then(r => {

                            if (item.text) {
                                if (!sharing.messages) sharing.messages = []

                                sharing.messages.push(item.text)
                            }

                            if (item.type && mime[item.type] && item.data) {
                                if (!sharing[mime[item.type]]) {
                                    sharing[mime[item.type]] = []
                                }

                                sharing[mime[item.type]].push(item.data)
                            }

                            return Promise.resolve()
                        })
                    })


                Promise.all(promises).then(r => {

                    if (intent.exit) {
                        cordova.openwith.exit();
                    }

                    if (_.isEmpty(sharing)) {
                        sitemessage(self.app.localization.e('e13293') + ' /ul101')
                    } else {

                        self.app.platform.sdk.user.stateAction(() => {

                            menuDialog({

                                items: [

                                    {
                                        text: self.app.localization.e('sendToChat'),
                                        class: 'itemmain',
                                        action: function (clbk) {

                                            self.matrixchat.wait().then(r => {
                                                return self.matrixchat.share.object(sharing)
                                            }).catch(r => {

                                                sitemessage(self.app.localization.e('e13293') + ' /ul102')

                                            })

                                            clbk()
                                        }
                                    },

                                    {
                                        text: self.app.localization.e('createPost'),
                                        action: function (clbk) {

                                            var shareEssenseData = {
                                                close: function () {},
                                                post: function () {},
                                                absolute: true,
                                            }

                                            if (sharing.messages && sharing.messages[0]) {
                                                shareEssenseData.description = sharing.messages[0];
                                            }

                                            if (sharing.images) {
                                                shareEssenseData.images = sharing.images;
                                            }

                                            app.nav.api.load({
                                                open: true,
                                                id: 'share',
                                                inWnd: true,
                                                eid: 'postin',
                                                mid: 'postin',

                                                clbk: function (e, p) {
                                                    globalpreloader(false)
                                                },

                                                essenseData: shareEssenseData
                                            })

                                            clbk()
                                        }
                                    }


                                ]
                            })

                        }, {})

                        /*self.app.user.isState(function (state) {

                            if (state){
                                

                                
                            }
                        })*/

                    }
                })
            });

        }


        self.sdk.localshares.initclbk(() => {
            if (typeof _Electron != 'undefined') {
                self.p2pvideo = new window.P2Pvideo(app)

                /*setTimeout(() => {
                    self.p2pvideo.initlocalsvideo()
                }, 3000)*/


            }

        })


        if (window.cordova) {
            setupOpenwith()

        }


    }

    self.navManager = function () {

        var routing = function (route) {

            pretry(function () {

                return app.appready

            }).then(r => {

                app.user.isState(function (state) {

                    var url = route

                    route = (route || '').replace('pocketnet://', '').replace('https://test.pocketnet.app/', '').replace('https://pocketnet.app/', '').replace('bastyon://', '').replace('https://test.bastyon.com/', '').replace('https://bastyon.com/', '')

                    if (route) {

                        if (!self.ui.externalFromCurrentUrl()) {

                            if (!state || route.indexOf('welcome?') == -1) {
                                self.app.nav.api.load({
                                    open: true,
                                    href: route,
                                    history: true
                                })
                            }

                        }


                    }

                    /////////////

                    var w = parameters(url, true).connect
                    var cr = parameters(url, true).publicroom
                    var ps = parameters(url, true).ps
                    var ref = parameters(url, true).ref

                    self.matrixchat.connectWith = w || null
                    self.matrixchat.joinRoom = cr || null


                    if (!ps && !cr && !w && !app.curation()) {
                        self.matrixchat.backtoapp()
                    }

                    setTimeout(function () {
                        self.matrixchat.wait().then(r => {
                            self.matrixchat.connect()
                        })
                    }, 500)

                    if (ref) {
                        self.app.setref(ref)
                    }

                })

            })



        }

        if (electron && _Electron) {

            electron.ipcRenderer.on('nav-message', function (event, data) {
                if (data.type == 'action') {
                    routing(data.msg)
                }
            })

        }

        if (window.cordova && typeof universalLinks != 'undefined') {

            universalLinks.subscribe('nav-message', function (eventData) {

                routing(eventData.url)

            });

        }
    }

    self.navManager()

    self.app = app;

    if (typeof HTLS != 'undefined')
        self.htls = new HTLS()

    self.cryptography = new self.Cryptography();

    self.autoUpdater()
    self.cordovaSetup()

    self.matrixchat.connectWith = parameters().connect

    if (!self.matrixchat.connectWith)
        self.matrixchat.joinRoom = parameters().publicroom

    self.activecall = null
    self.getCallsOptions = function () {

        var clbks = {
            view: function (call, ui) {

                setTimeout(() => {

                    if (!self.activecall || self.activecall.ui.view == 'mini') {
                        self.app.mobile.statusbar.show()
                    } else {
                        self.app.mobile.statusbar.hide()
                    }

                }, 100)
            }
        }


        return {
            el: $("#bastyonCalls").first()[0],
            parameters: {
                changeTitle: function (text) {
                    if (!self.titleManager) return

                    if (!text) {
                        self.titleManager.clear();
                    } else {
                        self.titleManager.add(text)
                    }
                },
                getUserInfo: async (address) => {

                    let res = new Promise((resolve, reject) => {
                        address = hexDecode(address.split(':')[0].replace('@', ''))
                        this.sdk.users.getone(address, () => {
                            resolve(self.psdk.userInfo.getShortForm(address))
                        }, true)
                    })

                    return res
                },
                getWithLocale: (key) => {
                    return self.app.localization.e(key)
                },
                onError: (err) => {
                    console.error(err)

                    //add to logger
                },
                onInitCall: (call) => {

                },
                onEnded: (call, ui) => {

                    self.activecall = null

                    self.app.mobile.unsleep(false)

                    self.app.mobile.pip.supported((r) => {

                        if (r) {} else {
                            self.app.mobile.backgroundMode(false)
                        }

                    })

                    clbks.view()
                },
                onConnected: (call, ui) => {

                    self.app.mobile.audiotoggle()

                    if (self.app.playingvideo) {
                        self.app.playingvideo.pause()
                    }

                    self.app.mobile.unsleep(true)

                    self.app.mobile.pip.supported((r) => {

                        if (r) {} else {
                            self.app.mobile.backgroundMode('mediaPlayback')
                        }

                    })

                    self.activecall = {
                        call,
                        ui
                    }

                    clbks.view()

                },

                onIncomingCall: function () {

                    if (self.app.playingvideo) {
                        self.app.playingvideo.exitFullScreen()
                        self.app.playingvideo.pause()
                    }
                },

                changeView: function (call, ui) {
                    clbks.view()
                }
            }

        }
    }

    return self;

}


if (typeof module != "undefined") {
    module.exports = Platform;
}
