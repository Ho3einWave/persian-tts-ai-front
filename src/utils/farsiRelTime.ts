import moment from "moment-jalaali";

interface TimeUnits {
    unit: string;
    value: number;
}

function getRelativeTime(timestamp: Date): string {
    const now = moment();
    const then = moment(timestamp);

    const duration = moment.duration(now.diff(then));

    const timeUnits: TimeUnits[] = [
        { unit: "years", value: duration.years() },
        { unit: "months", value: duration.months() },
        { unit: "days", value: duration.days() },
        { unit: "hours", value: duration.hours() },
        { unit: "minutes", value: duration.minutes() },
        { unit: "seconds", value: duration.seconds() },
    ];

    for (const { unit, value } of timeUnits) {
        if (value !== 0) {
            const rtf = new Intl.RelativeTimeFormat("fa", { numeric: "auto" });
            return rtf.format(-value, unit as Intl.RelativeTimeFormatUnit);
        }
    }

    return "هم اکنون";
}

export default getRelativeTime;
