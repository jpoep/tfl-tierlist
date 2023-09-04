var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// ye idk, this function has no business being here
export function transformTeam(team) {
    return __assign(__assign({}, team), { logo: {
            avif: team.logo + '.avif',
            webp: team.logo + '.webp'
        } });
}
