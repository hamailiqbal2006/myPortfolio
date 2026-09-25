'use client';

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
} from 'react';
import styles from './ThemedDatePicker.module.css';

interface ThemedDatePickerProps {
  id: string;
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  minDate?: string; // YYYY-MM-DD
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

const WEEKDAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'] as const;

function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return dateStr;
  const dateObj = new Date(y, m - 1, d);
  const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const month = dateObj.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
  return `${weekday}, ${d} ${month} ${y}`;
}

export function ThemedDatePicker({
  id,
  value,
  onChange,
  minDate,
  placeholder = 'SELECT A DATE',
  ariaLabel,
  className,
}: ThemedDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Initialize view year/month from current value or today
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
    today.getDate()
  ).padStart(2, '0')}`;

  const effectiveMinDate = minDate || todayStr;

  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const [y, m] = value.split('-').map(Number);
      if (y && m) return new Date(y, m - 1, 1);
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isOpen]);

  const handleSelectDay = useCallback(
    (day: number) => {
      const y = viewDate.getFullYear();
      const m = String(viewDate.getMonth() + 1).padStart(2, '0');
      const d = String(day).padStart(2, '0');
      const selected = `${y}-${m}-${d}`;
      onChange(selected);
      setIsOpen(false);
      triggerRef.current?.focus();
    },
    [viewDate, onChange]
  );

  const handlePrevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Determine if previous month navigation should be disabled
  const [minY, minM] = effectiveMinDate.split('-').map(Number);
  const isPrevDisabled =
    viewDate.getFullYear() < minY ||
    (viewDate.getFullYear() === minY && viewDate.getMonth() <= minM - 1);

  // Generate calendar grid
  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();
  const firstDayIndex = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthName = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div ref={wrapperRef} className={`${styles.pickerWrapper} ${className || ''}`}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        className={styles.triggerButton}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={ariaLabel || 'Select a date'}
      >
        <span className={value ? styles.triggerValue : styles.triggerPlaceholder}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <svg
          className={styles.calendarIcon}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={styles.popover}
          role="dialog"
          aria-modal="true"
          aria-label="Date picker calendar"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false);
              triggerRef.current?.focus();
            }
          }}
        >
          <div className={styles.calendarHeader}>
            <button
              type="button"
              className={styles.navButton}
              onClick={handlePrevMonth}
              disabled={isPrevDisabled}
              aria-label="Previous month"
            >
              ←
            </button>
            <h3 className={styles.monthTitle}>{monthName}</h3>
            <button
              type="button"
              className={styles.navButton}
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              →
            </button>
          </div>

          <div className={styles.weekdaysGrid} aria-hidden="true">
            {WEEKDAYS.map((wd) => (
              <div key={wd} className={styles.weekdayLabel}>
                {wd}
              </div>
            ))}
          </div>

          <div className={styles.daysGrid} role="grid">
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className={styles.emptyCell} aria-hidden="true" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(
                dayNum
              ).padStart(2, '0')}`;
              const isPast = dateStr < effectiveMinDate;
              const isSelected = value === dateStr;
              const isToday = dateStr === todayStr;

              return (
                <button
                  key={dayNum}
                  type="button"
                  role="gridcell"
                  disabled={isPast}
                  aria-selected={isSelected}
                  aria-label={`${dayNum} ${monthName}`}
                  className={`${styles.dayCell} ${isSelected ? styles.daySelected : ''} ${
                    isToday ? styles.dayToday : ''
                  }`}
                  onClick={() => handleSelectDay(dayNum)}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
