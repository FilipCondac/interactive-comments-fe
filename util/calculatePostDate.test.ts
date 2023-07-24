import { assert, expect, test } from "vitest";
import calculatePostDate from "./calculatePostDate";
import { one } from "big-integer";
/**
 * The file calculatePostDate.ts calculates the time since a post was created
 * by taking in a Date object or a string and returning a string with the time passed
 * since the post was created.
 *
 * Test
 * 1. If the input is a Date object, the function should return a string with the time passed
 *  since the post was created.
 * 2. If the input is a string, the function should return a string with the time passed
 * since the post was created.
 * 3. If the input is a string with a date in the future it should reject the input and return
 * an error.
 * 4. If the input is anything other than a date or string it should reject the input and return an error.
 *
 */

//Write all test names consicely and clearly

test("Date", () => {
  //Test 1

  const oneYearAgo = new Date(Date.now() - 31536000000);

  assert.equal(calculatePostDate(oneYearAgo), "1 year ago");
});

test("String", () => {
  //Test 2
  const oneYearAgo = new Date(Date.now() - 31536000000).toString();

  assert.equal(calculatePostDate(oneYearAgo), "1 year ago");
});

test("Future Date", () => {
  //Test 3
  const futureDate = new Date(Date.now() + 31536000000);
  assert.throws(() => calculatePostDate(futureDate));

  const futureDateString = futureDate.toString();
  assert.throws(() => calculatePostDate(futureDateString));
});

test("Invalid Input", () => {
  //Test 4
  assert.throws(() => calculatePostDate(1));
});
