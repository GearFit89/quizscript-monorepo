import type { Question, BookRange } from "../src/types";

type FilterCriteria<T> = {
  [K in keyof T]?: T[K] | Array<NonNullable<T[K]>> | null;
} & {
  bookRange?: BookRange;
};

/**
 *
 * @param items
 * @param criteria
 * @param shoulIncludeMissingKeys If the item is null or undefined it will be
 * added if this is true or not if not false.  It also uses loose equality
 * that also checks if null for each item
 * @returns The filtered array, or if undefined, the original items.
 */

export function multiQuestionFilter<
  T extends Partial<Record<keyof Question, string | undefined | number | null>>,
>(
  items: T[],
  criteria: FilterCriteria<T>,
  shoulIncludeMissingKeys: boolean = false,
): T[] {
  if (!items || !criteria) return items;
  const bookRange = criteria.bookRange ?? {};
  const includedBooks = new Set(Object.keys(bookRange));

  return items.filter((item) => {
    return Object.keys(criteria).every((key) => {
      const itemVal = item[key as keyof Question];

      const criteriaVal = criteria[key as keyof Question];

      if (key === "bookRange") {
        const chapter = item.chapter as number;
        const book = item.book as string;

        if (!("book" in item)) {
          console.warn("returing");
          return shoulIncludeMissingKeys;
        }
        // If only book is present, then filter by that
        if (!("chapter" in item)) {
          console.warn("chjpa checking");
          return includedBooks.has(book);
        }

        const includedChps = new Set(bookRange[book]);

        return includedBooks.has(book) && includedChps.has(chapter);
      }
      if (itemVal == undefined) {
        // If the key doesn't exist on the item skip it, based on the shouldInclude option
        return shoulIncludeMissingKeys;
      }

      if (Array.isArray(criteriaVal)) {
        return criteriaVal.includes(itemVal);
      }

      return itemVal === criteriaVal;
    });
  });
}
