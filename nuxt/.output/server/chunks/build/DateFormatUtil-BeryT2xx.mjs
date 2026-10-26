globalThis.__timing__.logStart('Load chunks/build/DateFormatUtil-BeryT2xx');//#region app/utils/DateFormatUtil.ts
var DateFormatUtil = class {
	static formatLongDate(value) {
		return new Intl.DateTimeFormat("es-CO", {
			day: "2-digit",
			month: "long",
			year: "numeric",
			timeZone: "UTC"
		}).format(new Date(value));
	}
};

export { DateFormatUtil as D };;globalThis.__timing__.logEnd('Load chunks/build/DateFormatUtil-BeryT2xx');
//# sourceMappingURL=DateFormatUtil-BeryT2xx.mjs.map
