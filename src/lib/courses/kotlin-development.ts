import { Course } from "./types";

export const kotlinDevelopmentCourse: Course = {
  slug: "kotlin-development",
  title: "Kotlin Development",
  fee: "45,000",

  shortDescription:
    "Build modern Android applications using Kotlin with hands-on projects and industry best practices.",

  overview: [
    "This Kotlin Development course is designed to provide a strong foundation in Kotlin programming along with practical Android application development. Learners start from basic programming concepts and gradually move towards building complete Android apps.",
    "The course covers Kotlin fundamentals, Android framework components, UI design, data storage, networking, and modern Android development practices using Jetpack libraries and MVVM architecture.",
    "With hands-on labs, real-world Android use cases, and deployment guidance, this program prepares learners for Android Developer roles using Kotlin."
  ],

  duration: "5–6 Months",

  benefits: [
    {
      title: "Modern Android development",
      description:
        "Learn Kotlin, the official language for Android development, with real-world app building."
    },
    {
      title: "Hands-on Android projects",
      description:
        "Build functional Android applications from scratch using industry tools."
    },
    {
      title: "Jetpack & MVVM basics",
      description:
        "Understand modern Android architecture using ViewModel, LiveData, and Jetpack libraries."
    },
    {
      title: "Play Store deployment guidance",
      description:
        "Learn how to prepare, test, and publish Android apps to Google Play."
    }
  ],

  whyJoin: [
    {
      title: "Official Android language",
      description:
        "Kotlin is officially supported by Google and widely used in Android apps."
    },
    {
      title: "Beginner-friendly learning path",
      description:
        "Start from programming basics and progress to full Android applications."
    },
    {
      title: "Industry-relevant curriculum",
      description:
        "Covers Android Studio, APIs, storage, UI design, and deployment."
    },
    {
      title: "Practical app development",
      description:
        "Focus on real-world Android use cases, not just theory."
    },
    {
      title: "Strong career scope",
      description:
        "Prepare for roles such as Android Developer and Kotlin Developer."
    },
    {
      title: "Hands-on practice",
      description:
        "Practical exercises and mini projects reinforce every concept."
    }
  ],

  syllabus: [
    {
      title: "Introduction & Setup",
      topics: [
        "Course overview and objectives",
        "Android ecosystem and market overview",
        "Installing Java JDK and Android Studio",
        "SDK and environment setup",
        "Android project structure",
        "Hello World Android app"
      ]
    },
    {
      title: "Kotlin Fundamentals",
      topics: [
        "Overview of Kotlin and features",
        "Basic syntax, variables, and data types",
        "Control flow (if/else, loops, when)",
        "Functions and parameters",
        "Collections and arrays",
        "Null safety and exception handling",
        "Object-oriented programming in Kotlin",
        "Lambdas and higher-order functions"
      ]
    },
    {
      title: "Android Framework & App Components",
      topics: [
        "Android architecture",
        "Activities and lifecycle",
        "Intents and navigation",
        "Fragments and lifecycle",
        "Views and ViewGroups",
        "Layouts using XML and ConstraintLayout"
      ]
    },
    {
      title: "UI Design & Interaction",
      topics: [
        "UI elements (Buttons, TextView, EditText)",
        "Handling user input and events",
        "Scrollable lists using RecyclerView",
        "Menus, dialogs, toasts, and notifications",
        "Material Design principles"
      ]
    },
    {
      title: "Data Handling & Storage",
      topics: [
        "SharedPreferences",
        "SQLite basics",
        "Room persistence library",
        "JSON parsing",
        "Data Binding and View Binding"
      ]
    },
    {
      title: "Networking & APIs",
      topics: [
        "RESTful APIs and web services",
        "Retrofit and OkHttp clients",
        "Coroutines for asynchronous calls",
        "Handling API responses and errors"
      ]
    },
    {
      title: "Advanced Android Concepts",
      topics: [
        "Navigation component",
        "LiveData and ViewModel (MVVM basics)",
        "Jetpack libraries overview",
        "Background services",
        "Notifications and broadcast receivers"
      ]
    },
    {
      title: "Testing, Debugging & Deployment",
      topics: [
        "Debugging techniques",
        "Unit testing using JUnit",
        "UI testing with Espresso",
        "Preparing apps for Google Play release",
        "App publishing checklist"
      ]
    },
    {
      title: "Practical & Mini Projects",
      topics: [
        "Building and running basic Android apps",
        "Kotlin control flow and function exercises",
        "OOP-based Kotlin programs",
        "RecyclerView and API-based apps",
        "Mini Android projects using Kotlin and Android SDK"
      ]
    }
  ],

  cardImage: "/kotlin.png",
};
