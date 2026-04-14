export const DEFAULT_LABELS = [
  { text: 'Electrical & Power', top: '32%', left: '6%', side: 'left' },
  { text: 'EV Components', top: '30%', left: '94%', side: 'right' },
  { text: 'Automotive', top: '50%', left: '6%', side: 'left' },
  { text: 'Household', top: '50%', left: '94%', side: 'right' },
  { text: 'Renewable Energy', top: '71%', left: '6%', side: 'left' },
  { text: 'Infrastructure', top: '71%', left: '94%', side: 'right' },
];

export const LABEL_PREVIEW_IMAGES = {
  'Electrical & Power': [
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
  ],
  'EV Components': [
    'https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=800&q=80',
  ],
  'Renewable Energy': [
    'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
  ],
  Infrastructure: [
    'https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=800&q=80',
  ],
  Automotive: [
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
  ],
  Household: [
    'https://images.unsplash.com/photo-1588854337110-9cbbd1c8e819?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=800&q=80',
  ],
};

export const FALLBACK_PREVIEW_IMAGES = [
  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
];

export const ABS_FILL = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

/**
 * Clamps a numeric value to an inclusive [min, max] range.
 */
export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

/**
 * Parses a percentage-like input to a number and falls back when invalid.
 */
export const parsePercent = (value, fallback) => {
  if (typeof value === 'number') return value;
  const parsed = Number.parseFloat(String(value).replace('%', ''));
  return Number.isFinite(parsed) ? parsed : fallback;
};

/**
 * Filters unknown image input to a list of non-empty URL strings.
 */
const normalizeImageList = (candidate) => {
  if (!Array.isArray(candidate)) return [];
  return candidate.filter((url) => typeof url === 'string' && url.trim().length > 0);
};

const warnedPreviewFallbacks = new Set();

/**
 * Emits a dev-only warning once per label/index/reason fallback combination.
 */
const warnPreviewFallbackOnce = (labelText, index, reason) => {
  if (!import.meta.env.DEV) return;
  const key = `${labelText}::${index}::${reason}`;
  if (warnedPreviewFallbacks.has(key)) return;
  warnedPreviewFallbacks.add(key);
  console.warn(
    `[OrbitAnimation] Preview fallback used for label "${labelText}" at index ${index}: ${reason}`,
  );
};

/**
 * Resolves exactly three preview images for a label using key, index, and global fallbacks.
 */
export const getPreviewImagesForLabel = (labelText, index) => {
  const byText = normalizeImageList(LABEL_PREVIEW_IMAGES[labelText]);
  if (byText.length >= 3) return byText.slice(0, 3);

  if (byText.length === 0) {
    warnPreviewFallbackOnce(labelText, index, 'missing text key in LABEL_PREVIEW_IMAGES');
  } else {
    warnPreviewFallbackOnce(labelText, index, 'insufficient images for label key');
  }

  const previewKeys = Object.keys(LABEL_PREVIEW_IMAGES);
  const byIndex =
    previewKeys.length > 0
      ? normalizeImageList(LABEL_PREVIEW_IMAGES[previewKeys[index % previewKeys.length]])
      : [];

  if (byIndex.length === 0) {
    warnPreviewFallbackOnce(labelText, index, 'index-based fallback not available');
  }

  const merged = [...byText, ...byIndex, ...FALLBACK_PREVIEW_IMAGES];
  const unique = Array.from(new Set(merged));
  const resolved = unique.slice(0, 3);
  if (resolved.length < 3) {
    warnPreviewFallbackOnce(labelText, index, 'resolved image list still below required 3 items');
  }
  return resolved;
};

/**
 * Normalizes label input and distributes labels by side with stable top/left positions.
 */
export const buildDynamicLabelLayout = (labels) => {
  const normalized = labels
    .map((label, index) => ({
      text:
        typeof label?.text === 'string' && label.text.trim()
          ? label.text.trim()
          : `Label ${index + 1}`,
      side:
        label?.side === 'right'
          ? 'right'
          : label?.side === 'left'
            ? 'left'
            : index % 2 === 0
              ? 'left'
              : 'right',
      top: label?.top,
      left: label?.left,
      originalIndex: index,
    }))
    .filter((label) => label.text.length > 0);

  const leftLabels = normalized.filter((label) => label.side === 'left');
  const rightLabels = normalized.filter((label) => label.side === 'right');

  /**
   * Evenly spreads labels vertically for one side while preserving deterministic ordering.
   */
  const assignTop = (group) => {
    if (group.length === 0) return;
    if (group.length === 1) {
      group[0].computedTop = '50%';
      return;
    }
    group.forEach((label, idx) => {
      const topPct = 28 + idx * (44 / (group.length - 1));
      label.computedTop = `${topPct}%`;
    });
  };

  assignTop(leftLabels);
  assignTop(rightLabels);

  return normalized.map((label) => ({
    ...label,
    top: label.top ?? label.computedTop ?? '50%',
    left: label.left ?? (label.side === 'right' ? '94%' : '6%'),
  }));
};
