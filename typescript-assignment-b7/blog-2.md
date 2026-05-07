# Blog Q/A

## How do Pick and Omit utility types prevent code duplication while creating specialized "slices" of a master interface? Discuss how this keeps your code DRY (Don't Repeat Yourself).
---

In TypeScript, `Pick<T, K>` and `Omit<T, K>` let you derive new interfaces from an existing “master” interface instead of rewriting overlapping structures manually.

---

### Basic Example

```ts
interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: Date
}
```

Instead of duplicating variants:

```ts
interface PublicUser {
  id: string
  name: string
}

interface UserLogin {
  email: string
  passwordHash: string
}
```

Variants are derived:

```ts
type PublicUser = Pick<User, "id" | "name">

type UserLogin = Pick<User, "email" | "passwordHash">

type UserWithoutSecrets = Omit<User, "passwordHash">
```

Now `User` is the canonical object description, and the others are merely transformations.

---

### Duplication Prevention

Without utility types, every specialized interface repeats field definitions. That repetition causes three problems:

#### 1. Divergence

Suppose you rename:

```ts
name -> fullName
```

Manual duplicates break silently or drift out of sync.

With `Pick`:

```ts
type PublicUser = Pick<User, "id" | "fullName">
```

the derived type updates automatically.

---

### 2. Multiple Sources of Truth

Duplicated interfaces create competing definitions of the same conceptual entity.

DRY says:

> Every piece of knowledge should have a single authoritative representation.

`User` becomes that authority.

---

#### 3. Semantic Drift

Repeated declarations often evolve inconsistently:

```ts
interface UserSummary {
  id: number
}
```

while elsewhere:

```ts
interface User {
  id: string
}
```

Derived types eliminate this mismatch.

---

### `Pick` as Projection

From a type theory perspective, a product type has canonical projection morphisms.

Given:

```text
A × B × C
```

you can project to:

```text
A × C
```

via a structure-preserving map.

`Pick<User, "id" | "name">` behaves similarly.

It selects a sub-product:

```text
User = Id × Name × Email × PasswordHash × CreatedAt

PublicUser = Id × Name
```

So `Pick` acts like a categorical projection.

---

### `Omit` as Complementary Projection

`Omit<T, K>` removes coordinates from the product.

```ts
type SafeUser = Omit<User, "passwordHash">
```

Conceptually:

```text
SafeUser = User − PasswordHash
```

or equivalently:

```text
Id × Name × Email × CreatedAt
```

Again, this is not redefining structure manually; it is transforming an existing structure.

---

### DRY Through Algebraic Reuse

Instead of copying *values* or *syntax*, you reuse *structure* algebraically.

You describe:

```text
master structure + transformation
```

rather than:

```text
new handwritten structure
```

Essentially you're moving from:

* imperative duplication

to:

* declarative derivation.

---
