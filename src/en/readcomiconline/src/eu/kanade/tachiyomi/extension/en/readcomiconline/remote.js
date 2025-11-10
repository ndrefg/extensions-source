function getPages(htmlContent, useServer2) {
    function log(message) {
        try {
            throw new Error(message);
        } catch (e) {
            // In QuickJS, this is a way to pass messages back to the calling code.
        }
    }

    log("getPages called");

    function atob(input) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let str = String(input).replace(/=+$/, '');
        if (str.length % 4 === 1) {
            throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        let output = '';
        for (let bc = 0, bs = 0, buffer, i = 0; buffer = str.charCodeAt(i++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
            buffer = chars.indexOf(buffer);
        }
        return output;
    }

    function baeu(_0x758d2a, _0x32a1f0) {
        _0x758d2a = _0x758d2a.replace(/pw_.g28x/g, 'b').replace(/d2pr.x_27/g, 'h');
        if (_0x758d2a.indexOf("https") != 0x0) {
            var _0x41cd41 = _0x758d2a;
            var _0x4cfdb1 = _0x41cd41.substring(_0x41cd41.indexOf('?'));
            if (_0x41cd41.indexOf("=s0?") > 0x0) {
                _0x41cd41 = _0x41cd41.substring(0x0, _0x41cd41.indexOf("=s0?"));
            } else {
                _0x41cd41 = _0x41cd41.substring(0x0, _0x41cd41.indexOf("=s1600?"));
            }
            _0x41cd41 = _0x41cd41.substring(0xf, 33) + _0x41cd41.substring(50);
            _0x41cd41 = _0x41cd41.substring(0x0, _0x41cd41.length - 11) + _0x41cd41[_0x41cd41.length - 0x2] + _0x41cd41[_0x41cd41.length - 0x1];
            _0x41cd41 = decodeURIComponent(escape(atob(_0x41cd41)));
            _0x41cd41 = _0x41cd41.substring(0x0, 0xd) + _0x41cd41.substring(0x11);
            if (_0x758d2a.indexOf("=s0") > 0x0) {
                _0x41cd41 = _0x41cd41.substring(0x0, _0x41cd41.length - 0x2) + '=s0';
            } else {
                _0x41cd41 = _0x41cd41.substring(0x0, _0x41cd41.length - 0x2) + "=s1600";
            }
            _0x41cd41 = _0x41cd41 + _0x4cfdb1;
            const imageServer = useServer2 ? "https://img1.whatsnew247.net/pic" : "https://2.bp.blogspot.com";
            _0x758d2a = `${imageServer}/${_0x41cd41}${useServer2 ? '&t=10' : ''}`;
        }
        if (_0x32a1f0 && _0x32a1f0 != '' && _0x758d2a.indexOf("ip=") > 0x0) {
            _0x758d2a = _0x758d2a.replace("https://2.bp.blogspot.com", _0x32a1f0);
        }
        return _0x758d2a;
    }

    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
    let match;
    let imageScriptContent = '';
    while ((match = scriptRegex.exec(htmlContent)) !== null) {
        const scriptHtml = match[1];
        if (scriptHtml.includes('LoadNextPages') && scriptHtml.includes('new Array()')) {
            imageScriptContent = scriptHtml;
            break;
        }
    }

    if (!imageScriptContent) {
        log("imageScriptContent not found");
        return [];
    }
    log("imageScriptContent found");

    const arrayNameMatch = imageScriptContent.match(/dTfnT\(\d+,\d+,\d+,\d+,\d+,(_[A-Za-z0-9]+)\s*,/);
    const imageArrayName = arrayNameMatch ? arrayNameMatch[1] : null;
    const decryptFuncMatch = imageScriptContent.match(/function\s+([A-Za-z0-9]+)\(z,\s*l\)\s*{/);
    const decryptFuncName = decryptFuncMatch ? decryptFuncMatch[1] : null;

    if (!imageArrayName || !decryptFuncName) {
        log("imageArrayName or decryptFuncName not found");
        return [];
    }
    log("imageArrayName: " + imageArrayName);
    log("decryptFuncName: " + decryptFuncName);

    let finalLinks = [];
    try {
        eval(imageScriptContent);
        const semiEncryptedLinks = eval(imageArrayName);
        log("semiEncryptedLinks: " + JSON.stringify(semiEncryptedLinks));
        const decryptFunc = eval(decryptFuncName);

        finalLinks = semiEncryptedLinks.map(link => {
            return decryptFunc(5, link);
        });
        log("finalLinks: " + JSON.stringify(finalLinks));
    } catch (e) {
        log("Error during eval: " + e);
        return [];
    }

    return finalLinks;
}
