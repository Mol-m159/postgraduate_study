module.exports = {
    generatePassword: function () {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    },
    getSHA256Hash: async function (str) {
        const buf = new TextEncoder().encode(str);
        const digest = await crypto.subtle.digest('SHA-256', buf);
        return Array.from(new Uint8Array(digest))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    },

    checkUser: function (user, req, res, pool) {
        if (user == req.session.this_user) {
            ans = pool.execute(`SELECT * FROM  users WHERE userID = ${req.session.this_user}`)
                .then(result => {
                    const users = result[0];
                    if (users[0].blocking == 0) {
                        return true;
                    } else return false;
                }).catch(function (err) {
                    console.log(err.message);
                    res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                });
            if (ans) return true
            else {
               return false
            }
        } else {
            return false
        };
    },

    transliterate: function (word) {
        var a = { "Ё": "YO", "Й": "I", "Ц": "TS", "У": "U", "К": "K", "Е": "E", "Н": "N", "Г": "G", "Ш": "SH", "Щ": "SCH", "З": "Z", "Х": "H", "Ъ": "`", "ё": "yo", "й": "i", "ц": "ts", "у": "u", "к": "k", "е": "e", "н": "n", "г": "g", "ш": "sh", "щ": "sch", "з": "z", "х": "h", "ъ": "`", "Ф": "F", "Ы": "I", "В": "V", "А": "A", "П": "P", "Р": "R", "О": "O", "Л": "L", "Д": "D", "Ж": "ZH", "Э": "E", "ф": "f", "ы": "i", "в": "v", "а": "a", "п": "p", "р": "r", "о": "o", "л": "l", "д": "d", "ж": "zh", "э": "e", "Я": "Ya", "Ч": "CH", "С": "S", "М": "M", "И": "I", "Т": "T", "Ь": "`", "Б": "B", "Ю": "YU", "я": "ya", "ч": "ch", "с": "s", "м": "m", "и": "i", "т": "t", "ь": "`", "б": "b", "ю": "yu" };

        return word.split('').map(function (char) {
            return a[char] || char;
        }).join("");
    }


} 