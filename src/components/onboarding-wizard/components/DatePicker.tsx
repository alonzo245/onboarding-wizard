import {
  DatePicker as RACDatePicker,
  Label,
  Group,
  DateInput,
  DateSegment,
  Button,
  Popover,
  Dialog,
  Calendar,
  CalendarGrid,
  CalendarCell,
  Heading,
} from "react-aria-components";
import { parseDate, CalendarDate } from "@internationalized/date";

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  name?: string;
  className?: string;
}

export function DatePicker({
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  name,
  className = "w-full",
}: DatePickerProps) {
  const dateValue = value
    ? (() => {
        try {
          return parseDate(value);
        } catch {
          return null;
        }
      })()
    : null;

  const handleChange = (date: CalendarDate | null) => {
    if (date) {
      const isoString = `${date.year}-${String(date.month).padStart(
        2,
        "0"
      )}-${String(date.day).padStart(2, "0")}`;
      onChange(isoString);
    } else {
      onChange("");
    }
  };

  return (
    <div className={className}>
      <RACDatePicker
        value={dateValue}
        onChange={handleChange}
        onBlur={onBlur}
        name={name}
        className="w-full"
      >
        <Label className="block mb-2 font-semibold">{label}</Label>
        <Group className="flex items-center w-full">
          <DateInput className="flex-1 px-3 py-2 rounded-l-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-transparent text-base flex items-center gap-1 min-w-0">
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
          <Button className="px-3 py-2 rounded-r-lg border border-l-0 border-black/10 dark:border-white/10 bg-white/70 dark:bg-transparent text-base flex items-center justify-center">
            <span aria-hidden="true">▼</span>
          </Button>
        </Group>
        <Popover className="max-h-96 overflow-auto rounded-lg border border-black/10 dark:border-white/10 bg-neutral-800 shadow-lg">
          <Dialog>
            <Calendar className="p-4">
              <header className="flex items-center justify-between mb-4">
                <Button
                  slot="previous"
                  className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  ◀
                </Button>
                <Heading className="text-base font-semibold" />
                <Button
                  slot="next"
                  className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  ▶
                </Button>
              </header>
              <CalendarGrid className="border-collapse">
                {(date) => (
                  <CalendarCell
                    date={date}
                    className="w-10 h-10 text-center rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer data-[selected]:bg-blue-500 data-[selected]:text-white data-[outside-month]:text-gray-400"
                  />
                )}
              </CalendarGrid>
            </Calendar>
          </Dialog>
        </Popover>
      </RACDatePicker>
      {touched && error && <div className="error mt-1">{error}</div>}
    </div>
  );
}
