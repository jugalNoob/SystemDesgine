🔹 What is Builder Pattern?

. Definition:

Builder is a Creational Design Pattern used to construct complex
 objects step by step.

Useful when an object has many optional fields or different configurations.

Separates construction logic from the final object representation.

. Use Case in LLD:

BookMyShow → Build Movie with title, duration, showtimes, seats, etc.

Library Management → Build Book with optional author, genre, publisher.

Complex configuration objects → like Car with color, engine, airbags, sunroof.

. Key Idea:

“Separate the construction of a complex object from its representation 
so the same construction process can create different representations.”


// Step 1: Create the Product Class
class Movie {
  constructor(title, duration, language, director, cast) {
    this.title = title;
    this.duration = duration;
    this.language = language;
    this.director = director;
    this.cast = cast;
  }

  showDetails() {
    console.log(`Movie: ${this.title}, Duration: ${this.duration} min, Language: ${this.language}`);
    console.log(`Director: ${this.director}, Cast: ${this.cast.join(", ")}`);
  }
}

// Step 2: Create the Builder
class MovieBuilder {
  constructor(title) {
    this.title = title;      // Required field
    this.duration = 0;       // Defaults
    this.language = "English";
    this.director = "Unknown";
    this.cast = [];
  }

  setDuration(duration) {
    this.duration = duration;
    return this; // Allow chaining
  }

  setLanguage(language) {
    this.language = language;
    return this;
  }

  setDirector(director) {
    this.director = director;
    return this;
  }

  addCast(actor) {
    this.cast.push(actor);
    return this;
  }

  build() {
    return new Movie(this.title, this.duration, this.language, this.director, this.cast);
  }
}

// Step 3: Use the Builder to create objects
const movie1 = new MovieBuilder("Inception")
  .setDuration(148)
  .setLanguage("English")
  .setDirector("Christopher Nolan")
  .addCast("Leonardo DiCaprio")
  .addCast("Joseph Gordon-Levitt")
  .build();

movie1.showDetails();





🔹 Step-by-Step Explanation

.. Product Class (Movie):

The final object we want to create.

Has all attributes and methods.

.. Builder Class (MovieBuilder):

Responsible for step-by-step construction.

Provides methods for optional fields.

Returns the final object using build().

.. Client Code:

Uses Builder methods in a chain to configure the object.

Calls .build() to get the final object.





🔹 Output
Movie: Inception, Duration: 148 min, Language: English

Director: Christopher Nolan, Cast: Leonardo DiCaprio, Joseph Gordon-Levitt


🔹 Why Builder is Important in LLD

Complex object creation simplified: You don’t need one huge constructor 
with 10+ parameters.

Readable & maintainable code: Easy to add optional fields without
 breaking existing code.

Fluent interface: Chainable methods make the code clean.

Supports different representations: Same builder can produce variations 
of the object.




🔹 Real-World LLD Projects Using Builder

| Project              | Builder Use Case                                          |
| -------------------- | --------------------------------------------------------- |
| BookMyShow           | Build Movie objects with showtimes, seats, pricing        |
| Library System       | Build Book objects with optional author, publisher, genre |
| Car Rental / Booking | Build Vehicle object with color, engine, features         |
| Online Shopping Cart | Build Order object with items, discount, shipping options |




💡 Interview Tip:

Mention why you chose Builder (complex objects, optional params, chainable API).

Show before/after comparison:

Without Builder → huge constructor

With Builder → readable, flexible code