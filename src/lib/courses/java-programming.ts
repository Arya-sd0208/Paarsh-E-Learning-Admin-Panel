import { Course } from "./types";

export const javaProgrammingCourse: Course = {
  slug: "java-programming",
  title: "Java Programming",
  fee: "45,000",

  shortDescription:
    "Master core Java programming concepts with object-oriented principles, collections, multithreading, and real-world projects.",

  overview: [
    "This Java Programming course is designed to build a strong foundation in core Java concepts, object-oriented programming, and modern Java features used in enterprise and application development.",
    "Learners start from Java fundamentals and gradually progress through OOP, collections, exception handling, multithreading, file I/O, and database connectivity using JDBC.",
    "The course emphasizes hands-on coding, problem-solving, and real-world use cases, preparing learners for Java Developer roles and backend development careers."
  ],

  duration: "4–5 Months",

  benefits: [
    {
      title: "Strong programming foundation",
      description:
        "Build solid fundamentals in Java syntax, logic building, and object-oriented programming."
    },
    {
      title: "Industry-relevant concepts",
      description:
        "Learn collections, multithreading, JDBC, and modern Java features."
    },
    {
      title: "Hands-on coding & projects",
      description:
        "Practice through mini projects, real-world problems, and case studies."
    },
    {
      title: "Career-ready skills",
      description:
        "Prepare for Java Developer, Backend Developer, and Software Engineer roles."
    }
  ],

  whyJoin: [
    {
      title: "Beginner-friendly approach",
      description:
        "Step-by-step learning path starting from Java basics."
    },
    {
      title: "OOP-focused curriculum",
      description:
        "Deep understanding of classes, inheritance, polymorphism, and abstraction."
    },
    {
      title: "Practical coding exposure",
      description:
        "Hands-on exercises and real-world programming scenarios."
    },
    {
      title: "Modern Java features",
      description:
        "Learn Java 8+ features like lambdas, streams, and functional programming basics."
    },
    {
      title: "Backend & enterprise readiness",
      description:
        "Covers JDBC, servlets basics, and REST API concepts."
    },
    {
      title: "Project-based learning",
      description:
        "Apply concepts through console, GUI, and real-world projects."
    }
  ],

  syllabus: [
    {
      title: "Introduction to Java",
      topics: [
        "What is Java — history and features",
        "Java editions (SE, EE, ME)",
        "JDK, JRE, and JVM architecture",
        "Writing and running Java programs",
        "Compiling and executing Java programs"
      ]
    },
    {
      title: "Java Fundamentals",
      topics: [
        "Structure of a Java program",
        "Data types and variables",
        "Operators and expressions",
        "Keywords and naming conventions",
        "Input and output basics",
        "Type casting and type conversion",
        "Decision making (if, switch)",
        "Looping structures (for, while, do-while)"
      ]
    },
    {
      title: "Object-Oriented Programming Concepts",
      topics: [
        "Classes and objects",
        "Memory allocation for objects",
        "Constructors (default and parameterized)",
        "Method overloading and overriding",
        "This keyword and super keyword",
        "Garbage collection basics",
        "Access modifiers (public, private, protected)"
      ]
    },
    {
      title: "Inheritance & Polymorphism",
      topics: [
        "Single, multilevel, and hierarchical inheritance",
        "Abstract classes and abstract methods",
        "Interfaces and multiple inheritance",
        "Compile-time and runtime polymorphism",
        "Final keyword usage"
      ]
    },
    {
      title: "Arrays, Strings & Wrapper Classes",
      topics: [
        "One-dimensional and multi-dimensional arrays",
        "String class and string methods",
        "StringBuffer and StringBuilder",
        "Wrapper classes (Integer, Float, etc.)"
      ]
    },
    {
      title: "Packages & Exception Handling",
      topics: [
        "Built-in packages (java.lang, java.util)",
        "User-defined packages",
        "Exception types in Java",
        "Try-catch, finally, throw and throws",
        "Custom exception handling"
      ]
    },
    {
      title: "Java Collection Framework",
      topics: [
        "Overview of Java collections",
        "List, Set, and Map interfaces",
        "Collection implementations",
        "Iterators and enhanced for loop",
        "Generics and type safety"
      ]
    },
    {
      title: "Multithreading",
      topics: [
        "Thread life cycle",
        "Creating threads using Thread class",
        "Runnable interface",
        "Synchronization and thread safety",
        "Concurrency basics"
      ]
    },
    {
      title: "I/O & Streams",
      topics: [
        "File handling using java.io",
        "InputStream and OutputStream",
        "Reader and Writer classes",
        "Buffering and character streams"
      ]
    },
    {
      title: "Advanced Java Concepts",
      topics: [
        "JDBC and database connectivity",
        "Basics of servlets and JSP",
        "Lambda expressions and streams (Java 8+)",
        "Introduction to Swing and AWT",
        "REST APIs with Java (Servlet / Spring basics)"
      ]
    },
    {
      title: "Projects & Practical Applications",
      topics: [
        "Mini projects (console and GUI based)",
        "Real-world problem solving",
        "Code optimization and debugging",
        "Industry case studies"
      ]
    }
  ],

  cardImage: "/corejava.png",
};
