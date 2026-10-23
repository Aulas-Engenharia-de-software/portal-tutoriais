import { ContentEntry } from './content.models';

export interface ContentSequence {
  id: string;
  title: string;
  discipline: string;
  entries: readonly ContentEntry[];
}

/** Sequences are defined by Markdown metadata, not by a particular assignment. */
export function getContentSequences(entries: readonly ContentEntry[]): ContentSequence[] {
  const sequences = new Map<string, ContentSequence>();
  for (const entry of entries) {
    if (!entry.sequence || !entry.sequenceTitle || !entry.step) continue;
    const sequence = sequences.get(entry.sequence);
    if (sequence) sequence.entries = [...sequence.entries, entry];
    else
      sequences.set(entry.sequence, {
        id: entry.sequence,
        title: entry.sequenceTitle,
        discipline: entry.discipline,
        entries: [entry],
      });
  }
  return [...sequences.values()]
    .map((sequence) => ({
      ...sequence,
      entries: [...sequence.entries].sort((a, b) => a.step! - b.step!),
    }))
    .sort(
      (a, b) => a.entries[0].order - b.entries[0].order || a.title.localeCompare(b.title, 'pt-BR'),
    );
}

export function getSequenceNavigation(entries: readonly ContentEntry[], entry?: ContentEntry) {
  if (!entry?.sequence) return null;
  const sequence = getContentSequences(entries).find((item) => item.id === entry.sequence);
  if (!sequence) return null;
  const index = sequence.entries.findIndex((item) => item.slug === entry.slug);
  if (index < 0) return null;
  return {
    ...sequence,
    current: index + 1,
    previous: sequence.entries[index - 1],
    next: sequence.entries[index + 1],
  };
}
