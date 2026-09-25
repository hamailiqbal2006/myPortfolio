'use client';

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  type KeyboardEvent,
} from 'react';
import { PAKISTAN_CITIES } from '@/data/pakistanCities';
import styles from './ThemedCitySelect.module.css';

interface ThemedCitySelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

export function ThemedCitySelect({
  id,
  value,
  onChange,
  placeholder = 'Search your city...',
  ariaLabel,
  className,
}: ThemedCitySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isManualMode, setIsManualMode] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const manualInputRef = useRef<HTMLInputElement>(null);

  // Filter cities based on search query
  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return PAKISTAN_CITIES;
    const query = searchQuery.toLowerCase().trim();
    return PAKISTAN_CITIES.filter((city) => city.toLowerCase().includes(query));
  }, [searchQuery]);

  // Focus search input when popover opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

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

  // Scroll highlighted item into view
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const items = listRef.current.querySelectorAll<HTMLLIElement>('[role="option"]');
    const currentItem = items[highlightedIndex];
    if (currentItem) {
      currentItem.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  const handleSelectCity = useCallback(
    (city: string) => {
      onChange(city);
      setIsOpen(false);
      setSearchQuery('');
      triggerRef.current?.focus();
    },
    [onChange]
  );

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredCities.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCities.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCities[highlightedIndex]) {
        handleSelectCity(filteredCities[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  if (isManualMode) {
    return (
      <div className={`${styles.manualInputContainer} ${className || ''}`}>
        <input
          ref={manualInputRef}
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your city name"
          className={styles.manualInput}
          autoFocus
        />
        <button
          type="button"
          onClick={() => {
            setIsManualMode(false);
            setIsOpen(true);
          }}
          className={styles.switchToListButton}
        >
          ← CHOOSE FROM CITY LIST
        </button>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={`${styles.cityWrapper} ${className || ''}`}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        className={styles.triggerButton}
        onClick={() => {
          setIsOpen((prev) => !prev);
          setHighlightedIndex(0);
        }}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || 'Select city'}
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
        <div className={styles.popover}>
          <div className={styles.searchBox}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ opacity: 0.5, flexShrink: 0 }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setHighlightedIndex(0);
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search Pakistan cities..."
              className={styles.searchInput}
              aria-label="Filter cities"
            />
          </div>

          <ul
            ref={listRef}
            className={styles.cityList}
            role="listbox"
            tabIndex={-1}
            aria-label="Pakistan cities"
          >
            {filteredCities.length === 0 ? (
              <li className={styles.noResult}>No city found</li>
            ) : (
              filteredCities.map((city, index) => {
                const isSelected = city === value;
                const isHighlighted = index === highlightedIndex;

                return (
                  <li
                    key={city}
                    role="option"
                    aria-selected={isSelected}
                    className={`${styles.cityItem} ${
                      isSelected ? styles.citySelected : ''
                    } ${isHighlighted ? styles.cityHighlighted : ''}`}
                    onClick={() => handleSelectCity(city)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <span>{city}</span>
                    {isSelected && <span aria-hidden="true">✓</span>}
                  </li>
                );
              })
            )}
          </ul>

          <div className={styles.manualFallbackSection}>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsManualMode(true);
              }}
              className={styles.manualFallbackButton}
            >
              CAN&apos;T FIND YOUR CITY? ENTER IT MANUALLY.
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
