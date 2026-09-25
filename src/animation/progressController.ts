import gsap from 'gsap';

export type ProgressListener = (progress: number, target: number) => void;

/**
 * Natural, continuous progress controller across all 7 portfolio story sections.
 * Progress ranges from 0.0 (Hero) to 6.0 (Contact).
 * Completely reversible, responsive to native scroll, wheel, swipe, and navigation triggers.
 */
class ProgressController {
  private _max = 1.0; // Hero-only landing progress scope (0.0 -> 1.0)
  private _current = 0;
  private _target = 0;
  private _listeners = new Set<ProgressListener>();
  private _settleTimer: ReturnType<typeof setTimeout> | null = null;
  private _activeTween: gsap.core.Tween | null = null;

  public get current(): number {
    return this._current;
  }

  public get target(): number {
    return this._target;
  }

  public get max(): number {
    return this._max;
  }

  public subscribe(listener: ProgressListener): () => void {
    this._listeners.add(listener);
    listener(this._current, this._target);
    return () => {
      this._listeners.delete(listener);
    };
  }

  private notify() {
    for (const listener of this._listeners) {
      listener(this._current, this._target);
    }
  }

  /**
   * Continuous scroll delta input from wheel or touch swipe.
   * Moderate sensitivity provides effortless progression through the 7 sections.
   */
  public addScrollDelta(deltaY: number, sensitivity = 0.0022) {
    if (this._activeTween) {
      this._activeTween.kill();
      this._activeTween = null;
    }

    const nextTarget = Math.max(0, Math.min(this._max, this._target + deltaY * sensitivity));
    this._target = nextTarget;
    this.notify();

    // Subtle settle to nearest section boundary when scrolling pauses
    if (this._settleTimer) {
      clearTimeout(this._settleTimer);
    }

    this._settleTimer = setTimeout(() => {
      this.autoSettle();
    }, 320);
  }

  /**
   * Programmatic smooth transition (e.g. from header nav, CTA, or indicator).
   */
  public animateTo(target: number, duration = 1.0, ease = 'power2.out', onComplete?: () => void) {
    if (this._settleTimer) {
      clearTimeout(this._settleTimer);
      this._settleTimer = null;
    }
    if (this._activeTween) {
      this._activeTween.kill();
    }

    const clampedTarget = Math.max(0, Math.min(this._max, target));
    this._target = clampedTarget;

    const proxy = { p: this._current };
    this._activeTween = gsap.to(proxy, {
      p: clampedTarget,
      duration,
      ease,
      onUpdate: () => {
        this._current = proxy.p;
        this.notify();
      },
      onComplete: () => {
        this._current = clampedTarget;
        this._target = clampedTarget;
        this._activeTween = null;
        this.notify();
        onComplete?.();
      },
    });
  }

  /**
   * Gentle snapping to nearest section boundary when resting between sections.
   */
  private autoSettle() {
    const nearest = Math.round(this._target);
    if (Math.abs(this._target - nearest) > 0.04 && Math.abs(this._target - nearest) < 0.46) {
      this.animateTo(nearest, 0.65, 'power2.out');
    }
  }

  /**
   * Frame-by-frame interpolation loop called within R3F useFrame.
   */
  public tick(lerpFactor = 0.09) {
    if (this._activeTween) {
      return this._current;
    }

    if (Math.abs(this._current - this._target) > 0.0005) {
      this._current += (this._target - this._current) * lerpFactor;
      this.notify();
    } else if (this._current !== this._target) {
      this._current = this._target;
      this.notify();
    }

    return this._current;
  }

  public setInstant(value: number) {
    if (this._activeTween) {
      this._activeTween.kill();
      this._activeTween = null;
    }
    const clamped = Math.max(0, Math.min(this._max, value));
    this._current = clamped;
    this._target = clamped;
    this.notify();
  }
}

export const progressController = new ProgressController();
