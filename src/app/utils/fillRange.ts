export const fillRange = (value) => {
    const regExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/m;

    const range = value.split('-');
    if (range.length === 1) {
        return regExp.test(value) ? [value] : [];
    }

    if (!(regExp.test(range[0].trim()) && regExp.test(range[1].trim()))) {
        return [];
    }

    const start = range[0].trim().split('.').map(item => Number(item));
    const end = range[1].trim().split('.').map(item => Number(item));

    const res = [];

    for (let r0 = start[0]; r0 <= end[0]; r0++) {

        for (let r1 = start[1]; r1 <= end[1]; r1++) {

            for (let r2 = start[2]; r2 <= end[2]; r2++) {

                for (let r3 = start[3]; r3 <= end[3]; r3++) {

                    res.push([r0, r1, r2, r3].join('.'));
                }
            }
        }
    }

    return res;
};
