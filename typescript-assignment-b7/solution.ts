function filterEvenNumbers(numbers: number[]): number[] {
  return numbers.filter((number) => number % 2 === 0);
}

function reverseString(statment: string): string {
  return statment.split("").reverse().join("");
}

function checkType(args: number | string): number | string {
  switch (typeof args) {
    case "string":
      return "String";
    case "number":
      return "Number";
  }
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

interface Book {
  title: string;
  author: string;
  publishedYear: number;
  isRead?: boolean;
}

function toggleReadStatus(book: Book): Book {
  return { ...book, isRead: !book.isRead };
}
const myBook = {
  title: "TypeScript Guide",
  author: "Jane Doe",
  publishedYear: 2024,
};

abstract class Person {
  public name: string;
  public age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  abstract getDetails(): string;
}
class Student extends Person {
  private grade: string;
  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }
  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}

function getIntersection(arr1: number[], arr2: number[]): number[] {
  return arr1.filter((num) => arr2.includes(num));
}
