'use client';

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  type KeyboardEvent,
} from 'react';
import styles from './ThemedSelect.module.css';

interface ThemedSelectProps {
  id: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

export function ThemedSelect({
  id,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  ariaLabel,
  className,
}: ThemedSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(() => {
    const idx = options.indexOf(value);
    return idx >= 0 ? idx : 0;
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();

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

  const openSelect = () => {
    const idx = options.indexOf(value);
    setHighlightedIndex(idx >= 0 ? idx : 0);
    setIsOpen(true);
  };

  const toggleSelect = () => {
    if (!isOpen) {
      openSelect();
    } else {
      setIsOpen(false);
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (!isOpen || !listboxRef.current) return;
    const items = listboxRef.current.querySelectorAll<HTMLLIElement>('[role="option"]');
    const currentItem = items[highlightedIndex];
    if (currentItem) {
      currentItem.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  const handleSelect = useCallback(
    (val: string) => {
      onChange(val);
      setIsOpen(false);
      buttonRef.current?.focus();
    },
    [onChange]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        openSelect();
      } else {
        setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        openSelect();
      } else {
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isOpen) {
        if (options[highlightedIndex]) {
          handleSelect(options[highlightedIndex]);
        }
      } else {
        openSelect();
      }
    } else if (e.key === 'Escape') {
      if (isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    } else if (e.key === 'Home' && isOpen) {
      e.preventDefault();
      setHighlightedIndex(0);
    } else if (e.key === 'End' && isOpen) {
      e.preventDefault();
      setHighlightedIndex(options.length - 1);
    } else if (e.key === 'Tab' && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`${styles.selectWrapper} ${className || ''}`}
    >
      <button
        ref={buttonRef}
        id={id}
        type="button"
        className={styles.triggerButton}
        onClick={toggleSelect}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={ariaLabel}
      >
        <span className={value ? styles.triggerValue : styles.triggerPlaceholder}>
          {value || placeholder}
        </span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <ul
          ref={listboxRef}
          id={listboxId}
          className={styles.dropdownList}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`${id}-option-${highlightedIndex}`}
        >
          {options.map((option, index) => {
            const isSelected = option === value;
            const isHighlighted = index === highlightedIndex;

            return (
              <li
                key={option}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                className={`${styles.optionItem} ${
                  isSelected ? styles.optionSelected : ''
                } ${isHighlighted ? styles.optionHighlighted : ''}`}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <span>{option}</span>
                {isSelected && (
                  <span className={styles.checkIndicator} aria-hidden="true">
                    ✓
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
