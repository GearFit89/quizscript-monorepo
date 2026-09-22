


import { describe, it, expect } from "vitest"; // or 'jest'
import { multiQuestionFilter } from "@bq/shared/services/filter.service"
import type { Question, BookRange } from "@bq/shared/src/types"

// Mock data typed strictly against the Question interface
const mockQuestions: Question[] = [
  {
    id: 1,
    flight: "A",
    book: "Genesis",
    chapter: 1,
    ref: "Gen 1:1",
    question: "In the beginning?",
    answer: "God created the heavens and the earth.",
    type: "verse",
  },
  {
    id: 2,
    flight:"B",
    book: "Genesis",
    chapter: 2,
    ref: "Gen 2:1",
    question: "Thus the heavens and earth were finished?",
    answer: "Yes, in all their vast array.",
    type: "question",
  },
  {
    id: 3,
    flight: "B",
    book: "Exodus",
    chapter: "1", // Testing string chapter type
    ref: "Ex 1:1",
    question: "These are the names of the sons of Israel?",
    answer: "Reuben, Simeon, Levi, and Judah...",
    type: "verse",
  },
  {
    id: 4,
    // Optional 'book', 'chapter', and 'flight' intentionally omitted
    ref: "Gen 3:1",
    question: "Did God really say?",
    answer: "You must not eat from any tree in the garden.",
    type: "question",
  },
];

describe("multiQuestionFilter", () => {
  it("1. Should return undefined if items or criteria are missing/falsy", () => {
    // @ts-expect-error testing runtime null safety
    expect(multiQuestionFilter(null, { type: "verse" })).toEqual(null);
    // @ts-expect-error testing runtime null safety
    expect(multiQuestionFilter(mockQuestions, null)).toEqual(mockQuestions);
  });

  it("2. Should filter by exact scalar property matching", () => {
    const result = multiQuestionFilter(mockQuestions, { type: "verse" });

    expect(result).toHaveLength(2);
    expect(result?.map((q) => q.id)).toEqual([1, 3]);
  });

  it("3. Should filter using an array of criteria values", () => {
    const result = multiQuestionFilter(mockQuestions, {
      type: ["verse", "question"],
    });

    expect(result).toHaveLength(4);
  });

  it("4. Should handle missing keys based on shoulIncludeMissingKeys flag", () => {
    const criteria = { book: "Genesis" };

    // Default (false): Exclude items where property is missing/undefined
    const excludeMissing = multiQuestionFilter(mockQuestions, criteria, false);
    expect(excludeMissing).toHaveLength(2);
    expect(excludeMissing?.map((q) => q.id)).toEqual([1, 2]);

    // True: Include items where property is missing/undefined
    const includeMissing = multiQuestionFilter(mockQuestions, criteria, true);
    expect(includeMissing).toHaveLength(3);
    expect(includeMissing?.map((q) => q.id)).toEqual([1, 2, 4]);
  });

  it("5. Should filter by book and chapter when criteriaVal equals 'bookRange'", () => {
    const bookRangeConfig: BookRange = {
      Genesis: [1], // Only include Genesis Chapter 1
    };

    const criteria = {
    // Triggers criteriaVal === 'bookRange' check
       bookRange: bookRangeConfig
    }

    const result = multiQuestionFilter(mockQuestions, criteria, false);

    expect(result).toHaveLength(1);
    expect(result?.[0]?.id).toBe(1);
    console.log(result)
  });
});